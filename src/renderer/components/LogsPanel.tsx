import React, { useState, useEffect } from 'react';
import { makeStyles, Card, Text, Button } from '@fluentui/react-components';
import { Document24Regular, Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    padding: '24px',
    backgroundColor: '#242424',
    border: '1px solid #2a2a2a',
    borderRadius: '12px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  icon: {
    fontSize: '24px',
    color: '#667eea'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff'
  },
  logsContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    padding: '16px',
    maxHeight: '300px',
    overflowY: 'auto',
    fontFamily: 'Consolas, monospace',
    fontSize: '12px',
    color: '#999',
    border: '1px solid #2a2a2a'
  },
  logLine: {
    marginBottom: '4px',
    '&:last-child': {
      marginBottom: 0
    }
  },
  emptyState: {
    textAlign: 'center',
    padding: '32px',
    color: '#666'
  }
});

const LogsPanel: React.FC = () => {
  const styles = useStyles();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // TODO: Subscribe to logs from backend
    const mockLogs = [
      '[INFO] Service initialized',
      '[INFO] Loading configuration: general',
      '[INFO] Starting winws.exe process',
      '[SUCCESS] Service started successfully'
    ];
    setLogs(mockLogs);
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Document24Regular className={styles.icon} />
          <Text className={styles.title}>Logs</Text>
        </div>
        
        <Button
          appearance="subtle"
          icon={<Dismiss24Regular />}
          onClick={clearLogs}
        >
          Clear
        </Button>
      </div>

      <div className={styles.logsContainer}>
        {logs.length === 0 ? (
          <div className={styles.emptyState}>No logs yet</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={styles.logLine}>
              {log}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default LogsPanel;
