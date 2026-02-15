import React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';
import { Subtract20Regular, Square20Regular, Dismiss20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  titleBar: {
    height: '40px',
    backgroundColor: '#0f0f0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    WebkitAppRegion: 'drag' as any,
    borderBottom: '1px solid #2a2a2a'
  },
  title: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  logo: {
    width: '20px',
    height: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '4px'
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
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#2a2a2a'
    }
  },
  closeButton: {
    '&:hover': {
      backgroundColor: '#e81123',
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
