import React, { useEffect, useState } from 'react';
import styles from '@styles/Merchandise.module.css';
import MailchimpSubscribe, { FormHooks } from 'react-mailchimp-subscribe';
const url =
  '//thedailystakes.us19.list-manage.com/subscribe/post?u=aa5150b7c559aed8ed8c1eaf6&amp;id=4829d57c24';

import { validateEmail } from '@utils/common';
import dynamic from 'next/dynamic';
import { notification } from 'antd';
const Button = dynamic(() => import('antd/lib/button'));

type SubscriptionFormProps = {
  status: string | null;
  message: string | Error | null;
  onValidated: (_: { EMAIL: string }) => void;
};

function CustomForm({ status, message, onValidated }: SubscriptionFormProps) {
  const [email, setEmail] = useState<string>('');
  useEffect(() => {
    if (status === 'success') {
      notification['info']({
        message:
          'You’ve successfully subscribed to TheDailyStakes Newsletter. Welcome to the team!',
        description: null,
        style: { background: '#ffc700' }
      });
    }
    if (status === 'error') {
      notification['error']({
        message: 'Subscription Error!',
        description: null
      });
    }
  }, [status, message]);
  const emailChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const submit = () => {
    if (validateEmail(email)) {
      onValidated({
        EMAIL: email
      });
    }
  };

  return (
    <>
      <input
        id="newsletter_email"
        type="email"
        placeholder="Enter your email"
        onChange={emailChanged}
        className={styles.newsletterForm_email}
      />
      <br />
      <Button className={styles.checkout_btn} onClick={submit}>
        Signup
      </Button>
    </>
  );
}

const Merchandise = () => {
  return (
    <div className={styles.outer_div}>
      <div className={styles.innerDiv}>
        <p className={styles.dailyStake}>thedailystakes</p>
        <p className={styles.merchandise}>merchandise</p>
        <p className={styles.coming_soon}>coming soon!</p>

        <p className={styles.signup_text}>
          SIGN UP BELOW FOR EARLY UPDATES AND EXCLUSIVE ACCESS TO OUR HOODIES, CREWNECKS AND SHIRTS
        </p>
        <div className={styles.newsletterFormContainer}>
          <label htmlFor="newsletter_email" className={styles.email_text}>
            Email
          </label>
          <div>
            <MailchimpSubscribe
              url={url}
              render={({ subscribe, status, message }: FormHooks<{ EMAIL: string }>) => (
                <CustomForm
                  status={status}
                  message={message}
                  onValidated={(formData) => subscribe(formData)}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Merchandise;
