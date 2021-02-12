/* eslint-disable react/display-name */
import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Upload, Col, Modal, notification } from 'antd';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import {
  useStripe,
  useElements,
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement
} from '@stripe/react-stripe-js';

import {
  AppLayout,
  BannerSportsAndMatches,
  DashboardHeader,
  YellowCheckBox
} from '@components/index';
import styles from '@styles/Profile.module.css';
import { ProfileValidateType, UserProfile, UserBillingInfo } from '@type/Users';
import { validateEmail } from '@utils/common';
import { Package } from '@type/Packages';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageProps } from '@type/Main';
import UsersAPIs from '@apis/user.apis';

type ProfileFormType = UserProfile & {
  password: string | undefined;
  verify_password: string | undefined;
};

export default function MemberProfile({ token, subscriptions }: PageProps) {
  const stripe = useStripe();
  const elements = useElements();

  const packages: Package[] = [
    {
      id: 1,
      logo: 'https://via.placeholder.com/100',
      name: 'Monthly Sports Card',
      description: 'NBA + NFL package',
      product_id: '',
      features: [],
      billing_plans: []
    },
    {
      id: 2,
      logo: 'https://via.placeholder.com/100',
      name: 'Daily Fantasy',
      description: 'MLB package',
      product_id: '',
      features: [],
      billing_plans: []
    }
  ];

  const [formData, setFormData] = useState<ProfileFormType>({
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    provider: undefined,
    mobile_number: undefined,
    password: undefined,
    verify_password: undefined
  });
  // const [isFormValid, setIsFormValid] = useState<boolean>(false);
  // const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formValidation, setFormValidation] = useState<ProfileValidateType>({
    username: true,
    first_name: true,
    last_name: true,
    email: true,
    password: true,
    verify_password: true
  });
  const [billingInfo, setBillingInfo] = useState<UserBillingInfo>({
    city: undefined,
    address: undefined,
    zipcode: undefined,
    full_name: undefined,
    country: undefined
  });
  const [isSavingCardInfo, setIsSavingCardInfo] = useState<boolean>(false);

  const changeFormData = (name: keyof ProfileFormType, e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newFormData = Object.assign({}, formData);
    newFormData[name] = value;
    setFormData(newFormData);
    validateForm(newFormData);
  };
  const validateForm = (data: ProfileFormType) => {
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
    } else if (data.password && data.password.length < 6) {
      newValidation.password = false;
      isValid = false;
    } else {
      newValidation.password = true;
      newValidation.verify_password = true;
    }
    setFormValidation(newValidation);
    console.log('-- ', isValid);
    // setIsFormValid(isValid);
  };
  const updateBillingForm = (name: keyof UserBillingInfo, e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newBillingInfo = Object.assign({}, billingInfo);
    newBillingInfo[name] = value;
    setBillingInfo(newBillingInfo);
  };
  const updateCardForm = async (event: FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();
    setIsSavingCardInfo(true);

    if (!stripe || !elements) {
      console.error('Stripe is not loaded');
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardNumberElement = elements.getElement(CardNumberElement);

    // Use your card Element with other Stripe.js APIs
    if (cardNumberElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: {
          name: billingInfo.full_name,
          address: {
            city: billingInfo.city,
            country: billingInfo.country,
            line1: billingInfo.address,
            postal_code: billingInfo.zipcode
          }
        }
      });
      if (!paymentMethod) {
        console.log('[error]', error);
      } else {
        await UsersAPIs.addPaymentMethod({ payment_method_id: paymentMethod.id })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 'success') {
              notification['info']({
                message: 'New Payment Method has been Added!'
              });
            } else {
              notification['error']({
                message: 'Add New Payment Method Error',
                description: data.message
              });
            }
          })
          .catch((error) => {
            notification['error']({
              message: 'Add New Payment Method Error',
              description: error.message
            });
          });
      }
    } else {
      console.log('[error] Card Element is not rendered');
    }
    setIsSavingCardInfo(false);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Sports Card</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection />
          {/* Profile Section */}
          <ProfileInfo formValidation={formValidation} changeFormData={changeFormData} />
          <CurrentPackages packages={packages} />

          <CreditCardInfo
            changeBillingFormData={updateBillingForm}
            changeCardFormData={updateCardForm}
            loading={isSavingCardInfo}
          />
          <CancelSubscription />
        </div>
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <img src="/images/member_dashboard.jpg" className={styles.bgImage} />
      <BannerSportsAndMatches />
    </div>
  );
}

function TopSection() {
  return (
    <>
      <DashboardHeader title={'Settings'} />
      <Row className={styles.actionBtns} justify={'center'}>
        <Button className={styles.cancelBtn} disabled>
          Cancel
        </Button>
        <Button className={styles.saveBtn} disabled>
          Save
        </Button>
      </Row>
    </>
  );
}

function LogoFromName({ first_name, last_name }: { first_name: string; last_name: string }) {
  return (
    <div className={styles.profileLogo}>
      <span>{`${first_name[0]}${last_name[0]}`}</span>
    </div>
  );
}

type ProfileInfoType = {
  formValidation: ProfileValidateType;
  changeFormData: (name: keyof ProfileFormType, e: React.FormEvent<HTMLInputElement>) => void;
};

function ProfileInfo({ formValidation, changeFormData }: ProfileInfoType) {
  return (
    <>
      <Row className={styles.rowWithTwoChild}>
        <Col span={12}>
          <form autoComplete="off">
            <Row>
              <div className={styles.sectionTitle}>Profile</div>
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
          </form>
        </Col>
        <Col span={12}>
          <div className={styles.profileLogoWrapper}>
            <LogoFromName first_name="Nicolas" last_name="Patrick" />
            {/* Real Photo */}
            <Upload>
              <div className={styles.uploadCoverBtn}>Update Cover Photo</div>
            </Upload>
          </div>
        </Col>
      </Row>
      <div className={styles.sectionTitle}>Reset Password</div>
      <Row className={`${styles.rowWithTwoChild} ${styles.resetPassword}`} justify="space-between">
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
    </>
  );
}

function CurrentPackages({ packages }: { packages: Package[] }) {
  const [renewalChecked, setRenewalChecked] = useState<boolean>(false);
  return (
    <>
      <div className={styles.sectionTitle}>Current packages</div>
      <div className={styles.packages}>
        {packages.map((pack: Package) => (
          <div className={styles.package} key={pack.id}>
            <LazyLoad>
              <img src={pack.logo} />
            </LazyLoad>
            <div className={styles.packageContent}>
              <div className={styles.title}>{pack.name}</div>
              <div className={styles.desc}>{pack.description}</div>
              <div className={styles.extra}>
                {pack.name.indexOf('Sports Card') > -1 && (
                  <YellowCheckBox
                    checked={renewalChecked}
                    onChangeStatus={() => setRenewalChecked(!renewalChecked)}
                    label={'Auto Renewal'}
                  />
                )}
                {pack.name.indexOf('Fantasy') > -1 && (
                  <Link href="/">
                    <a>Reactivate Package</a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// function Notifications() {
//   const [notificationConfig, setNotificationConfig] = useState<NotificationConfig>({
//     sportsCardOrVipAccessPicksEmail: false,
//     sportsCardOrVipAccessPicksMsg: false,
//     fantasyLineupEmail: false,
//     fantasyLineupMsg: false,
//     expiringMembershipEmail: false,
//     expiringMembershipMsg: false,
//     promotionalNotificationEmail: false,
//     promotionalNotificationMsg: false,
//     blogPostNotificationEmail: false,
//     blogPostNotificationMsg: false
//   });

//   const changeNotificationConfig = (name: keyof NotificationConfig) => {
//     const config = Object.assign({}, notificationConfig);
//     config[name] = !config[name];
//     setNotificationConfig(config);
//   };

//   return (
//     <div className={styles.notificationSettingRow}>
//       <div className={styles.sectionTitle}>Notifications</div>
//       <Row>
//         <div className={styles.notificationSetting}>
//           <h6>Recieve Sports Card or VIP All Access Picks</h6>
//           <div className={styles.checkboxes}>
//             <YellowCheckBox
//               checked={notificationConfig.sportsCardOrVipAccessPicksMsg}
//               onChangeStatus={() => changeNotificationConfig('sportsCardOrVipAccessPicksMsg')}
//               label={'Text Message'}
//             />
//             <YellowCheckBox
//               checked={notificationConfig.sportsCardOrVipAccessPicksEmail}
//               onChangeStatus={() => changeNotificationConfig('sportsCardOrVipAccessPicksEmail')}
//               label={'Email'}
//             />
//           </div>
//         </div>
//         <div className={styles.notificationSetting}>
//           <h6>Recieve Fantasy Lineup or Lineup Changes</h6>
//           <div className={styles.checkboxes}>
//             <YellowCheckBox
//               checked={notificationConfig.fantasyLineupMsg}
//               onChangeStatus={() => changeNotificationConfig('fantasyLineupMsg')}
//               label={'Text Message'}
//             />
//             <YellowCheckBox
//               checked={notificationConfig.fantasyLineupEmail}
//               onChangeStatus={() => changeNotificationConfig('fantasyLineupEmail')}
//               label={'Email'}
//             />
//           </div>
//         </div>
//         <div className={styles.notificationSetting}>
//           <h6>Recieve expiring membership notification</h6>
//           <div className={styles.checkboxes}>
//             <YellowCheckBox
//               checked={notificationConfig.expiringMembershipMsg}
//               onChangeStatus={() => changeNotificationConfig('expiringMembershipMsg')}
//               label={'Text Message'}
//             />
//             <YellowCheckBox
//               checked={notificationConfig.expiringMembershipEmail}
//               onChangeStatus={() => changeNotificationConfig('expiringMembershipEmail')}
//               label={'Email'}
//             />
//           </div>
//         </div>
//         <div className={styles.notificationSetting}>
//           <h6>Recieve new promotional notifications</h6>
//           <div className={styles.checkboxes}>
//             <YellowCheckBox
//               checked={notificationConfig.promotionalNotificationMsg}
//               onChangeStatus={() => changeNotificationConfig('promotionalNotificationMsg')}
//               label={'Text Message'}
//             />
//             <YellowCheckBox
//               checked={notificationConfig.promotionalNotificationEmail}
//               onChangeStatus={() => changeNotificationConfig('promotionalNotificationEmail')}
//               label={'Email'}
//             />
//           </div>
//         </div>
//         <div className={styles.notificationSetting}>
//           <h6>Recieve new blog post notifications</h6>
//           <div className={styles.checkboxes}>
//             <YellowCheckBox
//               checked={notificationConfig.blogPostNotificationMsg}
//               onChangeStatus={() => changeNotificationConfig('blogPostNotificationMsg')}
//               label={'Text Message'}
//             />
//             <YellowCheckBox
//               checked={notificationConfig.blogPostNotificationEmail}
//               onChangeStatus={() => changeNotificationConfig('blogPostNotificationEmail')}
//               label={'Email'}
//             />
//           </div>
//         </div>
//       </Row>
//     </div>
//   );
// }

type CreditCardInfoType = {
  changeBillingFormData: (
    name: keyof UserBillingInfo,
    e: React.FormEvent<HTMLInputElement>
  ) => void;
  changeCardFormData: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

function CreditCardInfo({
  changeBillingFormData,
  changeCardFormData,
  loading
}: CreditCardInfoType) {
  return (
    <div className={styles.creditCardInfoRow}>
      <form onSubmit={changeCardFormData}>
        <div className={styles.sectionTitle}>Credit Card Information</div>
        <Row className={styles.rowWithTwoChild} justify="space-between">
          <Col span={12}>
            <h6>Billing Information</h6>
            <Col span={24} className={styles.formGroup}>
              <label>Full Name</label>
              <input
                name="full_name"
                placeholder="Johnny Cash"
                onChange={(e) => changeBillingFormData('full_name', e)}
              />
            </Col>
            <Col span={24} className={styles.formGroup}>
              <label>Billing Address</label>
              <input
                name="address"
                placeholder="-"
                onChange={(e) => changeBillingFormData('address', e)}
              />
            </Col>
            <Row className={styles.rowWithTwoChild} justify="space-between">
              <Col span={12} className={styles.formGroup}>
                <label>City</label>
                <input
                  name="city"
                  placeholder="ie: Ottawa"
                  onChange={(e) => changeBillingFormData('city', e)}
                />
              </Col>
              <Col span={12} className={styles.formGroup}>
                <label>Zip code</label>
                <input
                  name="zipcode"
                  placeholder="ie: 90021"
                  onChange={(e) => changeBillingFormData('zipcode', e)}
                />
              </Col>
            </Row>
            <Col span={24} className={styles.formGroup}>
              <label>Country/Region</label>
              <input
                name="country"
                placeholder="Canada"
                onChange={(e) => changeBillingFormData('country', e)}
              />
            </Col>
          </Col>
          <Col span={12} className="profile-credit-card">
            <h6>Credit Card Info</h6>
            <Row>
              <Col span={24} className={styles.formGroup}>
                <label>Card Number</label>
                <CardNumberElement
                  options={{ placeholder: 'XXXX XXXX XXXX 1234', classes: { base: styles.input } }}
                />
              </Col>
            </Row>
            <Row className={styles.rowWithTwoChild} justify="space-between">
              <Col span={12} className={styles.formGroup}>
                <label>Expiry Date</label>
                <CardExpiryElement
                  options={{ placeholder: 'MM/YY', classes: { base: styles.input } }}
                />
              </Col>
              <Col span={12} className={styles.formGroup}>
                <label>CVV</label>
                <CardCvcElement options={{ placeholder: '•••', classes: { base: styles.input } }} />
              </Col>
            </Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row justify="end">
              <Col>
                <Button loading={loading} htmlType="submit">
                  Save Payment Method
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    </div>
  );
}

function CancelSubscription() {
  const unsubscribe = () => {
    Modal.confirm({
      title: 'Subscription Cancellation',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to cancel Subscription?',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  return (
    <div className={styles.cancelSubscriptionRow}>
      <div className={styles.sectionTitle}>Cancel Subscription</div>
      <div>
        <Button onClick={unsubscribe}>Unsubscribe</Button>
      </div>
    </div>
  );
}
