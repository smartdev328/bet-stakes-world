/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Carousel, Col, Spin } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
import NumberFormat from 'react-number-format';

import {
  AppLayout,
  DailyFantasyLineups,
  BannerSportsAndMatches,
  BettingFundamentals,
  CommonSportsBook,
  DashboardHeader,
  WhereToWatchGame,
  WhereBuyGear
} from '@components/index';
import { AntiClockIcon, DateRangeIcon, LockIcon } from '@components/SvgIcons';
import styles from '@styles/FantasyDailyLineups.module.css';
import { DailyLineupType, PageProps, SportInfoType } from '@type/Main';
import { NBA_SVG, NFL_SVG, MLB_SVG } from '@components/SportIcons';
import {
  FANTASY_COMPANIES,
  FANTASY_TABS,
  FANTASY_LINEUPS_GAMES,
  FANTASY_LINEUPS_INFO
} from '@constants/';
import FantasySportsBook from '@components/FantasySportsBook';
import FantasyLineupIncludes from '@components/FantasyLineupIncludes';
import { FantasyTabInfo } from '@type/Sports';

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

export default function FantasyDailyLineupsPage({ token, subscriptions }: PageProps) {
  const lockedItems = ['NBA', 'NFL', 'MLB'];
  const [lineupList, setLineupList] = useState<DailyLineupType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSport, setSelectedSport] = useState<string>(SPORTS_INFO[0].name);
  const [selectedCompany, setSelectedCompany] = useState<string>(FANTASY_COMPANIES[0].name);

  useEffect(() => {
    const lineups = FANTASY_LINEUPS_GAMES.filter(
      (game) =>
        game.sport === selectedSport &&
        game.company === selectedCompany &&
        game.type === 'MAIN_SLATE'
    );
    setLineupList(lineups);
  }, []);

  const onChangeOptions = (sport: string, company: string, lineupType: string) => {
    setLoading(true);
    const lineups = FANTASY_LINEUPS_GAMES.filter(
      (game) => game.sport === sport && game.company === company && game.type === lineupType
    );
    setTimeout(() => {
      setLineupList(lineups);
      setLoading(false);
      setSelectedSport(sport);
      setSelectedCompany(company);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Fantasy Daily Lineups</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection
            lockedItems={lockedItems}
            openUnlockModal={() => {}}
            onChangeOptions={onChangeOptions}
          />
        </div>
        <div className={styles.containerWrapper}>
          <div className={styles.container}>
            <Row className={styles.content}>
              <Col span={18} className={styles.contentMainCol}>
                {!loading && <LineupsList data={lineupList} />}
                {loading && <Spin />}
              </Col>
              <Col span={6} className={styles.contentSideCol}>
                <FantasySidebar selectedCompany={selectedCompany} selectedSport={selectedSport} />
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
      <img src="/images/member_dashboard.jpg" className={styles.bgImage} />
      <BannerSportsAndMatches />
    </div>
  );
}

type TopSectionPropsType = {
  lockedItems: string[];
  openUnlockModal: (_: SportInfoType) => void;
  onChangeOptions: (sport: string, company: string, lineupType: string) => void;
};

function TopSection({ lockedItems, openUnlockModal, onChangeOptions }: TopSectionPropsType) {
  const [sportsStatus, setSportsStatus] = useState<number[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>(FANTASY_COMPANIES[0].name);
  const [activeTab, setActiveTab] = useState<string>(FANTASY_TABS[0]);
  const [activeSport, setActiveSport] = useState<string>(SPORTS_INFO[0].name);
  const [infoForCurrentTab, setInfoForCurrentTab] = useState<FantasyTabInfo | undefined>(undefined);

  useEffect(() => {
    const infos = FANTASY_LINEUPS_INFO.filter(
      (info) =>
        info.sport === activeSport && info.company === selectedCompany && info.type === activeTab
    );
    setInfoForCurrentTab(infos[0]);
  }, [activeSport, activeTab, selectedCompany]);

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
      const newItems = items.slice();
      newItems.fill(1);
      newItems[index] = 2;
      setActiveSport(SPORTS_INFO[index].name);
      setSportsStatus(newItems);
      setActiveTab(FANTASY_TABS[0]);
      setSelectedCompany(FANTASY_COMPANIES[0].name);
      onChangeOptions(SPORTS_INFO[index].name, FANTASY_COMPANIES[0].name, FANTASY_TABS[0]);
    } else {
      openUnlockModal(SPORTS_INFO[index]);
    }
  };
  const onSelectCompany = (name: string) => {
    setSelectedCompany(name);
    setActiveTab(FANTASY_TABS[0]);
    onChangeOptions(activeSport, name, FANTASY_TABS[0]);
  };
  const changeTab = (tab: string) => {
    setActiveTab(tab);
    onChangeOptions(activeSport, selectedCompany, tab);
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
                      background: activeSport === sport.name ? sport.background : ''
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
          {FANTASY_COMPANIES.map((company) => (
            <LazyLoad key={company.id}>
              <div
                className={`${styles.company_logo} ${styles[`${company.id}`]} ${
                  selectedCompany === company.name && styles.selected
                }`}
                onClick={() => onSelectCompany(company.name)}>
                <img src={company.logo} alt="Draft kings Company" />
              </div>
            </LazyLoad>
          ))}
        </Row>
      </Row>
      <Row className={styles.optionsRow} align={'middle'} justify={'space-between'}>
        <Row align={'middle'}>
          {FANTASY_TABS.map((tab) => (
            <div
              key={tab}
              className={`${styles.fantasy_tab} ${activeTab === tab && styles.selected}`}
              onClick={() => changeTab(tab)}>
              {tab.replace('_', ' ')}
            </div>
          ))}
        </Row>
        <Row align={'middle'}>
          <span className={styles.financialValues}>
            Salary Cap:&nbsp;
            <NumberFormat
              displayType="text"
              thousandSeparator={true}
              prefix={'$'}
              value={infoForCurrentTab?.salaryCap}
            />
          </span>
          <span className={styles.financialValues}>
            Lineup Salary:&nbsp;
            <NumberFormat
              displayType="text"
              thousandSeparator={true}
              prefix={'$'}
              value={infoForCurrentTab?.lineupSalary}
            />
          </span>
        </Row>
      </Row>
      <Row>
        <Col span={24}>
          <p className={styles.fantasyLineupInfo}>
            TheDailyStakes suggests entering this lineup in the following contest types
          </p>
        </Col>
        <Col span={24} className={styles.fantasyLineupInfo}>
          <div className={styles.featureValue}>
            <div className={styles.featureValueTitle}>Tournament</div>
            <div className={styles.featureValueContent}>Play up to 15% of your bankroll</div>
          </div>
          <div className={styles.featureValue}>
            <div className={styles.featureValueTitle}>Beat the Score</div>
            <div className={styles.featureValueContent}>Play up to 25% of your bankroll</div>
          </div>
          <div className={styles.featureValue}>
            <div className={styles.featureValueTitle}>50/50s</div>
            <div className={styles.featureValueContent}>Play up to 50% of your bankroll</div>
          </div>
        </Col>
      </Row>
    </>
  );
}

function LineupsList({ data }: { data: DailyLineupType[] }) {
  const [showDetailsAt, setShowDetailsAt] = useState<boolean[]>([]);
  const changeDetailsVisibleAt = (index: number) => {
    showDetailsAt[index] = !showDetailsAt[index];
    setShowDetailsAt(showDetailsAt.slice());
  };

  return (
    <div className={styles.daily_lineups}>
      {data.map((lineup: DailyLineupType, index: number) => (
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
                  <strong
                    className={
                      styles.daily_lineup_teams
                    }>{`${lineup.team1}@${lineup.team2}`}</strong>
                  <div>
                    <span>FPPG:&nbsp;</span>
                    <strong>{lineup.fppg}</strong>
                    <span>oprk:&nbsp;</span>
                    <strong>{lineup.oprk}</strong>
                    <span>Games Played:&nbsp;</span>
                    <strong>{lineup.played}</strong>
                  </div>
                </div>
              </div>
              <div className={styles.daily_lineup_value}>
                <NumberFormat
                  displayType="text"
                  thousandSeparator={true}
                  prefix={'$'}
                  value={lineup.price}
                />
              </div>
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
                    <AntiClockIcon className={styles.anti_clock_icon} />
                    <span>THIS SEASON</span>
                  </div>
                  <div>
                    <div>Points per game:</div>
                    <div>Rebounds per game:</div>
                    <div>Assists per game:</div>
                    <div>Steals per game:</div>
                    <div>
                      <strong>Fantasy points per game:</strong>
                    </div>
                  </div>
                </div>
                <div className={styles.details_property}>
                  <div className={styles.details_property_title}>
                    <div>
                      <img
                        alt=""
                        src="/images/user-double.png"
                        className={styles.user_double_icon}
                      />
                    </div>
                    <span>PROJECTED POINTS BY THE DAILY STAKES </span>
                  </div>
                  <div>
                    <div>Expected minutes:</div>
                    <div>Average point per minute:</div>
                    <div>Project fantasy points:</div>
                    <div>Projected Ownership%:</div>
                    <div>
                      <strong>Expected value against fantasy price:</strong>
                    </div>
                  </div>
                </div>
                <div className={styles.details_property}>
                  <div className={styles.details_property_title}>
                    <DateRangeIcon className={styles.date_range_icon} />
                    <span>PLAYER PROPS BY THE Sportbooks</span>
                  </div>
                  <div>
                    <p>1) Over / Under 22.5 Points</p>
                    <p>2) Over / Under 6.5 Assists</p>
                    <p>3) Over / Under 7.5 Rebounds</p>
                  </div>
                </div>
              </Row>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

type SidebarProps = {
  selectedSport: string;
  selectedCompany: string;
};

function FantasySidebar({ selectedSport, selectedCompany }: SidebarProps) {
  return (
    <>
      {selectedSport === 'NBA' && selectedCompany === 'DraftKings' && (
        <>
          <DailyFantasyLineups />
          <CommonSportsBook />
          <WhereToWatchGame />
          <WhereBuyGear />
          {/* <BankRollManagement /> */}
        </>
      )}
      {!(selectedSport === 'NBA' && selectedCompany === 'DraftKings') && (
        <>
          <FantasyLineupIncludes />
          <FantasySportsBook />
        </>
      )}
      <BettingFundamentals isFantasy />
    </>
  );
}
