import React, { useState } from 'react';
import { makeStyles, Card, Button, Text, Spinner } from '@fluentui/react-components';
import { 
  Stethoscope24Regular, 
  CheckmarkCircle20Regular, 
  ErrorCircle20Regular, 
  Warning20Regular 
} from '@fluentui/react-icons';

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
  button: {
    borderRadius: '8px'
  },
  results: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '16px'
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    border: '1px solid #2a2a2a'
  },
  resultIcon: {
    fontSize: '20px'
  },
  resultText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  resultName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff'
  },
  resultMessage: {
    fontSize: '12px',
    color: '#999'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px'
  }
});

const DiagnosticsPanel: React.FC = () => {
  const styles = useStyles();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const runDiagnostics = async () => {
    setLoading(true);
    setResults([]);
    
    try {
      const diagnostics = await window.electron.diagnostics.run();
      setResults(diagnostics);
    } catch (error) {
      console.error('Diagnostics failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckmarkCircle20Regular style={{ color: '#10b981' }} className={styles.resultIcon} />;
      case 'warning':
        return <Warning20Regular style={{ color: '#f59e0b' }} className={styles.resultIcon} />;
      case 'error':
        return <ErrorCircle20Regular style={{ color: '#ef4444' }} className={styles.resultIcon} />;
      default:
        return null;
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Stethoscope24Regular className={styles.icon} />
          <Text className={styles.title}>System Diagnostics</Text>
        </div>
        
        <Button
          appearance="secondary"
          onClick={runDiagnostics}
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Running...' : 'Run Diagnostics'}
        </Button>
      </div>

      {loading && (
        <div className={styles.loading}>
          <Spinner size="medium" label="Checking system..." />
        </div>
      )}

      {results.length > 0 && (
        <div className={styles.results}>
          {results.map((result, index) => (
            <div key={index} className={styles.resultItem}>
              {getStatusIcon(result.status)}
              <div className={styles.resultText}>
                <Text className={styles.resultName}>{result.name}</Text>
                <Text className={styles.resultMessage}>{result.message}</Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default DiagnosticsPanel;
