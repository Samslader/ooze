export interface ServiceStatus {
  serviceInstalled: boolean;
  serviceRunning: boolean;
  processRunning: boolean;
  status: 'running' | 'standalone' | 'stopped';
  currentConfig?: string;
}

export interface ServiceResult {
  success: boolean;
  message: string;
}

export interface DiagnosticResult {
  name: string;
  status: 'ok' | 'warning' | 'error';
  message: string;
}

declare global {
  interface Window {
    electron: {
      service: {
        getStatus: () => Promise<ServiceStatus>;
        start: (config: string) => Promise<ServiceResult>;
        stop: () => Promise<ServiceResult>;
        install: (config: string) => Promise<ServiceResult>;
        uninstall: () => Promise<ServiceResult>;
      };
      config: {
        list: () => Promise<any[]>;
        get: (name: string) => Promise<any>;
      };
      diagnostics: {
        run: () => Promise<DiagnosticResult[]>;
      };
      app: {
        minimize: () => Promise<void>;
        maximize: () => Promise<void>;
        close: () => Promise<void>;
        installUpdate: () => Promise<void>;
        onUpdateAvailable: (callback: () => void) => void;
        onUpdateDownloaded: (callback: () => void) => void;
      };
    };
  }
}
