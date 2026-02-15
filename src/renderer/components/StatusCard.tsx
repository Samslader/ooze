import React from 'react';
import { makeStyles, Card, Text, Badge } from '@fluentui/react-components';
import { CheckmarkCircle24Regular, DismissCircle24Regular, Warning24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    padding: '24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  icon: {
    fontSize: '48px',
    color: '#ffffff'
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#ffffff'
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  badge: {
    alignSelf: 'flex-start'
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
            <Text className={styles.title}>Loading...</Text>
          </div>
        </div>
      </Card>
    );
  }

  const getStatusInfo = () => {
    const configText = status.currentConfig ? ` (${status.currentConfig})` : '';
    
    if (status.status === 'running') {
      return {
        icon: <CheckmarkCircle24Regular className={styles.icon} />,
        title: `Service Running${configText}`,
        subtitle: 'DPI bypass is active and protecting your connection',
        badge: { color: 'success' as const, text: 'Active' }
      };
    } else if (status.status === 'standalone') {
      return {
        icon: <CheckmarkCircle24Regular className={styles.icon} />,
        title: `Running (Standalone)${configText}`,
        subtitle: 'Process is running without service installation',
        badge: { color: 'warning' as const, text: 'Standalone' }
      };
    } else {
      return {
        icon: <DismissCircle24Regular className={styles.icon} />,
        title: 'Service Stopped',
        subtitle: 'Click Start to begin DPI bypass',
        badge: { color: 'danger' as const, text: 'Inactive' }
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className={styles.card}>
      <div className={styles.content}>
        {statusInfo.icon}
        <div className={styles.info}>
          <Text className={styles.title}>{statusInfo.title}</Text>
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
