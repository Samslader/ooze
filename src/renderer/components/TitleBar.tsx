import React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';
import { Subtract20Regular, Square20Regular, Dismiss20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  titleBar: {
    height: '40px',
    background: 'rgba(15, 12, 41, 0.8)',
    backdropFilter: 'blur(20px) saturate(180%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    WebkitAppRegion: 'drag' as any,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
  },
  title: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textShadow: '0 2px 10px rgba(102, 126, 234, 0.5)'
  },
  logo: {
    width: '20px',
    height: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '4px',
    boxShadow: '0 0 20px rgba(102, 126, 234, 0.6)'
  },
  controls: {
    display: 'flex',
    gap: '4px',
    WebkitAppRegion: 'no-drag' as any
  },
  controlButton: {
    minWidth: '40px',
    height: '32px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)'
    }
  },
  closeButton: {
    '&:hover': {
      backgroundColor: 'rgba(232, 17, 35, 0.8)',
      color: '#ffffff'
    }
  }
});

const TitleBar: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.titleBar}>
      <div className={styles.title}>
        <div className={styles.logo} />
        Ooze
      </div>
      
      <div className={styles.controls}>
        <Button
          appearance="subtle"
          icon={<Subtract20Regular />}
          onClick={() => window.electron.app.minimize()}
          className={styles.controlButton}
        />
        <Button
          appearance="subtle"
          icon={<Square20Regular />}
          onClick={() => window.electron.app.maximize()}
          className={styles.controlButton}
        />
        <Button
          appearance="subtle"
          icon={<Dismiss20Regular />}
          onClick={() => window.electron.app.close()}
          className={`${styles.controlButton} ${styles.closeButton}`}
        />
      </div>
    </div>
  );
};

export default TitleBar;
