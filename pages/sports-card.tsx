/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col, Dropdown, Menu, Carousel, Spin } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import moment from 'moment';
import LazyLoad from 'react-lazyload';

import { AppLayout, BannerSportsAndMatches, DashboardHeader, SportTile } from '@components/index';
import {
  AllSportsBtnBgIcon,
  ListIcon,
  LockIcon,
  MinusEncloseIcon,
  MoneyPocketIcon,
  OpenBookIcon,
  PlusEncloseIcon,
  TuneIcon
} from '@components/SvgIcons';
import styles from '@styles/SportsCard.module.css';
import { LongArrowIcon } from '@components/SvgIcons';
import { EarliestGameInfoType, PageProps } from '@type/Main';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import { Sport } from '@type/Sports';
import SportsAPIs from '@apis/sport.apis';
import { BillingPlan, Package } from '@type/Packages';
import PackageAPIs from '@apis/package.apis';
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

export default function SportsCard({ token, subscriptions, sports, packages }: PageProps) {
  const [openUnlockModal, setOpenUnlockModal] = useState<Sport | undefined>(undefined);
  const [activeSport, setActiveSport] = useState<number>(-1);
  const [filterType, setFilterType] = useState<string>('');
  const [unlockedItems, setUnlockedItems] = useState<number[]>([]);

  useEffect(() => {
    const items: number[] = [];
    subscriptions.forEach((subscription) => {
      if (subscription.plan.name.toLowerCase().indexOf('sports card') > -1) {
        items.push(subscription.sports[0].id);
      }
    });
    setUnlockedItems(items);
  }, [subscriptions]);

  return (
    <>
      <Head>
        <title>The Daily Stakes - Sports Card</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection
            sports={sports}
            unlockedItems={unlockedItems}
            changeActiveSport={(sport) => {
              setActiveSport(sport);
              setOpenUnlockModal(undefined);
            }}
            openUnlockModal={(sport: Sport) => {
              setOpenUnlockModal(sport);
            }}
            filterChanged={(filter) => {
              setFilterType(filter);
            }}
          />
        </div>
        <div className={styles.containerWrapper}>
          {openUnlockModal && packages && (
            <UnLockItemModal
              sport={openUnlockModal}
              packages={packages}
              closeModal={() => setOpenUnlockModal(undefined)}
            />
          )}
          <div className={styles.container}>
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
  unlockedItems: number[];
  sports: Sport[];
  openUnlockModal: (_: Sport) => void;
  changeActiveSport: (_: number) => void;
  filterChanged: (_: string) => void;
};

function TopSection({
  unlockedItems,
  sports,
  openUnlockModal,
  changeActiveSport,
  filterChanged
}: TopSectionPropsType) {
  const [selectedFilterType, setSelectedFilterType] = useState<string>('');
  const [sportsStatus, setSportsStatus] = useState<number[]>([]);

  useEffect(() => {
    console.log('-- unlockedItems:', unlockedItems);
    const selectedStatus = sports.map((sport: Sport) => {
      const unlockedItemIndex = unlockedItems.findIndex((item: number) => item === sport.id);
      if (unlockedItemIndex > -1) {
        return 1;
      }
      return 0;
    });
    setSportsStatus(selectedStatus);
  }, [unlockedItems]);

  const onUnlockItemAt = (index: number) => {
    const items = sportsStatus.slice();
    if (items[index] === 1) {
      const newItems = items.fill(1);
      newItems[index] = 2;
      setSportsStatus(newItems);
      changeActiveSport(sports[index].id);
    } else if (items[index] === 2) {
      const newItems = items.slice();
      newItems[index] = 1;
      setSportsStatus(newItems);
      changeActiveSport(-1);
    } else {
      openUnlockModal(sports[index]);
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
      <DashboardHeader title={'Sports Card'} />
      <Row className={styles.sportsCardList} justify={'center'}>
        <Button className={styles.dropdownBtnWrapper}>
          <div className={`${styles.dropdownBtn} ${styles.dropdownBtnAll}`}>
            <LockIcon className={styles.lock_icon} />
            <span>VIP ALL ACCESS CARD</span>
            <AllSportsBtnBgIcon className={styles.dropdownBtnAllBg} />
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
            {sports.map((sport: Sport, index: number) => (
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
                        sportsStatus[index] === 2
                          ? SPORTS_INFO.filter(
                              (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                            )[0]?.background
                          : ''
                    }}>
                    {SPORTS_INFO.filter(
                      (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                    )[0]?.logo()}
                    {unlockedItems.indexOf(sport.id) < 0 && (
                      <LockIcon className={styles.lock_icon} />
                    )}
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

type UnlockItemModalPropsType = {
  closeModal: () => void;
  sport: Sport;
  packages: Package[];
};

function UnLockItemModal({ sport, closeModal, packages }: UnlockItemModalPropsType) {
  const sportCardPack = packages.filter((pack) => pack.name.indexOf('Sports Card') > -1)[0];
  const vipAllAccessPack = packages.filter((pack) => pack.name.indexOf('VIP All Access') > -1)[0];
  const [packTypeMenuOpen, setPackTypeMenuOpen] = useState<boolean>(false);
  const [selectedPackType, setSelectedPackType] = useState<BillingPlan>(
    sportCardPack.billing_plans[0]
  );
  const [memberTypeMenuOpen, setMemberTypeMenuOpen] = useState<boolean>(false);
  const [selectedMemberType, setSelectedMemberType] = useState<BillingPlan>(
    vipAllAccessPack.billing_plans[0]
  );
  const PackTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      {sportCardPack.billing_plans?.map((plan) => (
        <Menu.Item
          key={plan.id}
          className={styles.sportMenuItem}
          onClick={() => {
            setSelectedPackType(plan);
            setPackTypeMenuOpen(false);
          }}>
          {`${plan.name}`}
        </Menu.Item>
      ))}
    </Menu>
  );
  const MemberTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      {sportCardPack.billing_plans?.map((plan) => (
        <Menu.Item
          key={plan.id}
          className={styles.sportMenuItem}
          onClick={() => {
            setSelectedMemberType(plan);
            setMemberTypeMenuOpen(false);
          }}>
          {`${plan.name}`}
        </Menu.Item>
      ))}
    </Menu>
  );

  const changeMemberMenuVisible = (status: boolean) => {
    setMemberTypeMenuOpen(status);
  };
  const changePackMenuVisible = (status: boolean) => {
    setPackTypeMenuOpen(status);
  };

  return (
    <div className={styles.unlockItemModal}>
      <div className={styles.modalWrapper} onClick={closeModal} />
      <Row align={'middle'} justify={'center'} className={styles.modalContainer}>
        <LazyLoad>
          <img
            src="/images/new_pack_bg.jpg"
            alt="Package Add Modal Background"
            className={styles.modalBg}
          />
        </LazyLoad>
        <div className={styles.modalOverlay} />
        <div className={styles.modalContent}>
          <div className={styles.contentTitle}>
            You need to purchase this pack in order to view the picks
          </div>
          <div className={styles.contentDesc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel amet lorem odio
            tincidunt sed dolor commodo risus.
          </div>
          <Row className={styles.plans} align={'middle'} justify="center">
            <div className={styles.plan}>
              <h4>{sport.name} Access</h4>
              <p>Ut aliquam eleifend et fames.</p>
              <div>
                <label>Select Pack Type</label>
                <Dropdown
                  overlay={PackTypeMenu}
                  onVisibleChange={changePackMenuVisible}
                  placement="bottomLeft"
                  transitionName=""
                  trigger={['click']}>
                  <div className={styles.optionBtn}>
                    <span>{selectedPackType.name}</span>
                    {packTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
                    {!packTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
                  </div>
                </Dropdown>
              </div>
              <Button className={styles.planSubmitBtn}>Add to Sports Card</Button>
            </div>
            <div className={styles.orText}>OR</div>
            <div className={styles.plan}>
              <h4>VIP ALL ACCESS CARD</h4>
              <p>Ut aliquam eleifend et fames.</p>
              <div>
                <label>Select Pack Type</label>
                <Dropdown
                  overlay={MemberTypeMenu}
                  onVisibleChange={changeMemberMenuVisible}
                  placement="bottomLeft"
                  transitionName=""
                  trigger={['click']}>
                  <div className={styles.optionBtn}>
                    <span>{selectedMemberType.name}</span>
                    {memberTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
                    {!memberTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
                  </div>
                </Dropdown>
              </div>
              <Button className={styles.planSubmitBtn}>Add Membership</Button>
            </div>
          </Row>
        </div>
      </Row>
    </div>
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
