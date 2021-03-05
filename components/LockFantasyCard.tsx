import React from 'react';
import styles from './LockFantasyCard.module.css';
import { Row, Button, Col } from 'antd';

const LockFantasyCard = () => {
  return (
    <div className={styles.subscribenow}>
      <div className={styles.subscribenow_desc}>
        You need to purchase this package in order to view the picks
      </div>
      <Row className={styles.rowClass}>
        <Col lg={10} md={24} sm={24} className={styles.rightCard}>
          <div className={styles.rightOuterDiv}>
            <p className={styles.vipText}>SPORTS CARD</p>
            <p className={styles.allPlayText}>ALL PLAYS FOR THE SPORT(S) OF YOUR CHOICE</p>
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
                <img
                  src="/images/lock_soccer_sport.svg"
                  width={50}
                  height={50}
                  className={styles.images}
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button className={styles.subscribe_btn}>Go to Shop Page</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default LockFantasyCard;
