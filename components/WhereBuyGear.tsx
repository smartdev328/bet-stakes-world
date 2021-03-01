import { Col, Row } from 'antd';
import React from 'react';
import styles from './WhereBuyGear.module.css';
import { MoneyPocketIcon } from './SvgIcons';

function WhereBuyGear() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <MoneyPocketIcon className={styles.sidebarBlockTitleIcon} />
        <span>Where to buy your merch</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <Row>
          <Col span={12} className={styles.company_logo}>
            <a href="http://www.tdsdevelopment.info/">
              <img src="/images/dailystakes-company.png" alt="DailyStakes Company" width={94} />
            </a>
          </Col>

          <Col span={12} className={styles.company_logo}>
            <img
              src="/images/fanatics-company.png"
              alt="DailyStakes Company"
              width={94}
              // width={240}
              // height={180}
            />
          </Col>

          <Col span={12} className={styles.company_logo}>
            <img
              src="/images/fansedge-company.png"
              alt="DailyStakes Company"
              width={240}
              height={60}
            />
          </Col>

          <Col span={12} className={styles.company_logo}>
            <img
              src="/images/sports-company.png"
              alt="DailyStakes Company"
              width={260}
              height={180}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WhereBuyGear;
