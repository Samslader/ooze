import React from 'react';
import { makeStyles, Card, Text, Badge } from '@fluentui/react-components';
import { CheckmarkCircle24Regular, DismissCircle24Regular, Warning24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    padding: '32px',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
    backdropFilter: 'blur(30px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 48px 0 rgba(102, 126, 234, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
      animation: 'shimmer 3s infinite'
    }
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    zIndex: 1
  },
  icon: {
    fontSize: '56px',
    color: '#ffffff',
    filter: 'drop-shadow(0 4px 20px rgba(102, 126, 234, 0.8))',
    animation: 'pulse 2s ease-in-out infinite'
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff',
    textShadow: '0 2px 20px rgba(102, 126, 234, 0.5)',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '400'
  },
  badge: {
    alignSelf: 'flex-start',
    padding: '8px 16px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    fontWeight: '600',
    fontSize: '13px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    animation: 'pulse 2s ease-in-out infinite'
  },
  configBadge: {
    padding: '6px 14px',
    borderRadius: '10px',
    background: 'rgba(167, 139, 250, 0.3)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(167, 139, 250, 0.5)',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '600',
    boxShadow: '0 0 20px rgba(167, 139, 250, 0.4)',
    animation: 'pulse 2s ease-in-out infinite',
    textShadow: '0 2px 10px rgba(167, 139, 250, 0.8)'
  }
});

interface StatusCardProps {
  status: any;
}

const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
  const styles = useStyles();

  if (!status) {
    return (
      <Card className={styles.card}>
        <div className={styles.content}>
          <Warning24Regular className={styles.icon} />
          <div className={styles.info}>
            <Text className={styles.title}>Загрузка...</Text>
          </div>
        </div>
      </Card>
    );
  }

  const getStatusInfo = () => {
    if (status.status === 'running') {
      return {
        icon: <CheckmarkCircle24Regular className={styles.icon} />,
        title: 'Сервис запущен',
        subtitle: 'DPI обход активен и защищает ваше соединение',
        badge: { color: 'success' as const, text: 'Активен' },
        config: status.currentConfig
      };
    } else if (status.status === 'standalone') {
      return {
        icon: <CheckmarkCircle24Regular className={styles.icon} />,
        title: 'Запущен (Standalone)',
        subtitle: 'Процесс работает без установки сервиса',
        badge: { color: 'warning' as const, text: 'Standalone' },
        config: status.currentConfig
      };
    } else {
      return {
        icon: <DismissCircle24Regular className={styles.icon} />,
        title: 'Сервис остановлен',
        subtitle: 'Нажмите Запустить для начала обхода DPI',
        badge: { color: 'danger' as const, text: 'Неактивен' },
        config: null
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className={styles.card}>
      <div className={styles.content}>
        {statusInfo.icon}
        <div className={styles.info}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Text className={styles.title}>{statusInfo.title}</Text>
            {statusInfo.config && (
              <div className={styles.configBadge}>
                {statusInfo.config}
              </div>
            )}
          </div>
          <Text className={styles.subtitle}>{statusInfo.subtitle}</Text>
        </div>
        <Badge 
          appearance="filled" 
          color={statusInfo.badge.color}
          className={styles.badge}
        >
          {statusInfo.badge.text}
        </Badge>
      </div>
    </Card>
  );
};

export default StatusCard;
