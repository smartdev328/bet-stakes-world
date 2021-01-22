import { useEffect, useState } from 'react';
import { Menu, Row, Col } from 'antd';
import Link from 'next/link';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';

import {
  IdentityIcon,
  LockIcon,
  SearchIcon,
  CartIcon,
  CloseIcon,
  HamburgerMenuIcon
} from '@components/SvgIcons';
import { LoginModal } from '@components/index';
import styles from './AppHeader.module.css';

const Button = dynamic(() => import('antd/lib/button'));

type HeaderProps = {
  releaseTime: DateObjectType;
  winningRate: number;
  curRecord: string;
  currentDateTime: string;
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

function SubMenu() {
  const [sportPaneVisible, setSportPaneVisible] = useState<boolean>(false);
  const [fantasyPaneVisible, setFantasyPaneVisible] = useState<boolean>(false);
  const [submenuVisible, setSubmenuVisible] = useState<boolean>(false);

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
                <a onMouseOver={hidePanes}>Member Dashboard</a>
              </Link>
            </div>
            <div className={styles.submenu_item_for_pane}>
              <Link href="/sports-card">
                <a onMouseOver={showSportPanel}>
                  <span>Sports Card</span>
                  {sportPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                  {!sportPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                </a>
              </Link>
            </div>
            <div className={styles.submenu_item}>
              <Link href="/vip-all-access-card">
                <a onMouseOver={hidePanes}>VIP ALL ACCESS CARD</a>
              </Link>
            </div>
            <div className={styles.submenu_item_for_pane}>
              <Link href="/fantasy-daily-lineups">
                <a onMouseOver={showFantasyPanel}>
                  <span>FANTASY PICKS</span>
                  {fantasyPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                  {!fantasyPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                </a>
              </Link>
            </div>
            <div className={styles.submenu_item}>
              <Link href="/profile">
                <a onMouseOver={hidePanes}>Settings</a>
              </Link>
            </div>
          </div>
          <div className={styles.pane}>
            {sportPaneVisible && (
              <>
                <div className={styles.submenu_desc}>Yearly subscription — Available Sports</div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a>Basketball</a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a>Football</a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a>
                      <LockIcon className={styles.lock_icon} />
                      Baseball
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a>
                      <LockIcon className={styles.lock_icon} />
                      SOCCER
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a>
                      <LockIcon className={styles.lock_icon} />
                      UFC
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/sports-card">
                    <a>
                      <LockIcon className={styles.lock_icon} />
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
                    <a>All</a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/fantasy-daily-lineups">
                    <a>Basketball</a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/fantasy-daily-lineups">
                    <a>Football</a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/fantasy-daily-lineups">
                    <a>
                      <LockIcon className={styles.lock_icon} />
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
                  <a>Member Dashboard</a>
                </Link>
              </div>
              <div className={styles.submenu_item_for_pane}>
                <a>
                  <div
                    className={sportPaneVisible ? styles.paneActive : ''}
                    onClick={toggleSportPanel}>
                    <span>Sports Card</span>
                    {sportPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                    {!sportPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                  </div>
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
                        <a>Basketball</a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a>Football</a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a>
                          <LockIcon className={styles.lock_icon} />
                          Baseball
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a>
                          <LockIcon className={styles.lock_icon} />
                          SOCCER
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a>
                          <LockIcon className={styles.lock_icon} />
                          UFC
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/sports-card">
                        <a>
                          <LockIcon className={styles.lock_icon} />
                          FORMULA 1
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.submenu_item}>
                <Link href="/vip-all-access-card">
                  <a>VIP ALL ACCESS CARD</a>
                </Link>
              </div>
              <div className={styles.submenu_item_for_pane}>
                <a>
                  <div
                    className={fantasyPaneVisible ? styles.paneActive : ''}
                    onClick={toggleFantasyPanel}>
                    <span>FANTASY PICKS</span>
                    {fantasyPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                    {!fantasyPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                  </div>
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
                        <a>All</a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/fantasy-daily-lineups">
                        <a>Basketball</a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/fantasy-daily-lineups">
                        <a>Football</a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/fantasy-daily-lineups">
                        <a>
                          <LockIcon className={styles.lock_icon} />
                          Baseball
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.submenu_item}>
                <Link href="/profile">
                  <a>Settings</a>
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
  curRecord,
  winningRate,
  currentDateTime
}: HeaderProps) {
  const [remainingTime, setRemainingTime] = useState<RemainingTimeType>(DefaultRemainingTime);
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const remainingTimeInterval = setInterval(() => {
      const remainingTime = getRemainingTime(releaseTime);
      setRemainingTime(remainingTime);
    }, 1000);
    return () => {
      clearInterval(remainingTimeInterval);
      dispatch({ type: 'CLOSE_MODAL' });
    };
  }, []);

  const openLoginModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  const showMobileNav = () => {
    setMobileNavVisible(true);
  };

  const hideMobileNav = () => {
    setMobileNavVisible(false);
  };

  return (
    <header className={`${styles.appHeader} ${mobileNavVisible && styles.open}`}>
      <LoginModal />
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
            <span>
              <strong>Our Record:</strong> {curRecord}&nbsp;
            </span>
            <span>
              <strong>Winning Rate:</strong> {winningRate}% Return on investments
            </span>
          </p>
        </Col>
        <Col span={7} className={styles.headerRightCol}>
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
            <SubMenu />
            <Menu.Item key="Sports_News" className={styles.navbarItem}>
              Sports News
            </Menu.Item>
            <Menu.Item key="Yesterdays_Plays" className={styles.navbarItem}>
              <Link href="/yesterdays-plays">
                <a>Yesterdays Plays</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="About_Us" className={styles.navbarItem}>
              About Us
            </Menu.Item>
            <Menu.Item key="Merchandise" className={styles.navbarItem}>
              Merchandise
            </Menu.Item>
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
                  <span className={styles.text}>3</span>
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
                <a>
                  <Button
                    type="link"
                    icon={<CartIcon className={styles.cart_icon} />}
                    aria-label="Cart Button"
                    className={styles.cart_btn}>
                    <span className={styles.text}>3</span>
                  </Button>
                </a>
              </Link>
              <Button
                type="link"
                icon={<IdentityIcon className={styles.cart_icon} />}
                aria-label="User Profile Button"
                onClick={openLoginModal}
                className={styles.cart_btn}></Button>
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
                <SubMenu />
                <Menu.Item key="Sports_News" className={styles.navbarItem}>
                  Sports News
                </Menu.Item>
                <Menu.Item key="Yesterdays_Plays" className={styles.navbarItem}>
                  <Link href="/yesterdays-plays">
                    <a>Yesterdays Plays</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="About_Us" className={styles.navbarItem}>
                  About Us
                </Menu.Item>
                <Menu.Item key="Merchandise" className={styles.navbarItem}>
                  Merchandise
                </Menu.Item>
              </Menu>
              <Button type="primary" className={styles.subscribeBtn}>
                Subscribe Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
