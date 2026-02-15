import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { ServiceManager } from './services/ServiceManager';
import { ConfigManager } from './services/ConfigManager';

let mainWindow: BrowserWindow | null = null;
const serviceManager = new ServiceManager();
const configManager = new ConfigManager();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    backgroundColor: '#1a1a1a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  checkForUpdates();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Auto-updater
function checkForUpdates() {
  autoUpdater.checkForUpdatesAndNotify();
  
  autoUpdater.on('update-available', () => {
    mainWindow?.webContents.send('update-available');
  });

  autoUpdater.on('update-downloaded', () => {
    mainWindow?.webContents.send('update-downloaded');
  });
}

// IPC Handlers
ipcMain.handle('service:status', async () => {
  return await serviceManager.getStatus();
});

ipcMain.handle('service:start', async (_, config: string) => {
  return await serviceManager.start(config);
});

ipcMain.handle('service:stop', async () => {
  return await serviceManager.stop();
});

ipcMain.handle('service:install', async (_, config: string) => {
  return await serviceManager.install(config);
});

ipcMain.handle('service:uninstall', async () => {
  return await serviceManager.uninstall();
});

ipcMain.handle('config:list', async () => {
  return configManager.getConfigs();
});

ipcMain.handle('config:get', async (_, name: string) => {
  return configManager.getConfig(name);
});

ipcMain.handle('diagnostics:run', async () => {
  return await serviceManager.runDiagnostics();
});

ipcMain.handle('diagnostics:runFullTest', async () => {
  return await serviceManager.runFullTest();
});

ipcMain.handle('app:minimize', () => {
  mainWindow?.minimize();
});

ipcMain.handle('app:maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.handle('app:close', () => {
  mainWindow?.close();
});

ipcMain.handle('app:install-update', () => {
  autoUpdater.quitAndInstall();
});
