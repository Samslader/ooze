import React, { useState, useEffect } from 'react';
import { makeStyles, Card, Text, Switch, Button } from '@fluentui/react-components';
import { Settings24Regular, Games24Regular, Database24Regular } from '@fluentui/react-icons';

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
    gap: '12px',
    marginBottom: '20px'
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
  settingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  settingItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    border: '1px solid #2a2a2a'
  },
  settingInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  },
  settingIcon: {
    fontSize: '20px',
    color: '#667eea'
  },
  settingText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  settingName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff'
  },
  settingDescription: {
    fontSize: '12px',
    color: '#999'
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
      case 'any': return 'Any (All IPs)';
      case 'loaded': return 'Loaded (From list)';
      case 'none': return 'None (Disabled)';
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <Settings24Regular className={styles.icon} />
        <Text className={styles.title}>Settings</Text>
      </div>

      <div className={styles.settingsList}>
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <Games24Regular className={styles.settingIcon} />
            <div className={styles.settingText}>
              <Text className={styles.settingName}>Game Filter</Text>
              <Text className={styles.settingDescription}>
                Enable extended port range (1024-65535) for gaming
              </Text>
            </div>
          </div>
          <Switch checked={gameFilter} onChange={handleGameFilterToggle} />
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <Database24Regular className={styles.settingIcon} />
            <div className={styles.settingText}>
              <Text className={styles.settingName}>IPSet Mode</Text>
              <Text className={styles.settingDescription}>
                Current: {getIpsetLabel()}
              </Text>
            </div>
          </div>
          <Button appearance="secondary" onClick={handleIpsetToggle}>
            Switch
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SettingsPanel;
