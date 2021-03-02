/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col } from 'antd';
import {
  AppLayout,
  BankRollManagement,
  BannerSportsAndMatches,
  BettingFundamentals,
  CommonSportsBook,
  DashboardHeader,
  SportEntryActive,
  VipAllAccessCard,
  DailyFantasyLineups,
  WhereToWatchGame,
  WhereBuyGear
} from '@components/index';
import { WinnerCupIcon } from '@components/SvgIcons';
import SportsAPIs from '@apis/sport.apis';
import styles from '@styles/SportsCard.module.css';
import { EarliestGameInfoType, PageProps } from '@type/Main';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import { Sport } from '@type/Sports';
import { UserSubscription } from '@type/Users';
import { SportBetTypes } from '@constants/';

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
    id: 'NCAAF',
    background: '#91442A',
    logo: () => <NFL_SVG className={styles.sports_logo} />
  },
  {
    name: 'NCAAB',
    id: 'NCAAB',
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

export default function SportsCard({ token, subscriptions, sports }: PageProps) {
  const [activeSport, setActiveSport] = useState<number>(-1);
  const [filterType, setFilterType] = useState<string>('');

  return (
    <>
      <Head>
        <title>The Daily Stakes - VIP All Access Card</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection
            sports={sports}
            changeActiveSport={(sport) => {
              setActiveSport(sport);
            }}
            filterChanged={(filter) => {
              setFilterType(filter);
            }}
          />
          <Row className={styles.content}>
            <div className={styles.laptop_view}>
              <VipAllAccessCard />
              <DailyFantasyLineups />
            </div>
            <Col sm={24} md={18} className={styles.contentMainCol}>
              {SportBetTypes.map((type) => (
                <ListGames
                  id={type.id}
                  title={type.name}
                  key={type.id}
                  subscriptions={subscriptions}
                  selectedSport={activeSport}
                  selectedFilterType={filterType}
                />
              ))}
              <div className={styles.laptop_view}>
                <CommonSportsBook />
                <WhereToWatchGame />
                <WhereBuyGear />
                <BankRollManagement />
                <BettingFundamentals />
                <BettingFundamentals isFantasy />
              </div>
            </Col>
            <Col span={6} className={styles.contentSideCol}>
              <div className={styles.mobile_view}>
                <VipAllAccessCard />
                <DailyFantasyLineups />
                <CommonSportsBook />
                <WhereToWatchGame />
                <WhereBuyGear />
                <BankRollManagement />
                <BettingFundamentals />
                <BettingFundamentals isFantasy />
              </div>
            </Col>
          </Row>
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
  sports: Sport[];
  changeActiveSport: (_: number) => void;
  filterChanged: (_: string) => void;
};

function TopSection({ sports, changeActiveSport }: TopSectionPropsType) {
  const [sportsStatus, setSportsStatus] = useState<number[]>([]);

  const onUnlockAll = () => {
    const newItems = sportsStatus.fill(0);
    setSportsStatus(newItems);
    changeActiveSport(-1);
  };

  const onUnlockItemAt = (index: number) => {
    const items = sportsStatus.slice();
    if (items[index] !== 1) {
      const newItems = items.fill(0);
      newItems[index] = 1;
      setSportsStatus(newItems);
      changeActiveSport(sports[index].id);
    } else {
      const newItems = items.fill(0);
      setSportsStatus(newItems);
      changeActiveSport(-1);
    }
  };

  return (
    <>
      <DashboardHeader title={'VIP ALL ACCESS CARD'} />
      <Row className={styles.sportsCardList} justify={'center'}>
        <Button
          className={`${styles.dropdownBtnWrapper} ${styles.dropdownBtnWrapperAll}`}
          onClick={onUnlockAll}>
          <div className={`${styles.dropdownBtn} ${styles.dropdownBtnVIPAll}`}>
            <WinnerCupIcon className={styles.lock_icon} />
            <span>ALL SPORTS</span>
          </div>
        </Button>
        <div className={styles.sportsCardListCarousel}>
          {sports.map((sport, index) => (
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
                    sportsStatus[index] === 1
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
      <br></br>
    </>
  );
}

type ListGamesProps = {
  title: string;
  id: string;
  selectedSport: number;
  selectedFilterType: string;
  subscriptions: UserSubscription[];
};

function ListGames({
  title,
  id,
  selectedSport,
  selectedFilterType,
  subscriptions
}: ListGamesProps) {
  const [showDetailsAt, setShowDetailsAt] = useState<boolean[]>([]);
  const [hideSection, setHideSection] = useState<boolean>(true);
  const [games, setGames] = useState<EarliestGameInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    SportsAPIs.getSportEntries(id, subscriptions, selectedSport !== -1 ? selectedSport : undefined)
      .then((res) => res.json())
      .then((data: EarliestGameInfoType[]) => {
        switch (selectedFilterType) {
          case 'Highest Units':
            setGames(data.filter((game) => game.units > 250));
            break;
          case 'Highest Odds':
            setGames(data.filter((game) => game.odds_decimal > 250));
            break;
          default:
            setGames(data);
        }
        setLoading(false);
      });
  }, [selectedSport, selectedFilterType, subscriptions]);

  const changeDetailsVisibleAt = (index: number) => {
    showDetailsAt[index] = !showDetailsAt[index];
    setShowDetailsAt(showDetailsAt.slice());
  };

  const hideDetailsAt = (state: boolean) => {
    setHideSection(state);
  };

  return (
    <SportEntryActive
      title={title}
      loading={loading}
      hideSection={hideSection}
      hideDetailsAt={hideDetailsAt}
      games={games}
      showDetailsAt={showDetailsAt}
      changeDetailsVisibleAt={changeDetailsVisibleAt}></SportEntryActive>
  );
}
