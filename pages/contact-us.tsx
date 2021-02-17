import Head from 'next/head';
import React, { useState } from 'react';
import { Row, Col, Button, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import ReCAPTCHA from 'react-google-recaptcha';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/ContactUs.module.css';
import { ContactUsForm, ContactUsFormValidation } from '@type/ContactUs';
import { validateEmail } from '@utils/common';

const { Dragger } = Upload;

export default function Contact({ token, subscriptions }: PageProps) {
  const recaptchaRef = React.createRef<ReCAPTCHA>();
  const [contactUsForm, setContactUsForm] = useState<ContactUsForm>({
    email: undefined,
    subject: undefined,
    description: undefined
  });
  const [formValidation, setFormValidation] = useState<ContactUsFormValidation>({
    email: true,
    subject: true,
    description: true
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [recaptchaValid, setRecaptchaValid] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<UploadFile<any>[]>([]);

  const changecontactUsForm = (name: keyof ContactUsForm, value: string) => {
    const newForm = Object.assign({}, contactUsForm);
    newForm[name] = value;
    setContactUsForm(newForm);
    validateForm(newForm);
  };
  const validateForm = (data: ContactUsForm) => {
    const newValidation = Object.assign({}, formValidation);
    let isValid = true;
    if (data.description === '') {
      newValidation.description = false;
      isValid = false;
    } else if (data.description == undefined) {
      isValid = false;
    } else {
      newValidation.description = true;
    }
    if (data.subject === '') {
      newValidation.subject = false;
      isValid = false;
    } else if (data.subject === undefined) {
      isValid = false;
    } else {
      newValidation.subject = true;
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
    setFormValidation(newValidation);
    setIsFormValid(isValid);
  };
  const onSubmit = () => {
    console.log('----- submit form');
    if (attachments) {
      console.log('---', attachments);
    }
  };
  const onAttachmentsChange = (info: UploadChangeParam<UploadFile<File>>) => {
    const { status } = info.file;
    if (status === 'done') {
      console.log(`${info.file.name} file uploaded successfully.`);
      setAttachments(info.fileList);
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  };
  const onRecaptchaChange = () => {
    const recaptchaValue = recaptchaRef.current?.getValue();
    console.log('----', recaptchaValue);
    if (recaptchaValue) {
      setRecaptchaValid(true);
    } else {
      setRecaptchaValid(false);
    }
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Terms</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={styles.content}>
            <form autoComplete="off" id="contactUsForm">
              <Row>
                <div className={styles.sectionTitle}>Contact Us</div>
                <Col span={24} className={styles.formGroup}>
                  <label>Email*</label>
                  <input
                    name="email"
                    type="email"
                    value={contactUsForm.email}
                    className={formValidation.email ? '' : styles.error}
                    placeholder="ie: j.cash@gmail.com"
                    onChange={(e) => changecontactUsForm('email', e.currentTarget.value)}
                  />
                </Col>
                <Col span={24} className={styles.formGroup}>
                  <label>Subject*</label>
                  <input
                    name="first_name"
                    value={contactUsForm.subject}
                    className={formValidation.subject ? '' : styles.error}
                    placeholder="ie: Subject"
                    onChange={(e) => changecontactUsForm('subject', e.currentTarget.value)}
                  />
                </Col>
                <Col span={24} className={styles.formGroup}>
                  <label>Description*</label>
                  <textarea
                    value={contactUsForm.description}
                    className={formValidation.description ? '' : styles.error}
                    onChange={(e) => changecontactUsForm('description', e.currentTarget.value)}
                  />
                  <span className={styles.extraText}>
                    * Please enter the details of your request. A member of our support staff will
                    respond as soon as possible.
                  </span>
                </Col>
                <Col span={24} className={styles.formGroup}>
                  <label>Attachments</label>
                  <Dragger onChange={onAttachmentsChange} multiple>
                    <div className={styles.uploadFiles}>Add files or Drop files here</div>
                  </Dragger>
                </Col>
              </Row>
              <Button
                className={styles.saveBtn}
                disabled={!(isFormValid && recaptchaValid)}
                onClick={onSubmit}>
                Submit
              </Button>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LdraFsaAAAAABPYauD8BhRdIY6ULHVOtqKzHRd1"
                onChange={onRecaptchaChange}
              />
            </form>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
