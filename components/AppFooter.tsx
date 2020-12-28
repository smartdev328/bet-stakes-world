import { Input, Button, Image, Row, Col } from 'antd';
import Link from 'next/link';
import { TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

import { TikTokIcon, FacebookIcon } from '@components/SvgIcons';
import styles from './AppFooter.module.css';

function AppFooter() {
  return (
    <footer>
      <div className={styles.newsletterRow}>
        <div className={styles.newsletterCol}>
          <Image src="/images/logo.svg" className={styles.logo} />
          <div className={styles.newsletterFormContainer}>
            <label htmlFor="newsletter_email">Sign up for our newsletter</label>
            <div className={styles.newletterForm}>
              <Input
                id="newsletter_email"
                type="email"
                placeholder="User@fakemail.com"
                className={styles.newsletterForm_email}
              />
              <Button
                icon={<Image src="/images/arrow_forward_icon.svg" className={styles.arrow_icon} />}
                className={styles.newsletterForm_submit}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Main Footer */}
      <div className={styles.mainFooter}>
        <div className={styles.mainFooterRow}>
          <Row className={styles.mainFooterLeftCol}>
            <Col span={8}>
              <div className={styles.menuListTitle}>Memberships</div>
              <div className={styles.menuList}>
                <ul>
                  <li>
                    <Link href="/">
                      <a>VIP All Access</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>Sports Cards</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>Daily Fantasy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>Season Fantasy</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.menuListTitle}>Sports</div>
              <div className={styles.menuList}>
                <ul>
                  <li>
                    <Link href="/">
                      <a>NBA</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>NFL</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>MLB</a>
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <Link href="/">
                      <a>NCAAF</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>NCAAB</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>Soccer</a>
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <Link href="/">
                      <a>UFC</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>Formula 1</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.menuListTitle}>Social</div>
              <div className={styles.menuList}>
                <ul>
                  <li>
                    <a>
                      <FacebookIcon className={styles.facebook_icon} />
                      <span className={styles.icon_title}>Facebook</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <InstagramOutlined />
                      <span className={styles.icon_title}>Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <TwitterOutlined />
                      <span className={styles.icon_title}>Twitter</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <TikTokIcon className={styles.tiktok_icon} />
                      <span className={styles.icon_title}>TikTok</span>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className={styles.mainFooterRightCol}>
            <Button type="primary" className={styles.subscribeBtn}>
              Subscribe Now
            </Button>
            <Button className={styles.loginBtn}>Log In</Button>
          </div>
        </div>
        <div className={`${styles.mainFooterRow} ${styles.mainFooterNavmenu}`}>
          <Link href="/">
            <a className={styles.navbarItem}>About us</a>
          </Link>
          <Link href="/">
            <a className={styles.navbarItem}>Contact us</a>
          </Link>
          <Link href="/">
            <a className={styles.navbarItem}>FAQ</a>
          </Link>
          <Link href="/">
            <a className={styles.navbarItem}>Terms of use</a>
          </Link>
          <Link href="/">
            <a className={styles.navbarItem}>Privacy Policy</a>
          </Link>
        </div>
      </div>
      {/* Footer Info */}
      <div className={styles.infobar}>
        <div className={styles.infobarRow}>
          <span>Copyright © 2020 The daily stakes All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
