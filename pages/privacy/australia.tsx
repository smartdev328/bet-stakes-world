import Head from 'next/head';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function Privacy({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Australia Privacy</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={`${styles.content} ${styles.privacy}`}>
            <h3>Privacy Policy</h3>
            <h4>THE DAILY STAKES INC.</h4>

            <h5>Privacy Notice for Australian Visitors</h5>
            <p>
              TDS acknowledges that its related companies, parents, subsidiaries, and affiliates
              formed under the laws of Australia or otherwise operating in Australia (including,
              without limitation, the entities listed below) are subject to the Australian Privacy
              Principles (APPs) as set out in the Privacy Act 1988 (Privacy Act).
            </p>
            <p>
              We maintain records of personal information we have collected. You can gain access to
              the personal information held by TDS about you in two ways. If you have registered as
              a TDS member or subscriber, most information held by TDS about you can be viewed and
              changed directly by you by logging into the relevant Website or Application and
              reviewing your account information. Except in some limited circumstances such as where
              the information is commercially sensitive, other personal information held by TDS
              about you is available by contacting by emailing us at{' '}
              <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>. We will process
              a request for access as quickly as possible. We reserve the right to impose a
              reasonable charge for processing and collating personal information, where appropriate
              and permitted under the Privacy Act.
            </p>
            <p>
              If you inform us that the information we hold is incorrect we will, if appropriate,
              amend those records.
            </p>

            <h5>Third-Party Online Advertising</h5>
            <p>
              In Australia, the Australian Digital Advertising Alliance (“ADAA”) has developed the
              Australian Guideline for Third Party Online Behavioural Advertising. More information
              and an opt out page to manage online behavioral advertising preferences with ADAA
              member companies are available at{' '}
              <a href="https://www.youronlinechoices.com.au/">
                https://www.youronlinechoices.com.au/
              </a>
              .
            </p>

            <h5>Contact Us</h5>
            <p>
              If you have any questions, or complaints, regarding the collection or use of your
              personal information or the content of this policy, or if you wish to withdraw your
              consent to us using your data, please e-mail us{' '}
              <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>. Back-up data of
              personal information will only be retained as long as it is necessary for data
              security purposes and will not be retained indefinitely.
            </p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
