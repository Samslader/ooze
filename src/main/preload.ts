import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  service: {
    getStatus: () => ipcRenderer.invoke('service:status'),
    start: (config: string) => ipcRenderer.invoke('service:start', config),
    stop: () => ipcRenderer.invoke('service:stop'),
    install: (config: string) => ipcRenderer.invoke('service:install', config),
    uninstall: () => ipcRenderer.invoke('service:uninstall')
  },
  config: {
    list: () => ipcRenderer.invoke('config:list'),
    get: (name: string) => ipcRenderer.invoke('config:get', name)
  },
  diagnostics: {
    run: () => ipcRenderer.invoke('diagnostics:run')
  },
  app: {
    minimize: () => ipcRenderer.invoke('app:minimize'),
    maximize: () => ipcRenderer.invoke('app:maximize'),
    close: () => ipcRenderer.invoke('app:close'),
    installUpdate: () => ipcRenderer.invoke('app:install-update'),
    onUpdateAvailable: (callback: () => void) => {
      ipcRenderer.on('update-available', callback);
    },
    onUpdateDownloaded: (callback: () => void) => {
      ipcRenderer.on('update-downloaded', callback);
    }
  }
});
