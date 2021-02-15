import React, { useState } from 'react';
import { Row, Col, Dropdown, Menu } from 'antd';
import { CardExpiryElement, CardCvcElement, CardNumberElement } from '@stripe/react-stripe-js';

import styles from '@styles/Profile.module.css';
import { UserBillingInfo, UserBillingInfoValidate } from '@type/Users';
import { CREDIT_COUNTRIES } from '@constants/';

type CreditCardInfoType = {
  updateBillingFormData: (_: UserBillingInfo, _valid: boolean) => void;
};

function CreditCardInfo({ updateBillingFormData }: CreditCardInfoType) {
  const [billingInfo, setBillingInfo] = useState<UserBillingInfo>({
    city: undefined,
    address: undefined,
    zipcode: undefined,
    full_name: undefined,
    country: 'CA'
  });
  const [formValidation, setFormValidation] = useState<UserBillingInfoValidate>({
    city: true,
    address: true,
    zipcode: true,
    full_name: true,
    country: true
  });

  const changeBillingFormData = (
    name: keyof UserBillingInfo,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const { value } = e.currentTarget;
    const newBillingInfo = Object.assign({}, billingInfo);
    newBillingInfo[name] = value;
    setBillingInfo(newBillingInfo);
    validateForm(newBillingInfo, formValidation);
  };

  const validateForm = (data: UserBillingInfo, validation: UserBillingInfoValidate) => {
    const newValidation = Object.assign({}, validation);
    let isValid = true;
    if (data.city === '') {
      newValidation.city = false;
      isValid = false;
    } else if (data.city === undefined) {
      isValid = false;
    } else {
      newValidation.city = true;
    }
    if (data.address === '') {
      newValidation.address = false;
      isValid = false;
    } else if (data.address == undefined) {
      isValid = false;
    } else {
      newValidation.address = true;
    }
    if (data.zipcode === '') {
      newValidation.zipcode = false;
      isValid = false;
    } else if (data.zipcode == undefined) {
      isValid = false;
    } else {
      newValidation.zipcode = true;
    }
    if (data.full_name === '') {
      newValidation.full_name = false;
      isValid = false;
    } else if (data.full_name == undefined) {
      isValid = false;
    } else {
      newValidation.full_name = true;
    }
    if (!newValidation.creditNumber || !newValidation.creditExp || !newValidation.creditCVC) {
      isValid = false;
    }
    setFormValidation(newValidation);
    updateBillingFormData(data, isValid);
  };

  const changeCountry = (name: string) => {
    const newBillingInfo = Object.assign({}, billingInfo);
    newBillingInfo.country = name;
    setBillingInfo(newBillingInfo);
  };
  const creditCartFormChanged = (element: any, name: keyof UserBillingInfoValidate) => {
    const newValidation = { ...formValidation };
    if (!element.empty && element.complete) {
      newValidation[name] = true;
    } else {
      newValidation[name] = false;
    }
    setFormValidation(newValidation);
    validateForm(billingInfo, newValidation);
  };
  const countryMenu = () => (
    <Menu className={styles.sportMenu}>
      {CREDIT_COUNTRIES.map((country) => (
        <Menu.Item key={country.id}>
          <div className={styles.countryMenuItem} onClick={() => changeCountry(country.id)}>
            {country.name}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.creditCardInfoRow}>
      <Row justify="space-between">
        <Col span={24}>
          <h6>Billing Information</h6>
          <Col span={24} className={styles.formGroup}>
            <label>Full Name</label>
            <input
              name="full_name"
              className={formValidation.full_name ? '' : styles.error}
              placeholder="Johnny Cash"
              onChange={(e) => changeBillingFormData('full_name', e)}
            />
          </Col>
          <Col span={24} className={styles.formGroup}>
            <label>Billing Address</label>
            <input
              name="address"
              placeholder="-"
              className={formValidation.address ? '' : styles.error}
              onChange={(e) => changeBillingFormData('address', e)}
            />
          </Col>
          <Row className={styles.rowWithTwoChild} justify="space-between">
            <Col span={12} className={styles.formGroup}>
              <label>City</label>
              <input
                name="city"
                placeholder="ie: Ottawa"
                className={formValidation.city ? '' : styles.error}
                onChange={(e) => changeBillingFormData('city', e)}
              />
            </Col>
            <Col span={12} className={styles.formGroup}>
              <label>Zip code</label>
              <input
                name="zipcode"
                className={formValidation.zipcode ? '' : styles.error}
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
                {CREDIT_COUNTRIES.filter((country) => country.id == billingInfo.country)[0].name}
              </div>
            </Dropdown>
          </Col>
        </Col>
        <Col span={24} className="profile-credit-card">
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
                options={{ placeholder: 'MM/YY', classes: { base: styles.input } }}
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
        </Col>
      </Row>
    </div>
  );
}

export default CreditCardInfo;
