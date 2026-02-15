import React, { useState, useEffect } from 'react';
import { makeStyles } from '@fluentui/react-components';
import TitleBar from './components/TitleBar';
import StatusCard from './components/StatusCard';
import ConfigSelector from './components/ConfigSelector';
import ActionButtons from './components/ActionButtons';
import DiagnosticsPanel from './components/DiagnosticsPanel';
import UpdateNotification from './components/UpdateNotification';
import SettingsPanel from './components/SettingsPanel';

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'relative'
  },
  content: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr'
    }
  }
});

const App: React.FC = () => {
  const styles = useStyles();
  const [status, setStatus] = useState<any>(null);
  const [selectedConfig, setSelectedConfig] = useState('general');
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    loadStatus();
    
    window.electron.app.onUpdateAvailable(() => {
      setUpdateAvailable(true);
    });

    const interval = setInterval(loadStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadStatus = async () => {
    const result = await window.electron.service.getStatus();
    setStatus(result);
  };

  const handleStart = async () => {
    await window.electron.service.start(selectedConfig);
    await loadStatus();
  };

  const handleStop = async () => {
    await window.electron.service.stop();
    await loadStatus();
  };

  const handleInstall = async () => {
    await window.electron.service.install(selectedConfig);
    await loadStatus();
  };

  const handleUninstall = async () => {
    await window.electron.service.uninstall();
    await loadStatus();
  };

  return (
    <div className={styles.app}>
      <TitleBar />
      
      {updateAvailable && <UpdateNotification />}
      
      <div className={styles.content}>
        <StatusCard status={status} />
        
        <div className={styles.mainGrid}>
          <ConfigSelector 
            selectedConfig={selectedConfig}
            onConfigChange={setSelectedConfig}
          />
          
          <ActionButtons
            status={status}
            onStart={handleStart}
            onStop={handleStop}
            onInstall={handleInstall}
            onUninstall={handleUninstall}
          />
        </div>

        <SettingsPanel />
        <DiagnosticsPanel />
      </div>
    </div>
  );
};

export default App;
