import { useEffect, useState } from 'react';
import { Menu, Row, Col, Dropdown } from 'antd';
import Link from 'next/link';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';

import {
  IdentityIcon,
  LockIcon,
  SearchIcon,
  CartIcon,
  CloseIcon,
  HamburgerMenuIcon
} from '@components/SvgIcons';
import { LoginModal, ForgotPasswordModal, ResetPasswordModal } from '@components/index';
import styles from './AppHeader.module.css';
import { JWT } from '@type/Main';
import { UserSubscription } from '@type/Users';
import { ReduxState } from '@redux/reducers';

const Button = dynamic(() => import('antd/lib/button'));

type HeaderProps = {
  releaseTime: DateObjectType;
  winningRate: number;
  curRecord: string;
  currentDateTime: string;
  token: JWT | null;
  subscriptions: UserSubscription[];
};

type RemainingTimeType = {
  hrs: number;
  mins: number;
  secs: number;
};

type DateObjectType = {
  year: number;
  month: number;
  date: number;
};

const DefaultRemainingTime = {
  hrs: 0,
  mins: 0,
  secs: 0
};

type SubscriptionStatus = 'visitor' | 'unpaid' | 'paid';

function SubMenu({
  subscriptions,
  token
}: {
  subscriptions: UserSubscription[];
  token: JWT | null;
}) {
  const [sportPaneVisible, setSportPaneVisible] = useState<boolean>(false);
  const [fantasyPaneVisible, setFantasyPaneVisible] = useState<boolean>(false);
  const [submenuVisible, setSubmenuVisible] = useState<boolean>(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('visitor');

  useEffect(() => {
    if (!token) {
      setSubscriptionStatus('visitor');
    } else if (subscriptions.length === 0) {
      setSubscriptionStatus('unpaid');
    } else {
      setSubscriptionStatus('paid');
    }
  }, [token, subscriptions]);

  const hidePanes = () => {
    setSportPaneVisible(false);
    setFantasyPaneVisible(false);
  };

  const showSportPanel = () => {
    setFantasyPaneVisible(false);
    setSportPaneVisible(true);
  };

  const toggleSportPanel = () => {
    setFantasyPaneVisible(false);
    setSportPaneVisible(!sportPaneVisible);
  };

  const showFantasyPanel = () => {
    setFantasyPaneVisible(true);
    setSportPaneVisible(false);
  };

  const toggleFantasyPanel = () => {
    setFantasyPaneVisible(!fantasyPaneVisible);
    setSportPaneVisible(false);
  };

  const hasSubscription = (sport: string) => {
    if (
      subscriptions.findIndex(
        (subscription: UserSubscription) => subscription.sports[0]?.name === sport
      ) > -1
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className={styles.submenu}>
        <a className={styles.submenu_main_item}>
          <span>Memberships</span>
          <CaretUpOutlined className={styles.caret_up} />
          <CaretDownOutlined className={styles.caret_down} />
        </a>
        <div className={styles.submenu_content}>
          <div className={styles.submenu_content_left}>
            <div className={styles.submenu_desc}>
              <div onMouseOver={hidePanes}>Main Pages</div>
            </div>
            <div className={styles.submenu_item}>
              <Link href="/member-dashboard">
                <a
                  onMouseOver={hidePanes}
                  className={subscriptionStatus === 'visitor' ? styles.locked : ''}>
                  {subscriptionStatus === 'visitor' && <LockIcon className={styles.lock_icon} />}
                  Member Dashboard
                </a>
              </Link>
            </div>
            <div className={styles.submenu_item_for_pane}>
              <Link href="/sports-card">
                <a
                  onMouseOver={showSportPanel}
                  className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                  {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                  <span>Sports Card</span>
                  {sportPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                  {!sportPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                </a>
              </Link>
            </div>
            <div className={styles.submenu_item}>
              <Link href="/vip-all-access-card">
                <a
                  onMouseOver={hidePanes}
                  className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                  {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                  VIP ALL ACCESS CARD
                </a>
              </Link>
            </div>
            <div className={styles.submenu_item_for_pane}>
              <Link href="/fantasy-daily-lineups">
                <a
                  onMouseOver={showFantasyPanel}
                  className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                  {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                  <span>FANTASY PICKS</span>
                  {fantasyPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                  {!fantasyPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                </a>
              </Link>
            </div>
            <div className={styles.submenu_item}>
              <Link href="/profile">
                <a
                  onMouseOver={hidePanes}
                  className={subscriptionStatus === 'visitor' ? styles.locked : ''}>
                  {subscriptionStatus === 'visitor' && <LockIcon className={styles.lock_icon} />}
                  Settings
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.pane}>
            {sportPaneVisible && (
              <>
                <div className={styles.submenu_desc}>Yearly subscription — Available Sports</div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a className={!hasSubscription('NBA') ? styles.locked : ''}>
                      {!hasSubscription('NBA') && <LockIcon className={styles.lock_icon} />}
                      Basketball
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a className={!hasSubscription('NFL') ? styles.locked : ''}>
                      {!hasSubscription('NFL') && <LockIcon className={styles.lock_icon} />}
                      Football
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a className={!hasSubscription('MLB') ? styles.locked : ''}>
                      {!hasSubscription('MLB') && <LockIcon className={styles.lock_icon} />}
                      Baseball
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a className={!hasSubscription('SOCCER') ? styles.locked : ''}>
                      {!hasSubscription('SOCCER') && <LockIcon className={styles.lock_icon} />}
                      SOCCER
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a className={!hasSubscription('UFC') ? styles.locked : ''}>
                      {!hasSubscription('UFC') && <LockIcon className={styles.lock_icon} />}
                      UFC
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a className={!hasSubscription('FORMULA 1') ? styles.locked : ''}>
                      {!hasSubscription('FORMULA 1') && <LockIcon className={styles.lock_icon} />}
                      FORMULA 1
                    </a>
                  </Link>
                </div>
              </>
            )}
            {fantasyPaneVisible && (
              <>
                <div className={styles.submenu_desc}>
                  Daily Lineup Subscription — Available Sports
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/fantasy-daily-lineups">
                    <a
                      className={
                        !hasSubscription('NBA') &&
                        !hasSubscription('NFL') &&
                        !hasSubscription('MLB')
                          ? styles.locked
                          : ''
                      }>
                      {!hasSubscription('NBA') &&
                        !hasSubscription('NFL') &&
                        !hasSubscription('MLB') && <LockIcon className={styles.lock_icon} />}
                      All
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/fantasy-daily-lineups">
                    <a className={!hasSubscription('NBA') ? styles.locked : ''}>
                      {!hasSubscription('NBA') && <LockIcon className={styles.lock_icon} />}
                      Basketball
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/fantasy-daily-lineups">
                    <a className={!hasSubscription('NFL') ? styles.locked : ''}>
                      {!hasSubscription('NFL') && <LockIcon className={styles.lock_icon} />}
                      Football
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/fantasy-daily-lineups">
                    <a className={!hasSubscription('MLB') ? styles.locked : ''}>
                      {!hasSubscription('MLB') && <LockIcon className={styles.lock_icon} />}
                      Baseball
                    </a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.mobilesubmenu}>
        <a
          className={`${styles.submenu_main_item} ${submenuVisible ? styles.active : ''}`}
          onClick={() => setSubmenuVisible(!submenuVisible)}>
          <span>Memberships</span>
          {!submenuVisible ? (
            <CaretDownOutlined className={styles.caret_up} />
          ) : (
            <CaretUpOutlined className={styles.caret_down} />
          )}
        </a>
        {submenuVisible && (
          <div className={styles.submenu_content}>
            <div className={styles.submenu_content_left}>
              <div className={styles.submenu_item}>
                <Link href="/member-dashboard">
                  <a
                    onMouseOver={hidePanes}
                    className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                    {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                    Member Dashboard
                  </a>
                </Link>
              </div>
              <div className={styles.submenu_item_for_pane}>
                <a
                  className={
                    sportPaneVisible
                      ? styles.paneActive
                      : subscriptionStatus !== 'paid'
                      ? styles.locked
                      : ''
                  }
                  onClick={toggleSportPanel}>
                  {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                  <span>Sports Card</span>
                  {sportPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                  {!sportPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                </a>
              </div>
              <div className={styles.pane}>
                {sportPaneVisible && (
                  <>
                    <div className={styles.submenu_desc}>
                      Yearly subscription — Available Sports
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a className={!hasSubscription('NBA') ? styles.locked : ''}>
                          {!hasSubscription('NBA') && <LockIcon className={styles.lock_icon} />}
                          Basketball
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a className={!hasSubscription('NFL') ? styles.locked : ''}>
                          {!hasSubscription('NFL') && <LockIcon className={styles.lock_icon} />}
                          Football
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a className={!hasSubscription('MLB') ? styles.locked : ''}>
                          {!hasSubscription('MLB') && <LockIcon className={styles.lock_icon} />}
                          Baseball
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a className={!hasSubscription('SOCCER') ? styles.locked : ''}>
                          {!hasSubscription('SOCCER') && <LockIcon className={styles.lock_icon} />}
                          SOCCER
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a className={!hasSubscription('UFC') ? styles.locked : ''}>
                          {!hasSubscription('UFC') && <LockIcon className={styles.lock_icon} />}
                          UFC
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a className={!hasSubscription('FORMULA 1') ? styles.locked : ''}>
                          {!hasSubscription('FORMULA 1') && (
                            <LockIcon className={styles.lock_icon} />
                          )}
                          FORMULA 1
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.submenu_item}>
                <Link href="/vip-all-access-card">
                  <a
                    onMouseOver={hidePanes}
                    className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                    {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                    VIP ALL ACCESS CARD
                  </a>
                </Link>
              </div>
              <div className={styles.submenu_item_for_pane}>
                <a
                  className={
                    fantasyPaneVisible
                      ? styles.paneActive
                      : subscriptionStatus !== 'paid'
                      ? styles.locked
                      : ''
                  }
                  onClick={toggleFantasyPanel}>
                  {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                  <span>FANTASY PICKS</span>
                  {fantasyPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                  {!fantasyPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                </a>
              </div>
              <div className={styles.pane}>
                {fantasyPaneVisible && (
                  <>
                    <div className={styles.submenu_desc}>
                      Daily Lineup Subscription — Available Sports
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/fantasy-daily-lineups">
                        <a className={styles.locked}>
                          <LockIcon className={styles.lock_icon} />
                          All
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/fantasy-daily-lineups">
                        <a className={!hasSubscription('NBA') ? styles.locked : ''}>
                          {!hasSubscription('NBA') && <LockIcon className={styles.lock_icon} />}
                          Basketball
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/fantasy-daily-lineups">
                        <a className={!hasSubscription('NFL') ? styles.locked : ''}>
                          {!hasSubscription('NFL') && <LockIcon className={styles.lock_icon} />}
                          Football
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/fantasy-daily-lineups">
                        <a className={!hasSubscription('MLB') ? styles.locked : ''}>
                          {!hasSubscription('MLB') && <LockIcon className={styles.lock_icon} />}
                          Baseball
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.submenu_item}>
                <Link href="/profile">
                  <a
                    onMouseOver={hidePanes}
                    className={subscriptionStatus === 'visitor' ? styles.locked : ''}>
                    {subscriptionStatus === 'visitor' && <LockIcon className={styles.lock_icon} />}
                    Settings
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function getRemainingTime(date: DateObjectType): RemainingTimeType {
  const now = new Date(); //todays date
  const end = new Date(date.year, date.month, date.date); // another date
  let diff = (end.getTime() - now.getTime()) / 1000;
  if (diff > 0) {
    const days = Math.floor(diff / 86400);
    diff = diff - 86400 * days;
    const hrs = Math.floor(diff / 3600);
    diff = diff - 3600 * hrs;
    const mins = Math.floor(diff / 60);
    diff = diff - 60 * mins;
    return {
      hrs,
      mins,
      secs: Math.floor(diff)
    };
  }
  return DefaultRemainingTime;
}

function DateBar({ currentDateTime }: { currentDateTime: string }) {
  return (
    <div className={styles.dateBar}>
      <Link href="/">
        <a>Today’s Bets</a>
      </Link>
      <div className={styles.dateBarDivider} />
      <Link href="/">
        <a>{currentDateTime}</a>
      </Link>
    </div>
  );
}

export default function AppHeader({
  releaseTime,
  currentDateTime,
  token,
  subscriptions: userSubscriptions
}: HeaderProps) {
  const [remainingTime, setRemainingTime] = useState<RemainingTimeType>(DefaultRemainingTime);
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
  const { items: cartItems } = useSelector((state: ReduxState) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    const remainingTimeInterval = setInterval(() => {
      const remainingTime = getRemainingTime(releaseTime);
      setRemainingTime(remainingTime);
    }, 1000);
    return () => {
      clearInterval(remainingTimeInterval);
    };
  }, []);

  const openLoginModal = () => {
    dispatch({ type: 'OPEN_LOGIN_MODAL' });
  };

  const showMobileNav = () => {
    setMobileNavVisible(true);
  };

  const hideMobileNav = () => {
    setMobileNavVisible(false);
  };

  const logout = () => {
    setMobileNavVisible(false);
    dispatch({ type: 'LOG_OUT' });
  };

  const accountMenu = () => (
    <Menu className={styles.sportMenu}>
      <Menu.Item>
        <Link href="/profile">
          <a>Settings</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/contact-us">
          <a>Help & Support</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/faqs">
          <a>FAQs</a>
        </Link>
      </Menu.Item>
      <Menu.Item className={styles.topDivider}>
        <a onClick={logout}>Log Out</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={`${styles.appHeader} ${mobileNavVisible && styles.open}`}>
      <LoginModal />
      <ForgotPasswordModal />
      <ResetPasswordModal />
      <Row justify="space-between" className={styles.header}>
        <Col span={7} className={styles.headerLeftCol}>
          <div className={styles.countdownBox}>
            <div className={styles.countdownBox_desc}>Pick Release Countdown</div>
            <div className={styles.countdownBox_countdown_timer}>
              {`${remainingTime.hrs}h ${remainingTime.mins}m ${remainingTime.secs}s`}
            </div>
            <div>
              <Link href="/">
                <a className={styles.yellowBoldLink}>View Picks</a>
              </Link>
            </div>
          </div>
        </Col>
        <Col span={10} className={styles.headerMainCol}>
          <div>
            <Link href="/">
              <a>
                <img
                  src={'/images/logo.svg'}
                  width={418}
                  height={72}
                  alt="App Logo"
                  className={styles.logo}
                />
              </a>
            </Link>
          </div>
          <p className={styles.info}>
            <span>PREDICTIVE SPORTS ANALYTICS & PREMIUM CONTENT</span>
            {/* <span>
              <strong>Our Record:</strong> {curRecord}&nbsp;
            </span>
            <span>
              <strong>Winning Rate:</strong> {winningRate}% Return on investments
            </span> */}
          </p>
        </Col>
        <Col span={7} className={styles.headerRightCol}>
          {!token && (
            <div className={styles.ctaBtns}>
              <Button type="primary" className={styles.subscribeBtn}>
                Subscribe Now
              </Button>
              <Button
                type="ghost"
                icon={<IdentityIcon className={styles.user_icon} />}
                onClick={openLoginModal}
                className={styles.loginBtn}>
                Log In
              </Button>
            </div>
          )}
          {token && (
            <div className={styles.ctaBtns}>
              <Link href="/member-dashboard">
                <a className={styles.myDashboardBtn}>My Dashboard</a>
              </Link>
              <Dropdown
                overlay={accountMenu}
                placement="bottomLeft"
                transitionName=""
                trigger={['click']}>
                <div className={styles.profileBtn}>
                  <IdentityIcon className={styles.user_icon} />
                  My Account
                </div>
              </Dropdown>
            </div>
          )}
          <DateBar currentDateTime={currentDateTime} />
        </Col>
      </Row>
      <div className={styles.navbarContainer}>
        <div className={styles.container}>
          <div className={styles.navbarSide}></div>
          <Menu mode="horizontal" className={styles.navbar}>
            <Menu.Item key="SHOP" className={styles.navbarItem}>
              <Link href="/shop">
                <a>SHOP</a>
              </Link>
            </Menu.Item>
            {!mobileNavVisible && <SubMenu subscriptions={userSubscriptions} token={token} />}
            {/* <Menu.Item key="Sports_News" className={styles.navbarItem}>
              Sports News
            </Menu.Item> */}
            <Menu.Item key="Yesterdays_Plays" className={styles.navbarItem}>
              <Link href="/yesterdays-plays">
                <a>Yesterdays Plays</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="About_Us" className={styles.navbarItem}>
              <Link href="/aboutus">
                <a>About Us</a>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="Merchandise" className={styles.navbarItem}>
              Merchandise
            </Menu.Item> */}
          </Menu>
          <div className={styles.navbarSide}>
            <Button
              type="link"
              icon={<SearchIcon className={styles.cart_icon} />}
              aria-label="Search Packages Button"
            />
            <Link href="/cart">
              <a>
                <Button
                  type="link"
                  icon={<CartIcon className={styles.cart_icon} />}
                  aria-label="Cart Button"
                  className={styles.cart_btn}>
                  <span className={styles.text}>
                    {cartItems.length === 0 ? '' : cartItems.length}
                  </span>
                </Button>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.mobilecontainer}>
          <Row>
            <div className={`${styles.navbarSide} ${styles.navbarLeftSide}`}>
              {!mobileNavVisible ? (
                <Button
                  type="link"
                  icon={<HamburgerMenuIcon className={styles.cart_icon} />}
                  onClick={showMobileNav}
                  aria-label="Mobile Menu Open Button"
                  className={styles.mobile_navbar_btn}></Button>
              ) : (
                <Button
                  type="link"
                  onClick={hideMobileNav}
                  icon={<CloseIcon className={styles.cart_icon} />}
                  aria-label="Mobile Menu Close Button"
                  className={styles.mobile_navbar_btn}></Button>
              )}
            </div>
            <div className={styles.navbarSide}>
              <Button
                type="link"
                aria-label="Search Packages Button"
                icon={<SearchIcon className={styles.cart_icon} />}></Button>
              <Link href="/cart">
                <Button
                  type="link"
                  icon={<CartIcon className={styles.cart_icon} />}
                  aria-label="Cart Button"
                  className={styles.cart_btn}>
                  <span className={styles.text}>
                    {cartItems.length === 0 ? '' : cartItems.length}
                  </span>
                </Button>
              </Link>
              {!token && (
                <Button
                  type="link"
                  icon={<IdentityIcon className={styles.cart_icon} />}
                  aria-label="User Profile Button"
                  onClick={openLoginModal}
                  className={styles.cart_btn}></Button>
              )}
              {token && (
                <Dropdown
                  overlay={accountMenu}
                  placement="bottomLeft"
                  transitionName=""
                  trigger={['click']}>
                  <Button
                    type="link"
                    icon={<IdentityIcon className={styles.cart_icon} />}
                    aria-label="User Profile Button"
                    className={styles.cart_btn}></Button>
                </Dropdown>
              )}
            </div>
          </Row>
          {mobileNavVisible && (
            <div className={styles.mobileNavContent}>
              <DateBar currentDateTime={currentDateTime} />
              <Menu mode="vertical" className={styles.navbar}>
                <Menu.Item key="SHOP" className={styles.navbarItem}>
                  <Link href="/shop">
                    <a>SHOP</a>
                  </Link>
                </Menu.Item>
                <SubMenu subscriptions={userSubscriptions} token={token} />
                {/* <Menu.Item key="Sports_News" className={styles.navbarItem}>
                  Sports News
                </Menu.Item> */}
                <Menu.Item key="Yesterdays_Plays" className={styles.navbarItem}>
                  <Link href="/yesterdays-plays">
                    <a>Yesterdays Plays</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="About_Us" className={styles.navbarItem}>
                  <Link href="/aboutus">
                    <a>About Us</a>
                  </Link>
                </Menu.Item>
                {/* <Menu.Item key="Merchandise" className={styles.navbarItem}>
                  Merchandise
                </Menu.Item> */}
              </Menu>
              <Link href="/member-dashboard">
                <Button
                  type="primary"
                  className={styles.mobileSubscribeBtn}
                  onClick={hideMobileNav}>
                  My Dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
