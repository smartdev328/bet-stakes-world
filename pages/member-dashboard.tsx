import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col, Dropdown, Menu, notification } from 'antd';
import Link from 'next/link';
import { PlusOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useRouter } from 'next/router';

import {
  AppLayout,
  BannerSportsAndMatches,
  DashboardHeader,
  SportEntryActive,
  SportEntry
} from '@components/index';
import styles from '@styles/MemberDashboard.module.css';
import { EarliestGameInfoType, PageProps, YesterdayPlayInfoType } from '@type/Main';
import { UserSubscription } from '@type/Users';
import WeeklyTipsAPIs from '@apis/weeklyTips.apis';
import SportsAPIs from '@apis/sport.apis';
import { WeeklyTip } from '@type/WeeklyTips';
import { Sport } from '@type/Sports';
import PackageAPIs from '@apis/package.apis';
import UsersAPIs from '@apis/user.apis';
import { BillingPlan, Package } from '@type/Packages';
import { SportBetTypes } from '@constants/';

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <img
        src="/images/member_dashboard.jpg"
        alt="Member Dashboard Background"
        className={styles.bgImage}
      />
      <BannerSportsAndMatches />
    </div>
  );
}

function TopSection({ profileName, initialName }: { profileName: string; initialName: string }) {
  return (
    <>
      <DashboardHeader title={'Member Dashboard'} />
      <Row align={'middle'} justify={'space-between'} className={styles.welcome_row}>
        <Row>
          <Col className={styles.welcome_left}>Welcome back {profileName} </Col>
          <div className={styles.avatar}>{initialName}</div>
        </Row>
        <Col className={styles.welcome_right}>
          <strong>Overall Record:</strong>&nbsp;123-54
        </Col>
      </Row>
    </>
  );
}

function CurrentPackages({
  subscriptions,
  packages
}: {
  subscriptions: UserSubscription[];
  packages: Package[];
}) {
  const router = useRouter();

  let vipAllAccessPack: number, fantasyPack: number, sportsCardPack: number;
  packages.forEach((pack) => {
    if (pack.name.indexOf('VIP All Access') > -1) {
      vipAllAccessPack = pack.id;
    } else if (pack.name.indexOf('Fantasy') > -1) {
      fantasyPack = pack.id;
    } else {
      sportsCardPack = pack.id;
    }
  });
  const goToPackage = (plan: BillingPlan) => {
    if (plan.name.toLowerCase().indexOf('vip all access') > -1) {
      router.push('/vip-all-access-card');
    } else if (plan.name.toLowerCase().indexOf('fantasy') > -1) {
      router.push('/fantasy-daily-lineups');
    } else {
      router.push('/sports-card');
    }
  };

  return (
    <div className={styles.current_packages}>
      <div className={styles.block_title}>Current Packages</div>
      <div className={styles.block_content}>
        {subscriptions.map((subscription) => (
          <div className={styles.package_card} key={subscription.id}>
            {!subscription.is_active && (
              <div className={styles.package_status}>{`Expired ${Math.floor(
                moment.duration(moment().diff(moment(subscription.valid_till))).asDays()
              )} days ago`}</div>
            )}
            <div className={styles.package_card_content}>
              {subscription.plan.package === vipAllAccessPack && (
                <img
                  alt="VIP All Access Background"
                  src="/images/sports_card_bg.png"
                  className={styles.package_card_img}
                />
              )}
              {subscription.plan.package !== vipAllAccessPack && (
                <img
                  alt="Sports Logo"
                  src={
                    subscription.sports[0]?.logo
                      ? subscription.sports[0]?.logo
                      : '/images/daily_lineups_bg.png'
                  }
                  className={styles.package_card_img}
                />
              )}
              <div className={styles.package_title}>
                {subscription.plan.package === vipAllAccessPack && <h3>VIP All Access</h3>}
                {subscription.plan.package === sportsCardPack && <h3>Sports Card</h3>}
                {subscription.plan.package === fantasyPack && <h3>Fantasy</h3>}
                {subscription.plan.package !== fantasyPack && (
                  <p>{subscription.plan.duration.toLowerCase()} Picks</p>
                )}
                {subscription.plan.package === fantasyPack && (
                  <p>{subscription.plan.duration.toLowerCase()} lineups</p>
                )}
              </div>
              <p className={styles.package_desc}>
                {subscription.sports[0] ? subscription.sports[0].name : ''}
              </p>
              {subscription.is_active && (
                <Button
                  onClick={() => {
                    goToPackage(subscription.plan);
                  }}
                  className={styles.cta_btn}>
                  View Picks
                </Button>
              )}
              {!subscription.is_active && (
                <Button className={styles.cta_btn}>Reactivate Package</Button>
              )}
            </div>
          </div>
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

function WeeklyProTip({ data }: { data: WeeklyTip | undefined }) {
  if (!data) {
    return <></>;
  }
  return (
    <div className={styles.weekly_pro_tip}>
      <div className={styles.block_title}>Weekly Pro Tip</div>
      <p className={styles.little_witty_intro}>Little Witty Intro</p>
      <div className={styles.block_content}>
        <img
          alt="Weekly Pro Tip Image"
          src="/images/badminton_player.jpg"
          className={styles.weekly_pro_tip_img}
        />
        <div className={styles.weekly_pro_tip_right_panel}>
          {/* <p className={styles.weekly_pro_tip_intro}>{data.slug}</p> */}
          <h4 className={styles.weekly_description_title}>{data.title}</h4>
          <p className={styles.weekly_pro_tip_desc}>{data.detail}</p>
        </div>
      </div>
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
    SportsAPIs.getTodaySportEntries(
      DashboardSportBetTypes[selectedBetType].id,
      subscriptions,
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
      <br></br>
      <SportEntryActive
        title={DashboardSportBetTypes[selectedBetType].name}
        loading={loading}
        hideSection={true}
        hideDetailsAt={hideDetailsAt}
        games={games}
        showDetailsAt={showDetailsAt}
        changeDetailsVisibleAt={changeDetailsVisibleAt}></SportEntryActive>
    </div>
  );
}

function YesterdayPlays() {
  const [games, setGames] = useState<YesterdayPlayInfoType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [fetchMoreLoading, setFetchMoreLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch Earliest games
    onLoadMore();
  }, []);

  const onLoadMore = () => {
    setFetchMoreLoading(true);
    SportsAPIs.getYesterdaySportEntries(offset, undefined)
      .then((res) => res.json())
      .then((data) => {
        setGames(games.concat(data));
        setOffset(offset + data.length);
        setFetchMoreLoading(false);
      })
      .catch((error) => {
        notification['error']({
          message: 'Registration Error!',
          description: error.message
        });
        setFetchMoreLoading(false);
      });
  };

  return (
    <div className={styles.yesterday_plays}>
      <div className={styles.earliest_games_header}>
        <div className={styles.block_title}>Yesterday Plays</div>
      </div>
      <div className={styles.earliest_games_titlebar}>
        <strong>{`10 Wins in ${14} Games`}</strong>
        <span>{moment().subtract(0, 'days').format('h:mm a DD/MM/YYYY')}</span>
      </div>
      <>
        <SportEntry loading={fetchMoreLoading} plays={games} />
      </>
    </div>
  );
}

export default function MemberDashboard({ token, subscriptions, sports, packages }: PageProps) {
  const [weeklyTip, setWeeklyTip] = useState<WeeklyTip | undefined>(undefined);
  const [profileName, setProfileName] = useState<string>('');
  const [initialName, setInitialName] = useState<string>('');

  useEffect(() => {
    WeeklyTipsAPIs.getLastTip()
      .then((res) => res.json())
      .then((data) => {
        setWeeklyTip(data);
      });
    UsersAPIs.fetchProfile()
      .then((res) => res.json())
      .then((data) => {
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
  }, []);

  return (
    <>
      <Head>
        <title>The Daily Stakes - Member Dashboard</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection profileName={profileName} initialName={initialName} />
          <Row className={styles.nowrapRow}>
            <Col span={18} className={styles.current_packages_container}>
              {packages && <CurrentPackages subscriptions={subscriptions} packages={packages} />}
              <div className={styles.earliest_games_col}>
                <EarliestGames sports={sports} subscriptions={subscriptions} />
              </div>

              <div className={styles.weekly_pro_tip_container}>
                <WeeklyProTip data={weeklyTip} />
              </div>

              <div className={styles.yesterday_plays_col}>
                <YesterdayPlays />
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
