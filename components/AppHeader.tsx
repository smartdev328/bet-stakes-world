import { Row, Col, Image, Button, Divider } from 'antd';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

import styles from './AppHeader.module.css';
import { useEffect, useState } from 'react';

type HeaderProps = {
  releaseTime: string;
  winningRate: number;
  curRecord: string;
};

type RemainingTimeType = {
  hrs: number;
  mins: number;
  secs: number;
};

const DefaultRemainingTime = {
  hrs: 0,
  mins: 0,
  secs: 0
};

function getRemainingTime(date: string): RemainingTimeType {
  const now = moment(new Date()); //todays date
  const end = moment(date); // another date
  let diff = moment.duration(end.diff(now)).asSeconds();
  if (diff > 0) {
    const days = Math.floor(diff / 86400);
    diff = diff - 86400 * days;
    const hrs = Math.floor(diff / 3600);
    diff = diff - 3600 * hrs;
    const mins = Math.floor(diff / 60);
    diff = diff - 60 * mins;
    return {
      hrs,
      mins,
      secs: Math.floor(diff)
    };
  }
  return DefaultRemainingTime;
}

export default function AppHeader({ releaseTime, curRecord, winningRate }: HeaderProps) {
  const [remainingTime, setRemainingTime] = useState<RemainingTimeType>(DefaultRemainingTime);
  useEffect(() => {
    const remainingTimeInterval = setInterval(() => {
      const remainingTime = getRemainingTime(releaseTime);
      setRemainingTime(remainingTime);
    }, 1000);
    return () => {
      clearInterval(remainingTimeInterval);
    };
  }, []);
  return (
    <Row justify="space-between" className={styles.header}>
      <Col span={6} className={styles.headerLeftCol}>
        <div className={styles.countdownBox}>
          <div className={styles.countdownBox_desc}>Pick Release Countdown</div>
          <div className={styles.countdownBox_countdown_timer}>
            {`${remainingTime.hrs}h ${remainingTime.mins}m ${remainingTime.secs}s`}
          </div>
          <div>
            <Link href="/">
              <a className={styles.yellowBoldLink}>View Picks</a>
            </Link>
          </div>
        </div>
      </Col>
      <Col span={12} className="text-center">
        <div>
          <Image width={404} src="/images/logo.svg" />
        </div>
        <p className={styles.info}>
          <strong>Our Record:</strong> {curRecord} <strong>Winning Rate:</strong> {winningRate}%
          Return on investments
        </p>
      </Col>
      <Col span={6} className={styles.headerRightCol}>
        <div className={styles.ctaBtns}>
          <Button type="primary" className={styles.subscribeBtn}>
            Subscribe Now
          </Button>
          <Button type="ghost" icon={<UserOutlined />} className={styles.loginBtn}>
            Log In
          </Button>
        </div>
        <div className={styles.dateBar}>
          <Link href="/">
            <a>Today’s Bets</a>
          </Link>
          <Divider type="vertical" className={styles.dateBarDivider} />
          <Link href="/">
            <a>{moment().format('dddd,  MMM DD, YYYY')}</a>
          </Link>
        </div>
      </Col>
    </Row>
  );
}
