import React, { useEffect, useState } from 'react';
import styles from '@styles/Merchandise.module.css';
import MailchimpSubscribe, { FormHooks } from 'react-mailchimp-subscribe';
const url =
  '//thedailystakes.us19.list-manage.com/subscribe/post?u=aa5150b7c559aed8ed8c1eaf6&id=bc457c2a4a';

import { validateEmail } from '@utils/common';
import dynamic from 'next/dynamic';
import { notification } from 'antd';
import { PageProps } from '@type/Main';
import AppHeader from '../components/AppHeader';
import { getDayOfWeek, getMonthString } from '@utils/common';

const Button = dynamic(() => import('antd/lib/button'));

type SubscriptionFormProps = {
  status: string | null;
  message: string | Error | null;
  onValidated: (_: { EMAIL: string }) => void;
};

function CustomForm({ status, message, onValidated }: SubscriptionFormProps) {
  const [email, setEmail] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (formSubmitted) {
      if (status === 'success') {
        notification['info']({
          message:
            "Thanks for signing up to TheDailyStakes merch! You'll be the first to know about our merchandise, including limited edition releases. Stay tuned!",
          description: null,
          style: { background: '#ffc700' }
        });
      }
      if (status === 'error') {
        const text = typeof message === 'string' ? message : '';
        notification['error']({
          message: 'Subscription Error!',
          description: (
            <div
              className={styles.notificationText}
              dangerouslySetInnerHTML={{ __html: text }}></div>
          )
        });
      }
    }
  }, [status, message]);
  const emailChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const submit = () => {
    setFormSubmitted(true);
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
      <div className={styles.button_outerDiv}>
        <Button className={styles.signup_btn} onClick={submit}>
          Signup
        </Button>
      </div>
    </>
  );
}

const Merchandise = ({ token, subscriptions }: PageProps) => {
  const today = new Date();
  return (
    <>
      <AppHeader
        winningRate={72}
        curRecord={'96 - 36'}
        token={token}
        subscriptions={subscriptions}
        currentDateTime={`${getDayOfWeek(today)}, ${getMonthString(today)} ${
          today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
        } ${today.getFullYear()}`}
      />
      <main style={{ overflow: 'hidden' }}>
        <div className={styles.outer_div}>
          <div className={styles.innerDiv}>
            <p className={styles.dailyStake}>thedailystakes</p>
            <p className={styles.merchandise}>merchandise</p>
            <p className={styles.coming_soon}>coming soon!</p>

            <p className={styles.signup_text}>
              SIGN UP BELOW FOR EARLY UPDATES AND EXCLUSIVE <br className={styles.br_class} />
              ACCESS TO OUR HOODIES, CREWNECKS AND SHIRTS
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
      </main>
    </>
  );
};
export default Merchandise;
