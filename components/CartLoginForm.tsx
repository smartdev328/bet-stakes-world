import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import styles from './LoginModal.module.css';
import { LoginUserType, LoginUserValidateType } from '@type/Users';
import { validateEmail } from '@utils/common';
import { ReduxState } from '@redux/reducers';

type CartLoginFormProps = {
  onLoginCompleted: () => void;
  onCartSignup: () => void;
};

function CartLoginForm({ onLoginCompleted, onCartSignup }: CartLoginFormProps) {
  const dispatch = useDispatch();

  const { error: loginError, loading } = useSelector((state: ReduxState) => state.user);
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
    if (loginError === null && !loading && formSubmitted) {
      console.log('----- successfully login');
      onLoginCompleted();
    }
  }, [loginError, loading]);

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

  return (
    <div className={styles.cartFormContent}>
      <h2>Sign In</h2>
      <Row align={'middle'} justify={'start'} className={styles.register_row}>
        <span>Don&rsquo;t have an account?&nbsp;&nbsp;</span>
        <a onClick={onCartSignup}>Register Now</a>
      </Row>
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
        </Col>
        <Button className={styles.signInBtn} disabled={!isFormValid} onClick={onLogin}>
          Sign In
        </Button>
      </Row>
    </div>
  );
}

export default CartLoginForm;
