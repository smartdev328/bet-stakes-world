import React from 'react';
import styles from './BankRollManagement.module.css';
import { MoneyPocketIcon } from './SvgIcons';

function BankRollManagement() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <MoneyPocketIcon className={styles.sidebarBlockTitleIcon} />
        <span>Bankroll Management System</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <p>
          A unit represents a percentage of your bankroll and should generally represent between 1
          to 5 percent of your bankroll. Setting a unit percentage for your bankroll is completely
          at the users discretion. The higher the unit percentage, the more aggressive your
          bankroll. For example, for a $5,000 starting bankroll, a 1 unit wager would represent
          $100, i.e. 2% of your bankroll.
        </p>

        <div className={styles.footer_desc}>
          TheDailyStakes recommends setting 1 unit as 2% of your bankroll.
        </div>
      </div>
    </div>
  );
}

export default BankRollManagement;
