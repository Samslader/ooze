import React from 'react';
import { makeStyles, Card, Button, Text } from '@fluentui/react-components';
import { Play24Regular, Stop24Regular, CloudAdd24Regular, CloudDismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.08)',
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px 0 rgba(102, 126, 234, 0.4)'
    }
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '16px',
    textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  button: {
    height: '52px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden'
  },
  startButton: {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.5)',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 1) 0%, rgba(118, 75, 162, 1) 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.7)'
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  },
  stopButton: {
    background: 'rgba(239, 68, 68, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ffffff',
    '&:hover': {
      background: 'rgba(239, 68, 68, 0.4)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(239, 68, 68, 0.5)'
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  },
  installButton: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(167, 139, 250, 0.3)'
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  }
});

interface ActionButtonsProps {
  status: any;
  onStart: () => void;
  onStop: () => void;
  onInstall: () => void;
  onUninstall: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  status, 
  onStart, 
  onStop, 
  onInstall, 
  onUninstall 
}) => {
  const styles = useStyles();

  const isRunning = status?.status === 'running' || status?.status === 'standalone';

  return (
    <Card className={styles.card}>
      <Text className={styles.title}>Действия</Text>
      
      <div className={styles.buttonGrid}>
        <Button
          appearance="primary"
          icon={<Play24Regular />}
          onClick={onStart}
          disabled={isRunning}
          className={`${styles.button} ${styles.startButton}`}
        >
          Запустить
        </Button>

        <Button
          appearance="secondary"
          icon={<Stop24Regular />}
          onClick={onStop}
          disabled={!isRunning}
          className={`${styles.button} ${styles.stopButton}`}
        >
          Остановить
        </Button>

        <Button
          appearance="secondary"
          icon={<CloudAdd24Regular />}
          onClick={onInstall}
          disabled={status?.serviceInstalled}
          className={`${styles.button} ${styles.installButton}`}
        >
          Установить сервис
        </Button>

        <Button
          appearance="secondary"
          icon={<CloudDismiss24Regular />}
          onClick={onUninstall}
          disabled={!status?.serviceInstalled}
          className={`${styles.button} ${styles.installButton}`}
        >
          Удалить сервис
        </Button>
      </div>
    </Card>
  );
};

export default ActionButtons;
