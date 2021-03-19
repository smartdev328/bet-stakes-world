import { Col, Row } from 'antd';
import React from 'react';
import styles from './WhereToWatchGame.module.css';

function WhereToWatchGame() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <img
          src={'/images/where-to-watch.svg'}
          height="36px"
          width="36px"
          style={{ paddingRight: '6px' }}
        />
        <span>Where to watch the game?</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <Row>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.dazn.com/">
              <img
                src="/images/dazn-company.png"
                alt="DAZN Logo"
                width={80}
                height={80}
                className={styles.image_style}
              />
            </a>
          </Col>

          <Col span={12} className={styles.company_logo}>
            <a href="https://www.stubhub.com/">
              <img
                src="/images/stubhub-company.png"
                alt="StubHub Logo"
                width={80}
                height={80}
                className={styles.image_style}
              />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.fubo.tv/">
              <img
                src="/images/fubo-tv-company.png"
                alt="FuboTV Logo"
                className={styles.image_style}
              />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.ticketmaster.com/">
              <img
                src="/images/ticketmaster-company.png"
                alt="TicketMaster Logo"
                className={styles.image_style}
              />
            </a>
          </Col>

          <Col span={12} className={styles.company_logo}>
            <a href="https://www.sling.com/">
              <img
                src="/images/sling-company.png"
                alt="VividSeats Logo"
                className={styles.image_style}
              />
            </a>
          </Col>

          <Col span={12} className={styles.company_logo}>
            <a href="https://www.vividseats.com/">
              <img
                src="/images/vividseats-company.png"
                alt="VividSeats Logo"
                className={styles.image_style}
              />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WhereToWatchGame;
