/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col, Carousel } from 'antd';
import {
  AppLayout,
  BannerSportsAndMatches,
  DashboardHeader,
  SportEntryActive
} from '@components/index';
import {
  ListIcon,
  MinusEncloseIcon,
  MoneyPocketIcon,
  OpenBookIcon,
  PlusEncloseIcon,
  WinnerCupIcon
} from '@components/SvgIcons';
import SportsAPIs from '@apis/sport.apis';
import styles from '@styles/SportsCard.module.css';
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
            slidesToShow={8}
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

function BankrollManagementSystem() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <MoneyPocketIcon className={styles.sidebarBlockTitleIcon} />
        <span>Bankroll Management System</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <p>
          A unit represents a percentage of your bankroll and should generally represent between 1
          to 5 percent of your bankroll. Setting a unit percentage for your bankroll is completely
          at the users discretion. The higher the unit percentage, the more aggressive your
          bankroll. For example, for a $5,000 starting bankroll, a 1 unit wager would represent
          $100, i.e. 2% of your bankroll.
        </p>
        <p>1 unit = 2% Bankroll</p>
        <p>2 units = 4% Bankroll</p>
        <p>3 units = 6% Bankroll</p>
        <p>4 units = 8% Bankroll</p>
        <div className={styles.footer_desc}>
          TheDailyStakes recommends setting 1 unit as 2% of your bankroll.
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
    title: 'Oddsmakers',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },
  {
    id: 2,
    title: 'Moneyline',
    content:
      'This is the simplest type of bet to grasp. Betting the Moneyline simply means that your team needs to win the game. The minus sign next to the odds denotes the favorite & the plus sign denotes the underdog team.'
  },
  {
    id: 3,
    title: 'Spread',
    content:
      'Also known as the point spread & one of the most popular forms of betting. A favorite gives points and an underdog gets points. The minus sign (favorite) denotes that that team has to win by more than that margin while the plus sign (underdog) indicates that the other team can lose by that margin, or win the game, and they cover the spread in either case. (Ex: Lakers -5 means the Lakers have to win by more than 5 points to cover the spread).'
  },
  {
    id: 4,
    title: 'Prop Bet',
    content:
      'Prop bets are a more exciting way to enhance betting beyond the Moneyline or Point Spread. It provides you a way to place wagers beyond only game outcomes. Player Props are amongst the most popular prop bets..'
  },
  {
    id: 5,
    title: 'Over/Unders',
    content:
      'Also known as a totals bets is wagering on the total for a particular game that is set by oddsmakers based on a particular matchup and how the game will unfold from a scoring point of view. As a person betting on a totals bet, you would need to select if the total number of points scored by both teams will be over or under the total set by oddsmakers.'
  },
  {
    id: 6,
    title: 'Parlay',
    content:
      'A parlay is a single bet that combines two or more wagers. In order to win the bet, the player must win all the wagers for a given parlay. If one of the bets fall through, the entire bet is lost. If the players wins all the wagers for a given parlay, the player wins a greater payout compared to placing the bets separately. '
  },
  {
    id: 7,
    title: 'Bonus Wildcard Plays',
    content:
      "These are unofficial bets proposed by TheDailyStakes. They're intended to be wagered in small amounts making them low risk high return plays. We all love stacked parlays and having a bit of skin in the game for a large wildcard play is always enticing for sports fans, casuals & bettors."
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
