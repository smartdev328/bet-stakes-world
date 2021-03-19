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
                className={styles.image_style}
              />
            </a>
          </Col>

          <Col span={12} className={styles.company_logo}>
            <a href="https://www.fanatics.com/">
              <img
                src="/images/fanatics-company.png"
                alt="Fanatics Company"
                className={styles.image_style}
              />
            </a>
          </Col>

          <Col span={12} className={styles.company_logo}>
            <a href="https://www.fansedge.com/">
              <img
                src="/images/fansedge-company.png"
                alt="FansEdge Company"
                className={styles.image_style}
              />
            </a>
          </Col>

          <Col span={12} className={styles.company_logo}>
            <a href="https://www.sportsmemorabilia.com/">
              <img
                src="/images/sports-company.png"
                alt="SportsMemorabilia Company"
                style={{ paddingBottom: '8px' }}
                className={styles.image_style}
              />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WhereBuyGear;
