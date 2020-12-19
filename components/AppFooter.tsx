import { Input, Button, Image, Row, Col, Menu } from 'antd';
import Link from 'next/link';

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
                  <li>Daily Pick</li>
                  <li>Sports Cards</li>
                  <li>Full access Member Card</li>
                </ul>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.menuListTitle}>Sports</div>
              <div className={styles.menuList}>
                <ul>
                  <li>NBA</li>
                  <li>NFL</li>
                  <li>MLB</li>
                </ul>
                <ul>
                  <li>UFC</li>
                  <li>Formula 1</li>
                  <li>Soccer</li>
                </ul>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.menuListTitle}>Sports</div>
              <div className={styles.menuList}>
                <ul>
                  <li>Facebook</li>
                  <li>Instagram</li>
                  <li>Youtube</li>
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
            <a className={styles.navbarItem}>Calculators</a>
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
          <span>Website by KRFTWRK.ca</span>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
