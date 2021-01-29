/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, Dropdown, Menu, Button, notification } from 'antd';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import { NormalCheckIcon, EmptyCircleIcon, CheckedCircleIcon } from '@components/SvgIcons';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import { PageProps, SportInfoType } from '@type/Main';
import { BillingPlan, Package, PackageBillingPlan } from '@type/Packages';
import { CreateUserType, CreateUserValidateType } from '@type/Users';
import { ReduxState } from '@redux/reducers';
import { validateEmail } from '@utils/common';
import PackageAPIs from '@apis/package.apis';

import styles from '@styles/Signup.module.css';

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <LazyLoad>
        <img src="/images/registration_page_bg.png" className={styles.bgImage} />
      </LazyLoad>
      <div className={styles.heroBannerContent}>
        <h1>Registration</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <BannerSportsAndMatches />
    </div>
  );
}

type AccessCardPackagePropsType = {
  data: Package;
  onSelectPackage: (id: number, billingPlan: BillingPlan) => void;
};

function SportsCardPackage({ data, onSelectPackage }: AccessCardPackagePropsType) {
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

  const [selected, setSelected] = useState<boolean>(false);
  const [packTypeMenuOpen, setPackTypeMenuOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan>(data.billing_plans[0]);
  const [sportsStatus, setSportsStatus] = useState<boolean[]>([]);

  const PackTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      {data.billing_plans?.map((plan: BillingPlan, index: number) => (
        <Menu.Item
          key={index}
          className={styles.sportMenuItem}
          onClick={() => {
            setSelectedPlan(plan);
            setPackTypeMenuOpen(false);
            onSelectPackage(data.id, plan);
          }}>
          {`${plan.name} - $${plan.price}.00`}
        </Menu.Item>
      ))}
    </Menu>
  );
  const changePackMenuVisible = (status: boolean) => {
    setPackTypeMenuOpen(status);
  };
  const clickCheckIcon = () => {
    setSelected(!selected);
  };
  const onChangeItemAt = (index: number) => {
    const items = sportsStatus.slice();
    items[index] = !items[index];
    setSportsStatus(items);
  };

  return (
    <div className={`${styles.package} ${selected && styles.selected}`}>
      {selected && (
        <Button className={styles.checkIconBtn} onClick={clickCheckIcon}>
          <CheckedCircleIcon className={styles.checkedStatusIcon} />
        </Button>
      )}
      {!selected && (
        <Button className={styles.checkIconBtn} onClick={clickCheckIcon}>
          <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
        </Button>
      )}
      <div className={styles.packageTitle}>
        <span>{data?.name}</span>
      </div>
      <ul className={styles.list_with_checkmark}>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
      </ul>
      {data.name === 'Sports Card' && (
        <div className={styles.sportsCards}>
          <div className={styles.sectionTitle}>Select any number of sports</div>
          <div className={styles.sportsTypeContent}>
            {SPORTS_INFO.map((sport: SportInfoType, index: number) => (
              <Button
                key={index}
                className={styles.dropdownBtnWrapper}
                onClick={() => onChangeItemAt(index)}>
                <div
                  className={`${styles.dropdownBtn} ${styles['dropdown_' + sport.id]}`}
                  style={{
                    background: sportsStatus[index] ? sport.background : ''
                  }}>
                  {sport.logo()}
                  <span>{sport.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
      {data.name === 'Fantasy' && (
        <div className={styles.sportsCards}>
          <div className={styles.sectionTitle}>Select any number of sports</div>
          <div className={styles.sportsTypeContent}>
            {SPORTS_INFO.slice(0, 3).map((sport: SportInfoType, index: number) => (
              <Button
                key={index}
                className={styles.dropdownBtnWrapper}
                onClick={() => onChangeItemAt(index)}>
                <div
                  className={`${styles.dropdownBtn} ${styles['dropdown_' + sport.id]}`}
                  style={{
                    background: sportsStatus[index] ? sport.background : ''
                  }}>
                  {sport.logo()}
                  <span>{sport.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className={styles.billingPlans}>
        <div className={styles.sectionTitle}>Select Pack Type</div>
        <Dropdown
          overlay={PackTypeMenu}
          onVisibleChange={changePackMenuVisible}
          placement="bottomLeft"
          transitionName=""
          trigger={['click']}>
          <div className={styles.optionBtn}>
            <span>{`${selectedPlan?.name} - $${selectedPlan?.price}.00`}</span>
            {packTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
            {!packTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
          </div>
        </Dropdown>
      </div>
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
  const [termsConfirmed, setTermsConfirmed] = useState<boolean>(false);
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
  const changeTermsConfirmed = () => {
    setTermsConfirmed(!termsConfirmed);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Registration</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <div className={styles.sectionTitle}>Select a Membership package</div>
          <Row>
            <div className={styles.packagesCol}>
              {packages?.map((pack: Package) => (
                <SportsCardPackage
                  key={pack.id}
                  data={pack}
                  onSelectPackage={changePackagesSection}
                />
              ))}
            </div>
            <div className={styles.registrationCol}>
              <div className={styles.sectionTitle}>Create Account</div>
              <ul className={styles.list_with_checkmark}>
                <li>
                  <NormalCheckIcon className={styles.list_check_icon} />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                  <NormalCheckIcon className={styles.list_check_icon} />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                  <NormalCheckIcon className={styles.list_check_icon} />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
                    <label>Mobile Number</label>
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
                <Row className={styles.rowWithTwoChild} justify="space-between">
                  <Col span={12} className={styles.termsSection}>
                    <input type="checkbox" name="terms" onChange={changeTermsConfirmed} />
                    <div className={styles.termsContent}>
                      <div className={styles.title}>Communication Policy</div>
                      <div>
                        Lorem ipsum dolor sit amet,{' '}
                        <Link href="/">
                          <a>Read More</a>
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Button
                      className={styles.registerBtn}
                      disabled={!isFormValid || !termsConfirmed}
                      onClick={onSignup}>
                      Registor Now
                    </Button>
                  </Col>
                </Row>
              </form>
              {/* <div className={styles.orText}>
                <span>Or</span>
              </div> */}
              {/* <Button className={styles.register_facebook_btn}>Registor With Facebook</Button>
              <Button className={styles.register_goggle_btn}>Registor With Google</Button> */}
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
