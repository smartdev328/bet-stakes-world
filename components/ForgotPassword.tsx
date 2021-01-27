import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { Row, Col, Button, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { ReduxState } from '@redux/reducers';
import styles from './LoginModal.module.css';
import { CloseIcon } from './SvgIcons';
import { ForgotPasswordForm, ForgotPasswordFormValidate } from '@type/Users';
import { validateEmail } from '@utils/common';

function ForgotPassword() {
  const dispatch = useDispatch();

  const { error: requestError, loading } = useSelector((state: ReduxState) => state.user);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { isForgotPassModalOpen } = useSelector((state: ReduxState) => state.common);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<ForgotPasswordForm>({
    email: undefined
  });
  const [formValidation, setFormValidation] = useState<ForgotPasswordFormValidate>({
    email: true
  });

  useEffect(() => {
    setModalOpen(isForgotPassModalOpen);
  }, [isForgotPassModalOpen]);

  useEffect(() => {
    // Show LoginError Notification
    if (requestError && formSubmitted) {
      notification['error']({
        message: 'Forgot Password Request Error!',
        description: requestError
      });
    }
    if (requestError === null && !loading && formSubmitted) {
      closeModal();
      notification['info']({
        message: 'Successfully sent the Email!'
      });
    }
  }, [requestError, loading]);

  const closeModal = () => {
    setModalOpen(false);
    dispatch({ type: 'CLOSE_FORGOT_PASS_MODAL' });
  };
  const changeFormData = (name: keyof ForgotPasswordForm, e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newFormData = Object.assign({}, formData);
    newFormData[name] = value;
    setFormData(newFormData);
    validateForm(newFormData);
  };
  const validateForm = (data: ForgotPasswordForm) => {
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
    setFormValidation(newValidation);
    setIsFormValid(isValid);
  };

  // Handler for onSend button
  const onSend = () => {
    dispatch({
      type: 'FORGOT_PASS',
      payload: {
        identifier: formData.email
      }
    });
    setFormSubmitted(true);
  };

  const openResetPassModal = () => {
    dispatch({ type: 'OPEN_RESET_PASS_MODAL' });
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
        <div className={`${styles.signInForm} ${styles.forgotPassForm}`}>
          <h2>Forgot Password</h2>
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
            <Button
              loading={loading}
              className={styles.signInBtn}
              disabled={!isFormValid}
              onClick={onSend}>
              Send Verify Code
            </Button>
          </Row>
          <Row align={'middle'} justify={'center'} className={styles.register_row}>
            <span>Do you want to reset password?&nbsp;&nbsp;</span>
            <a onClick={openResetPassModal}>Reset Password</a>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
