/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Row, Button, Upload, Col, notification } from 'antd';

import { AppLayout, DashboardHeader } from '@components/index';
import styles from '@styles/Profile.module.css';
import { ProfileValidateType, UserProfile } from '@type/Users';
import { validateEmail } from '@utils/common';
import { PageProps } from '@type/Main';
import UsersAPIs from '@apis/user.apis';
import PackageApis from '@apis/package.apis';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

type ProfileFormType = UserProfile & {
  password: string | undefined;
  new_password: string | undefined;
  verify_password: string | undefined;
  tempAvatar: string | undefined;
};

export default function MemberProfile({ token, subscriptions }: PageProps) {
  const [profileForm, setProfileForm] = useState<ProfileFormType>({
    id: undefined,
    avatar: undefined,
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    provider: undefined,
    mobile_number: undefined,
    password: undefined,
    new_password: undefined,
    verify_password: undefined,
    tempAvatar: undefined
  });
  const [originFormData, setOriginFormData] = useState<ProfileFormType>({
    id: undefined,
    avatar: undefined,
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    provider: undefined,
    mobile_number: undefined,
    password: undefined,
    new_password: undefined,
    verify_password: undefined,
    tempAvatar: undefined
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [formValidation, setFormValidation] = useState<ProfileValidateType>({
    username: true,
    first_name: true,
    last_name: true,
    email: true,
    password: true,
    new_password: true,
    verify_password: true
  });

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    UsersAPIs.fetchProfile()
      .then((res) => res.json())
      .then((data) => {
        const names = data.full_name.split(' ');
        const formData = {
          id: data.id,
          avatar: data.avatar ? data.avatar.url : '',
          first_name: names[0],
          last_name: names[1],
          email: data.email,
          mobile_number: data.mobile_number,
          username: data.username,
          provider: data.provider,
          password: '',
          new_password: '',
          verify_password: '',
          tempAvatar: data.avatar ? data.avatar.url : ''
        };
        setProfileForm(formData);
        setOriginFormData(formData);
        setFormValidation({
          username: true,
          first_name: true,
          last_name: true,
          email: true,
          password: true,
          new_password: true,
          verify_password: true
        });
      });
  };
  const changeProfileForm = (name: keyof ProfileFormType, e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newProfileForm = Object.assign({}, profileForm);
    if (name === 'avatar') newProfileForm.tempAvatar = name;
    else newProfileForm[name] = value;
    setProfileForm(newProfileForm);
    validateForm(newProfileForm);
  };
  const checkChanges = (data: ProfileFormType) => {
    let changed = false;
    Object.keys(data).map((key: string) => {
      const k = key as keyof ProfileFormType;
      if (data[k] !== originFormData[k]) {
        changed = true;
      }
      if (logoFile) {
        changed = true;
      }
    });
    return changed;
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
    if (data.verify_password !== data.new_password) {
      newValidation.new_password = false;
      newValidation.verify_password = false;
      isValid = false;
    } else if (data.new_password && data.new_password.length < 6) {
      newValidation.new_password = false;
      newValidation.verify_password = false;
      isValid = false;
    } else if (data.new_password && !data.password) {
      newValidation.new_password = false;
      newValidation.verify_password = false;
      newValidation.password = false;
    } else if (data.password && !data.new_password) {
      newValidation.new_password = false;
      newValidation.verify_password = false;
      newValidation.password = false;
    } else {
      newValidation.new_password = true;
      newValidation.verify_password = true;
      newValidation.password = true;
    }
    setFormValidation(newValidation);
    setIsFormValid(isValid);
  };
  const onLogoChange = (info: UploadChangeParam<UploadFile<File>>) => {
    const { file, event, fileList } = info;
    if (event?.percent === 100 && file) {
      setLogoFile(file.originFileObj as File);
    }
    if (fileList.length === 0) {
      setLogoFile(undefined);
    }
  };
  const onSaveChanges = () => {
    // Change Password
    if (formValidation.password && formValidation.new_password && formValidation.verify_password) {
      if (profileForm.password && profileForm.new_password && profileForm.verify_password) {
        UsersAPIs.changePassword({
          password: profileForm.password,
          identifier: profileForm.email || '',
          newPassword: profileForm.new_password || '',
          confirmPassword: profileForm.verify_password
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.statusCode >= 400) {
              notification['error']({
                message: 'Change Password Error',
                description: data.message[0].messages[0].message
              });
            } else {
              notification['info']({
                message: 'Password has been successfully changed!'
              });
            }
          });
      }
    }

    // Save Profile
    if (isFormValid) {
      UsersAPIs.updateProfile({
        ...profileForm,
        avatar: undefined,
        full_name: `${profileForm.first_name} ${profileForm.last_name}`
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statusCode >= 400) {
            notification['error']({
              message: 'Profile Update Error',
              description: data.message ? data.message : data.message[0].messages[0].message
            });
          } else {
            notification['info']({
              message: 'Profile has been successfully updated!'
            });
          }
        });
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
    resetChanges();
  };
  const resetChanges = () => {
    fetchUserInfo();
    const formElement = document.querySelector('#profileForm') as HTMLFormElement;
    formElement.reset();
    if (logoFile) {
      setLogoFile(undefined);
    }
  };
  const createCustomerPortal = () => {
    UsersAPIs.createCustomerPortal()
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          window.location.href = data.data.url;
        } else {
          notification['error']({
            message: 'Create Stripe Customer Portal Error'
          });
        }
      });
  };

  let isAllValid = false;
  isAllValid = !Object.values(formValidation).some((x) => x !== true);
  const formChanged = checkChanges(profileForm);
  return (
    <>
      <Head>
        <title>The Daily Stakes - Sports Card</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        {/* <HeroBanner /> */}
        <div className={styles.container}>
          <DashboardHeader title={'Settings'} />
          <ProfileInfo
            profileForm={profileForm}
            formValidation={formValidation}
            changeProfileForm={changeProfileForm}
            onLogoChange={onLogoChange}
          />
          <div className={styles.subscriptionSettings}>
            MANAGE YOUR SUBSCRIPTIONS AND PAYMENT METHODS{' '}
            <a onClick={createCustomerPortal}>
              <strong>HERE</strong>
            </a>
          </div>
          <Row className={styles.actionBtns} justify={'center'}>
            <Button
              className={styles.saveBtn}
              disabled={!isAllValid || !formChanged}
              onClick={onSaveChanges}>
              Save
            </Button>
            <Button
              className={styles.cancelBtn}
              disabled={!isAllValid || !formChanged}
              onClick={resetChanges}>
              Cancel
            </Button>
          </Row>
        </div>
      </AppLayout>
    </>
  );
}

// function HeroBanner() {
//   return (
//     <div className={styles.heroBanner}>
//       <img src="/images/trianglebanner.jpg" className={styles.bgImage} />
//       <BannerSportsAndMatches />
//     </div>
//   );
// }

function LogoFromName({ first_name, last_name }: { first_name: string; last_name: string }) {
  return (
    <div className={styles.profileLogo}>
      <span>{`${first_name[0] || ''}${last_name[0] || ''}`}</span>
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
        <Row className={`${styles.rowWithTwoChild} ${styles.mainInfo}`}>
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
                  disabled
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
                <label>MOBILE NUMBER (FOR IN-GAME BETS)</label>
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
                <img src={profileForm.tempAvatar} alt="" className={styles.avatarLogo} />
              )}
              {!profileForm.avatar && (
                <>
                  <LogoFromName
                    first_name={profileForm.first_name ? profileForm.first_name : ''}
                    last_name={profileForm.last_name ? profileForm.last_name : ''}
                  />
                </>
              )}
              <Upload key={profileForm.tempAvatar} onChange={onLogoChange} multiple={false}>
                <div className={styles.uploadCoverBtn}>Update Cover Photo</div>
              </Upload>
            </div>
          </Col>
        </Row>
        <div className={styles.sectionTitle}>Change Password</div>
        <Row className={styles.rowWithTwoChild}>
          <Col span={12}>
            <Row className={styles.resetPassword} justify="space-between">
              <Col span={24} className={styles.formGroup}>
                <label>Old Password*</label>
                <input
                  name="password"
                  className={formValidation.password ? '' : styles.error}
                  type="password"
                  placeholder="ie: **********"
                  onChange={(e) => changeProfileForm('password', e)}
                  value={profileForm.password}
                />
              </Col>
              <Col span={24} className={styles.formGroup}>
                <label>New Password*</label>
                <input
                  name="new_password"
                  className={formValidation.new_password ? '' : styles.error}
                  type="password"
                  placeholder="ie: **********"
                  onChange={(e) => changeProfileForm('new_password', e)}
                  value={profileForm.new_password}
                />
              </Col>
              <Col span={24} className={styles.formGroup}>
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
          </Col>
          <Col span={12}></Col>
        </Row>
      </form>
    </>
  );
}

export async function getStaticProps() {
  const res = await PackageApis.getPackages();
  const packages = await res.json();

  return {
    props: {
      packages
    }
  };
}
