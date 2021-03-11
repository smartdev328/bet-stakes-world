import Head from 'next/head';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function Privacy({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Nevada Privacy</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={`${styles.content} ${styles.privacy}`}>
            <h3>Privacy Policy</h3>
            <h4>THE DAILY STAKES INC.</h4>

            <h5>Privacy Notice for Nevada Visitors</h5>
            <p>
              Under Nevada law, certain Nevada consumers may opt out of the sale of “personally
              identifiable information” for monetary consideration (as such terms are defined under
              Nevada law) to a person for that person to license or sell such information to
              additional persons. We do not engage in such activity; however, if you are a Nevada
              resident and you have purchased services from us, you may submit a request to opt out
              of any potential future sales under Nevada law by submitting a sale opt-out request by
              emailing us at <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>.
              Please note that we do not knowingly sell the personal information of minors under 16
              years of age without legally required affirmative authorization. Please note we may
              take reasonable steps to verify your identity and the authenticity of the request.
              Once verified, we will maintain your request in the event our practices change.
            </p>

            <h5>Contact Us</h5>
            <p>
              If you have any questions, or complaints, regarding the collection or use of your
              personal information or the content of this policy, or if you wish to withdraw your
              consent to us using your data, please e-mail us at{' '}
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
