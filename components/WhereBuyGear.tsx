import { Col, Row } from 'antd';
import React from 'react';
import styles from './WhereBuyGear.module.css';

function WhereBuyGear() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <img
          src={'/images/where-to-buy.svg'}
          height="32px"
          width="32px"
          style={{ paddingRight: '6px' }}
        />
        <span>Where to buy your merch</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <Row>
          <Col span={12} className={styles.company_logo}>
            <a href="http://www.tdsdevelopment.info/">
              <img
                src="/images/dailystakes-company.png"
                alt="DailyStakes Company"
                width={84}
                height={79}
                className={styles.image_style}
              />
            </a>
          </Col>

          <Col span={12} className={styles.company_logo}>
            <img
              src="/images/fanatics-company.png"
              alt="DailyStakes Company"
              width={200}
              height={60}
              className={styles.image_style}
            />
          </Col>

          <Col span={12} className={styles.company_logo}>
            <img
              src="/images/fansedge-company.png"
              alt="DailyStakes Company"
              width={200}
              height={100}
              className={styles.image_style}
            />
          </Col>

          <Col span={12} className={styles.company_logo}>
            <img
              src="/images/sports-company.png"
              alt="DailyStakes Company"
              width={170}
              height={60}
              style={{ paddingBottom: '8px' }}
              className={styles.image_style}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WhereBuyGear;
