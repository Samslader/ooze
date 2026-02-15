import React, { useState, useEffect } from 'react';
import { makeStyles, Button, Text } from '@fluentui/react-components';
import { ArrowDownload24Regular, Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  notification: {
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    borderBottom: '1px solid #2a2a2a'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  },
  icon: {
    fontSize: '24px',
    color: '#ffffff'
  },
  text: {
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: '500'
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
    }
  },
  dismissButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    minWidth: '32px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  }
});

const UpdateNotification: React.FC = () => {
  const styles = useStyles();
  const [visible, setVisible] = useState(true);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    window.electron.app.onUpdateDownloaded(() => {
      setDownloaded(true);
    });
  }, []);

  const handleInstall = () => {
    window.electron.app.installUpdate();
  };

  if (!visible) return null;

  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <ArrowDownload24Regular className={styles.icon} />
        <Text className={styles.text}>
          {downloaded 
            ? 'Update downloaded and ready to install' 
            : 'New version available! Downloading...'}
        </Text>
      </div>
      
      <div className={styles.actions}>
        {downloaded && (
          <Button
            appearance="primary"
            onClick={handleInstall}
            className={styles.button}
          >
            Install & Restart
          </Button>
        )}
        
        <Button
          appearance="subtle"
          icon={<Dismiss24Regular />}
          onClick={() => setVisible(false)}
          className={styles.dismissButton}
        />
      </div>
    </div>
  );
};

export default UpdateNotification;
