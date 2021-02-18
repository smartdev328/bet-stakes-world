import { Col, Row } from 'antd';
import React from 'react';
import styles from './WhereBuyGear.module.css';
import { MoneyPocketIcon } from './SvgIcons';

function WhereBuyGear() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <MoneyPocketIcon className={styles.sidebarBlockTitleIcon} />
        <span>Where to watch the game?</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <Row>
          <Col span={12} className={styles.company_logo}>
            <a href="http://www.tdsdevelopment.info/">
              <img src="/images/dailystakes-company.png" alt="DailyStakes Company" width={94} />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WhereBuyGear;
