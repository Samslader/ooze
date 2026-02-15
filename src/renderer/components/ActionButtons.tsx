import React from 'react';
import { makeStyles, Card, Button, Text } from '@fluentui/react-components';
import { Play24Regular, Stop24Regular, CloudAdd24Regular, CloudDismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    padding: '24px',
    backgroundColor: '#242424',
    border: '1px solid #2a2a2a',
    borderRadius: '12px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '16px'
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  button: {
    height: '48px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '8px'
  },
  startButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    color: '#ffffff',
    '&:hover': {
      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)'
    }
  },
  stopButton: {
    backgroundColor: '#3a3a3a',
    border: '1px solid #4a4a4a',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#4a4a4a'
    }
  },
  installButton: {
    backgroundColor: '#2a2a2a',
    border: '1px solid #3a3a3a',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#3a3a3a'
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
      <Text className={styles.title}>Actions</Text>
      
      <div className={styles.buttonGrid}>
        <Button
          appearance="primary"
          icon={<Play24Regular />}
          onClick={onStart}
          disabled={isRunning}
          className={`${styles.button} ${styles.startButton}`}
        >
          Start
        </Button>

        <Button
          appearance="secondary"
          icon={<Stop24Regular />}
          onClick={onStop}
          disabled={!isRunning}
          className={`${styles.button} ${styles.stopButton}`}
        >
          Stop
        </Button>

        <Button
          appearance="secondary"
          icon={<CloudAdd24Regular />}
          onClick={onInstall}
          disabled={status?.serviceInstalled}
          className={`${styles.button} ${styles.installButton}`}
        >
          Install Service
        </Button>

        <Button
          appearance="secondary"
          icon={<CloudDismiss24Regular />}
          onClick={onUninstall}
          disabled={!status?.serviceInstalled}
          className={`${styles.button} ${styles.installButton}`}
        >
          Uninstall Service
        </Button>
      </div>
    </Card>
  );
};

export default ActionButtons;
