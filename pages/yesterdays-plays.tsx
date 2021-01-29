/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col, Dropdown, Menu, Carousel } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';

import { AppLayout, BannerSportsAndMatches, DashboardHeader, SportTile } from '@components/index';
import { LockIcon } from '@components/SvgIcons';
import styles from '@styles/YesterdaysPlays.module.css';
import { PageProps, SportInfoType, YesterdayPlayInfoType } from '@type/Main';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';

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

const Mock_YesterdayPlays: YesterdayPlayInfoType[] = [
  {
    id: 1,
    sportType: 'NFL',
    startDate: '10:30PM',
    teams: [
      {
        name: 'New England Patriots',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_England_Patriots.png',
        score: 35
      },
      {
        name: 'New York Jets',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_York_Jets.png',
        score: 31
      }
    ],
    state: 'New York Jets Money Line',
    odds: -110,
    price: 1.9,
    isWinner: true
  },
  {
    id: 2,
    sportType: 'NFL',
    startDate: '10:30PM',
    teams: [
      {
        name: 'Cincinnati Bengals',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_England_Patriots.png',
        score: 10
      },
      {
        name: 'Los Angeles Rams',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_York_Jets.png',
        score: 3
      }
    ],
    state: 'Los Angeles Rams Money Line',
    odds: -110,
    price: 1.9,
    isWinner: true
  },
  {
    id: 3,
    sportType: 'NBA',
    startDate: '10:30PM',
    teams: [
      {
        name: 'Washington Wizards',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_England_Patriots.png',
        score: 92
      },
      {
        name: 'Orlando Magic',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_York_Jets.png',
        score: 89
      }
    ],
    state: 'New York Jets Money Line',
    odds: -110,
    price: 1.9,
    isWinner: true
  },
  {
    id: 4,
    sportType: 'NFL',
    startDate: '10:30PM',
    teams: [
      {
        name: 'New Orleans Saints',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_England_Patriots.png',
        score: 27
      },
      {
        name: 'Denver Broncos',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_York_Jets.png',
        score: 14
      }
    ],
    state: 'New Orleans Saints Money Line',
    odds: -110,
    price: 1.9,
    isWinner: false,
    patriots: true
  },
  {
    id: 5,
    sportType: 'NBA',
    startDate: '10:30PM',
    teams: [
      {
        name: 'Boston Celtics',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_England_Patriots.png',
        score: 81
      },
      {
        name: 'Miami Heat',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_York_Jets.png',
        score: 73
      }
    ],
    state: 'Miami Heats Money Line',
    odds: -110,
    price: 1.9,
    isWinner: true
  }
];

export default function YesterdaysPlays({ token, subscriptions }: PageProps) {
  const [openUnlockModal, setOpenUnlockModal] = useState<string | undefined>(undefined);
  const lockedItems = ['NBA', 'NFL'];
  const [yesterdayPlays, setYesterdayPlays] = useState<YesterdayPlayInfoType[]>(
    Mock_YesterdayPlays
  );
  const [fetchMoreLoading, setFetchMoreLoading] = useState<boolean>(false);

  const onLoadMore = () => {
    setFetchMoreLoading(true);
    setTimeout(() => {
      let plays = yesterdayPlays.slice();
      plays = plays.concat(Mock_YesterdayPlays.slice(0, 3));
      setYesterdayPlays(plays);
      setFetchMoreLoading(false);
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Yesterdays plays</title>
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
              <Col span={24} className={styles.contentMainCol}>
                <YesterdayPlays plays={yesterdayPlays} />
                <Row>
                  <Col span={24} className="text-center">
                    <Button
                      loading={fetchMoreLoading}
                      onClick={onLoadMore}
                      className={styles.loadMoreBtn}>
                      Load More
                    </Button>
                  </Col>
                </Row>
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
      <DashboardHeader title={'Yesterdays plays'} />
      <Row className={styles.sportsCardList} justify={'center'}>
        <Button className={styles.dropdownBtnWrapper}>
          <div className={`${styles.dropdownBtn} ${styles.dropdownBtnAll}`}>
            <span>All</span>
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
    </>
  );
}

function YesterdayPlays({ plays }: { plays: YesterdayPlayInfoType[] }) {
  return (
    <div className={styles.yesterday_plays}>
      <div className={styles.yesterday_plays_list}>
        {plays.map((game: YesterdayPlayInfoType, index: number) => (
          <div className={`${styles.game} ${game.patriots && styles.is_patriots}`} key={index}>
            <div className={styles.game_status}>{game.isWinner ? 'W' : 'L'}</div>
            <div className={styles.game_main}>
              <div className={styles.game_subinfo}>
                <SportTile sport={game.sportType} />
                <span>Yesterday at {game.startDate}</span>
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
                  <Row
                    align={'middle'}
                    className={`${styles.desc_line_section} ${
                      game.patriots && styles.has_patriots
                    }`}>
                    <div className={styles.desc_line}>
                      <span>{game.state}</span>
                      {game.patriots && (
                        <div className={styles.strikeLine}>--------------------------—</div>
                      )}
                    </div>
                    <div className={styles.desc_line}>
                      <span>&nbsp;{`${game.odds} odds | ${game.price}`}</span>
                      {game.patriots && (
                        <div className={styles.strikeLine}>--------------------------—</div>
                      )}
                    </div>
                    {game.patriots && <div className={styles.patriots_text}>PATRIOTS</div>}
                  </Row>
                </div>
                <div className={`${styles.game_score} ${game.patriots && styles.has_patriots}`}>
                  {`${game.teams[0].score} - ${game.teams[1].score}`}
                </div>
              </div>
            </div>
          </div>
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
