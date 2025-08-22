import React from 'react';
import styles from './EtherealLine.module.scss';

const EtherealLine: React.FC = () => {
  return (
    <svg className={styles.etherealLine} viewBox="0 0 100 100">
      <path d="M 0 50 Q 50 0 100 50" stroke="white" fill="transparent" />
    </svg>
  );
};

export default EtherealLine;
