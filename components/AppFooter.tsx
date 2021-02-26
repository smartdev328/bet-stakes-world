import Link from 'next/link';
import { notification } from 'antd';
import { TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';
import { useDispatch } from 'react-redux';
import MailchimpSubscribe, { FormHooks } from 'react-mailchimp-subscribe';
import { useRouter } from 'next/router';

import { TikTokIcon, FacebookIcon, ArrowForwardIcon } from '@components/SvgIcons';
import styles from './AppFooter.module.css';
import { useEffect, useState } from 'react';
import { validateEmail } from '@utils/common';
import { JWT } from '@type/Main';

const Row = dynamic(() => import('antd/lib/row'));
const Col = dynamic(() => import('antd/lib/col'));
const Button = dynamic(() => import('antd/lib/button'));
const url =
  '//thedailystakes.us19.list-manage.com/subscribe/post?u=aa5150b7c559aed8ed8c1eaf6&amp;id=4829d57c24';

type SubscriptionFormProps = {
  status: string | null;
  message: string | Error | null;
  onValidated: (_: { EMAIL: string }) => void;
};

function CustomForm({ status, message, onValidated }: SubscriptionFormProps) {
  const [email, setEmail] = useState<string>('');
  useEffect(() => {
    if (status === 'success') {
      notification['info']({
        message:
          'You’ve successfully subscribed to TheDailyStakes Newsletter. Welcome to the team!',
        description: null
      });
    }
    if (status === 'error') {
      notification['error']({
        message: 'Subscription Error!',
        description: null
      });
    }
  }, [status, message]);
  const emailChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const submit = () => {
    if (validateEmail(email)) {
      onValidated({
        EMAIL: email
      });
    }
  };

  return (
    <>
      <input
        id="newsletter_email"
        type="email"
        placeholder="johnnycash@gmail.com"
        onChange={emailChanged}
        className={styles.newsletterForm_email}
      />
      <Button
        icon={<ArrowForwardIcon className={styles.arrow_icon} />}
        aria-label="Newsletter Subscribe Button"
        className={styles.newsletterForm_submit}
        onClick={submit}
      />
    </>
  );
}

function AppFooter({ token }: { token: JWT | null }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const goSignUp = () => {
    router.push('/signup');
  };

  const openLoginModal = () => {
    dispatch({ type: 'OPEN_LOGIN_MODAL' });
  };

  return (
    <footer>
      <div className={styles.newsletterRow}>
        <div className={styles.newsletterCol}>
          <LazyLoad height={72}>
            <Link href="/">
              <a>
                <img
                  src="/images/logo.svg"
                  alt="App Logo"
                  width={418}
                  height={72}
                  className={styles.logo}
                />
              </a>
            </Link>
          </LazyLoad>
          <div className={styles.newsletterFormContainer}>
            <label htmlFor="newsletter_email">Sign up for our newsletter</label>
            <div className={styles.newletterForm}>
              <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }: FormHooks<{ EMAIL: string }>) => (
                  <CustomForm
                    status={status}
                    message={message}
                    onValidated={(formData) => subscribe(formData)}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Main Footer */}
      <div className={styles.mainFooter}>
        <div className={styles.mainFooterRow}>
          <Row className={styles.mainFooter_leftCol}>
            <Col span={8}>
              <div className={styles.menuListTitle}>Memberships</div>
              <div className={styles.menuList}>
                <ul>
                  <li>
                    <Link href="/shop?plan=all">
                      <a>VIP All Access</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?plan=sports_card">
                      <a>Sports Cards</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?plan=fantasy">
                      <a>Daily Fantasy</a>
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
                  <li>
                    <Link href="/">
                      <a>NCAAF</a>
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <Link href="/">
                      <a>NCAAB</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>SOCCER</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>UFC</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>FORMULA 1</a>
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
                    <a href="https://www.facebook.com/Thedaily-Stakes-101743668565673">
                      <FacebookIcon className={styles.facebook_icon} />
                      <span className={styles.icon_title}>Facebook</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/thedailystakes/?hl=en">
                      <InstagramOutlined />
                      <span className={styles.icon_title}>Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/TheDailyStakes">
                      <TwitterOutlined />
                      <span className={styles.icon_title}>Twitter</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://vm.tiktok.com/ZMJopkEV7/">
                      <TikTokIcon className={styles.tiktok_icon} />
                      <span className={styles.icon_title}>TikTok</span>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className={styles.mainFooter_RightCol} align={'middle'} justify={'end'}>
            {!token && (
              <>
                <Button type="primary" onClick={goSignUp} className={styles.subscribeBtn}>
                  Subscribe Now
                </Button>
                <Button className={styles.loginBtn} onClick={openLoginModal}>
                  Log In
                </Button>
              </>
            )}
            {token && (
              <>
                <Link href="/member-dashboard">
                  <a className={styles.myDashboardBtn}>My Dashboard</a>
                </Link>
                <Link href="/profile">
                  <a className={styles.profileBtn}>My Account</a>
                </Link>
              </>
            )}
          </Row>
        </div>
        <div className={`${styles.mainFooterRow} ${styles.mainFooterNavmenu}`}>
          <Link href="/aboutus">
            <a className={styles.navbarItem}>About us</a>
          </Link>
          <Link href="/contact-us">
            <a className={styles.navbarItem}>Contact us</a>
          </Link>
          <Link href="/faqs">
            <a className={styles.navbarItem}>FAQ</a>
          </Link>
          <Link href="/terms">
            <a className={styles.navbarItem}>Terms of use</a>
          </Link>
          <Link href="/privacy">
            <a className={styles.navbarItem}>Privacy Policy</a>
          </Link>
        </div>
      </div>
      {/* Footer Info */}
      <div className={styles.infobar}>
        <div className={styles.infobarRow}>
          <span>Copyright © 2021 The Daily Stakes All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
