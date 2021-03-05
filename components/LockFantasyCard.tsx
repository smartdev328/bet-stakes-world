import React from 'react';
import { Row, Button, Col } from 'antd';
import Link from 'next/link';

import styles from './LockFantasyCard.module.css';

const LockFantasyCard = () => {
  return (
    <div className={styles.subscribenow}>
      <div className={styles.subscribenow_desc}>
        You need to purchase this package in order to view the picks
      </div>
      <Row className={styles.rowClass}>
        <Col lg={10} md={24} sm={24} className={styles.rightCard}>
          <div className={styles.rightOuterDiv}>
            <p className={styles.vipText}>fantasy daily card</p>
            <p className={styles.allPlayText}>Includes Access to Main Slate & Single Slate Tournaments for DraftKings, Fanduel & Yahoo Sports Formats.</p>
            <div className={styles.imageAndDetailDivForRight}>
              <div className={styles.imagesContainer}>
                <img
                  src="/images/lock_nba_sport.svg"
                  width={50}
                  height={50}
                  className={styles.images}
                />
                <img
                  src="/images/lock_nfl_sport.svg"
                  width={50}
                  height={50}
                  className={styles.images}
                />
                <img
                  src="/images/lock_mlb_sport.svg"
                  width={50}
                  height={50}
                  className={styles.images}
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Link href="/shop?plan=fantasy"><Button className={styles.subscribe_btn}>Go to Shop Page</Button></Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default LockFantasyCard;
