import React, { useState } from 'react';
import { Row, Col } from 'antd';

import styles from './LoginModal.module.css';
import { LoginUserType, LoginUserValidateType } from '@type/Users';
import { validateEmail } from '@utils/common';

type CartLoginFormProps = {
  onCartSignup: () => void;
  loginFormChanged: (_: LoginUserType, _valid: boolean) => void;
};

function CartLoginForm({ onCartSignup, loginFormChanged }: CartLoginFormProps) {
  const [formData, setFormData] = useState<LoginUserType>({
    email: undefined,
    password: undefined
  });
  const [formValidation, setFormValidation] = useState<LoginUserValidateType>({
    email: true,
    password: true
  });

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
    loginFormChanged(data, isValid);
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
      </Row>
    </div>
  );
}

export default CartLoginForm;
