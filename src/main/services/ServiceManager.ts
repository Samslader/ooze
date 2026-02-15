import { exec, spawn, ChildProcess } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { ConfigManager } from './ConfigManager';
import { ConfigBuilder } from './ConfigBuilder';

const execAsync = promisify(exec);

export class ServiceManager {
  private winwsProcess: ChildProcess | null = null;
  private currentConfig: string | null = null;

  async getStatus() {
    try {
      const { stdout } = await execAsync('sc query zapret');
      const isRunning = stdout.includes('RUNNING');
      
      const { stdout: taskList } = await execAsync('tasklist /FI "IMAGENAME eq winws.exe"');
      const processRunning = taskList.includes('winws.exe');

      // Try to get current config from registry
      let currentConfig = this.currentConfig;
      if (!currentConfig && isRunning) {
        try {
          const { stdout: regOutput } = await execAsync('reg query "HKLM\\System\\CurrentControlSet\\Services\\zapret" /v zapret-discord-youtube');
          const match = regOutput.match(/zapret-discord-youtube\s+REG_SZ\s+(.+)/);
          if (match) {
            currentConfig = match[1].trim();
          }
        } catch {
          // Registry key not found
        }
      }

      return {
        serviceInstalled: !stdout.includes('does not exist'),
        serviceRunning: isRunning,
        processRunning,
        status: isRunning ? 'running' : processRunning ? 'standalone' : 'stopped',
        currentConfig: currentConfig || undefined
      };
    } catch (error) {
      return {
        serviceInstalled: false,
        serviceRunning: false,
        processRunning: false,
        status: 'stopped',
        currentConfig: undefined
      };
    }
  }

  async start(configName: string) {
    try {
      const status = await this.getStatus();
      
      if (status.serviceRunning) {
        return { success: false, message: 'Service already running' };
      }

      if (status.processRunning) {
        await this.stop();
      }

      const binPath = path.join(process.resourcesPath, 'zapret', 'bin');
      const winwsPath = path.join(binPath, 'winws.exe');
      
      const args = this.buildArgs(configName);
      
      this.winwsProcess = spawn(winwsPath, args, {
        detached: true,
        stdio: 'ignore',
        cwd: binPath
      });

      this.winwsProcess.unref();
      this.currentConfig = configName;

      return { success: true, message: 'Service started' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async stop() {
    try {
      await execAsync('taskkill /IM winws.exe /F');
      
      if (this.winwsProcess) {
        this.winwsProcess.kill();
        this.winwsProcess = null;
      }

      this.currentConfig = null;

      return { success: true, message: 'Service stopped' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async install(configName: string) {
    try {
      const binPath = path.join(process.resourcesPath, 'zapret', 'bin', 'winws.exe');
      const args = this.buildArgs(configName).join(' ');
      
      await execAsync(`sc create zapret binPath= "\\"${binPath}\\" ${args}" DisplayName= "Ooze DPI Bypass" start= auto`);
      await execAsync('sc description zapret "Ooze - Advanced DPI circumvention tool"');
      await execAsync(`reg add "HKLM\\System\\CurrentControlSet\\Services\\zapret" /v zapret-discord-youtube /t REG_SZ /d "${configName}" /f`);
      await execAsync('sc start zapret');

      this.currentConfig = configName;

      return { success: true, message: 'Service installed' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async uninstall() {
    try {
      await execAsync('net stop zapret');
      await execAsync('sc delete zapret');
      await this.stop();

      this.currentConfig = null;

      return { success: true, message: 'Service uninstalled' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async runDiagnostics() {
    const results = [];

    // Base Filtering Engine
    try {
      const { stdout } = await execAsync('sc query BFE');
      results.push({
        name: 'Base Filtering Engine',
        status: stdout.includes('RUNNING') ? 'ok' : 'error',
        message: stdout.includes('RUNNING') ? 'Запущен' : 'Не запущен'
      });
    } catch {
      results.push({ name: 'Base Filtering Engine', status: 'error', message: 'Не найден' });
    }

    // TCP Timestamps
    try {
      const { stdout } = await execAsync('netsh interface tcp show global');
      const enabled = stdout.toLowerCase().includes('timestamps') && stdout.toLowerCase().includes('enabled');
      results.push({
        name: 'TCP Timestamps',
        status: enabled ? 'ok' : 'warning',
        message: enabled ? 'Включены' : 'Отключены'
      });
    } catch {
      results.push({ name: 'TCP Timestamps', status: 'error', message: 'Проверка не удалась' });
    }

    // Conflicting services
    const conflicts = ['GoodbyeDPI', 'AdguardSvc', 'Killer'];
    for (const service of conflicts) {
      try {
        const { stdout } = await execAsync(`tasklist /FI "IMAGENAME eq ${service}.exe"`);
        if (stdout.includes(service)) {
          results.push({
            name: `Конфликт ${service}`,
            status: 'error',
            message: 'Обнаружен конфликтующий сервис'
          });
        }
      } catch {
        // Service not found - good
      }
    }

    return results;
  }

  async runFullTest() {
    try {
      const testScriptPath = path.join(process.resourcesPath, 'zapret', 'utils', 'test zapret.ps1');
      
      // Run PowerShell script in a new window
      spawn('powershell.exe', [
        '-NoProfile',
        '-ExecutionPolicy', 'Bypass',
        '-File', `"${testScriptPath}"`
      ], {
        detached: true,
        stdio: 'ignore',
        shell: true
      }).unref();

      return { success: true, message: 'Test started' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  private buildArgs(configName: string): string[] {
    const configManager = new ConfigManager();
    const config = configManager.getConfig(configName);
    
    if (!config) {
      throw new Error(`Configuration ${configName} not found`);
    }

    const builder = new ConfigBuilder(process.resourcesPath, this.isGameFilterEnabled());
    return builder.buildArgs(config.rules);
  }

  private isGameFilterEnabled(): boolean {
    try {
      const fs = require('fs');
      const flagPath = path.join(process.resourcesPath, 'zapret', 'utils', 'game_filter.enabled');
      return fs.existsSync(flagPath);
    } catch {
      return false;
    }
  }
}
