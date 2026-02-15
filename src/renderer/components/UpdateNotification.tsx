import React, { useState, useEffect } from 'react';
import { makeStyles, Button, Text } from '@fluentui/react-components';
import { ArrowDownload24Regular, Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  notification: {
    padding: '16px 24px',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
    backdropFilter: 'blur(20px) saturate(180%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  },
  icon: {
    fontSize: '24px',
    color: '#ffffff',
    filter: 'drop-shadow(0 2px 10px rgba(102, 126, 234, 0.8))',
    animation: 'bounce 2s ease-in-out infinite'
  },
  text: {
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: '500',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  button: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: '#ffffff',
    fontWeight: '600',
    borderRadius: '8px',
    transition: 'all 0.3s',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)'
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
            ? 'Обновление загружено и готово к установке' 
            : 'Доступна новая версия! Загрузка...'}
        </Text>
      </div>
      
      <div className={styles.actions}>
        {downloaded && (
          <Button
            appearance="primary"
            onClick={handleInstall}
            className={styles.button}
          >
            Установить и перезапустить
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
