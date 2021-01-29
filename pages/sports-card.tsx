/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col, Dropdown, Menu, Carousel } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import moment from 'moment';

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
import { EarliestGameInfoType, PageProps, SportInfoType } from '@type/Main';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import LazyLoad from 'react-lazyload';

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

export default function SportsCard({ token, subscriptions }: PageProps) {
  const [openUnlockModal, setOpenUnlockModal] = useState<string | undefined>(undefined);
  const lockedItems = ['NBA', 'NFL'];

  return (
    <>
      <Head>
        <title>The Daily Stakes - Sports Card</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection
            lockedItems={lockedItems}
            openUnlockModal={(sport: SportInfoType) => {
              setOpenUnlockModal(sport.name);
            }}
          />
        </div>
        <div className={styles.containerWrapper}>
          {openUnlockModal && (
            <UnLockItemModal
              sportId={openUnlockModal}
              closeModal={() => setOpenUnlockModal(undefined)}
            />
          )}
          <div className={styles.container}>
            <Row className={styles.content}>
              <Col span={18} className={styles.contentMainCol}>
                <StraightBets />
                <Parlays />
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
  lockedItems: string[];
  openUnlockModal: (_: SportInfoType) => void;
};

function TopSection({ lockedItems, openUnlockModal }: TopSectionPropsType) {
  const [sportMenuOpen, setSportMenuOpen] = useState<boolean>(false);
  const [sportsStatus, setSportsStatus] = useState<number[]>([]);
  const [selectedSportType, setSelectedSportType] = useState<string>('Largest Profit');

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

  const changeMenuVisible = (status: boolean) => {
    setSportMenuOpen(status);
  };
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

  const menu = (
    <Menu className={styles.sportMenu}>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedSportType('Largest Profit');
          setSportMenuOpen(false);
        }}>
        Largest Profit
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedSportType('Medium Profit');
          setSportMenuOpen(false);
        }}>
        Medium Profit
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedSportType('Small Profit');
          setSportMenuOpen(false);
        }}>
        Small Profit
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
      <Row className={styles.optionsRow} justify={'center'}>
        <Dropdown
          overlay={menu}
          onVisibleChange={changeMenuVisible}
          placement="bottomLeft"
          transitionName=""
          trigger={['click']}>
          <div className={styles.optionBtn}>
            <span>
              <strong>Sport:&nbsp;</strong>
              {selectedSportType}
            </span>
            {sportMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
            {!sportMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
          </div>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']} transitionName="">
          <div className={styles.optionBtn}>
            <strong>Filter Cards&nbsp;</strong>
            <TuneIcon className={styles.tune_icon} />
          </div>
        </Dropdown>
      </Row>
    </>
  );
}

const Mock_EarlestGames: EarliestGameInfoType[] = [
  {
    id: 1,
    sportType: 'NBA',
    startDate: '6:30PM',
    teams: [
      {
        name: 'Utah Jazz',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/utah_jazz.png'
      },
      {
        name: 'Denver Nuggets',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/denver_nuggest.png'
      }
    ],
    state: 'Denver Nuggets Money Line',
    odds: -110,
    price: 1.9,
    units: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    ]
  },
  {
    id: 2,
    sportType: 'NBA',
    startDate: '6:30PM',
    teams: [
      {
        name: 'Utah Jazz',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/utah_jazz.png'
      },
      {
        name: 'Denver Nuggets',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/denver_nuggest.png'
      }
    ],
    state: 'Denver Nuggets Money Line',
    odds: -110,
    price: 1.9,
    units: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    ]
  },
  {
    id: 3,
    sportType: 'NBA',
    startDate: '6:30PM',
    teams: [
      {
        name: 'Utah Jazz',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/utah_jazz.png'
      },
      {
        name: 'Denver Nuggets',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/denver_nuggest.png'
      }
    ],
    state: 'Denver Nuggets Money Line',
    odds: -110,
    price: 1.9,
    units: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    ]
  },
  {
    id: 4,
    sportType: 'NBA',
    startDate: '6:30PM',
    teams: [
      {
        name: 'Utah Jazz',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/utah_jazz.png'
      },
      {
        name: 'Denver Nuggets',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/denver_nuggest.png'
      }
    ],
    state: 'Denver Nuggets Money Line',
    odds: -110,
    price: 1.9,
    units: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    ]
  }
];

function StraightBets() {
  const [showDetailsAt, setShowDetailsAt] = useState<boolean[]>([]);
  const [hideSection, setHideSection] = useState<boolean>(true);
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
          <strong>Straight Bets ({Mock_EarlestGames.length})</strong>
        </Row>
        <span>{moment().format('h:mm a DD/MM/YYYY')}</span>
      </div>
      {hideSection && (
        <div className={styles.earliest_games_list}>
          {Mock_EarlestGames.map((game: EarliestGameInfoType, index: number) => (
            <div className={styles.game} key={game.id}>
              <div className={styles.game_subinfo}>
                <SportTile sport={game.sportType} />
                <span>Game Starts @ {game.startDate}</span>
              </div>
              <div className={styles.game_info}>
                <div className={styles.game_teams}>
                  <Row>
                    <div className={styles.game_team1}>
                      <img src={game.teams[0].logo} className={styles.team_logo} />
                      <span>{game.teams[0].name}&nbsp;@&nbsp;</span>
                    </div>
                    <div className={styles.game_team2}>
                      <img src={game.teams[1].logo} className={styles.team_logo} />
                      <span>{game.teams[1].name}</span>
                    </div>
                  </Row>
                  <Row align={'top'} wrap={false}>
                    <LongArrowIcon className={styles.long_arrow_icon} />
                    <span className={styles.desc_line}>
                      {`${game.state} (${game.odds} odds | ${game.price})`}
                    </span>
                  </Row>
                </div>
                <div className={styles.units}>{`${game.units.length} Units`}</div>
              </div>
              <div className={styles.hide_details}>
                <div
                  onClick={() => changeDetailsVisibleAt(index)}
                  className={styles.hide_details_btn}>
                  <span>View Details</span>
                  {showDetailsAt[index] && <CaretUpOutlined className={styles.caret_up} />}
                  {!showDetailsAt[index] && <CaretDownOutlined className={styles.caret_down} />}
                </div>
              </div>
              {showDetailsAt[index] && (
                <div className={styles.details_section}>
                  <ul>
                    {game.units.map((unit: string, i: number) => (
                      <li key={i}>{unit}</li>
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

function Parlays() {
  const [showDetailsAt, setShowDetailsAt] = useState<boolean[]>([]);
  const [hideSection, setHideSection] = useState<boolean>(false);
  const changeDetailsVisibleAt = (index: number) => {
    showDetailsAt[index] = !showDetailsAt[index];
    setShowDetailsAt(showDetailsAt.slice());
  };

  return (
    <div className={`${styles.earliest_games} ${styles.prayers}`}>
      <div className={styles.earliest_games_titlebar}>
        <Row align="middle">
          {!hideSection && (
            <CaretDownOutlined className={styles.caret_down} onClick={() => setHideSection(true)} />
          )}
          {hideSection && (
            <CaretUpOutlined className={styles.caret_up} onClick={() => setHideSection(false)} />
          )}
          <strong>Parlays ({Mock_EarlestGames.length})</strong>
        </Row>
        <span>{moment().format('h:mm a DD/MM/YYYY')}</span>
      </div>
      {hideSection && (
        <div className={styles.earliest_games_list}>
          {Mock_EarlestGames.map((game: EarliestGameInfoType, index: number) => (
            <div className={styles.game} key={game.id}>
              <div className={styles.game_subinfo}>
                <SportTile sport={game.sportType} />
                <span>Game Starts @ {game.startDate}</span>
              </div>
              <div className={styles.game_info}>
                <div className={styles.game_teams}>
                  <Row wrap={false}>
                    <LongArrowIcon className={styles.long_arrow_icon} />
                    <div className={styles.game_team1}>
                      <img src={game.teams[0].logo} className={styles.team_logo} />
                      <span>{game.teams[0].name}&nbsp;-&nbsp;Money Line</span>
                    </div>
                  </Row>
                  <Row wrap={false}>
                    <LongArrowIcon className={styles.long_arrow_icon} />
                    <div className={styles.game_team2}>
                      <img src={game.teams[1].logo} className={styles.team_logo} />
                      <span>{game.teams[1].name}&nbsp;-&nbsp;Money Line</span>
                    </div>
                  </Row>
                </div>
                <div className={styles.desc_line}>{`(${game.odds} odds | ${game.price})`}</div>
                <div className={styles.units}>{`${game.units.length} Units`}</div>
              </div>
              <div className={styles.hide_details}>
                <div
                  onClick={() => changeDetailsVisibleAt(index)}
                  className={styles.hide_details_btn}>
                  <span>View Details</span>
                  {showDetailsAt[index] && <CaretUpOutlined className={styles.caret_up} />}
                  {!showDetailsAt[index] && <CaretDownOutlined className={styles.caret_down} />}
                </div>
              </div>
              {showDetailsAt[index] && (
                <div className={styles.details_section}>
                  <ul>
                    {game.units.map((unit: string, i: number) => (
                      <li key={i}>{unit}</li>
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
  sportId: string;
};

function UnLockItemModal({ sportId, closeModal }: UnlockItemModalPropsType) {
  const [packTypeMenuOpen, setPackTypeMenuOpen] = useState<boolean>(false);
  const [selectedPackType, setSelectedPackType] = useState<string>('Monthly - $289.00');
  const [memberTypeMenuOpen, setMemberTypeMenuOpen] = useState<boolean>(false);
  const [selectedMemberType, setSelectedMemberType] = useState<string>('Monthly - $300.00');
  const PackTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedPackType('Monthly - $289.00');
          setPackTypeMenuOpen(false);
        }}>
        Monthly - $289.00
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedPackType('Yearly - $2890.00');
          setPackTypeMenuOpen(false);
        }}>
        Yearly - $2890.00
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedPackType('Weekly - $50.00');
          setPackTypeMenuOpen(false);
        }}>
        Weekly - $50.00
      </Menu.Item>
    </Menu>
  );
  const MemberTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedMemberType('Monthly - $289.00');
          setMemberTypeMenuOpen(false);
        }}>
        Monthly - $300.00
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedMemberType('Yearly - $2890.00');
          setMemberTypeMenuOpen(false);
        }}>
        Yearly - $3000.00
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedMemberType('Weekly - $50.00');
          setMemberTypeMenuOpen(false);
        }}>
        Weekly - $60.00
      </Menu.Item>
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
              <h4>{sportId} Access</h4>
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
                    <span>{selectedPackType}</span>
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
                    <span>{selectedMemberType}</span>
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
