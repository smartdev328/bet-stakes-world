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
  WhereBuyGear,
  LockSportsCard
} from '@components/index';
import { AllSportsBtnBgIcon, LockIcon } from '@components/SvgIcons';

import styles from '@styles/SportsCard.module.css';
import { EarliestGameInfoType, PageProps } from '@type/Main';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import { Sport } from '@type/Sports';
import SportsAPIs from '@apis/sport.apis';
import PackageAPIs from '@apis/package.apis';
import { UserSubscription } from '@type/Users';
import { PACKAGE_NAMES, SportBetTypes } from '@constants/';

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
  const [unlockedItems, setUnlockedItems] = useState<number[]>([]);
  const [showLockView, setShowLockView] = useState<boolean>(false);

  useEffect(() => {
    const items: number[] = [];
    subscriptions.forEach((subscription) => {
      if (subscription.plan.name.toUpperCase().indexOf(PACKAGE_NAMES.SPORTS_CARD) > -1) {
        items.push(subscription.sports[0].id);
      }
    });
    setUnlockedItems(items);
  }, [subscriptions]);

  return (
    <>
      <Head>
        <title>TheDailyStakes - Sports Card</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection
            sports={sports}
            unlockedItems={unlockedItems}
            changeActiveSport={(sport: number) => {
              setActiveSport(sport);
            }}
            openUnlockModal={(status) => {
              setShowLockView(status);
            }}
            activeSport={activeSport}
            filterChanged={(filter) => {
              setFilterType(filter);
            }}
          />
        </div>

        <div className={styles.containerWrapper}>
          <div className={styles.container}>
            <Row className={styles.content}>
              <Col sm={24} md={18} className={styles.contentMainCol}>
                {showLockView ? (
                  <LockSportsCard />
                ) : (
                  SportBetTypes.map((type) => (
                    <ListGames
                      id={type.id}
                      title={type.name}
                      key={type.id}
                      subscriptions={subscriptions}
                      selectedSport={activeSport}
                      selectedFilterType={filterType}
                    />
                  ))
                )}
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
        </div>
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      {/* <img src="/images/trianglebanner.jpg" className={styles.bgImage} /> */}
      <BannerSportsAndMatches />
    </div>
  );
}

type TopSectionPropsType = {
  unlockedItems: number[];
  sports: Sport[];
  activeSport: number;
  openUnlockModal: (_: boolean) => void;
  changeActiveSport: (_: number) => void;
  filterChanged: (_: string) => void;
};

function TopSection({
  unlockedItems,
  sports,
  activeSport,
  openUnlockModal,
  changeActiveSport
}: TopSectionPropsType) {
  const [sportsStatus, setSportsStatus] = useState<number[]>([]);

  useEffect(() => {
    initStatus();
  }, [unlockedItems]);

  const initStatus = () => {
    const selectedStatus = sports.map((sport: Sport) => {
      const unlockedItemIndex = unlockedItems.findIndex((item: number) => item === sport.id);
      if (unlockedItemIndex > -1) {
        return 1;
      }
      return 0;
    });
    setSportsStatus(selectedStatus);
  };

  const onUnlockItemAt = (index: number) => {
    const items = sportsStatus.slice();
    if (items[index] === 1) {
      const newItems = items.map((item) => {
        if (item === 2) {
          return 1;
        }
        return item;
      });
      newItems[index] = 2;
      setSportsStatus(newItems);
      changeActiveSport(sports[index].id);
      openUnlockModal(false);
    } else if (items[index] === 2) {
      const newItems = items.slice();
      newItems[index] = 1;
      setSportsStatus(newItems);
      changeActiveSport(-1);
      openUnlockModal(false);
    } else {
      initStatus();
      changeActiveSport(sports[index].id);
      openUnlockModal(true);
    }
  };

  return (
    <>
      <DashboardHeader title={'Sports Card'} />
      <Row className={styles.sportsCardList}>
        <div className={styles.laptop_view}>
          <VipAllAccessCard />
          <DailyFantasyLineups />
        </div>
        <Button
          className={`${styles.dropdownBtnWrapper} ${styles.dropdownBtnWrapperAll}`}
          onClick={() => {
            initStatus();
            changeActiveSport(-1);
            openUnlockModal(true);
          }}>
          <div className={`${styles.dropdownBtn} ${styles.dropdownBtnAll}`}>
            <LockIcon className={styles.lock_icon} />
            <span>VIP ALL ACCESS CARD</span>
            <AllSportsBtnBgIcon className={styles.dropdownBtnAllBg} />
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
                    sportsStatus[index] === 2 || activeSport === sport.id
                      ? SPORTS_INFO.filter(
                          (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                        )[0]?.background
                      : ''
                }}>
                {SPORTS_INFO.filter(
                  (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                )[0]?.logo()}
                {unlockedItems.indexOf(sport.id) < 0 && <LockIcon className={styles.lock_icon} />}
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
    const sportSubscriptions = subscriptions.filter(
      (subscription) => subscription.plan.name.toUpperCase().indexOf(PACKAGE_NAMES.SPORTS_CARD) > -1
    );
    SportsAPIs.getSportEntries(
      id,
      sportSubscriptions,
      selectedSport !== -1 ? selectedSport : undefined
    )
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

export async function getStaticProps() {
  const res = await PackageAPIs.getPackages();
  const packages = await res.json();

  return {
    props: {
      packages
    }
  };
}
