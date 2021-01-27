import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { Row, Col, Button, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { ReduxState } from '@redux/reducers';
import styles from './LoginModal.module.css';
import { CloseIcon } from './SvgIcons';
import {
  ForgotPasswordForm as ResetPasswordForm,
  ForgotPasswordFormValidate as ResetPasswordFormValidate
} from '@type/Users';
import { validateEmail } from '@utils/common';

function ResetPassword() {
  const dispatch = useDispatch();

  const { error: requestError, loading } = useSelector((state: ReduxState) => state.user);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { isResetPassModalOpen } = useSelector((state: ReduxState) => state.common);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<ResetPasswordForm>({
    email: undefined
  });
  const [formValidation, setFormValidation] = useState<ResetPasswordFormValidate>({
    email: true
  });

  useEffect(() => {
    setModalOpen(isResetPassModalOpen);
  }, [isResetPassModalOpen]);

  useEffect(() => {
    // Show LoginError Notification
    if (requestError && !loading && formSubmitted) {
      notification['error']({
        message: 'Reset Password Request Error!',
        description: requestError
      });
    }
    if (requestError === null && !loading && formSubmitted) {
      closeModal();
      notification['info']({
        message: 'Successfully sent the Reset Password request!'
      });
    }
  }, [requestError, loading]);

  const closeModal = () => {
    setModalOpen(false);
    dispatch({ type: 'CLOSE_RESET_PASS_MODAL' });
  };
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
  const onReset = () => {
    dispatch({
      type: 'RESET_PASS',
      payload: {
        identifier: formData.email
      }
    });
    setFormSubmitted(true);
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
          <h2>Reset Password</h2>
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
              onClick={onReset}>
              Reset Password
            </Button>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
