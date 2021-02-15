/* eslint-disable react/display-name */
import React, { FormEvent, useState, useEffect } from 'react';
import Head from 'next/head';
import { Row, Button, Upload, Col, Modal, notification, Dropdown, Menu } from 'antd';
import LazyLoad from 'react-lazyload';
import {
  useStripe,
  useElements,
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement
} from '@stripe/react-stripe-js';

import { AppLayout, BannerSportsAndMatches, DashboardHeader } from '@components/index';
import styles from '@styles/Profile.module.css';
import {
  ProfileValidateType,
  UserProfile,
  UserBillingInfo,
  UserSubscription,
  UserBillingInfoValidate
} from '@type/Users';
import { validateEmail } from '@utils/common';
import { Package } from '@type/Packages';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageProps, PromiseResponse } from '@type/Main';
import UsersAPIs from '@apis/user.apis';
import PackageApis from '@apis/package.apis';
import subscriptionsApis from '@apis/subscriptions.apis';
import { CREDIT_COUNTRIES } from '@constants/';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

type ProfileFormType = UserProfile & {
  password: string | undefined;
  verify_password: string | undefined;
};

export default function MemberProfile({ token, subscriptions, packages }: PageProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [profileForm, setProfileForm] = useState<ProfileFormType>({
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    provider: undefined,
    mobile_number: undefined,
    password: undefined,
    verify_password: undefined
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
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
    country: CREDIT_COUNTRIES[0].id
  });
  const [billingFormValid, setBillingFormValid] = useState<UserBillingInfoValidate>({
    city: false,
    address: false,
    zipcode: false,
    full_name: false,
    country: true,
    creditNumber: false,
    creditExp: false,
    creditCVC: false
  });
  const [isSavingCardInfo, setIsSavingCardInfo] = useState<boolean>(false);
  const [formChanged, setFormChanged] = useState<boolean>(false);
  const [isBillingValid, setIsBillingValid] = useState<boolean>(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    UsersAPIs.fetchProfile()
      .then((res) => res.json())
      .then((data) => {
        const names = data.full_name.split(' ');
        setProfileForm({
          id: data.id,
          avatar: data.avatar ? data.avatar.url : '',
          first_name: names[0],
          last_name: names[1],
          email: data.email,
          mobile_number: data.mobile_number,
          username: data.username,
          provider: data.provider,
          password: undefined,
          verify_password: undefined
        });
        setFormValidation({
          username: true,
          first_name: true,
          last_name: true,
          email: true,
          password: true,
          verify_password: true
        });
      });
  };
  const changeProfileForm = (name: keyof ProfileFormType, e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newProfileForm = Object.assign({}, profileForm);
    newProfileForm[name] = value;
    setProfileForm(newProfileForm);
    validateForm(newProfileForm);
    setFormChanged(true);
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
    setIsFormValid(isValid);
  };
  const updateBillingForm = (name: keyof UserBillingInfo, e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newBillingInfo = Object.assign({}, billingInfo);
    newBillingInfo[name] = value;
    setBillingInfo(newBillingInfo);
    checkBillingFormValidation(newBillingInfo, billingFormValid);
  };
  const changeBillingCountry = (countryId: string) => {
    const newBillingInfo = Object.assign({}, billingInfo);
    newBillingInfo.country = countryId;
    setBillingInfo(newBillingInfo);
    checkBillingFormValidation(newBillingInfo, billingFormValid);
  };
  const creditCartFormChanged = (element: any, name: keyof UserBillingInfoValidate) => {
    const newValidation = { ...billingFormValid };
    if (!element.empty && element.complete) {
      newValidation[name] = true;
    } else {
      newValidation[name] = false;
    }
    setBillingFormValid(newValidation);
    checkBillingFormValidation(billingInfo, newValidation);
  };
  const checkBillingFormValidation = (
    newBillingInfo: UserBillingInfo,
    billingValidations: UserBillingInfoValidate
  ) => {
    let isValid = true;
    if (newBillingInfo.city === '') {
      billingValidations.city = false;
      isValid = false;
    } else if (newBillingInfo.city === undefined) {
      isValid = false;
    } else {
      billingValidations.city = true;
    }
    if (newBillingInfo.address === '') {
      billingValidations.address = false;
      isValid = false;
    } else if (newBillingInfo.address == undefined) {
      isValid = false;
    } else {
      billingValidations.address = true;
    }
    if (newBillingInfo.zipcode === '') {
      billingValidations.zipcode = false;
      isValid = false;
    } else if (newBillingInfo.zipcode == undefined) {
      isValid = false;
    } else {
      billingValidations.zipcode = true;
    }
    if (newBillingInfo.full_name === '') {
      billingValidations.full_name = false;
      isValid = false;
    } else if (newBillingInfo.full_name == undefined) {
      isValid = false;
    } else {
      billingValidations.full_name = true;
    }
    setBillingFormValid(billingValidations);
    if (
      !billingValidations.creditNumber ||
      !billingValidations.creditExp ||
      !billingValidations.creditCVC
    ) {
      isValid = false;
    }
    setIsBillingValid(isValid);
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
  const reactivatePack = (packId: number) => {
    PackageApis.reactivatePackage(packId)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode >= 400) {
          notification['error']({
            message: 'Reactivation Package Error',
            description: data.message
          });
        } else {
          notification['info']({
            message: 'Reactivation Package',
            description: 'Package has been successfully reactivated'
          });
        }
      })
      .catch((error) => {
        notification['error']({
          message: 'Reactivation Package Error',
          description: error.message
        });
      });
  };
  const onLogoChange = (info: UploadChangeParam<UploadFile<File>>) => {
    const { file, event } = info;
    if (event?.percent === 100 && file) {
      setLogoFile(file.originFileObj as File);
      setFormChanged(true);
    }
    if (!file) {
      setFormChanged(false);
    }
  };
  const onSaveChanges = () => {
    // Reset Password
    // if (formValidation.password && formValidation.verify_password) {
    //   if (profileForm.password && profileForm.verify_password) {
    //     UsersAPIs.resetPass({
    //       password: profileForm.password,
    //       passwordConfirmation: profileForm.verify_password
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log('--- data: ', data);
    //       });
    //   }
    // }

    // Save Profile
    if (isFormValid) {
      //   userApis
      //     .updateProfile(profileForm)
      //     .then((res) => res.json())
      //     .then((data) => {
      //       console.log('--- data ---- ', data);
      //     });
    }

    // Upload Image
    if (logoFile) {
      const formdata = new FormData();
      formdata.append('files', logoFile);
      formdata.append('ref', 'user');
      formdata.append('refId', `${profileForm.id}`);
      formdata.append('field', 'avatar');
      formdata.append('source', 'users-permissions');
      UsersAPIs.uploadLogo(formdata).then((res) => res.json());
    }
  };
  const resetChanges = () => {
    fetchUserInfo();
    setBillingInfo({
      city: undefined,
      address: undefined,
      zipcode: undefined,
      full_name: undefined,
      country: CREDIT_COUNTRIES[0].id
    });
    const formElement = document.querySelector('#profileForm') as HTMLFormElement;
    formElement.reset();
    const billingFormElement = document.querySelector('#billing-form') as HTMLFormElement;
    billingFormElement.reset();
    if (elements) {
      const cardNumberElement = elements.getElement(CardNumberElement);
      cardNumberElement?.clear();
      const cardExpElement = elements.getElement(CardExpiryElement);
      cardExpElement?.clear();
      const cardCvcElement = elements.getElement(CardCvcElement);
      cardCvcElement?.clear();
    }
    if (logoFile) {
      setLogoFile(undefined);
    }
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Sports Card</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection
            formChanged={formChanged}
            saveChanges={onSaveChanges}
            resetChanges={resetChanges}
          />
          <ProfileInfo
            profileForm={profileForm}
            formValidation={formValidation}
            changeProfileForm={changeProfileForm}
            onLogoChange={onLogoChange}
          />
          <CurrentPackages packages={packages} reactivatePack={reactivatePack} />
          <CreditCardInfo
            changeBillingFormData={updateBillingForm}
            submitCardFormData={updateCardForm}
            creditCartFormChanged={creditCartFormChanged}
            changeCountry={changeBillingCountry}
            loading={isSavingCardInfo}
            isBillingValid={isBillingValid}
          />
          <CancelSubscription subscriptions={subscriptions} />
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

function TopSection({
  formChanged,
  saveChanges,
  resetChanges
}: {
  formChanged: boolean;
  saveChanges: () => void;
  resetChanges: () => void;
}) {
  return (
    <>
      <DashboardHeader title={'Settings'} />
      <Row className={styles.actionBtns} justify={'center'}>
        <Button className={styles.cancelBtn} disabled={!formChanged} onClick={resetChanges}>
          Cancel
        </Button>
        <Button className={styles.saveBtn} disabled={!formChanged} onClick={saveChanges}>
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
  profileForm: ProfileFormType;
  changeProfileForm: (name: keyof ProfileFormType, e: React.FormEvent<HTMLInputElement>) => void;
  onLogoChange: (info: UploadChangeParam<UploadFile<any>>) => void;
};

function ProfileInfo({
  profileForm,
  formValidation,
  changeProfileForm,
  onLogoChange
}: ProfileInfoType) {
  return (
    <>
      <form autoComplete="off" id="profileForm">
        <Row className={styles.rowWithTwoChild}>
          <Col span={12}>
            <Row>
              <div className={styles.sectionTitle}>Profile</div>
              <Col span={24} className={styles.formGroup}>
                <label>User Name*</label>
                <input
                  name="username"
                  value={profileForm.username}
                  className={formValidation.username ? '' : styles.error}
                  placeholder="ie: CashmeOut91"
                  onChange={(e) => changeProfileForm('username', e)}
                />
              </Col>
            </Row>
            <Row className={styles.rowWithTwoChild} justify="space-between">
              <Col span={12} className={styles.formGroup}>
                <label>First Name*</label>
                <input
                  name="first_name"
                  value={profileForm.first_name}
                  className={formValidation.first_name ? '' : styles.error}
                  placeholder="ie: Johnny"
                  onChange={(e) => changeProfileForm('first_name', e)}
                />
              </Col>
              <Col span={12} className={styles.formGroup}>
                <label>Last Name*</label>
                <input
                  name="last_name"
                  value={profileForm.last_name}
                  className={formValidation.last_name ? '' : styles.error}
                  placeholder="ie: Cash"
                  onChange={(e) => changeProfileForm('last_name', e)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24} className={styles.formGroup}>
                <label>Email*</label>
                <input
                  name="email"
                  value={profileForm.email}
                  className={formValidation.email ? '' : styles.error}
                  type="email"
                  placeholder="ie: j.cash@gmail.com"
                  onChange={(e) => changeProfileForm('email', e)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24} className={styles.formGroup}>
                <label>Mobile Number</label>
                <input
                  name="mobile_number"
                  value={profileForm.mobile_number}
                  placeholder="1-111-111-1111"
                  onChange={(e) => changeProfileForm('mobile_number', e)}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <div className={styles.profileLogoWrapper}>
              {profileForm.avatar && (
                <img src={profileForm.avatar} alt="" className={styles.avatarLogo} />
              )}
              {!profileForm.avatar && (
                <>
                  <LogoFromName first_name="Nicolas" last_name="Patrick" />
                  <Upload onChange={onLogoChange} multiple={false}>
                    <div className={styles.uploadCoverBtn}>Update Cover Photo</div>
                  </Upload>
                </>
              )}
            </div>
          </Col>
        </Row>
        <div className={styles.sectionTitle}>Change Password</div>
        <Row
          className={`${styles.rowWithTwoChild} ${styles.resetPassword}`}
          justify="space-between">
          <Col span={12} className={styles.formGroup}>
            <label>Password*</label>
            <input
              name="password"
              className={formValidation.password ? '' : styles.error}
              type="password"
              placeholder="ie: **********"
              onChange={(e) => changeProfileForm('password', e)}
              value={profileForm.password}
            />
          </Col>
          <Col span={12} className={styles.formGroup}>
            <label>Verify Password*</label>
            <input
              name="verify_password"
              className={formValidation.verify_password ? '' : styles.error}
              type="password"
              placeholder="ie: **********"
              onChange={(e) => changeProfileForm('verify_password', e)}
              value={profileForm.verify_password}
            />
          </Col>
        </Row>
      </form>
    </>
  );
}

function CurrentPackages({
  packages,
  reactivatePack
}: {
  packages: Package[] | undefined;
  reactivatePack: (_: number) => void;
}) {
  return (
    <>
      <div className={styles.sectionTitle}>Current packages</div>
      <div className={styles.packages}>
        {(!packages || packages.length === 0) && (
          <div className={styles.noPackages}>
            <em>There is no Active Package</em>
          </div>
        )}
        {packages &&
          packages.map((pack: Package) => (
            <div className={styles.package} key={pack.id}>
              <LazyLoad>
                <img src={pack.logo} />
              </LazyLoad>
              <div className={styles.packageContent}>
                <div className={styles.title}>{pack.name}</div>
                <div className={styles.desc}>{pack.description}</div>
                <div className={styles.extra}>
                  <div onClick={() => reactivatePack(pack.id)}>
                    <a>Reactivate Package</a>
                  </div>
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
  submitCardFormData: (e: FormEvent<HTMLFormElement>) => void;
  creditCartFormChanged: (e: any, name: keyof UserBillingInfoValidate) => void;
  changeCountry: (_: string) => void;
  loading: boolean;
  isBillingValid: boolean;
};

function CreditCardInfo({
  changeBillingFormData,
  submitCardFormData,
  creditCartFormChanged,
  changeCountry,
  loading,
  isBillingValid
}: CreditCardInfoType) {
  const [selectedCountry, setSelectedCountry] = useState<string>(CREDIT_COUNTRIES[0].id);
  const countryMenu = () => (
    <Menu className={styles.sportMenu}>
      {CREDIT_COUNTRIES.map((country) => (
        <Menu.Item key={country.id}>
          <div
            className={styles.countryMenuItem}
            onClick={() => {
              changeCountry(country.id);
              setSelectedCountry(country.id);
            }}>
            {country.name}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.creditCardInfoRow}>
      <form onSubmit={submitCardFormData} id="billing-form">
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
              <Dropdown
                overlay={countryMenu}
                placement="bottomLeft"
                transitionName=""
                trigger={['click']}>
                <div className={styles.countrySelectBox}>
                  {CREDIT_COUNTRIES.filter((country) => country.id == selectedCountry)[0].name}
                </div>
              </Dropdown>
            </Col>
          </Col>
          <Col span={12} className="profile-credit-card">
            <h6>Credit Card Info</h6>
            <Row>
              <Col span={24} className={styles.formGroup}>
                <label>Card Number</label>
                <CardNumberElement
                  options={{ placeholder: 'XXXX XXXX XXXX 1234', classes: { base: styles.input } }}
                  onChange={(e) => creditCartFormChanged(e, 'creditNumber')}
                />
              </Col>
            </Row>
            <Row className={styles.rowWithTwoChild} justify="space-between">
              <Col span={12} className={styles.formGroup}>
                <label>Expiry Date</label>
                <CardExpiryElement
                  options={{
                    placeholder: 'MM/YY',
                    classes: { base: styles.input }
                  }}
                  onChange={(e) => creditCartFormChanged(e, 'creditExp')}
                />
              </Col>
              <Col span={12} className={styles.formGroup}>
                <label>CVV</label>
                <CardCvcElement
                  options={{ placeholder: '•••', classes: { base: styles.input } }}
                  onChange={(e) => creditCartFormChanged(e, 'creditCVC')}
                />
              </Col>
            </Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row justify="end">
              <Col>
                <Button loading={loading} disabled={!isBillingValid} htmlType="submit">
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

function CancelSubscription({ subscriptions }: { subscriptions: UserSubscription[] }) {
  const unsubscribe = () => {
    Modal.confirm({
      title: 'Subscriptions Cancellation',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to cancel Subscriptions?',
      onOk() {
        const promiseArr: Promise<PromiseResponse>[] = [];
        subscriptions.forEach((item) => {
          // Add To Subscriptions
          const promise = subscriptionsApis.cancelSubscription(item.id).then((res) => res.json());
          promiseArr.push(promise);
        });
        Promise.all(promiseArr)
          .then((values) => {
            let hasError = false;
            values.forEach((data: PromiseResponse) => {
              if (data.status === 400) {
                notification['error']({
                  message: 'Cancel Subscription Error',
                  description: data.message
                });
                hasError = true;
              } else if (data.statusCode === 400) {
                notification['error']({
                  message: 'Cancel Subscription Error',
                  description: data.message
                });
                hasError = true;
              }
            });
            if (!hasError) {
              notification['info']({
                message: 'Cancel Subscriptions',
                description: 'Subscriptions have been cancelled'
              });
            }
          })
          .catch((error) => {
            notification['error']({
              message: 'Cancel Subscription Error',
              description: error.message
            });
          });
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
