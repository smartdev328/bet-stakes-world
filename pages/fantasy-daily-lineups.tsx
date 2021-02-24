/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col, Spin } from 'antd';
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
import {
  NBA_SVG,
  NFL_SVG,
  MLB_SVG,
  FanduelLogoSvg,
  DraftKingsLogoSvg,
  YahooFantasySVG
} from '@components/SportIcons';
import { FANTASY_TABS } from '@constants/';
import { FantasyTabInfo, Sport } from '@type/Sports';
import SportsAPIs from '@apis/sport.apis';

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

export const FANTASY_COMPANIES = [
  {
    id: 'draft_kings',
    name: 'DraftKings',
    logo: () => <DraftKingsLogoSvg className={styles.fantasyCompanyLogo} />
  },
  {
    id: 'fanduel_company',
    name: 'Fanduel',
    logo: () => <FanduelLogoSvg className={styles.fantasyCompanyLogo} />
  },
  {
    id: 'yahoo_fantasy',
    name: 'Yahoo',
    logo: () => <YahooFantasySVG className={styles.fantasyCompanyLogo} />
  }
];

export default function FantasyDailyLineupsPage({ token, subscriptions, sports }: PageProps) {
  const [lineupList, setLineupList] = useState<DailyLineupType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSport, setSelectedSport] = useState<string>('NBA');
  const [selectedCompany, setSelectedCompany] = useState<string>(FANTASY_COMPANIES[0].name);
  const [activeTab, setActiveTab] = useState<string>(FANTASY_TABS[0].id);
  const [infoForCurrentTab, setInfoForCurrentTab] = useState<FantasyTabInfo | undefined>(undefined);
  const [unlockedSports, setUnlockedSports] = useState<Sport[]>([]);
  const [lineupSalary, setLineupSalary] = useState<number>(0);

  useEffect(() => {
    const items: Sport[] = [];
    subscriptions.forEach((subscription) => {
      if (subscription.plan.name.toLowerCase().indexOf('fantasy') > -1) {
        items.push(subscription.sports[0]);
      }
    });
    setUnlockedSports(items);
  }, [subscriptions]);

  useEffect(() => {
    setLoading(true);
    if (sports.length > 0 && subscriptions.length > 0) {
      const fantasySubscriptions = subscriptions.filter(
        (subscription) => subscription.plan.name.toLowerCase().indexOf('fantasy') > -1
      );
      const sportIdx = sports.findIndex((sport) => sport.name === selectedSport);

      SportsAPIs.getFantasyParentEntries(sports[sportIdx].id, fantasySubscriptions)
        .then((res) => res.json())
        .then((data) => {
          const infos = data.filter(
            (info: FantasyTabInfo) =>
              info.sportsbooks === selectedCompany && info.tournament_type === activeTab
          );
          const parentID = infos[0]?.id;
          if (parentID) {
            SportsAPIs.getFantasyPlayerEntries(parentID)
              .then((res2) => res2.json())
              .then((entries) => {
                let total = 0;
                entries.forEach((entry: DailyLineupType) => {
                  total += entry.salary;
                });
                setInfoForCurrentTab(infos[0]);
                setLineupSalary(total);
                setLineupList(entries);
                setLoading(false);
              });
          } else {
            setInfoForCurrentTab(infos[0]);
            setLineupList([]);
            setLineupSalary(0);
            setLoading(false);
          }
        });
    }
  }, [selectedSport, selectedCompany, activeTab, sports, subscriptions]);

  const onChangeOptions = (sport: string, company: string, lineupType: string) => {
    setSelectedSport(sport);
    setSelectedCompany(company);
    setActiveTab(lineupType);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Daily Fantasy</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection
            unlockedSports={unlockedSports}
            openUnlockModal={() => {}}
            activeSport={selectedSport}
            activeTab={activeTab}
            sports={sports}
            lineupSalary={lineupSalary}
            selectedCompany={selectedCompany}
            infoForCurrentTab={infoForCurrentTab}
            onChangeOptions={onChangeOptions}
          />
        </div>
        <div className={styles.containerWrapper}>
          <div className={styles.container}>
            <Row className={styles.content}>
              <Col span={18} className={styles.contentMainCol}>
                {!loading && <LineupsList data={lineupList} />}
                {loading && (
                  <div className={styles.loadingSpin}>
                    <Spin size="large" />
                  </div>
                )}
              </Col>
              <Col span={6} className={styles.contentSideCol}>
                <FantasySidebar />
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
  unlockedSports: Sport[];
  activeSport: string;
  selectedCompany: string;
  activeTab: string;
  sports: Sport[];
  infoForCurrentTab: FantasyTabInfo | undefined;
  lineupSalary: number;
  openUnlockModal: (_: Sport) => void;
  onChangeOptions: (sport: string, company: string, lineupType: string) => void;
};

function TopSection({
  unlockedSports,
  openUnlockModal,
  onChangeOptions,
  activeSport,
  selectedCompany,
  activeTab,
  sports,
  infoForCurrentTab,
  lineupSalary
}: TopSectionPropsType) {
  const [sportsStatus, setSportsStatus] = useState<number[]>([]);

  useEffect(() => {
    const selectedStatus = SPORTS_INFO.map((sport: SportInfoType) => {
      const unlockedItemIndex = unlockedSports.findIndex((item: Sport) => item.name === sport.name);
      if (unlockedItemIndex > -1) {
        if (activeSport === sport.name) {
          return 2;
        }
        return 1;
      }
      return 0;
    });
    setSportsStatus(selectedStatus);
  }, [unlockedSports]);

  const onUnlockItemAt = (index: number) => {
    const items = sportsStatus.slice();
    if (items[index] === 1) {
      const newItems = items.map((item, idx) => {
        if (item > 0) {
          if (idx === index) {
            return 2;
          }
          return 1;
        }
        return 0;
      });
      setSportsStatus(newItems);
      onChangeOptions(SPORTS_INFO[index].name, FANTASY_COMPANIES[0].name, FANTASY_TABS[0].id);
    } else if (items[index] !== 2) {
      openUnlockModal(sports[index]);
    }
  };
  const onSelectCompany = (name: string) => {
    onChangeOptions(activeSport, name, FANTASY_TABS[0].id);
  };
  const changeTab = (tab: string) => {
    onChangeOptions(activeSport, selectedCompany, tab);
  };

  return (
    <>
      <DashboardHeader title={'Daily Fantasy'} />
      <Row className={styles.sportsCardList} justify={'center'}>
        <div className={styles.sportsCardListCarousel}>
          {SPORTS_INFO.map((sport: SportInfoType, index: number) => (
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
                    sportsStatus[index] === 2
                      ? SPORTS_INFO.filter(
                          (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                        )[0]?.background
                      : ''
                }}>
                {sport.logo()}
                {!sportsStatus[index] && <LockIcon className={styles.lock_icon} />}
                <span>{sport.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </Row>
      <Row className={styles.optionsRow} align={'middle'} wrap={false} justify={'space-between'}>
        <Row align={'middle'} style={{ flex: 1 }}>
          <Col span={24} className={styles.sectionTitle}>
            Select Sportsbook
          </Col>
          {FANTASY_COMPANIES.map((company) => (
            <LazyLoad key={company.id}>
              <div className={styles.sportsbook}>
                <div className={styles.sportsbook_name}>{company.name}</div>
                <div
                  className={`${styles.sportsbook_logo} ${styles[`${company.id}`]} ${
                    selectedCompany === company.name && styles.selected
                  }`}
                  onClick={() => onSelectCompany(company.name)}>
                  {company.logo()}
                </div>
              </div>
            </LazyLoad>
          ))}
          <Col span={24} className={styles.sectionTitle} style={{ marginTop: '1em' }}>
            Select Game Style
          </Col>
          {FANTASY_TABS.map((tab) => (
            <div
              key={tab.id}
              className={`${styles.fantasy_tab} ${activeTab === tab.id && styles.selected}`}
              onClick={() => changeTab(tab.id)}>
              {tab.name}
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
              key={infoForCurrentTab?.total_salary}
              value={infoForCurrentTab?.total_salary || 0}
            />
          </span>
          <span className={styles.financialValues}>
            Lineup Salary:&nbsp;
            <NumberFormat
              displayType="text"
              key={lineupSalary}
              thousandSeparator={true}
              prefix={'$'}
              value={lineupSalary || 0}
            />
          </span>
        </Row>
      </Row>
      <Row>
        <Col span={18}>
          <p className={styles.fantasyLineupInfo}>
            TheDailyStakes proposed Bankroll Allocation Based on Contest Types
          </p>
        </Col>
        <Col span={18} className={styles.fantasyStats}>
          <Row align="middle" justify="space-between">
            <div className={styles.featureValue}>
              <div className={styles.featureValueTitle}>Tournament</div>
              <div className={styles.featureValueContent}>
                {infoForCurrentTab?.stat.tournament ? (
                  infoForCurrentTab?.stat.tournament
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>
            <div className={styles.featureValue}>
              <div className={styles.featureValueTitle}>Beat the Score</div>
              <div className={styles.featureValueContent}>
                {infoForCurrentTab?.stat.beat_the_score ? (
                  infoForCurrentTab?.stat.beat_the_score
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>
            <div className={styles.featureValue}>
              <div className={styles.featureValueTitle}>50/50s</div>
              <div className={styles.featureValueContent}>
                {infoForCurrentTab?.stat.fifty_to_fifty ? (
                  infoForCurrentTab?.stat.fifty_to_fifty
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>
          </Row>
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

  const getPosition = (lineup: DailyLineupType) => {
    let lineupPosition;
    switch (lineup.position) {
      case 'B1':
        lineupPosition = '1B';
        break;
      case 'B2':
        lineupPosition = '2B';
        break;
      case 'B3':
        lineupPosition = '3B';
        break;
      default:
        lineupPosition = lineup.position;
    }
    return lineupPosition;
  };

  return (
    <div className={styles.daily_lineups}>
      {data.length === 0 && <div className={styles.noData}>No Data</div>}
      {data.map((lineup: DailyLineupType, index: number) => (
        <div className={styles.daily_lineup} key={lineup.id}>
          <Row>
            <div className={styles.daily_lineup_sidebar}>
              <LazyLoad>
                <NBA_SVG className={styles.daily_lineup_sidebar_bg} />
              </LazyLoad>
              <div className={styles.daily_lineup_sidebar_content}>
                <span>{getPosition(lineup)}</span>
                <div className={styles.divider} />
                <LazyLoad>
                  <img src={lineup.team.logo.url} alt="Daily Lineup Logo" />
                </LazyLoad>
              </div>
            </div>
            <div className={styles.daily_lineup_main}>
              <div className={styles.daily_lineup_main_content}>
                <h4>{lineup.name}</h4>
                <div>
                  <strong
                    className={
                      styles.daily_lineup_teams
                    }>{`${lineup.schedule.home_team.name}@${lineup.schedule.team.name}`}</strong>
                  <div>
                    <span>FPPG:&nbsp;</span>
                    <strong>{lineup.ffpg}</strong>
                    <span>oprk:&nbsp;</span>
                    <strong>{lineup.oprk}</strong>
                    <span>Games Played:&nbsp;</span>
                    <strong>{lineup.games_played}</strong>
                  </div>
                </div>
              </div>
              <div className={styles.daily_lineup_value}>
                <NumberFormat
                  displayType="text"
                  thousandSeparator={true}
                  prefix={'$'}
                  value={lineup.salary}
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
                  <div>{lineup.stat.this_season}</div>
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
                  <div>{lineup.stat.projected_points}</div>
                </div>
                <div className={styles.details_property}>
                  <div className={styles.details_property_title}>
                    <DateRangeIcon className={styles.date_range_icon} />
                    <span>PLAYER PROPS BY THE Sportbooks</span>
                  </div>
                  <div>{lineup.stat.player_props}</div>
                </div>
              </Row>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function FantasySidebar() {
  return (
    <>
      <DailyFantasyLineups />
      <CommonSportsBook />
      <WhereToWatchGame />
      <WhereBuyGear />
      <BettingFundamentals isFantasy />
    </>
  );
}
