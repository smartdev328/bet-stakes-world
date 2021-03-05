import React from 'react';
import { Row, Button, Col } from 'antd';
import Link from 'next/link';

import styles from './LockSportsCard.module.css';

const LockSportsCard = () => {
  return (
    <div className={styles.subscribenow}>
      <div className={styles.subscribenow_desc}>
        You need to purchase this package in order to view the picks
      </div>
      <Row className={styles.rowClass}>
        <Col lg={10} md={24} sm={24} className={styles.leftCard}>
          <div className={styles.leftOuterDiv}>
            <p className={styles.vipText}>VIP ALL ACCESS CARD</p>
            <p className={styles.allPlayText}>ALL PLAYS. ALL SPORTS</p>

            <div className={styles.imageAndDetailDiv}>
              <img src="/images/mark-vip2.svg" alt="Fanduel Logo" width={70} height={80} />
              <div>
                <p className={styles.bestValueText}>best Value!</p>
                <p className={styles.dailyCardText}>
                  *The <b>Daily Card</b> inclues TheDailyStakes Guaranteed Protection.{' '}
                </p>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Link href="/shop?plan=all"><Button className={styles.subscribe_btn}>Go to Shop Page</Button></Link>
            </div>
          </div>
        </Col>
        <Col lg={4} md={24} sm={24} className={styles.orColumn}>
          <p className={styles.orText}>Or</p>
        </Col>
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

              <div className={styles.imagesContainer}>
                <img
                  src="/images/lock_ufc_sport.svg"
                  width={50}
                  height={50}
                  className={styles.images}
                />
                <img
                  src="/images/lock_f1_sport.svg"
                  width={50}
                  height={50}
                  className={styles.images}
                />
                <img
                  src="/images/lock_ncaab_sport.svg"
                  width={50}
                  height={50}
                  className={styles.images}
                />
                <img
                  src="/images/lock_ncaaf_sport.svg"
                  width={50}
                  height={50}
                  className={styles.images}
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Link href="/shop?plan=sports_card"><Button className={styles.subscribe_btn}>Go to Shop Page</Button></Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default LockSportsCard;
