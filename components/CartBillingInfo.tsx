import React, { FormEvent } from 'react';
import { Row, Button, Col } from 'antd';
import { CardExpiryElement, CardCvcElement, CardNumberElement } from '@stripe/react-stripe-js';

import styles from '@styles/Profile.module.css';
import { UserBillingInfo } from '@type/Users';

type CreditCardInfoType = {
  changeBillingFormData: (
    name: keyof UserBillingInfo,
    e: React.FormEvent<HTMLInputElement>
  ) => void;
  changeCardFormData: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

function CreditCardInfo({
  changeBillingFormData,
  changeCardFormData,
  loading
}: CreditCardInfoType) {
  return (
    <div className={`${styles.creditCardInfoRow} ${styles.cartCCForm}`}>
      <form onSubmit={changeCardFormData}>
        <h2>Credit Card Information</h2>
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
              <input
                name="country"
                placeholder="Canada"
                onChange={(e) => changeBillingFormData('country', e)}
              />
            </Col>
          </Col>
          <Col span={12} className="profile-credit-card">
            <h6>Credit Card Info</h6>
            <Row>
              <Col span={24} className={styles.formGroup}>
                <label>Card Number</label>
                <CardNumberElement
                  options={{ placeholder: 'XXXX XXXX XXXX 1234', classes: { base: styles.input } }}
                />
              </Col>
            </Row>
            <Row className={styles.rowWithTwoChild} justify="space-between">
              <Col span={12} className={styles.formGroup}>
                <label>Expiry Date</label>
                <CardExpiryElement
                  options={{ placeholder: 'MM/YY', classes: { base: styles.input } }}
                />
              </Col>
              <Col span={12} className={styles.formGroup}>
                <label>CVV</label>
                <CardCvcElement options={{ placeholder: '•••', classes: { base: styles.input } }} />
              </Col>
            </Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row className={styles.formGroup}></Row>
            <Row justify="end">
              <Col>
                <Button loading={loading} className={styles.registerBtn} htmlType="submit">
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

export default CreditCardInfo;
