import React from 'react';
import styles from './CommonSportsBook.module.css';
import { OpenBookIcon } from './SvgIcons';

function FantasyLineupIncludes() {
  return (
    <div className={`${styles.sidebarBlock} ${styles.fantasyLineupIncludes}`}>
      <div className={styles.sidebarBlockTitle}>
        <OpenBookIcon className={styles.sidebarBlockTitleIcon} />
        <span>Daily Fantasy Lineup Includes:</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <p>NBA Single Slate for NOP vs LAL</p>
        <p>NBA MAIN slate at 7:00 pm EST</p>
      </div>
    </div>
  );
}

export default FantasyLineupIncludes;
