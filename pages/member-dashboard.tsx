import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col, Dropdown, Menu, notification } from 'antd';
import Link from 'next/link';
import { PlusOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '@redux/reducers';
import { UserReducerState } from '@redux/reducers/user';

import {
  AppLayout,
  BannerSportsAndMatches,
  DashboardHeader,
  SportEntryActive,
  SportEntry,
  DailyFantasyLineups,
  WhereToWatchGame,
  WhereBuyGear,
  VipAllAccessCard,
  CommonSportsBook,
  BankRollManagement,
  BettingFundamentals
} from '@components/index';
import styles from '@styles/MemberDashboard.module.css';
import { EarliestGameInfoType, PageProps, YesterdayPlayInfoType } from '@type/Main';
import { UserSubscription } from '@type/Users';
import WeeklyTipsAPIs from '@apis/utils.apis';
import SportsAPIs from '@apis/sport.apis';
import { WeeklyTip } from '@type/WeeklyTips';
import { Sport } from '@type/Sports';
import PackageAPIs from '@apis/package.apis';
import UsersAPIs from '@apis/user.apis';
import { BillingPlan, Package } from '@type/Packages';
import { PACKAGE_NAMES, SportBetTypes } from '@constants/';
import checkoutApis from '@apis/checkout.apis';
import { CheckoutSessionType } from '@type/Cart';

// const EmptyOverall = {
//   loss: 0,
//   wins: 0,
//   draw: 0
// };

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <img
        src="/images/FinalBanner.jpg"
        alt="Member Dashboard Background"
        className={styles.bgImage}
      />
      <BannerSportsAndMatches />
    </div>
  );
}

function TopSection({
  profileName,
  initialName,
  // overallInfo,
  user
}: {
  profileName: string;
  initialName: string;
  // overallInfo: Overall;
  user: UserReducerState;
}) {
  // const { wins = 0, draw = 0, loss = 0 } = overallInfo;
  return (
    <>
      <DashboardHeader title={'Member Dashboard'} />
      <Row align={'middle'} justify={'space-between'} className={styles.welcome_row}>
        <Row>
          <Col className={styles.welcome_left}>Welcome back {profileName} </Col>
          <div className={styles.avatar}>
            {user.profile?.avatar?.url ? (
              <img className={styles.avatar_image} src={user.profile?.avatar?.url} />
            ) : (
              initialName
            )}
          </div>
        </Row>
        {/* <Col className={styles.welcome_right}>
          <strong>Overall Record:</strong>&nbsp;{`${wins}-${draw}-${loss}`}
        </Col> */}
      </Row>
    </>
  );
}

function CurrentPackages({
  subscriptions,
  packages
}: // overallInfo
{
  subscriptions: UserSubscription[];
  packages: Package[];
  // overallInfo: OverallList[];
}) {
  const router = useRouter();

  let vipAllAccessPack: number, fantasyPack: number, sportsCardPack: number;
  packages.forEach((pack) => {
    if (pack.name.toUpperCase().indexOf(PACKAGE_NAMES.VIP_ALL_ACCESS) > -1) {
      vipAllAccessPack = pack.id;
    } else if (pack.name.toUpperCase().indexOf(PACKAGE_NAMES.FANTASY) > -1) {
      fantasyPack = pack.id;
    } else if (pack.name.toUpperCase().indexOf(PACKAGE_NAMES.SPORTS_CARD) > -1) {
      sportsCardPack = pack.id;
    }
  });
  const goToPackage = (plan: BillingPlan, sport: Sport) => {
    if (plan.package === vipAllAccessPack) {
      router.push('/vip-all-access-card');
    } else if (plan.package === fantasyPack) {
      router.push(`/fantasy-daily-lineups?sport=${sport.name}`);
    } else if (plan.package === sportsCardPack) {
      router.push('/sports-card');
    }
  };
  // Sort Subscriptions
  const sortSubscriptions = () => {
    const vipSubscription: UserSubscription[] = [],
      sportSubscription: UserSubscription[] = [],
      fantasySubscription: UserSubscription[] = [];
    subscriptions.forEach((subscription: UserSubscription) => {
      if (subscription.plan.name.toUpperCase().indexOf(PACKAGE_NAMES.VIP_ALL_ACCESS) > -1) {
        vipSubscription.push(subscription);
      } else if (subscription.plan.name.toUpperCase().indexOf(PACKAGE_NAMES.SPORTS_CARD) > -1) {
        sportSubscription.push(subscription);
      } else if (subscription.plan.name.toUpperCase().indexOf(PACKAGE_NAMES.FANTASY) > -1) {
        fantasySubscription.push(subscription);
      }
    });
    return vipSubscription.concat(sportSubscription, fantasySubscription);
  };
  // const getOverallRecord = (subscription: UserSubscription) => {
  //   const overallRecord = overallInfo.find(
  //     (item) => item.subscription_id.toString() === subscription.id.toString()
  //   );
  //   const { wins, loss, draw } = overallRecord?.win_record || EmptyOverall;
  //   return {
  //     record: `${wins}-${draw}-${loss}`,
  //     units: overallRecord?.unit_profitability || 0
  //   };
  // };

  return (
    <div className={styles.current_packages}>
      <div className={styles.block_title}>Current Packages</div>
      <div className={styles.block_content}>
        {sortSubscriptions().map((subscription, index) => (
          <React.Fragment key={index}>
            {subscription.is_active && (
              <div className={styles.package_card}>
                <div className={styles.package_status}>
                  {subscription.plan.package === vipAllAccessPack && (
                    <span>VIP ALL ACCESS CARD</span>
                  )}
                  {subscription.plan.package === sportsCardPack && <span>Sports Card</span>}
                  {subscription.plan.package === fantasyPack && <span>DAILY FANTASY CARD</span>}
                </div>
                <div className={styles.package_card_content}>
                  {subscription.plan.package === vipAllAccessPack && (
                    <img
                      alt="VIP All Access Background"
                      src="/images/vip.svg"
                      className={styles.package_card_img}
                    />
                  )}
                  {subscription.plan.package !== vipAllAccessPack && (
                    <img
                      alt="Sports Logo"
                      src={`/images/sports/${subscription.sports[0].name.toLowerCase()}.svg`}
                      className={styles.package_card_img}
                    />
                  )}
                  <div className={styles.package_title}>
                    {subscription.sports[0] && <h3>{subscription.sports[0].name}</h3>}
                    {!subscription.sports[0] && <h3>VIP</h3>}
                    <p>{subscription.plan.duration.toUpperCase()} ACCESS</p>
                  </div>
                  <br />
                  <br />
                  {/* <div className={styles.packageOverall}>
                    <div className={styles.packageOverallRow}>
                      <span>record:</span>
                      <span>{getOverallRecord(subscription).record}</span>
                    </div>
                    <div className={styles.packageOverallRow}>
                      <span>profit:</span>
                      <span>{`${
                        getOverallRecord(subscription).units > 0
                          ? '+' + getOverallRecord(subscription).units
                          : getOverallRecord(subscription).units
                      } unit${getOverallRecord(subscription).units > 0 ? 's' : ''}`}</span>
                    </div>
                  </div> */}
                  <Button
                    onClick={() => {
                      goToPackage(subscription.plan, subscription.sports[0]);
                    }}
                    className={styles.cta_btn}>
                    {subscription.plan.package === fantasyPack ? 'VIEW LINEUPS' : 'VIEW PLAYS'}
                  </Button>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        <div className={styles.package_card}>
          <Link href="/shop">
            <div className={`${styles.package_card_content} ${styles.full_height}`}>
              <Button className={styles.plus_package_btn}>
                <PlusOutlined />
              </Button>
              <h1>Add to your package</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function WeeklyProTip({
  data,
  subscriptions
}: {
  data: WeeklyTip | undefined;
  subscriptions: UserSubscription[];
}) {
  if (!data) {
    return <></>;
  }
  return (
    <div className={styles.weekly_pro_tip}>
      <div className={styles.block_title}>Weekly Pro Tip</div>
      {subscriptions.length === 0 && (
        <p className={styles.no_subscription_text}>
          In order to view the weekly pro tip, you must have an active membership package.
        </p>
      )}
      {subscriptions.length > 0 && (
        <div className={styles.block_content}>
          <img
            alt="Weekly Pro Tip Image"
            src={data.photo.url}
            className={styles.weekly_pro_tip_img}
          />
          <div className={styles.weekly_pro_tip_right_panel}>
            <h4 className={styles.weekly_description_title}>{data.title}</h4>
            <ReactMarkdown className={styles.weekly_pro_tip_desc}>{data.detail}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

function EarliestGames({
  sports,
  subscriptions
}: {
  sports: Sport[];
  subscriptions: UserSubscription[];
}) {
  const [betMenuOpen, setBetMenuOpen] = useState<boolean>(false);
  const [sportMenuOpen, setSportMenuOpen] = useState<boolean>(false);
  const [showDetailsAt, setShowDetailsAt] = useState<boolean[]>([]);
  const [selectedBetType, setSelectedBetType] = useState<number>(0);
  const [selectedSportType, setSelectedSportType] = useState<number>(-1);
  const [games, setGames] = useState<EarliestGameInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const DashboardSportBetTypes = SportBetTypes.slice();
  DashboardSportBetTypes.unshift({
    id: '',
    name: 'All'
  });

  useEffect(() => {
    // Fetch Earliest games
    setLoading(true);
    const nonFantasySubscriptions = subscriptions.filter(
      (subscription) => subscription.plan.name.toUpperCase().indexOf(PACKAGE_NAMES.FANTASY) < 0
    );
    SportsAPIs.getTodaySportEntries(
      DashboardSportBetTypes[selectedBetType].id,
      nonFantasySubscriptions,
      selectedSportType === -1 ? undefined : sports[selectedSportType].id
    )
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      });
  }, [selectedBetType, selectedSportType, subscriptions]);

  const changeMenuVisible = (status: boolean) => {
    setSportMenuOpen(status);
  };
  const changeBetMenuVisible = (status: boolean) => {
    setBetMenuOpen(status);
  };
  const menu = (
    <Menu className={styles.sportMenu}>
      {DashboardSportBetTypes.map((type, index) => (
        <Menu.Item
          key={type.id}
          className={styles.sportMenuItem}
          onClick={() => {
            setSelectedBetType(index);
            setBetMenuOpen(false);
          }}>
          {type.name}
        </Menu.Item>
      ))}
    </Menu>
  );
  const menu2 = (
    <Menu className={styles.sportMenu}>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedSportType(-1);
          setSportMenuOpen(false);
        }}>
        All
      </Menu.Item>
      {sports.map((sport: Sport, index: number) => (
        <Menu.Item
          key={sport.id}
          className={styles.sportMenuItem}
          onClick={() => {
            setSelectedSportType(index);
            setSportMenuOpen(false);
          }}>
          {sport.name}
        </Menu.Item>
      ))}
    </Menu>
  );
  const changeDetailsVisibleAt = (index: number) => {
    showDetailsAt[index] = !showDetailsAt[index];
    setShowDetailsAt(showDetailsAt.slice());
  };

  const hideDetailsAt = () => {
    return null;
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
            transitionName=""
            trigger={['click']}>
            <div className={styles.dropdownBtn}>
              <span>
                <strong>Betting Type:&nbsp;</strong>
                {DashboardSportBetTypes[selectedBetType].name}
              </span>
              {betMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
              {!betMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
            </div>
          </Dropdown>
          <Dropdown
            overlay={menu2}
            onVisibleChange={changeMenuVisible}
            placement="bottomLeft"
            transitionName=""
            trigger={['click']}>
            <div className={styles.dropdownBtn}>
              <span>
                <strong>Sport:&nbsp;</strong>
                {selectedSportType === -1 ? 'All' : sports[selectedSportType].name}
              </span>
              {sportMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
              {!sportMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
            </div>
          </Dropdown>
        </Row>
      </div>
      {subscriptions.length === 0 && (
        <p className={styles.no_subscription_text}>
          In order to view today’s sports betting plays, you must have an active membership package.
        </p>
      )}
      {subscriptions.length > 0 && (
        <SportEntryActive
          title={DashboardSportBetTypes[selectedBetType].name}
          loading={loading}
          hideSection={true}
          hideDetailsAt={hideDetailsAt}
          games={games}
          showDetailsAt={showDetailsAt}
          changeDetailsVisibleAt={changeDetailsVisibleAt}
        />
      )}
    </div>
  );
}

function YesterdayPlays() {
  const [games, setGames] = useState<YesterdayPlayInfoType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [fetchMoreLoading, setFetchMoreLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch Yesterday Plays
    SportsAPIs.getYesterdaySportEntries(offset, undefined)
      .then((res) => res.json())
      .then((data) => {
        setGames(games.concat(data));
        setOffset(offset + data.length);
        setFetchMoreLoading(false);
      })
      .catch((error) => {
        notification['error']({
          message: 'Loading Error!',
          description: error.message
        });
        setFetchMoreLoading(false);
      });
  }, []);

  return (
    <div className={styles.yesterday_plays}>
      <div className={styles.earliest_games_header}>
        <div className={styles.block_title}>Yesterday Plays</div>
      </div>
      <div className={styles.earliest_games_titlebar}>
        <strong>&nbsp;</strong>
        <span>{moment().subtract(0, 'days').format('h:mm a DD/MM/YYYY')}</span>
      </div>
      <SportEntry loading={fetchMoreLoading} plays={games} />
      {!fetchMoreLoading && (
        <Row>
          <Col sm={24} md={24} className="text-center">
            <Link href="/yesterdays-plays">
              <Button className={styles.loadMoreBtn}>View More</Button>
            </Link>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default function MemberDashboard({ token, subscriptions, sports, packages }: PageProps) {
  const [weeklyTip, setWeeklyTip] = useState<WeeklyTip | undefined>(undefined);
  const [profileName, setProfileName] = useState<string>('');
  const [initialName, setInitialName] = useState<string>('');
  const [session, setSession] = useState<CheckoutSessionType | undefined>(undefined);
  // const [overallInfo, setOverallInfo] = useState<OverallInfoType>({});
  const router = useRouter();
  const { session_id: sessionId, status } = router.query;
  const { user } = useSelector((state: ReduxState) => {
    return state;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    WeeklyTipsAPIs.getWeeklyLastTip()
      .then((res) => res.json())
      .then((data) => {
        setWeeklyTip(data);
      });
    UsersAPIs.fetchProfile()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: 'USER_PROFILE',
          payload: data
        });
        if (data && data.full_name) {
          const names = data.full_name.split(' ');
          setProfileName(names[0]);
          setInitialName(
            names.reduce(
              (initials: string, currentValue: string) => initials + currentValue.substring(0, 1),
              ''
            )
          );
        }
      });
    // UsersAPIs.getOverallRecord()
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setOverallInfo(data.data);
    //   });
  }, []);

  useEffect(() => {
    async function fetchSession() {
      if (sessionId) {
        setSession(await checkoutApis.loadSession(sessionId.toString()).then((res) => res.json()));
      } else {
        setSession(undefined);
      }
    }
    fetchSession();
  }, [sessionId, status]);

  useEffect(() => {
    if (session && sessionId) {
      if (status === 'cancelled') {
        checkoutApis
          .sendAbandonmentMessage(sessionId.toString())
          .then((res) => res.json())
          .then((data) => {
            if (data.status >= 400) {
              notification['error']({
                message: 'Abandonment Message Error!',
                description: data.message
              });
            } else {
              router.push('/member-dashboard');
            }
          });
      } else {
        dispatch({ type: 'UPDATE_CART', payload: [] });
        checkoutApis
          .completeCheckout(sessionId.toString())
          .then((res) => res.json())
          .then((data) => {
            if (data.statusCode > 200) {
              notification['error']({
                message: 'Checkout Session Error!',
                description: data.message
              });
            } else {
              notification['info']({
                message: 'Checkout was completed!'
              });
              router.replace('/member-dashboard');
            }
          })
          .catch((error) => {
            notification['error']({
              message: 'Checkout Session Error!',
              description: error.message
            });
            router.replace('/member-dashboard');
          });
      }
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>TheDailyStakes - Member Dashboard</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection
            profileName={profileName}
            initialName={initialName}
            // overallInfo={overallInfo.summary || EmptyOverall}
            user={user}
          />
          <Row className={styles.nowrapRow}>
            <Col sm={24} md={18} className={styles.current_packages_container}>
              {packages && (
                <CurrentPackages
                  subscriptions={subscriptions}
                  packages={packages}
                  // overallInfo={overallInfo.list || []}
                />
              )}
              <div className={styles.laptop_view}>
                <VipAllAccessCard />
                <DailyFantasyLineups />
              </div>
              <div className={styles.earliest_games_col}>
                <EarliestGames sports={sports} subscriptions={subscriptions} />
              </div>

              <div className={styles.weekly_pro_tip_container}>
                <WeeklyProTip data={weeklyTip} subscriptions={subscriptions} />
              </div>

              <div className={styles.yesterday_plays_col}>
                <YesterdayPlays />
              </div>
              <div className={styles.laptop_view}>
                <CommonSportsBook />
                <WhereToWatchGame />
                <WhereBuyGear />
                <BankRollManagement />
                <BettingFundamentals />
                <BettingFundamentals isFantasy />
              </div>
            </Col>
            <Col md={6} className={styles.contentSideCol}>
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

export async function getStaticProps() {
  const res = await PackageAPIs.getPackages();
  const packages = await res.json();

  return {
    props: {
      packages
    }
  };
}
