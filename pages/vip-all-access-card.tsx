/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col, Dropdown, Menu, Carousel, Spin } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import moment from 'moment';

import { AppLayout, BannerSportsAndMatches, DashboardHeader, SportTile } from '@components/index';
import {
  ListIcon,
  MinusEncloseIcon,
  MoneyPocketIcon,
  OpenBookIcon,
  PlusEncloseIcon,
  TuneIcon,
  WinnerCupIcon
} from '@components/SvgIcons';
import SportsAPIs from '@apis/sport.apis';
import styles from '@styles/SportsCard.module.css';
import { LongArrowIcon } from '@components/SvgIcons';
import { EarliestGameInfoType, PageProps } from '@type/Main';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import { Sport } from '@type/Sports';
import { UserSubscription } from '@type/Users';

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

const SportBetTypes = [
  {
    id: 'straight',
    name: 'Straight Bets'
  },
  {
    id: 'parlay',
    name: 'Parlays'
  },
  {
    id: 'wildcard',
    name: 'Bonus Wilcard Plays'
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
            <Col span={18} className={styles.contentMainCol}>
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
            </Col>
            <Col span={6} className={styles.contentSideCol}>
              <BankrollManagementSystem />
              <CommonSportsbooks />
              <BettingFundamentals />
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

function TopSection({ sports, changeActiveSport, filterChanged }: TopSectionPropsType) {
  const [selectedFilterType, setSelectedFilterType] = useState<string>('');
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

  const menu = (
    <Menu className={styles.sportMenu}>
      <Menu.Item
        disabled={selectedFilterType === ''}
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedFilterType('');
          filterChanged('');
        }}>
        None
      </Menu.Item>
      <Menu.Item
        disabled={selectedFilterType === 'Highest Units'}
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedFilterType('Highest Units');
          filterChanged('Highest Units');
        }}>
        Highest Units
      </Menu.Item>
      <Menu.Item
        disabled={selectedFilterType === 'Highest Odds'}
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedFilterType('Highest Odds');
          filterChanged('Highest Odds');
        }}>
        Highest Odds
      </Menu.Item>
    </Menu>
  );

  const responsive = [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        draggable: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        draggable: true
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        draggable: true
      }
    },
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
      <DashboardHeader title={'VIP ALL ACCESS CARD'} />
      <Row className={styles.sportsCardList} justify={'center'}>
        <Button className={styles.dropdownBtnWrapper} onClick={onUnlockAll}>
          <div className={`${styles.dropdownBtn} ${styles.dropdownBtnVIPAll}`}>
            <WinnerCupIcon className={styles.lock_icon} />
            <span>ALL SPORTS</span>
          </div>
        </Button>
        <div className={styles.sportsCardListCarousel}>
          <Carousel
            arrows={true}
            dots={false}
            slidesToShow={6}
            responsive={responsive}
            initialSlide={0}
            variableWidth
            infinite={false}
            swipeToSlide
            draggable={false}
            slidesToScroll={1}>
            {sports.map((sport, index) => (
              <div key={index}>
                <Button className={styles.dropdownBtnWrapper} onClick={() => onUnlockItemAt(index)}>
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
              </div>
            ))}
          </Carousel>
        </div>
      </Row>
      <Row className={styles.optionsRow} justify={'center'}>
        <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']} transitionName="">
          <div className={styles.optionBtn}>
            <strong>Filter By&nbsp;</strong>
            <TuneIcon className={styles.tune_icon} />
          </div>
        </Dropdown>
      </Row>
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

  return (
    <div className={styles.earliest_games}>
      <div className={styles.earliest_games_titlebar}>
        <Row align="middle">
          {!hideSection && (
            <CaretDownOutlined className={styles.caret_down} onClick={() => setHideSection(true)} />
          )}
          {hideSection && (
            <CaretUpOutlined className={styles.caret_up} onClick={() => setHideSection(false)} />
          )}
          <strong>
            {title} ({games.length})
          </strong>
        </Row>
      </div>
      {hideSection && (
        <div className={styles.earliest_games_list}>
          {loading && (
            <Row justify={'center'}>
              <Col>
                <Spin />
              </Col>
            </Row>
          )}
          {!loading && games.length === 0 && <div className={styles.noData}>No Games</div>}
          {!loading &&
            games.length &&
            games.map((game: EarliestGameInfoType, index: number) => (
              <div className={styles.game} key={game.id}>
                <div className={styles.game_subinfo}>
                  <SportTile sport={game.sport.name} />
                  <span>Game Starts @ {moment(game.publish_date).format('hh:mm a')}</span>
                </div>
                <div className={styles.game_info}>
                  <div className={styles.game_teams}>
                    {game.schedules.map((schedule: Schedule) => (
                      <>
                        <Row>
                          <div className={styles.game_team1}>
                            <img
                              src={schedule?.team.logo?.url || 'https://via.placeholder.com/100'}
                              alt="Team Logo"
                              className={styles.team_logo}
                            />
                            <span>{schedule.team.name}&nbsp;@&nbsp;</span>
                          </div>
                          <div className={styles.game_team2}>
                            <img
                              src={
                                schedule.home_team?.logo?.url || 'https://via.placeholder.com/100'
                              }
                              alt="Team Logo"
                              className={styles.team_logo}
                            />
                            <span>{schedule.home_team.name}</span>
                          </div>
                        </Row>
                      </>
                    ))}
                    <Row align={'top'} wrap={false}>
                      <LongArrowIcon className={styles.long_arrow_icon} />
                      <span className={styles.desc_line}>
                        {`${game.bet_text} (${game.odds > 0 ? '+' : ''}${
                          game.odds
                        } odds | ${game.odds_decimal.toFixed(2)}x)`}
                      </span>
                    </Row>
                  </div>
                  <div className={styles.units}>{`${game.units} Unit${
                    game.units > 1 ? 's' : ''
                  }`}</div>
                </div>
                <div onClick={() => changeDetailsVisibleAt(index)} className={styles.hide_details}>
                  <div className={styles.hide_details_btn}>
                    <span>View Details</span>
                    {showDetailsAt[index] && <CaretUpOutlined className={styles.caret_up} />}
                    {!showDetailsAt[index] && <CaretDownOutlined className={styles.caret_down} />}
                  </div>
                </div>
                {showDetailsAt[index] && (
                  <div className={styles.details_section}>
                    <ul>
                      {game.detail.split('\n').map((unit: string, i: number) => (
                        <li key={i}>{unit.replace('-', '')}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function BankrollManagementSystem() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <MoneyPocketIcon className={styles.sidebarBlockTitleIcon} />
        <span>Bankroll Management System</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <Row className={styles.ctaBtns}>
          <Button className={styles.agressiveBtn}>Aggresive</Button>
          <Button ghost className={styles.conservativeBtn}>
            Conservative
          </Button>
        </Row>
        <p>1 unit = 2% Bankroll</p>
        <p>2 units = 4% Bankroll</p>
        <p>3 units = 6% Bankroll</p>
        <p>4 units = 8% Bankroll</p>
        <div className={styles.footer_desc}>
          The higher the unit the more confident I am in the play
        </div>
      </div>
    </div>
  );
}

function CommonSportsbooks() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <OpenBookIcon className={styles.sidebarBlockTitleIcon} />
        <span>Common Sportsbooks</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <Row>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.bet365.com/#/HO/">
              <img src="/images/bet365.png" alt="Bet365 Logo" width={94} height={31} />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://betway.com/">
              <img src="/images/betway.png" alt="Betway Logo" width={98} height={32} />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://sportsbook.fanduel.com/">
              <img src="/images/fanduel.png" alt="Fanduel Logo" width={107} height={26} />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://sportsbook.draftkings.com">
              <img
                src="/images/draftkings.png"
                alt="Draftkings SportsBook Logo"
                width={109}
                height={29}
              />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.williamhill.com/us">
              <img
                src="/images/williamhill.png"
                alt="WilliamHill SportsBook Logo"
                width={120}
                height={34}
              />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const MOCK_BetFundaments = [
  {
    id: 1,
    title: 'Favorites vs. Underdogs',
    content:
      'Also known as bookies, are people who are licensed to create betting lines and take wagers. Our goal is to consistently out outperform the bookies by finding value picks for our clients.'
  },
  {
    id: 2,
    title: 'Oddsmakers',
    content:
      'Also known as bookies, are people who are licensed to create betting lines and take wagers. Our goal is to consistently out outperform the bookies by finding value picks for our clients.'
  },
  {
    id: 3,
    title: 'MoneyLine',
    content:
      'Also known as bookies, are people who are licensed to create betting lines and take wagers. Our goal is to consistently out outperform the bookies by finding value picks for our clients.'
  },
  {
    id: 4,
    title: 'Spreads',
    content:
      'Also known as bookies, are people who are licensed to create betting lines and take wagers. Our goal is to consistently out outperform the bookies by finding value picks for our clients.'
  },
  {
    id: 5,
    title: 'Over/Under Totals',
    content:
      'Also known as bookies, are people who are licensed to create betting lines and take wagers. Our goal is to consistently out outperform the bookies by finding value picks for our clients.'
  }
];

function BettingFundamentals() {
  const [showContent, setShowContent] = useState<boolean[]>([]);
  const toggleDetailsAt = (id: number) => {
    showContent[id] = !showContent[id];
    setShowContent(showContent.slice());
  };

  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <ListIcon className={styles.sidebarBlockTitleIcon} />
        <span>Sports Betting Fundamentals</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        {MOCK_BetFundaments.map((data, index) => (
          <React.Fragment key={index}>
            <div className={styles.accordionTitle}>
              {showContent[index] && (
                <>
                  <strong>{data.title}</strong>
                  <Button ghost className={styles.ghostBtn} onClick={() => toggleDetailsAt(index)}>
                    <MinusEncloseIcon className={styles.accordionTitleIcon} />
                  </Button>
                </>
              )}
              {!showContent[index] && (
                <>
                  <span>{data.title}</span>
                  <Button ghost className={styles.ghostBtn} onClick={() => toggleDetailsAt(index)}>
                    <PlusEncloseIcon className={styles.accordionTitleIcon} />
                  </Button>
                </>
              )}
            </div>
            {showContent[index] && <div className={styles.accordionContent}>{data.content}</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
