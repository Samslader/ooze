import React, { useState, useEffect } from 'react';
import { makeStyles, Card, Text, Dropdown, Option } from '@fluentui/react-components';
import { Settings24Regular } from '@fluentui/react-icons';

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
    marginBottom: '16px'
  },
  icon: {
    fontSize: '24px',
    color: '#a78bfa',
    filter: 'drop-shadow(0 2px 10px rgba(167, 139, 250, 0.5))'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
  },
  description: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '16px'
  },
  dropdown: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    color: '#ffffff',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.12)',
      borderColor: 'rgba(167, 139, 250, 0.5)'
    }
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
    'general': 'Стандартная конфигурация для Discord и YouTube',
    'alt': 'Альтернативный метод с fake TLS разделением',
    'alt2': 'Улучшенное разделение с другими паттернами',
    'alt3': 'Продвинутый десинк с несколькими стратегиями',
    'fake-tls-auto': 'Автоматическое определение fake TLS',
    'simple-fake': 'Простая инъекция fake пакетов'
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <Settings24Regular className={styles.icon} />
        <Text className={styles.title}>Конфигурация</Text>
      </div>
      
      <Text className={styles.description}>
        Выберите стратегию обхода, которая лучше всего работает для вашего провайдера
      </Text>

      <Dropdown
        className={styles.dropdown}
        value={selectedConfig}
        onOptionSelect={(_, data) => onConfigChange(data.optionValue as string)}
        placeholder="Выберите конфигурацию"
      >
        <Option value="general">General (Рекомендуется)</Option>
        <Option value="alt">ALT - Fake TLS Split</Option>
        <Option value="alt2">ALT2 - Улучшенное разделение</Option>
        <Option value="alt3">ALT3 - Продвинутый десинк</Option>
        <Option value="alt4">ALT4 - Мульти стратегия</Option>
        <Option value="alt5">ALT5 - Агрессивный режим</Option>
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
