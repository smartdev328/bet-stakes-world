import React, { useState } from 'react';
import Head from 'next/head';
import { Image, Row, Button, Col, Dropdown, Menu } from 'antd';
import Link from 'next/link';
import { PlusOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import moment from 'moment';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import styles from '@styles/MemberDashboard.module.css';
import {
  ThickStarIcon,
  CaretDownInCircleIcon,
  ConfigIcon,
  MobilePhoneIcon,
  LongArrowIcon
} from '@components/SvgIcons';
import { EarliestGameInfoType, YesterdayPlayInfoType } from '@type/Main';

export default function MemberDashboard() {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Member Dashboard</title>
      </Head>
      <AppLayout bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection />
          <Row className={styles.nowrapRow}>
            <Col span={18} className={styles.current_packages_container}>
              <CurrentPackages />
            </Col>
            <Col span={6} className={styles.weekly_pro_tip_container}>
              <WeeklyProTip />
            </Col>
          </Row>
          <Row className={styles.nowrapRow}>
            <Col span={18} className={styles.earliest_games_col}>
              <EarliestGames />
            </Col>
          </Row>
          <Row>
            <Col span={18} className={styles.yesterday_plays_col}>
              <YesterdayPlays />
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
      <Image src="/images/member_dashboard.jpg" preview={false} className={styles.bgImage} />
      <BannerSportsAndMatches />
    </div>
  );
}

function TopSection() {
  return (
    <>
      <Row className={styles.topSection}>
        <Col span={12} className={styles.left}>
          <Row align={'middle'}>
            <Button ghost className={styles.thick_star_btn}>
              <ThickStarIcon className={styles.thick_star_icon} />
            </Button>
            <span>Member dashboard</span>
            <Button ghost className={styles.caret_down_btn}>
              <CaretDownInCircleIcon className={styles.caret_down_icon} />
            </Button>
          </Row>
        </Col>
        <Col span={12} className={styles.right}>
          <Button className={styles.sms_send_btn}>
            <MobilePhoneIcon className={styles.mobile_phone_icon} />
            Recieve your picks via text!
          </Button>
          <Button ghost className={styles.config_btn}>
            <ConfigIcon className={styles.config_btn_icon} />
          </Button>
        </Col>
      </Row>
      <Row align={'middle'} justify={'space-between'} className={styles.welcome_row}>
        <Col className={styles.welcome_left}>Welcome back Nicolas!</Col>
        <Col className={styles.welcome_right}>
          <strong>Overall Record:</strong>&nbsp;123-54
        </Col>
      </Row>
    </>
  );
}

function CurrentPackages() {
  return (
    <div className={styles.current_packages}>
      <div className={styles.block_title}>Current Packages</div>
      <div className={styles.block_content}>
        <div className={styles.package_card}>
          <div className={styles.package_status}>Renews in 23 days</div>
          <div className={styles.package_card_content}>
            <Image src="/images/sports_card_bg.png" className={styles.package_card_img} />
            <div className={styles.package_title}>
              <h3>Sports Card</h3>
              <p>Monthly Picks</p>
            </div>
            <p className={styles.package_desc}>Current record: 90-0</p>
            <Button className={styles.cta_btn}>View Picks</Button>
          </div>
        </div>
        <div className={styles.package_card}>
          <div className={styles.package_status}>Expired 2 day ago</div>
          <div className={styles.package_card_content}>
            <Image src="/images/daily_lineups_bg.png" className={styles.package_card_img} />
            <div className={styles.package_title}>
              <h3>Fantasy</h3>
              <p>Daily lineups</p>
            </div>
            <p className={styles.package_desc}>Current record: 90-0</p>
            <Button className={styles.cta_btn}>Reactivate Package</Button>
          </div>
        </div>
        <div className={styles.package_card}>
          <div className={`${styles.package_card_content} ${styles.full_height}`}>
            <Button className={styles.plus_package_btn}>
              <PlusOutlined />
            </Button>
            <h1>Add to your package</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeeklyProTip() {
  return (
    <div className={styles.weekly_pro_tip}>
      <div className={styles.block_title}>Weekly Pro Tip</div>
      <div className={styles.block_content}>
        <p className={styles.weekly_pro_tip_intro}>MLB Preseason</p>
        <Image src="/images/badminton_player.jpg" className={styles.weekly_pro_tip_img} />
        <h4>Lorem ipsum dolor sit amet, consecteturadipiscing elit</h4>
        <p className={styles.weekly_pro_tip_desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam massa et velit enim senectus
          iaculis id. Mattis posuere vulputate habitant non massa eget cursus. Volutpat maecenas
          tristique ultricies nibh scelerisque semper. Id vel quis urna adipiscing.
        </p>
        <Link href="/">
          <a>View previous tips</a>
        </Link>
      </div>
    </div>
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
    sportType: 'NFL',
    startDate: '10:30PM',
    teams: [
      {
        name: 'Cleveland Browns',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Cleveland_browns.png'
      },
      {
        name: 'Pittsburgh Steelers',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Pittsburgh_Steelers.png'
      }
    ],
    state: 'Cleveland Browns Money Line',
    odds: -110,
    price: 1.9,
    units: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    ]
  },
  {
    id: 3,
    sportType: 'NFL',
    startDate: '10:30PM',
    teams: [
      {
        name: 'New England Patriots',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_England_Patriots.png'
      },
      {
        name: 'New York Jets',
        logo: 'https://dailystakes-assets.s3.us-east-2.amazonaws.com/New_York_Jets.png'
      }
    ],
    state: 'New York Jets Money Line',
    odds: -110,
    price: 1.9,
    units: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    ]
  }
];

function EarliestGames() {
  const [betMenuOpen, setBetMenuOpen] = useState<boolean>(false);
  const [sportMenuOpen, setSportMenuOpen] = useState<boolean>(false);
  const [showDetailsAt, setShowDetailsAt] = useState<boolean[]>([]);
  const [selectedBetType, setSelectedBetType] = useState<string>('Straight Bets');
  const [selectedSportType, setSelectedSportType] = useState<string>('All');
  const changeMenuVisible = (status: boolean) => {
    setSportMenuOpen(status);
  };
  const changeBetMenuVisible = (status: boolean) => {
    setBetMenuOpen(status);
  };
  const menu = (
    <Menu className={styles.sportMenu}>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedBetType('Straight Bets');
          setBetMenuOpen(false);
        }}>
        Straight Bets
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedBetType('Bets1');
          setBetMenuOpen(false);
        }}>
        Bets1
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedBetType('Bets2');
          setBetMenuOpen(false);
        }}>
        Bets2
      </Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu className={styles.sportMenu}>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedSportType('All');
          setSportMenuOpen(false);
        }}>
        All
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedSportType('NBA');
          setSportMenuOpen(false);
        }}>
        NBA
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedSportType('NFL');
          setSportMenuOpen(false);
        }}>
        NFL
      </Menu.Item>
    </Menu>
  );
  const changeDetailsVisibleAt = (index: number, status: boolean) => {
    showDetailsAt[index] = status;
    setShowDetailsAt(showDetailsAt.slice());
  };

  return (
    <div className={styles.earliest_games}>
      <div className={styles.earliest_games_header}>
        <div className={styles.block_title}>Earliest Games</div>
        <Row>
          <Dropdown
            overlay={menu}
            onVisibleChange={changeBetMenuVisible}
            placement="bottomLeft"
            trigger={['click']}>
            <div className={styles.dropdownBtn}>
              <span>
                <strong>Betting Type:&nbsp;</strong>
                {selectedBetType}
              </span>
              {betMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
              {!betMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
            </div>
          </Dropdown>
          <Dropdown
            overlay={menu2}
            onVisibleChange={changeMenuVisible}
            placement="bottomLeft"
            trigger={['click']}>
            <div className={styles.dropdownBtn}>
              <span>
                <strong>Sport:&nbsp;</strong>
                {selectedSportType}
              </span>
              {sportMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
              {!sportMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
            </div>
          </Dropdown>
        </Row>
      </div>
      <div className={styles.earliest_games_titlebar}>
        <strong>Straight Bets</strong>
        <span>{moment().format('h:mm a DD/MM/YYYY')}</span>
      </div>
      <div className={styles.earliest_games_list}>
        {Mock_EarlestGames.map((game: EarliestGameInfoType, index: number) => (
          <div className={styles.game} key={game.id}>
            <div className={styles.game_subinfo}>
              <span
                className={`${styles.gameSportType} ${styles['gameSportType_' + game.sportType]}`}>
                {game.sportType}
              </span>
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
              <div className={styles.units} onClick={() => changeDetailsVisibleAt(index, true)}>
                {`${game.units.length} Units`}
              </div>
            </div>
            {showDetailsAt[index] && (
              <div className={styles.details_section}>
                <div
                  onClick={() => changeDetailsVisibleAt(index, false)}
                  className={styles.hide_details}>
                  <div className={styles.hide_details_btn}>
                    <span>Hide Details</span>
                    <CaretUpOutlined className={styles.caret_up} />
                  </div>
                </div>
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
    </div>
  );
}

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
    isWinner: false,
    patriots: true
  },
  {
    id: 3,
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
  }
];

function YesterdayPlays() {
  return (
    <div className={styles.yesterday_plays}>
      <div className={styles.earliest_games_header}>
        <div className={styles.block_title}>Yesterday Plays</div>
        <Link href="/">
          <a>View All</a>
        </Link>
      </div>
      <div className={styles.earliest_games_titlebar}>
        <strong>10 Wins in 14 Games</strong>
      </div>
      <div className={styles.yesterday_plays_list}>
        {Mock_YesterdayPlays.map((game: YesterdayPlayInfoType) => (
          <div className={`${styles.game} ${game.patriots && styles.is_patriots}`} key={game.id}>
            <div className={styles.game_status}>{game.isWinner ? 'W' : 'L'}</div>
            <div className={styles.game_main}>
              <div className={styles.game_subinfo}>
                <span
                  className={`${styles.gameSportType} ${
                    styles['gameSportType_' + game.sportType]
                  }`}>
                  {game.sportType}
                </span>
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
                  35 - 31
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
