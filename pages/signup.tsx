/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Row, Col, Button, notification } from 'antd';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import { NormalCheckIcon } from '@components/SvgIcons';
import { BillingPlan, Package, PackageBillingPlan } from '@type/Packages';
import { CreateUserType, CreateUserValidateType } from '@type/Users';
import { ReduxState } from '@redux/reducers';
import { validateEmail } from '@utils/common';
import PackageAPIs from '@apis/package.apis';
import { PageProps, SportInfoType } from '@type/Main';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';

import styles from '@styles/Signup.module.css';
import { PACKAGE_NAMES } from '@constants/';

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <LazyLoad>
        <img src="/images/blackbanner.jpg" className={styles.bgImage} />
      </LazyLoad>
      <div className={styles.heroBannerContent}>
        <h1>Registration</h1>
        <p className={styles.create_account}>Create an Account for Free</p>
      </div>
      <BannerSportsAndMatches />
    </div>
  );
}

type AccessCardPackagePropsType = {
  data: Package;
  onSelectPackage: (id: number, billingPlan: BillingPlan) => void;
};

const SPORTS_INFO = [
  {
    name: 'NBA',
    id: 'NBA',
    background: '#EC4C15',
    logo: () => <NBA_SVG className={styles.sports_logo} />
  },
  {
    name: 'NFL',
    id: 'NFL',
    background: '#91442A',
    logo: () => <NFL_SVG className={styles.sports_logo} />
  },
  {
    name: 'MLB',
    id: 'MLB',
    background: '#1878FB',
    logo: () => <MLB_SVG className={styles.sports_logo} />
  },
  {
    name: 'NCAAF',
    id: 'NCAAF',
    background: '#91442A',
    logo: () => <NFL_SVG className={styles.sports_logo} />
  },
  {
    name: 'NCAAB',
    id: 'NCAAB',
    background: '#EC4C15',
    logo: () => <NBA_SVG className={styles.sports_logo} />
  },
  {
    name: 'SOCCER',
    id: 'SOCCER',
    background: '#6DCF40',
    logo: () => <SOCCER_SVG className={styles.sports_logo} />
  },
  {
    name: 'UFC',
    id: 'UFC',
    background: '#F9282B',
    logo: () => <UFC_SVG className={styles.sports_logo} />
  },
  {
    name: 'FORMULA 1',
    id: 'F1',
    background: '#505054',
    logo: () => <F1_SVG className={styles.sports_logo} />
  }
];

function SportsCardPackage({ data }: AccessCardPackagePropsType) {
  return (
    <div className={`${styles.package} ${styles.select}`}>
      <div className={styles.packageTitle}>
        <span>{data?.name}</span>
      </div>
      {data.name.toUpperCase().indexOf(PACKAGE_NAMES.SPORTS_CARD) > -1 && (
        <>
          <ul className={styles.list_with_checkmark}>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                Receive Access to&nbsp;<b>ALL</b>&nbsp;Plays for the&nbsp;<b>Sport(s)</b>&nbsp;of
                Your Choice
              </div>
            </li>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                <b>Customized Dashboard</b>&nbsp;Including&nbsp;<b>Automated Record Tracking</b>
              </div>
            </li>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                <b>Advanced Stats</b>&nbsp;for each bet,&nbsp;
                <b>Weekly Pro Tip & Bankroll Strategies</b>
              </div>
            </li>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                <b>Weekly, Monthly, Season & Playoff</b>&nbsp;Packages Available.
              </div>
            </li>
          </ul>
          <div className={styles.sportsCards}>
            <div className={styles.sectionTitle}>Sports Covered*</div>
            <div className={styles.sportsTypeContent}>
              {SPORTS_INFO.map((sport: SportInfoType, index: number) => (
                <Button key={index} className={styles.dropdownBtnWrapper}>
                  <div
                    className={`${styles.dropdownBtn} ${styles['dropdown_' + sport.id]}`}
                    style={{
                      background: sport.background
                    }}>
                    {sport.logo()}
                    <span>{sport.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          <div className={styles.extra_info}>
            * Soccer Includes&nbsp;<b>All Major Leagues and Tournaments</b>&nbsp;Including the
            English Premier League, La Liga, Serie A, Bundesliga, UEFA Champions League, amongst
            others.
          </div>
        </>
      )}
      {data.name.toUpperCase().indexOf(PACKAGE_NAMES.FANTASY) > -1 && (
        <>
          <ul className={styles.list_with_checkmark}>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                Daily Fantasy Lineups (&rdquo;DFS&rdquo;) for<b>&nbsp;Single Game & Tournament</b>
                &nbsp;Style Contests
              </div>
            </li>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                Formats Included for<b>&nbsp;DraftKings, Fanduel & Yahoo Sportsbooks</b>
              </div>
            </li>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                <b>&nbsp;Advanced Stats, Projected Points, Player Prop Comps</b>&nbsp;& Other Key
                Stats
              </div>
            </li>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                <b>&nbsp;Daily, Weekly & Monthly</b>&nbsp;Packages Available*
              </div>
            </li>
          </ul>
          <div className={styles.sportsCards}>
            <div className={styles.sectionTitle}>Sports Covered</div>
            <div className={styles.sportsTypeContent}>
              {SPORTS_INFO.slice(0, 3).map((sport: SportInfoType, index: number) => (
                <Button key={index} className={styles.dropdownBtnWrapper}>
                  <div
                    className={`${styles.dropdownBtn} ${styles['dropdown_' + sport.id]}`}
                    style={{
                      background: sport.background
                    }}>
                    {sport.logo()}
                    <span>{sport.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          <div className={styles.sportsCards}>
            <div className={styles.sectionTitle}>Sportsbook Formats Included</div>
            <div className={styles.sportsTypeContent}>
              <img
                src="/images/draftkings-square-logo.png"
                alt=""
                className={styles.fantasy_sportsbook}
              />
              <img
                src="/images/Fanduel-square-logo.png"
                alt=""
                className={styles.fantasy_sportsbook}
              />
              <img
                src="/images/yahoo-daily-fantasy-square-logo.png"
                alt=""
                className={styles.fantasy_sportsbook}
              />
            </div>
          </div>
        </>
      )}
      {data.name.toUpperCase().indexOf(PACKAGE_NAMES.VIP_ALL_ACCESS) > -1 && (
        <>
          <ul className={styles.list_with_checkmark}>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                Receive Access to&nbsp;<strong>ALL</strong>&nbsp;Plays for&nbsp;<strong>ALL</strong>
                &nbsp;Sports, Including&nbsp;<strong>BONUS</strong>&nbsp;Plays
              </div>
            </li>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>Sports Include NBA, NFL, SOCCER, NCAAF, NCAAB, UFC & Formula 1</div>
            </li>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                <strong>Customized Dashboard</strong>&nbsp;Including Automated Record Tracking
              </div>
            </li>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                <strong>Advanced Stats</strong>&nbsp;for each bet,&nbsp;
                <strong>Weekly Pro Tips & Bankroll Strategies</strong>
              </div>
            </li>
            <li>
              <NormalCheckIcon className={styles.list_check_icon} />
              <div>
                <strong>Daily, Weekly, Monthly & Annual</strong>&nbsp;Packages Available*.
              </div>
            </li>
          </ul>
          <Row>
            <Col span={12}>
              <div className={styles.vipBestValue}>
                <img src="/images/mark-vip2.svg" alt="" />
                <span>Best Value!</span>
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.vipBestValue}>
                <img src="/images/ds-protectionn.png" className={styles.protection_image} />
              </div>
            </Col>
          </Row>
          <div className={styles.extra_info}>
            *The&nbsp;<strong>Daily Card</strong>&nbsp;includes{' '}
            <Link href="/">
              <a>TheDailyStakes Guaranteed Protection</a>
            </Link>
            . The&nbsp;<strong>Annual Package</strong>&nbsp;can be cancelled at any time & includes
            access to&nbsp;<strong>in-game wager plays</strong>.
          </div>
        </>
      )}
    </div>
  );
}

export default function Registration({ packages, token, subscriptions }: PageProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error: signupError, profile, loading } = useSelector((state: ReduxState) => state.user);
  const [formData, setFormData] = useState<CreateUserType>({
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    full_name: undefined,
    email: undefined,
    provider: undefined,
    mobile_number: undefined,
    password: undefined,
    verify_password: undefined
  });
  const [selectedBillingPlans, setSelectedBillingPlans] = useState<PackageBillingPlan[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formValidation, setFormValidation] = useState<CreateUserValidateType>({
    username: true,
    first_name: true,
    last_name: true,
    email: true,
    password: true,
    verify_password: true
  });

  useEffect(() => {
    // Show SignUp Error Notification
    if (formSubmitted && signupError) {
      notification['error']({
        message: 'Registration Error!',
        description: signupError
      });
    }
    // Redirect to dashboard page after registration
    if (!signupError && !loading && formSubmitted) {
      dispatch({ type: 'SEND_CONFIRM_EMAIL' });
      router.push('/member-dashboard');
    }
  }, [signupError, profile, loading]);

  const changePackagesSection = (id: number, billingPlan: BillingPlan) => {
    const updatedPlans = selectedBillingPlans.slice();
    const index = updatedPlans.findIndex((plan: PackageBillingPlan) => plan.id === id);
    if (index < 0) {
      updatedPlans.push({ id, billing_plan: billingPlan });
    } else {
      updatedPlans[index].billing_plan = billingPlan;
    }
    setSelectedBillingPlans(updatedPlans);
  };

  // Handler for RegisterNow button
  const onSignup = () => {
    dispatch({
      type: 'SIGNUP_USER',
      payload: {
        ...formData,
        provider: 'local'
      }
    });
    setFormSubmitted(true);
  };
  const changeFormData = (name: keyof CreateUserType, e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newFormData = Object.assign({}, formData);
    newFormData[name] = value;
    newFormData.full_name = newFormData.first_name + ' ' + newFormData.last_name;
    setFormData(newFormData);
    validateForm(newFormData);
  };
  const validateForm = (data: CreateUserType) => {
    const newValidation = Object.assign({}, formValidation);
    let isValid = true;
    if (data.first_name === '') {
      newValidation.first_name = false;
      isValid = false;
    } else if (data.first_name === undefined) {
      isValid = false;
    } else {
      newValidation.first_name = true;
    }
    if (data.last_name === '') {
      newValidation.last_name = false;
      isValid = false;
    } else if (data.last_name == undefined) {
      isValid = false;
    } else {
      newValidation.last_name = true;
    }
    if (data.username === '') {
      newValidation.username = false;
      isValid = false;
    } else if (data.username === undefined) {
      isValid = false;
    } else {
      newValidation.username = true;
    }
    if (data.email === '') {
      newValidation.email = false;
      isValid = false;
    } else if (data.email == undefined) {
      isValid = false;
    } else if (data.email !== '' && !validateEmail(data.email || '')) {
      newValidation.email = false;
      isValid = false;
    } else {
      newValidation.email = true;
    }
    if (data.verify_password !== data.password) {
      newValidation.verify_password = false;
      newValidation.password = false;
      isValid = false;
    } else if (data.password === '' || (data.password && data.password.length < 6)) {
      newValidation.password = false;
      isValid = false;
    } else if (data.password == undefined) {
      isValid = false;
    } else {
      newValidation.password = true;
    }
    if (data.verify_password === '') {
      newValidation.verify_password = false;
      isValid = false;
    } else if (data.verify_password == undefined) {
      isValid = false;
    } else {
      newValidation.verify_password = true;
    }
    setFormValidation(newValidation);
    setIsFormValid(isValid);
  };

  let vipAllAccessPack: Package | undefined = undefined,
    fantasyPack: Package | undefined = undefined,
    sportsCardPack: Package | undefined = undefined;
  const sortedPackages: Package[] = [];
  if (packages) {
    packages?.forEach((pack) => {
      if (pack.name.toUpperCase().indexOf(PACKAGE_NAMES.VIP_ALL_ACCESS) > -1) {
        vipAllAccessPack = pack;
      } else if (pack.name.toUpperCase().indexOf(PACKAGE_NAMES.FANTASY) > -1) {
        fantasyPack = pack;
      } else if (pack.name.toUpperCase().indexOf(PACKAGE_NAMES.SPORTS_CARD) > -1) {
        sportsCardPack = pack;
      }
    });
    if (vipAllAccessPack) {
      sortedPackages.push(vipAllAccessPack);
    }
    if (sportsCardPack) {
      sortedPackages.push(sportsCardPack);
    }
    if (fantasyPack) {
      sortedPackages.push(fantasyPack);
    }
  }

  return (
    <>
      <Head>
        <title>The Daily Stakes - Registration</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <div className={styles.sectionTitle}>Our Membership packages</div>
          <Row>
            <div className={styles.packagesCol}>
              {sortedPackages?.map((pack: Package) => (
                <SportsCardPackage
                  key={pack.id}
                  data={pack}
                  onSelectPackage={changePackagesSection}
                />
              ))}
            </div>
            <div className={styles.registrationCol}>
              <div className={styles.sectionTitle}>Create an account</div>
              <ul className={styles.list_with_checkmark}>
                <li>
                  <NormalCheckIcon className={styles.list_check_icon} />
                  <div>
                    <b>Free</b> Monthly Sports Betting Picks & Optimal DFS Lineups
                  </div>
                </li>
                <li>
                  <NormalCheckIcon className={styles.list_check_icon} />
                  <div>
                    Access to <b>Premium Content</b> Including Yesterday’s Plays
                  </div>
                </li>
                <li>
                  <NormalCheckIcon className={styles.list_check_icon} />
                  <div>
                    <b>Exclusive</b> Subscription Based Discounts & Insights
                  </div>
                </li>
              </ul>
              <form autoComplete="off">
                <Row>
                  <Col span={24} className={styles.formGroup}>
                    <label>User Name*</label>
                    <input
                      name="username"
                      className={formValidation.username ? '' : styles.error}
                      placeholder="ie: CashmeOut91"
                      onChange={(e) => changeFormData('username', e)}
                    />
                  </Col>
                </Row>
                <Row className={styles.rowWithTwoChild} justify="space-between">
                  <Col span={12} className={styles.formGroup}>
                    <label>First Name*</label>
                    <input
                      name="first_name"
                      className={formValidation.first_name ? '' : styles.error}
                      placeholder="ie: Johnny"
                      onChange={(e) => changeFormData('first_name', e)}
                    />
                  </Col>
                  <Col span={12} className={styles.formGroup}>
                    <label>Last Name*</label>
                    <input
                      name="last_name"
                      className={formValidation.last_name ? '' : styles.error}
                      placeholder="ie: Cash"
                      onChange={(e) => changeFormData('last_name', e)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className={styles.formGroup}>
                    <label>Email*</label>
                    <input
                      name="email"
                      className={formValidation.email ? '' : styles.error}
                      type="email"
                      placeholder="ie: j.cash@gmail.com"
                      onChange={(e) => changeFormData('email', e)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className={styles.formGroup}>
                    <label>MOBILE NUMBER (FOR IN-GAME BETS)</label>
                    <input
                      name="mobile_number"
                      placeholder="1-111-111-1111"
                      onChange={(e) => changeFormData('mobile_number', e)}
                    />
                  </Col>
                </Row>
                <Row className={styles.rowWithTwoChild} justify="space-between">
                  <Col span={12} className={styles.formGroup}>
                    <label>Password*</label>
                    <input
                      name="password"
                      className={formValidation.password ? '' : styles.error}
                      type="password"
                      placeholder="ie: **********"
                      onChange={(e) => changeFormData('password', e)}
                    />
                  </Col>
                  <Col span={12} className={styles.formGroup}>
                    <label>Verify Password*</label>
                    <input
                      name="verify_password"
                      className={formValidation.verify_password ? '' : styles.error}
                      type="password"
                      placeholder="ie: **********"
                      onChange={(e) => changeFormData('verify_password', e)}
                    />
                  </Col>
                </Row>

                <br></br>
                <Row justify="space-between">
                  <Col span={24}>
                    <Button
                      className={styles.registerBtn}
                      disabled={!isFormValid}
                      onClick={onSignup}>
                      Register Now
                    </Button>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col className={styles.termsSection}>
                    <div className={styles.termsContent}>
                      By creating an account above, you consent to The Daily Stakes, Inc.&#39;s{' '}
                      <a href="/terms">Terms of Service</a> and{' '}
                      <a href="/privacy">Privacy Policy</a>. We use your email to provide you with
                      news, updates, and promotions.
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
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
