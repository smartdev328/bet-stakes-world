import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { Row, Col, Button, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { ReduxState } from '@redux/reducers';
import styles from './LoginModal.module.css';
import { CloseIcon } from './SvgIcons';
import { LoginUserType, LoginUserValidateType } from '@type/Users';
import { validateEmail } from '@utils/common';

function LoginModal() {
  const dispatch = useDispatch();

  const { error: loginError, loading } = useSelector((state: ReduxState) => state.user);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { isModalOpen } = useSelector((state: ReduxState) => state.common);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginUserType>({
    email: undefined,
    password: undefined
  });
  const [formValidation, setFormValidation] = useState<LoginUserValidateType>({
    email: true,
    password: true
  });

  useEffect(() => {
    return () => {
      closeModal();
    };
  }, []);

  useEffect(() => {
    setModalOpen(isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    // Show LoginError Notification
    if (loginError && formSubmitted) {
      notification['error']({
        message: 'LogIn Error!',
        description: loginError
      });
    }
    if (loginError === null && !loading && formSubmitted) {
      closeModal();

      notification.open({
        message: 'You’ve Successfully Logged In!',
        style: { background: '#ffc700' }
      });
    }
  }, [loginError, loading]);

  const closeModal = () => {
    setModalOpen(false);
    dispatch({ type: 'CLOSE_LOGIN_MODAL' });
  };
  const changeFormData = (name: keyof LoginUserType, e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newFormData = Object.assign({}, formData);
    newFormData[name] = value;
    setFormData(newFormData);
    validateForm(newFormData);
  };
  const validateForm = (data: LoginUserType) => {
    const newValidation = Object.assign({}, formValidation);
    let isValid = true;
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
    if (data.password === '' || (data.password && data.password.length < 6)) {
      newValidation.password = false;
      isValid = false;
    } else if (data.password == undefined) {
      isValid = false;
    } else {
      newValidation.password = true;
    }
    setFormValidation(newValidation);
    setIsFormValid(isValid);
  };

  // Handler for LogIn button
  const onLogin = () => {
    dispatch({
      type: 'LOGIN_USER',
      payload: {
        identifier: formData.email,
        password: formData.password
      }
    });
    setFormSubmitted(true);
  };

  const onForgotPass = () => {
    dispatch({ type: 'OPEN_FORGOT_PASS_MODAL' });
    setTimeout(() => {
      closeModal();
    }, 10);
  };

  if (!modalOpen) {
    return null;
  }
  return (
    <div className={styles.loginModal}>
      <div className={styles.wrapper} onClick={closeModal}></div>
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
          <Button type="ghost" onClick={closeModal} className={styles.closeBtn}>
            <CloseIcon className={styles.closeIcon} />
          </Button>
        </div>
        <div className={styles.signInForm}>
          <h2>Sign In</h2>
          <Row align={'middle'} justify={'center'} className={styles.register_row}>
            <span>Don&rsquo;t have an account?&nbsp;&nbsp;</span>
            <Link href="/signup">
              <a>Register Now</a>
            </Link>
          </Row>
          {/* <Button className={styles.register_facebook_btn}>Registor With Facebook</Button>
          <Button className={styles.register_goggle_btn}>Registor With Google</Button> */}
          {/* <Row justify="center">OR SIGN IN WITH EMAIL</Row> */}
          <Row>
            <Col span={24} className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email Address"
                className={formValidation.email ? '' : styles.error}
                onChange={(e) => changeFormData('email', e)}
              />
            </Col>
            <Col span={24} className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className={formValidation.password ? '' : styles.error}
                onChange={(e) => changeFormData('password', e)}
              />
              <div className={styles.forgotPasswordLink}>
                <a onClick={onForgotPass}>Forgot Password?</a>
              </div>
            </Col>
            <Button className={styles.signInBtn} disabled={!isFormValid} onClick={onLogin}>
              Sign In
            </Button>
            <div className={styles.terms_and_conditions}>
              <Link href="/privacy">
                <a>Privacy</a>
              </Link>
              <div className={styles.divider} />
              <Link href="/terms">
                <a>Terms</a>
              </Link>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
