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
    color: '#f472b6',
    filter: 'drop-shadow(0 2px 10px rgba(244, 114, 182, 0.5))'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
  },
  button: {
    borderRadius: '10px',
    background: 'rgba(244, 114, 182, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(244, 114, 182, 0.3)',
    color: '#ffffff',
    fontWeight: '600',
    transition: 'all 0.3s',
    '&:hover': {
      background: 'rgba(244, 114, 182, 0.4)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(244, 114, 182, 0.5)'
    }
  },
  testButton: {
    borderRadius: '10px',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    fontWeight: '600',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.5)',
    transition: 'all 0.3s',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 1) 0%, rgba(118, 75, 162, 1) 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.7)'
    }
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
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.3s',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.06)',
      borderColor: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateX(4px)'
    }
  },
  resultIcon: {
    fontSize: '20px',
    filter: 'drop-shadow(0 2px 8px currentColor)'
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
    color: 'rgba(255, 255, 255, 0.7)'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    color: '#a78bfa'
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

  const runFullTest = async () => {
    setLoading(true);
    setResults([]);
    
    try {
      await window.electron.diagnostics.runFullTest();
      setResults([{
        name: 'Полный тест',
        status: 'ok',
        message: 'Тест запущен в отдельном окне PowerShell. Результаты будут сохранены в zapret/utils/test results/'
      }]);
    } catch (error) {
      console.error('Full test failed:', error);
      setResults([{
        name: 'Полный тест',
        status: 'error',
        message: 'Не удалось запустить тест'
      }]);
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
          <Text className={styles.title}>Системная диагностика</Text>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            appearance="secondary"
            onClick={runDiagnostics}
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Проверка...' : 'Быстрая проверка'}
          </Button>
          
          <Button
            appearance="primary"
            onClick={runFullTest}
            disabled={loading}
            className={styles.testButton}
          >
            Полный тест конфигов
          </Button>
        </div>
      </div>

      {loading && (
        <div className={styles.loading}>
          <Spinner size="medium" label="Проверка системы..." />
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
