/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Row, Col, Image, Button, Divider, Menu } from 'antd';
import Link from 'next/link';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import moment from 'moment';

import styles from './AppHeader.module.css';
import { useEffect, useState } from 'react';

type HeaderProps = {
  releaseTime: string;
  winningRate: number;
  curRecord: string;
};

type RemainingTimeType = {
  hrs: number;
  mins: number;
  secs: number;
};

const DefaultRemainingTime = {
  hrs: 0,
  mins: 0,
  secs: 0
};

function LockIcon() {
  return (
    <svg
      width="17"
      height="21"
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.lock_icon}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2422 7H14.2422C15.3422 7 16.2422 7.9 16.2422 9V19C16.2422 20.1 15.3422 21 14.2422 21H2.24219C1.14219 21 0.242188 20.1 0.242188 19V9C0.242188 7.9 1.14219 7 2.24219 7H3.24219V5C3.24219 2.24 5.48219 0 8.24219 0C11.0022 0 13.2422 2.24 13.2422 5V7ZM8.24219 2C6.58219 2 5.24219 3.34 5.24219 5V7H11.2422V5C11.2422 3.34 9.90219 2 8.24219 2ZM2.24219 19V9H14.2422V19H2.24219ZM10.2422 14C10.2422 15.1 9.34219 16 8.24219 16C7.14219 16 6.24219 15.1 6.24219 14C6.24219 12.9 7.14219 12 8.24219 12C9.34219 12 10.2422 12.9 10.2422 14Z"
        fill="white"
      />
    </svg>
  );
}

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
              <Link href="/">
                <a onMouseOver={hidePanes}>Main Pages</a>
              </Link>
            </div>
            <div className={styles.submenu_item}>
              <Link href="/">
                <a onMouseOver={hidePanes}>Member Dashboard</a>
              </Link>
            </div>
            <div className={styles.submenu_item_for_pane}>
              <Link href="/">
                <a onMouseOver={showSportPanel}>
                  <span>Sports Card</span>
                  {sportPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                  {!sportPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                </a>
              </Link>
            </div>
            <div className={styles.submenu_item}>
              <Link href="/">
                <a onMouseOver={hidePanes}>VIP ALL ACCESS CARD</a>
              </Link>
            </div>
            <div className={styles.submenu_item_for_pane}>
              <Link href="/">
                <a onMouseOver={showFantasyPanel}>
                  <span>FANTASY PICKS</span>
                  {fantasyPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                  {!fantasyPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                </a>
              </Link>
            </div>
            <div className={styles.submenu_item}>
              <Link href="/">
                <a onMouseOver={hidePanes}>Settings</a>
              </Link>
            </div>
          </div>
          <div className={styles.pane}>
            {sportPaneVisible && (
              <>
                <div className={styles.submenu_desc}>Yearly subscription — Available Sports</div>
                <div className={styles.submenu_item}>
                  <Link href="/">
                    <a>Basketball</a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/">
                    <a>Football</a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/">
                    <a>
                      <LockIcon />
                      Baseball
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/">
                    <a>
                      <LockIcon />
                      UFC
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/">
                    <a>
                      <LockIcon />
                      Formula 1
                    </a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/">
                    <a>
                      <LockIcon />
                      Soccer
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
                  <Link href="/">
                    <a>All</a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/">
                    <a>Basketball</a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/">
                    <a>Football</a>
                  </Link>
                </div>
                <div className={styles.submenu_item}>
                  <Link href="/">
                    <a>
                      <LockIcon />
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
                <Link href="/">
                  <a>Member Dashboard</a>
                </Link>
              </div>
              <div className={styles.submenu_item_for_pane}>
                <div
                  className={sportPaneVisible ? styles.paneActive : ''}
                  onClick={toggleSportPanel}>
                  <span>Sports Card</span>
                  {sportPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                  {!sportPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                </div>
              </div>
              <div className={styles.pane}>
                {sportPaneVisible && (
                  <>
                    <div className={styles.submenu_desc}>
                      Yearly subscription — Available Sports
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/">
                        <a>Basketball</a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/">
                        <a>Football</a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/">
                        <a>
                          <LockIcon />
                          Baseball
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/">
                        <a>
                          <LockIcon />
                          UFC
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/">
                        <a>
                          <LockIcon />
                          Formula 1
                        </a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/">
                        <a>
                          <LockIcon />
                          Soccer
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.submenu_item}>
                <Link href="/">
                  <a>VIP ALL ACCESS CARD</a>
                </Link>
              </div>
              <div className={styles.submenu_item_for_pane}>
                <div
                  className={fantasyPaneVisible ? styles.paneActive : ''}
                  onClick={toggleFantasyPanel}>
                  <span>FANTASY PICKS</span>
                  {fantasyPaneVisible && <CaretUpOutlined className={styles.caret_up} />}
                  {!fantasyPaneVisible && <CaretDownOutlined className={styles.caret_down} />}
                </div>
              </div>
              <div className={styles.pane}>
                {fantasyPaneVisible && (
                  <>
                    <div className={styles.submenu_desc}>
                      Daily Lineup Subscription — Available Sports
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/">
                        <a>All</a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/">
                        <a>Basketball</a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/">
                        <a>Football</a>
                      </Link>
                    </div>
                    <div className={styles.submenu_item}>
                      <Link href="/">
                        <a>
                          <LockIcon />
                          Baseball
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.submenu_item}>
                <Link href="/">
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

function getRemainingTime(date: string): RemainingTimeType {
  const now = moment(new Date()); //todays date
  const end = moment(date); // another date
  let diff = moment.duration(end.diff(now)).asSeconds();
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

function DateBar() {
  return (
    <div className={styles.dateBar}>
      <Link href="/">
        <a>Today’s Bets</a>
      </Link>
      <Divider type="vertical" className={styles.dateBarDivider} />
      <Link href="/">
        <a>{moment().format('dddd,  MMM DD, YYYY')}</a>
      </Link>
    </div>
  );
}

export default function AppHeader({ releaseTime, curRecord, winningRate }: HeaderProps) {
  const [remainingTime, setRemainingTime] = useState<RemainingTimeType>(DefaultRemainingTime);
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
  useEffect(() => {
    const remainingTimeInterval = setInterval(() => {
      const remainingTime = getRemainingTime(releaseTime);
      setRemainingTime(remainingTime);
    }, 1000);
    return () => {
      clearInterval(remainingTimeInterval);
    };
  }, []);

  const showMobileNav = () => {
    setMobileNavVisible(true);
  };

  const hideMobileNav = () => {
    setMobileNavVisible(false);
  };

  return (
    <header className={`${styles.appHeader} ${mobileNavVisible && styles.open}`}>
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
            <Image src="/images/logo.svg" className={styles.logo} />
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
              icon={<Image src="/images/identity_icon.svg" className={styles.user_icon} />}
              className={styles.loginBtn}>
              Log In
            </Button>
          </div>
          <DateBar />
        </Col>
      </Row>
      <div className={styles.navbarContainer}>
        <div className={styles.container}>
          <div className={styles.navbarSide}></div>
          <Menu mode="horizontal" className={styles.navbar}>
            <Menu.Item key="SHOP" className={styles.navbarItem}>
              SHOP
            </Menu.Item>
            <SubMenu />
            <Menu.Item key="Sports_News" className={styles.navbarItem}>
              Sports News
            </Menu.Item>
            <Menu.Item key="Yesterdays_Plays" className={styles.navbarItem}>
              Yesterdays Plays
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
              icon={<Image src="/images/zoom_in_icon.svg" className={styles.cart_icon} />}></Button>
            <Button
              type="link"
              icon={<Image className={styles.cart_icon} src="/images/cart_icon.svg" />}
              className={styles.cart_btn}>
              <span className={styles.text}>2</span>
            </Button>
          </div>
        </div>
        <div className={styles.mobilecontainer}>
          <Row>
            <div className={`${styles.navbarSide} ${styles.navbarLeftSide}`}>
              {!mobileNavVisible ? (
                <Button
                  type="link"
                  icon={
                    <Image
                      src="/images/menu_icon.svg"
                      preview={false}
                      className={styles.cart_icon}
                    />
                  }
                  onClick={showMobileNav}
                  className={styles.mobile_navbar_btn}></Button>
              ) : (
                <Button
                  type="link"
                  onClick={hideMobileNav}
                  icon={
                    <Image
                      src="/images/close_icon.svg"
                      preview={false}
                      className={styles.cart_icon}
                    />
                  }
                  className={styles.mobile_navbar_btn}></Button>
              )}
            </div>
            <div className={styles.navbarSide}>
              <Button
                type="link"
                icon={
                  <Image src="/images/zoom_in_icon.svg" className={styles.cart_icon} />
                }></Button>
              <Button
                type="link"
                icon={<Image className={styles.cart_icon} src="/images/cart_icon.svg" />}
                className={styles.cart_btn}>
                <span className={styles.text}>2</span>
              </Button>
              <Button
                type="link"
                icon={<Image className={styles.cart_icon} src="/images/identity_icon.svg" />}
                className={styles.cart_btn}></Button>
            </div>
          </Row>
          {mobileNavVisible && (
            <div className={styles.mobileNavContent}>
              <DateBar />
              <Menu mode="vertical" className={styles.navbar}>
                <Menu.Item key="SHOP" className={styles.navbarItem}>
                  SHOP
                </Menu.Item>
                <SubMenu />
                <Menu.Item key="Sports_News" className={styles.navbarItem}>
                  Sports News
                </Menu.Item>
                <Menu.Item key="Yesterdays_Plays" className={styles.navbarItem}>
                  Yesterdays Plays
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
