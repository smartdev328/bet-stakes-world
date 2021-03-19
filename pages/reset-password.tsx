import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LazyLoad from 'react-lazyload';
import { Row, Col, Button, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { AppLayout } from '@components/index';
import { ReduxState } from '@redux/reducers';
import styles from '@styles/ResetPassword.module.css';
import { ResetPasswordForm, ResetPasswordFormValidate } from '@type/Users';
import { PageProps } from '@type/Main';

export default function ResetPassword({ token, subscriptions }: PageProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { code } = router.query;

  const { error: requestError, loading } = useSelector((state: ReduxState) => state.user);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<ResetPasswordForm>({
    passwordConfirmation: '',
    password: '',
    code: undefined
  });
  const [formValidation, setFormValidation] = useState<ResetPasswordFormValidate>({
    passwordConfirmation: true,
    password: true
  });

  useEffect(() => {
    if (code) {
      const newData = { ...formData };
      newData.code = code as string;
      setFormData(newData);
    }
  }, [code]);

  useEffect(() => {
    if (requestError && !loading && formSubmitted) {
      notification['error']({
        message: 'Reset Password Error!',
        description: requestError
      });
    }
    if (requestError === null && !loading && formSubmitted) {
      notification['info']({
        message: 'Password has been reset successfully!'
      });
    }
  }, [requestError, loading]);

  const changeFormData = (name: keyof ResetPasswordForm, e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newFormData = Object.assign({}, formData);
    newFormData[name] = value;
    setFormData(newFormData);
    validateForm(newFormData);
  };
  const validateForm = (data: ResetPasswordForm) => {
    const newValidation = Object.assign({}, formValidation);
    let isValid = true;
    if (data.passwordConfirmation !== data.password) {
      newValidation.passwordConfirmation = false;
      newValidation.password = false;
      isValid = false;
    } else if (data.password === '' || (data.password && data.password.length < 6)) {
      newValidation.password = false;
      newValidation.passwordConfirmation = false;
      isValid = false;
    } else if (data.password == undefined) {
      isValid = false;
    } else {
      newValidation.password = true;
      newValidation.passwordConfirmation = true;
    }
    setFormValidation(newValidation);
    setIsFormValid(isValid);
  };

  // Handler for onSend button
  const onReset = () => {
    dispatch({
      type: 'RESET_PASS',
      payload: formData
    });
    setFormSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Reset Password</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.logo_section}>
              <LazyLoad>
                <img
                  src={'/images/logo.svg'}
                  width={418}
                  height={72}
                  alt="App Logo"
                  className={styles.logo}
                />
              </LazyLoad>
            </div>
            <div className={`${styles.signInForm} ${styles.resetPassForm}`}>
              <h3>Reset Password</h3>
              <Row>
                <Col span={24} className={styles.formGroup}>
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="************"
                    className={formValidation.password ? '' : styles.error}
                    onChange={(e) => changeFormData('password', e)}
                  />
                </Col>
                <Col span={24} className={styles.formGroup}>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="************"
                    className={formValidation.passwordConfirmation ? '' : styles.error}
                    onChange={(e) => changeFormData('passwordConfirmation', e)}
                  />
                </Col>
                <Button
                  loading={loading}
                  className={styles.signInBtn}
                  disabled={!isFormValid}
                  onClick={onReset}>
                  Reset Password
                </Button>
              </Row>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
