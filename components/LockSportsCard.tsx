import React from 'react';
import styles from './LockSportsCard.module.css';
import { Row, Button, Col, notification } from 'antd';

const LockSportsCard = () => {
  return (
    <div className={styles.subscribenow}>
      <div className={styles.subscribenow_desc}>
        You need to purchase this package in order to view the picks
      </div>
      <Row>
        <Col lg={10} className={styles.leftCard}>
          <div></div>
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
