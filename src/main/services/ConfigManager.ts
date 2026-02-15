import fs from 'fs';
import path from 'path';

export interface ZapretConfig {
  name: string;
  displayName: string;
  description: string;
  rules: ConfigRule[];
}

export interface ConfigRule {
  filterTcp?: string;
  filterUdp?: string;
  filterL7?: string;
  hostlist?: string;
  hostlistDomains?: string;
  hostlistExclude?: string;
  ipset?: string;
  ipsetExclude?: string;
  dpiDesync?: string;
  dpiDesyncRepeats?: number;
  dpiDesyncFakeTls?: string;
  dpiDesyncFakeQuic?: string;
  dpiDesyncSplitPos?: number;
  dpiDesyncSplitSeqovl?: number;
  dpiDesyncSplitSeqovlPattern?: string;
  dpiDesyncFooling?: string;
  dpiDesyncAutottl?: number;
  dpiDesyncAnyProtocol?: number;
  dpiDesyncCutoff?: string;
  ipId?: string;
}

export class ConfigManager {
  private configsPath: string;

  constructor() {
    this.configsPath = path.join(process.resourcesPath, 'configs');
  }

  getConfigs(): ZapretConfig[] {
    try {
      const files = fs.readdirSync(this.configsPath);
      return files
        .filter(f => f.endsWith('.json'))
        .map(f => {
          const content = fs.readFileSync(path.join(this.configsPath, f), 'utf-8');
          return JSON.parse(content);
        });
    } catch (error) {
      return this.getDefaultConfigs();
    }
  }

  getConfig(name: string): ZapretConfig | null {
    try {
      const filePath = path.join(this.configsPath, `${name}.json`);
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  private getDefaultConfigs(): ZapretConfig[] {
    return [
      {
        name: 'general',
        displayName: 'General',
        description: 'Standard configuration for Discord and YouTube',
        rules: []
      }
    ];
  }
}
