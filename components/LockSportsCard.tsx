import React from 'react';
import styles from './LockSportsCard.module.css';
import { Row, Button, Col, notification } from 'antd';

const LockSportsCard = () => {
  return (
    <div className={styles.subscribenow}>
      <div className={styles.subscribenow_desc}>
        You need to purchase this package in order to view the picks
      </div>
      <Row className={styles.rowClass}>
        <Col lg={10} className={styles.leftCard}>
          <div className={styles.leftOuterDiv}>
            <p className={styles.vipText}>VIP ALL ACCESS CARD</p>
            <p className={styles.allPlayText}>ALL PLAYS. ALL SPORTS</p>

            <div className={styles.imageAndDetailDiv}>
              <img src="/images/fanduel.png" alt="Fanduel Logo" width={107} height={26} />
              <div>
                <p className={styles.bestValueText}> best Value!</p>
                <p className={styles.dailyCardText}>
                  *The Daily Card inclues TheDailyStakes Guaranteed Protection.{' '}
                </p>
              </div>
            </div>

            <Button className={styles.subscribe_btn}>Go to Shop Page</Button>
          </div>
        </Col>
        <Col lg={4}>
          <p className={styles.orText}>Or</p>
        </Col>
        <Col lg={10} className={styles.rightCard}></Col>
      </Row>
    </div>
  );
};
export default LockSportsCard;
