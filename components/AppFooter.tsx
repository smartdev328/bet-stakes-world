import Link from 'next/link';
import { notification } from 'antd';
import { TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';
import { useDispatch } from 'react-redux';
import MailchimpSubscribe, { FormHooks } from 'react-mailchimp-subscribe';

import { TikTokIcon, FacebookIcon, ArrowForwardIcon } from '@components/SvgIcons';
import styles from './AppFooter.module.css';
import { useEffect, useState } from 'react';
import { validateEmail } from '@utils/common';

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
        message: 'You are subscribed successfully!',
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
        placeholder="User@fakemail.com"
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

function AppFooter() {
  const dispatch = useDispatch();

  const openLoginModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
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
                    <Link href="/vip-all-access-card">
                      <a>VIP All Access</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/sports-card">
                      <a>Sports Cards</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/fantasy-daily-lineups">
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
                    <a href="https://facebook.com">
                      <FacebookIcon className={styles.facebook_icon} />
                      <span className={styles.icon_title}>Facebook</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com">
                      <InstagramOutlined />
                      <span className={styles.icon_title}>Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com">
                      <TwitterOutlined />
                      <span className={styles.icon_title}>Twitter</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://tiktok.com">
                      <TikTokIcon className={styles.tiktok_icon} />
                      <span className={styles.icon_title}>TikTok</span>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className={styles.mainFooter_RightCol} align={'middle'} justify={'end'}>
            <Button type="primary" className={styles.subscribeBtn}>
              Subscribe Now
            </Button>
            <Button className={styles.loginBtn} onClick={openLoginModal}>
              Log In
            </Button>
          </Row>
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
