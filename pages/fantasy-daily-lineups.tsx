/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Carousel } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';

import { AppLayout, BannerSportsAndMatches, DashboardHeader } from '@components/index';
import { AntiClockIcon, DateRangeIcon, IdentityIcon, LockIcon } from '@components/SvgIcons';
import styles from '@styles/FantasyDailyLineups.module.css';
import { DailyLineupType, PageProps, SportInfoType } from '@type/Main';
import { NBA_SVG, NFL_SVG, MLB_SVG } from '@components/SportIcons';

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
  }
];

export default function SportsCard({ token }: PageProps) {
  const lockedItems = ['NBA'];

  return (
    <>
      <Head>
        <title>The Daily Stakes - Fantasy Daily Lineups</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection lockedItems={lockedItems} openUnlockModal={() => {}} />
        </div>
        <div className={styles.containerWrapper}>
          <div className={styles.container}>
            <LineupsList />
          </div>
        </div>
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <img src="/images/member_dashboard.jpg" className={styles.bgImage} />
      <BannerSportsAndMatches />
    </div>
  );
}

type TopSectionPropsType = {
  lockedItems: string[];
  openUnlockModal: (_: SportInfoType) => void;
};

function TopSection({ lockedItems, openUnlockModal }: TopSectionPropsType) {
  const [sportsStatus, setSportsStatus] = useState<number[]>([]);

  useEffect(() => {
    const selectedStatus = SPORTS_INFO.map((sport: SportInfoType) => {
      const lockedItemIndex = lockedItems.findIndex((item: string) => item === sport.id);
      if (lockedItemIndex > -1) {
        return 1;
      }
      return 0;
    });
    setSportsStatus(selectedStatus);
  }, [lockedItems]);

  const onUnlockItemAt = (index: number) => {
    const items = sportsStatus.slice();
    if (items[index] === 1) {
      items[index] = 2;
      setSportsStatus(items);
    } else if (items[index] === 2) {
      items[index] = 1;
      setSportsStatus(items);
    } else {
      openUnlockModal(SPORTS_INFO[index]);
    }
  };

  const responsive = [
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        draggable: true
      }
    }
  ];

  return (
    <>
      <DashboardHeader title={'FANTASY DAILY LINEUPS'} />
      <Row className={styles.sportsCardList} justify={'center'}>
        <div className={styles.sportsCardListCarousel}>
          <Carousel
            arrows={true}
            dots={false}
            slidesToShow={3}
            responsive={responsive}
            initialSlide={0}
            variableWidth
            infinite={false}
            swipeToSlide
            slidesToScroll={SPORTS_INFO.length}>
            {SPORTS_INFO.map((sport: SportInfoType, index: number) => (
              <div key={index}>
                <Button className={styles.dropdownBtnWrapper} onClick={() => onUnlockItemAt(index)}>
                  <div
                    className={`${styles.dropdownBtn} ${styles['dropdown_' + sport.id]}`}
                    style={{
                      background: sportsStatus[index] == 2 ? sport.background : ''
                    }}>
                    {sport.logo()}
                    {!sportsStatus[index] && <LockIcon className={styles.lock_icon} />}
                    <span>{sport.name}</span>
                  </div>
                </Button>
              </div>
            ))}
          </Carousel>
        </div>
      </Row>
      <Row className={styles.optionsRow} align={'middle'} justify={'space-between'}>
        <Row align={'middle'}>
          <LazyLoad>
            <img
              src="/images/draft_kings_company.png"
              alt="Draft kings Company"
              className={styles.company_logo}
            />
          </LazyLoad>
          <LazyLoad>
            <img
              src="/images/fanduel_company.png"
              alt="Fanduel Company"
              className={styles.company_logo}
            />
          </LazyLoad>
        </Row>
        <span>Total Salary: $55,600</span>
      </Row>
    </>
  );
}

const Mock_DailyLineups = [
  {
    id: 1,
    state: 'PG',
    team_logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Toronto_Raptors.png',
    lineup_name: 'Damian Lillard',
    team1: 'LAL',
    team2: 'POR',
    startTime: '6:30 pm',
    fppg: 38.9,
    oprk: '7th',
    price: 7566
  },
  {
    id: 2,
    state: 'SG',
    team_logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Toronto_Raptors.png',
    lineup_name: 'SHAI GILGEOUS-ALEXANDER',
    team1: 'OKC',
    team2: 'HOU',
    startTime: '6:30 pm',
    fppg: 38.9,
    oprk: '7th',
    price: 7566
  },
  {
    id: 3,
    state: 'SF',
    team_logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Toronto_Raptors.png',
    lineup_name: 'Lebron James',
    team1: 'LAL',
    team2: 'POR',
    startTime: '6:30 pm',
    fppg: 38.9,
    oprk: '7th',
    price: 7566
  },
  {
    id: 4,
    state: 'PF',
    team_logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Toronto_Raptors.png',
    lineup_name: 'GIANNIS ANTETOKOUNMPO',
    team1: 'MIL',
    team2: 'ORL',
    startTime: '6:30 pm',
    fppg: 38.9,
    oprk: '7th',
    price: 7566
  },
  {
    id: 5,
    state: 'C',
    team_logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Toronto_Raptors.png',
    lineup_name: 'Rudy Gobert',
    team1: 'UTA',
    team2: 'BKN',
    startTime: '6:30 pm',
    fppg: 38.9,
    oprk: '7th',
    price: 7566
  },
  {
    id: 6,
    state: 'G',
    team_logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Toronto_Raptors.png',
    lineup_name: 'James Harden',
    team1: 'HOU',
    team2: 'DEN',
    startTime: '6:30 pm',
    fppg: 38.9,
    oprk: '7th',
    price: 7566
  },
  {
    id: 7,
    state: 'F',
    team_logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Toronto_Raptors.png',
    lineup_name: 'Jaylen Brown',
    team1: 'BOS',
    team2: 'MIA',
    startTime: '6:30 pm',
    fppg: 38.9,
    oprk: '7th',
    price: 7566
  },
  {
    id: 8,
    state: 'UTL',
    team_logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Toronto_Raptors.png',
    lineup_name: 'Pascal Siakam',
    team1: 'TOR',
    team2: 'BKN',
    startTime: '6:30 pm',
    fppg: 38.9,
    oprk: '7th',
    price: 7566
  }
];

function LineupsList() {
  const [showDetailsAt, setShowDetailsAt] = useState<boolean[]>([]);
  const changeDetailsVisibleAt = (index: number) => {
    showDetailsAt[index] = !showDetailsAt[index];
    setShowDetailsAt(showDetailsAt.slice());
  };

  return (
    <div className={styles.daily_lineups}>
      {Mock_DailyLineups.map((lineup: DailyLineupType, index: number) => (
        <div className={styles.daily_lineup} key={lineup.id}>
          <Row>
            <div className={styles.daily_lineup_sidebar}>
              <LazyLoad>
                <NBA_SVG className={styles.daily_lineup_sidebar_bg} />
              </LazyLoad>
              <div className={styles.daily_lineup_sidebar_content}>
                <span>{lineup.state}</span>
                <div className={styles.divider} />
                <LazyLoad>
                  <img src={lineup.team_logo} alt="Daily Lineup Logo" />
                </LazyLoad>
              </div>
            </div>
            <div className={styles.daily_lineup_main}>
              <div className={styles.daily_lineup_main_content}>
                <h4>{lineup.lineup_name}</h4>
                <div>
                  <strong>{`${lineup.team1}@${lineup.team2} ${'Today at 6:30pm'}`}</strong>
                  <div>
                    <span>FPPG:&nbsp;</span>
                    <strong>{lineup.fppg}</strong>
                    <span>oprk:&nbsp;</span>
                    <strong>{lineup.oprk}</strong>
                  </div>
                </div>
              </div>
              <span className={styles.daily_lineup_value}>${lineup.price}</span>
            </div>
          </Row>
          <div className={styles.daily_lineup_details}>
            <div onClick={() => changeDetailsVisibleAt(index)} className={styles.hide_details}>
              <div className={styles.hide_details_btn}>
                <span>View details</span>
                {showDetailsAt[index] && <CaretUpOutlined className={styles.caret_up} />}
                {!showDetailsAt[index] && <CaretDownOutlined className={styles.caret_down} />}
              </div>
            </div>
            {showDetailsAt[index] && (
              <Row className={styles.details_properties} justify={'space-between'}>
                <div className={styles.details_property}>
                  <div className={styles.details_property_title}>
                    <div>
                      <IdentityIcon className={styles.identity_icon} />
                      <IdentityIcon className={styles.identity_icon} />
                    </div>
                    <span>Macthup</span>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor quam at massa
                    auctor. Amet facilisis neque pellentesque adipiscing sed turpis vitae. Amet
                    semper felis suspendisse a mattis sed.
                  </p>
                </div>
                <div className={styles.details_property}>
                  <div className={styles.details_property_title}>
                    <AntiClockIcon className={styles.anti_clock_icon} />
                    <span>Previous game</span>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor quam at massa
                    auctor. Amet facilisis neque pellentesque adipiscing sed turpis vitae. Amet
                    semper felis suspendisse a mattis sed.
                  </p>
                </div>
                <div className={styles.details_property}>
                  <div className={styles.details_property_title}>
                    <DateRangeIcon className={styles.date_range_icon} />
                    <span>This Season</span>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor quam at massa
                    auctor. Amet facilisis neque pellentesque adipiscing sed turpis vitae. Amet
                    semper felis suspendisse a mattis sed.
                  </p>
                </div>
              </Row>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
