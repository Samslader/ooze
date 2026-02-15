import React, { useState, useEffect } from 'react';
import { makeStyles, Card, Text, Dropdown, Option } from '@fluentui/react-components';
import { Settings24Regular } from '@fluentui/react-icons';

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
    marginBottom: '16px'
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
  description: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '16px'
  },
  dropdown: {
    width: '100%'
  }
});

interface ConfigSelectorProps {
  selectedConfig: string;
  onConfigChange: (config: string) => void;
}

const ConfigSelector: React.FC<ConfigSelectorProps> = ({ selectedConfig, onConfigChange }) => {
  const styles = useStyles();
  const [configs, setConfigs] = useState<any[]>([]);

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    const result = await window.electron.config.list();
    setConfigs(result);
  };

  const configDescriptions: Record<string, string> = {
    'general': 'Standard configuration for Discord and YouTube',
    'alt': 'Alternative method with fake TLS splitting',
    'alt2': 'Enhanced splitting with different patterns',
    'alt3': 'Advanced desync with multiple strategies',
    'fake-tls-auto': 'Automatic fake TLS detection',
    'simple-fake': 'Simple fake packet injection'
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <Settings24Regular className={styles.icon} />
        <Text className={styles.title}>Configuration</Text>
      </div>
      
      <Text className={styles.description}>
        Select a bypass strategy that works best for your ISP
      </Text>

      <Dropdown
        className={styles.dropdown}
        value={selectedConfig}
        onOptionSelect={(_, data) => onConfigChange(data.optionValue as string)}
        placeholder="Select configuration"
      >
        <Option value="general">General (Recommended)</Option>
        <Option value="alt">ALT - Fake TLS Split</Option>
        <Option value="alt2">ALT2 - Enhanced Split</Option>
        <Option value="alt3">ALT3 - Advanced Desync</Option>
        <Option value="alt4">ALT4 - Multi Strategy</Option>
        <Option value="alt5">ALT5 - Aggressive Mode</Option>
        <Option value="alt6">ALT6 - Split Position 1</Option>
        <Option value="alt7">ALT7 - SNI Extension Split</Option>
        <Option value="alt8">ALT8</Option>
        <Option value="alt9">ALT9</Option>
        <Option value="alt10">ALT10</Option>
        <Option value="alt11">ALT11</Option>
        <Option value="fake-tls-auto">Fake TLS Auto</Option>
        <Option value="fake-tls-auto-alt">Fake TLS Auto ALT</Option>
        <Option value="simple-fake">Simple Fake</Option>
        <Option value="simple-fake-alt">Simple Fake ALT</Option>
        <Option value="simple-fake-alt2">Simple Fake ALT2</Option>
      </Dropdown>

      {configDescriptions[selectedConfig] && (
        <Text style={{ marginTop: '12px', fontSize: '12px', color: '#888' }}>
          {configDescriptions[selectedConfig]}
        </Text>
      )}
    </Card>
  );
};

export default ConfigSelector;
