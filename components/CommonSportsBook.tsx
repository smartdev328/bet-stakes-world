import { Col, Row } from 'antd';
import React from 'react';
import styles from './CommonSportsBook.module.css';

function CommonSportsBook() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <img
          src={'/images/comom-sport.svg'}
          height="32px"
          width="32px"
          style={{ paddingRight: '6px' }}
        />
        <span>Common Sportsbooks</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <Row>
          <Col span={12} className={styles.company_logo}>
            <a href="https://sportsbook.fanduel.com/">
              <img src="/images/fanduel.png" alt="Fanduel Logo" className={styles.image_style} />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://sportsbook.draftkings.com">
              <img
                src="/images/draftkings.png"
                alt="Draftkings SportsBook Logo"
                className={styles.image_style}
              />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.pointsbet.com/">
              <img src="/images/betway.png" alt="Betway Logo" className={styles.image_style} />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.williamhill.com/us">
              <img
                src="/images/williamhill.png"
                alt="WilliamHill SportsBook Logo"
                className={styles.image_style}
              />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.bet365.com/">
              <img src="/images/bet365.png" alt="Bet365 Logo" className={styles.image_style} />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.888sport.com/">
              <img src="/images/888sport.png" alt="888Sports Logo" className={styles.image_style} />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CommonSportsBook;
