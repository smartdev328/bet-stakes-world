/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col, notification } from 'antd';
import LazyLoad from 'react-lazyload';
import {
  AppLayout,
  CommonSportsBook,
  DashboardHeader,
  SportEntry,
  DailyFantasyLineups,
  WhereToWatchGame,
  WhereBuyGear,
  VipAllAccessCard,
  BannerSportsAndMatches
} from '@components/index';

import styles from '@styles/YesterdaysPlays.module.css';
import { PageProps, YesterdayPlayInfoType } from '@type/Main';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import { useRouter } from 'next/router';
import SportsAPIs from '@apis/sport.apis';
import { Sport } from '@type/Sports';

const SPORTS_INFO = [
  {
    name: 'NBA',
    id: 'NBA',
    background: '#EC4C15',
    logo: () => <NBA_SVG className={styles.sports_logo} />
  },
  {
    name: 'NFL',
    id: 'NFL',
    background: '#91442A',
    logo: () => <NFL_SVG className={styles.sports_logo} />
  },
  {
    name: 'MLB',
    id: 'MLB',
    background: '#1878FB',
    logo: () => <MLB_SVG className={styles.sports_logo} />
  },
  {
    name: 'NCAAF',
    id: 'NFL',
    background: '#91442A',
    logo: () => <NFL_SVG className={styles.sports_logo} />
  },
  {
    name: 'NCAAB',
    id: 'NBA',
    background: '#EC4C15',
    logo: () => <NBA_SVG className={styles.sports_logo} />
  },
  {
    name: 'Soccer',
    id: 'SOCCER',
    background: '#6DCF40',
    logo: () => <SOCCER_SVG className={styles.sports_logo} />
  },
  {
    name: 'UFC',
    id: 'UFC',
    background: '#F9282B',
    logo: () => <UFC_SVG className={styles.sports_logo} />
  },
  {
    name: 'Formula 1',
    id: 'F1',
    background: '#505054',
    logo: () => <F1_SVG className={styles.sports_logo} />
  }
];

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <BannerSportsAndMatches />
    </div>
  );
}

export default function YesterdaysPlays({ token, subscriptions, sports }: PageProps) {
  const [games, setGames] = useState<YesterdayPlayInfoType[]>([]);
  const [entireLoading, setEntireLoading] = useState<boolean>(false);

  useEffect(() => {
    SportsAPIs.getYesterdaySportEntries(0, undefined, 1000)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setEntireLoading(false);
      })
      .catch((error) => {
        notification['error']({
          message: 'Registration Error!',
          description: error.message
        });
        setEntireLoading(false);
      });
  }, []);

  // Update Filters
  const updateFilters = (sportId: number, status: boolean) => {
    setEntireLoading(true);
    SportsAPIs.getYesterdaySportEntries(0, status ? sportId : undefined, 1000)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setEntireLoading(false);
      })
      .catch((error) => {
        notification['error']({
          message: 'Registration Error!',
          description: error.message
        });
        setEntireLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Yesterdays plays</title>
      </Head>

      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />

        <div className={styles.container}>
          {sports.length > 0 && <TopSection sports={sports} onSelectChange={updateFilters} />}
        </div>

        <div className={styles.containerWrapper}>
          <div className={styles.container}>
            <Row className={styles.content}>
              <Col span={18} className={styles.contentMainCol}>
                {!token && <SubscribeNow />}
                {token && <SportEntry loading={entireLoading} plays={games} />}
                <div className={styles.laptop_view}>
                  <VipAllAccessCard />
                  <DailyFantasyLineups />
                  <CommonSportsBook />
                  <WhereToWatchGame />
                  <WhereBuyGear />
                </div>
              </Col>
              <Col span={6} className={styles.contentSideCol}>
                <div className={styles.mobile_view}>
                  <VipAllAccessCard />
                  <DailyFantasyLineups />
                  <CommonSportsBook />
                  <WhereToWatchGame />
                  <WhereBuyGear />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

function SubscribeNow() {
  const router = useRouter();
  const goSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className={styles.subscribenow}>
      <div className={styles.subscribenow_container}>
        <div className={styles.subscribenow_left}>
          <LazyLoad height={140}>
            <img
              alt="Curve Arrow Icon"
              src="/images/curve_arrow.svg"
              className={styles.subscribenow_curve}
            />
          </LazyLoad>
          <div className={styles.subscribenow_desc}>
            Subscribe now for free with TheDailyStakes and gain access to yesterday’s plays!
          </div>
        </div>
        <div className={styles.subscribenow_right}>
          <div className={styles.btn_circle}>
            <LazyLoad height={170}>
              <img alt="Subscribe Button Icon" src="/images/subscribe_btn_circle.svg" />
            </LazyLoad>
            <Button className={styles.subscribe_btn} onClick={goSignUp}>
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type TopSectionPropsType = {
  sports: Sport[];
  onSelectChange: (_: number, _status: boolean) => void;
};

function TopSection({ sports, onSelectChange }: TopSectionPropsType) {
  const [sportsStatus, setSportsStatus] = useState<number[]>([]);

  useEffect(() => {
    setSportsStatus(new Array(sports.length).fill(1));
  }, []);

  const onUnlockAll = () => {
    const newStatuses = sportsStatus.fill(1);
    setSportsStatus(newStatuses);
    onSelectChange(-1, false);
  };

  const onUnlockItemAt = (index: number) => {
    const items = sportsStatus.slice();
    if (items[index] === 1) {
      items.fill(1);
      items[index] = 2;
      setSportsStatus(items);
      onSelectChange(sports[index].id, true);
    } else if (items[index] === 2) {
      items.fill(1);
      items[index] = 1;
      setSportsStatus(items);
      onSelectChange(sports[index].id, false);
    }
  };

  return (
    <>
      <DashboardHeader title={'Yesterdays plays'} />
      <Row className={styles.sportsCardList} justify={'center'}>
        <Button
          className={`${styles.dropdownBtnWrapper} ${styles.dropdownBtnWrapperAll}`}
          onClick={onUnlockAll}>
          <div className={`${styles.dropdownBtn} ${styles.dropdownBtnAll}`}>
            <span>All</span>
          </div>
        </Button>
        <div className={styles.sportsCardListCarousel}>
          {sports.map((sport: Sport, index: number) => (
            <Button
              key={index}
              className={styles.dropdownBtnWrapper}
              onClick={() => onUnlockItemAt(index)}>
              <div
                className={`${styles.dropdownBtn} ${
                  styles[
                    'dropdown_' +
                      SPORTS_INFO.filter(
                        (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                      )[0]?.id
                  ]
                }`}
                style={{
                  background:
                    sportsStatus[index] == 2
                      ? SPORTS_INFO.filter(
                          (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                        )[0]?.background
                      : ''
                }}>
                {SPORTS_INFO.filter(
                  (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                )[0]?.logo()}
                <span>{sport.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </Row>
    </>
  );
}
