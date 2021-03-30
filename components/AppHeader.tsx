import { useEffect, useState } from 'react';
import { Menu, Row, Col, Dropdown } from 'antd';
import Link from 'next/link';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import UsersAPIs from '@apis/user.apis';
import {
  IdentityIcon,
  LockIcon,
  CartIcon,
  CloseIcon,
  HamburgerMenuIcon
} from '@components/SvgIcons';
import { LoginModal, ForgotPasswordModal } from '@components/index';
import styles from './AppHeader.module.css';
import { JWT } from '@type/Main';
import { UserSubscription } from '@type/Users';
import { ReduxState } from '@redux/reducers';
import { PACKAGE_NAMES } from '@constants/';

const Button = dynamic(() => import('antd/lib/button'));

type HeaderProps = {
  winningRate: number;
  curRecord: string;
  currentDateTime: string;
  token: JWT | null;
  subscriptions: UserSubscription[];
};

type SubscriptionStatus = 'visitor' | 'unpaid' | 'paid';

function SubMenu({
  subscriptions,
  token
}: {
  subscriptions: UserSubscription[];
  token: JWT | null;
}) {
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

  const hasPackage = (packageName: string) => {
    return subscriptions.filter((subscription: UserSubscription) => {
      return subscription.plan.name.toUpperCase().includes(packageName);
    }).length;
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
              <div>Main Pages</div>
            </div>
            <div className={styles.submenu_item}>
              <Link href="/member-dashboard">
                <a className={subscriptionStatus === 'visitor' ? styles.locked : ''}>
                  {subscriptionStatus === 'visitor' && <LockIcon className={styles.lock_icon} />}
                  Member Dashboard
                </a>
              </Link>
            </div>
            <div className={styles.submenu_item}>
              {(hasPackage(PACKAGE_NAMES.VIP_ALL_ACCESS) || subscriptionStatus === 'visitor') && (
                <Link href="/vip-all-access-card">
                  <a className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                    {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                    VIP ALL ACCESS CARD
                  </a>
                </Link>
              )}
            </div>
            <div className={styles.submenu_item_for_pane}>
              {(hasPackage(PACKAGE_NAMES.SPORTS_CARD) || subscriptionStatus === 'visitor') && (
                <Link href="/sports-card">
                  <a className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                    {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                    <span>Sports Card</span>
                  </a>
                </Link>
              )}
            </div>
            <div className={styles.submenu_item_for_pane}>
              {(hasPackage(PACKAGE_NAMES.FANTASY) || subscriptionStatus === 'visitor') && (
                <Link href="/fantasy-daily-lineups">
                  <a className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                    {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                    <span>DAILY FANTASY CARD</span>
                  </a>
                </Link>
              )}
            </div>
            <div className={styles.submenu_item}>
              <Link href="/profile">
                <a className={subscriptionStatus === 'visitor' ? styles.locked : ''}>
                  {subscriptionStatus === 'visitor' && <LockIcon className={styles.lock_icon} />}
                  Settings
                </a>
              </Link>
            </div>
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
                  <a className={subscriptionStatus === 'visitor' ? styles.locked : ''}>
                    {subscriptionStatus === 'visitor' && <LockIcon className={styles.lock_icon} />}
                    Member Dashboard
                  </a>
                </Link>
              </div>
              <div className={styles.submenu_item}>
                {(hasPackage(PACKAGE_NAMES.VIP_ALL_ACCESS) || subscriptionStatus === 'visitor') && (
                  <Link href="/vip-all-access-card">
                    <a className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                      {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                      VIP ALL ACCESS CARD
                    </a>
                  </Link>
                )}
              </div>
              <div className={styles.submenu_item_for_pane}>
                {(hasPackage(PACKAGE_NAMES.SPORTS_CARD) || subscriptionStatus === 'visitor') && (
                  <Link href="/sports-card">
                    <a className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                      {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                      <span>Sports Card</span>
                    </a>
                  </Link>
                )}
              </div>
              <div className={styles.submenu_item_for_pane}>
                {(hasPackage(PACKAGE_NAMES.FANTASY) || subscriptionStatus === 'visitor') && (
                  <Link href="/fantasy-daily-lineups">
                    <a className={subscriptionStatus !== 'paid' ? styles.locked : ''}>
                      {subscriptionStatus !== 'paid' && <LockIcon className={styles.lock_icon} />}
                      <span>DAILY FANTASY CARD</span>
                    </a>
                  </Link>
                )}
              </div>
              <div className={styles.submenu_item}>
                <Link href="/profile">
                  <a className={subscriptionStatus === 'visitor' ? styles.locked : ''}>
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

function DateBar({
  currentDateTime,
  userSubscriptions
}: {
  currentDateTime: string;
  userSubscriptions: UserSubscription[];
}) {
  return (
    <div className={styles.dateBar}>
      <Link href={userSubscriptions.length > 0 ? '/member-dashboard' : '/shop'}>
        <a>TODAY’S BETS</a>
      </Link>
      <div className={styles.dateBarDivider} />
      <Link href="/">
        <a>{currentDateTime}</a>
      </Link>
    </div>
  );
}

export default function AppHeader({
  currentDateTime,
  token,
  subscriptions: userSubscriptions
}: HeaderProps) {
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
  const { items: cartItems } = useSelector((state: ReduxState) => state.cart);

  const { user } = useSelector((state: ReduxState) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'LOAD_CART' });
    UsersAPIs.fetchProfile()
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'USER_PROFILE',
          payload: data
        });
      });
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
      <Row justify="space-between" className={styles.header}>
        <Col span={7} className={styles.headerLeftCol}>
          <div className={styles.ctaBtns}>
            <Link href="/shop">
              <a className={styles.myDashboardBtn}>Join Now For $1</a>
            </Link>
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
              <Link href="/signup">
                <Button type="primary" className={styles.subscribeBtn}>
                  Subscribe Now
                </Button>
              </Link>
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
          <DateBar currentDateTime={currentDateTime} userSubscriptions={userSubscriptions} />
        </Col>
      </Row>
      <div className={styles.navbarContainer}>
        <div className={styles.container}>
          <div className={styles.navbarSide}></div>
          <Menu mode="horizontal" className={styles.navbar}>
            <Menu.Item key="Home" className={styles.navbarItem}>
              <Link href="/">
                <a>HOME</a>
              </Link>
            </Menu.Item>
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
            <Menu.Item key="Sportsbook_reviews" className={styles.navbarItem}>
              <Link href="https://blog.thedailystakes.com/category/sportsbook-reviews/">
                <a target="_blank">Sportsbook Reviews</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="Daily_insights" className={styles.navbarItem}>
              <Link href="https://blog.thedailystakes.com/">
                <a target="_blank">The Daily Insights</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="Merchandise" className={styles.navbarItem}>
              <Link href="/merchandise">
                <a>Merchandise</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="About_Us" className={styles.navbarItem}>
              <Link href="/aboutus">
                <a>About Us</a>
              </Link>
            </Menu.Item>
          </Menu>
          <div className={styles.navbarSide}>
            {/* <Button
              type="link"
              icon={<SearchIcon className={styles.cart_icon} />}
              aria-label="Search Packages Button"
            /> */}
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
                  icon={<HamburgerMenuIcon className={styles.hamburg_icon} />}
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
              {/* <Button
                type="link"
                aria-label="Search Packages Button"
                icon={<SearchIcon className={styles.cart_icon} />}></Button> */}
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
              {token && user.profile && user.profile.avatar && (
                <Dropdown
                  overlay={accountMenu}
                  placement="bottomLeft"
                  transitionName=""
                  trigger={['click']}>
                  <Button
                    type="link"
                    icon={<img src={user.profile?.avatar?.url} className={styles.cart_icon} />}
                    aria-label="User Profile Button"
                    className={styles.cart_btn}></Button>
                </Dropdown>
              )}
              {token && user.profile && !user.profile.avatar && (
                <Dropdown
                  overlay={accountMenu}
                  placement="bottomLeft"
                  transitionName=""
                  trigger={['click']}>
                  <div className={styles.profileLogo}>
                    <span>{`${user.profile.full_name?.split(' ')[0][0] || ''}${
                      user.profile.full_name?.split(' ')[1][0] || ''
                    }`}</span>
                  </div>
                </Dropdown>
              )}
            </div>
          </Row>
          {mobileNavVisible && (
            <div className={styles.mobileNavContent}>
              <DateBar currentDateTime={currentDateTime} userSubscriptions={userSubscriptions} />
              <Menu mode="vertical" className={styles.navbar}>
                <Menu.Item key="Home" className={styles.navbarItem}>
                  <Link href="/">
                    <a>HOME</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="SHOP" className={styles.navbarItem}>
                  <Link href="/shop">
                    <a>SHOP</a>
                  </Link>
                </Menu.Item>
                <SubMenu subscriptions={userSubscriptions} token={token} />
                <Menu.Item key="Yesterdays_Plays" className={styles.navbarItem}>
                  <Link href="/yesterdays-plays">
                    <a>Yesterdays Plays</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="Sportsbook_reviews" className={styles.navbarItem}>
                  <Link href="https://blog.thedailystakes.com/category/sportsbook-reviews/">
                    <a target="_blank">Sportsbook Reviews</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="Daily_insights" className={styles.navbarItem}>
                  <Link href="https://blog.thedailystakes.com/">
                    <a target="_blank">The Daily Insights</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="Merchandise" className={styles.navbarItem}>
                  <Link href="/merchandise">
                    <a>Merchandise</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="About_Us" className={styles.navbarItem}>
                  <Link href="/aboutus">
                    <a>About Us</a>
                  </Link>
                </Menu.Item>
              </Menu>
              {userSubscriptions.length > 0 && (
                <Link href="/member-dashboard">
                  <Button
                    type="primary"
                    className={styles.mobileSubscribeBtn}
                    onClick={hideMobileNav}>
                    My Dashboard
                  </Button>
                </Link>
              )}
              {userSubscriptions.length === 0 && (
                <Link href="/signup">
                  <Button
                    type="primary"
                    className={styles.mobileSubscribeBtn}
                    onClick={hideMobileNav}>
                    Subscribe Now
                  </Button>
                </Link>
              )}
              <Link href="/shop">
                <a className={styles.joinNowMobileBtn}>Join Now For $1</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
