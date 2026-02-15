import React, { useState, useEffect } from 'react';
import { makeStyles, Card, Text, Switch, Button } from '@fluentui/react-components';
import { Settings24Regular, Games24Regular, Database24Regular } from '@fluentui/react-icons';

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
    gap: '12px',
    marginBottom: '20px'
  },
  icon: {
    fontSize: '24px',
    color: '#60a5fa',
    filter: 'drop-shadow(0 2px 10px rgba(96, 165, 250, 0.5))'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
  },
  settingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  settingItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.3s',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.06)',
      borderColor: 'rgba(96, 165, 250, 0.3)',
      transform: 'translateX(4px)'
    }
  },
  settingInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
    minWidth: 0
  },
  settingIcon: {
    fontSize: '18px',
    color: '#60a5fa',
    filter: 'drop-shadow(0 2px 8px rgba(96, 165, 250, 0.5))',
    flexShrink: 0
  },
  settingText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: 0,
    flex: 1
  },
  settingName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  settingDescription: {
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.7)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

const SettingsPanel: React.FC = () => {
  const styles = useStyles();
  const [gameFilter, setGameFilter] = useState(false);
  const [ipsetMode, setIpsetMode] = useState<'any' | 'loaded' | 'none'>('any');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    // TODO: Load from backend
  };

  const handleGameFilterToggle = async () => {
    setGameFilter(!gameFilter);
    // TODO: Save to backend
  };

  const handleIpsetToggle = async () => {
    const modes: Array<'any' | 'loaded' | 'none'> = ['any', 'loaded', 'none'];
    const currentIndex = modes.indexOf(ipsetMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setIpsetMode(nextMode);
    // TODO: Save to backend
  };

  const getIpsetLabel = () => {
    switch (ipsetMode) {
      case 'any': return 'Любой (Все IP)';
      case 'loaded': return 'Загружен (Из списка)';
      case 'none': return 'Нет (Отключен)';
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <Settings24Regular className={styles.icon} />
        <Text className={styles.title}>Настройки</Text>
      </div>

      <div className={styles.settingsList}>
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <Games24Regular className={styles.settingIcon} />
            <div className={styles.settingText}>
              <Text className={styles.settingName}>Игровой фильтр</Text>
              <Text className={styles.settingDescription}>
                Порты 1024-65535 для игр
              </Text>
            </div>
          </div>
          <Switch checked={gameFilter} onChange={handleGameFilterToggle} />
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <Database24Regular className={styles.settingIcon} />
            <div className={styles.settingText}>
              <Text className={styles.settingName}>Режим IPSet</Text>
              <Text className={styles.settingDescription}>
                {getIpsetLabel()}
              </Text>
            </div>
          </div>
          <Button 
            appearance="secondary" 
            onClick={handleIpsetToggle}
            style={{ 
              minWidth: '100px',
              background: 'rgba(96, 165, 250, 0.2)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              color: '#ffffff',
              borderRadius: '8px'
            }}
          >
            Переключить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SettingsPanel;
