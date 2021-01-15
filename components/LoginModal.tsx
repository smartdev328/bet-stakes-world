import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { Row, Col, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { ReduxState } from '@redux/reducers';
import styles from './LoginModal.module.css';
import { CloseIcon } from './SvgIcons';

function LoginModal() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { isModalOpen } = useSelector((state: ReduxState) => state.common);
  useEffect(() => {
    setModalOpen(isModalOpen);
  }, [isModalOpen]);
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalOpen(false);
    dispatch({ type: 'CLOSE_MODAL' });
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
          <Button className={styles.register_facebook_btn}>Registor With Facebook</Button>
          <Button className={styles.register_goggle_btn}>Registor With Google</Button>
          <Row justify="center">OR SIGN IN WITH EMAIL</Row>
          <Row>
            <Col span={24} className={styles.formGroup}>
              <label>Email</label>
              <input type="email" placeholder="Email Address" />
            </Col>
            <Col span={24} className={styles.formGroup}>
              <label>Password</label>
              <input type="password" placeholder="Password" />
              <div className={styles.forgotPasswordLink}>
                <Link href="/">
                  <a>Forgot Password?</a>
                </Link>
              </div>
            </Col>
            <Button className={styles.signInBtn}>Sign In</Button>
            <div className={styles.terms_and_conditions}>
              <Link href="/">
                <a>Privacy</a>
              </Link>
              <div className={styles.divider} />
              <Link href="/">
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
