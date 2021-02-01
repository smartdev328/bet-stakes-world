import Head from 'next/head';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function AboutUs({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - About Us</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h4>About Us</h4>
            <p>
              The Daily Stakes, Inc. is a North American digital sports consulting & media company
              focused on the rapidly evolving sports betting and daily fantasy sports landscape. The
              company uses data driven models to provide users with predictive sports analytics,
              credible bet recommendations, premium content, and advanced bankroll management
              strategies via its membership packages.{' '}
            </p>
            <h4>Our Story</h4>
            <h4>Our Mission</h4>
            <p>
              To be the sports consulting industry leader by providing our clients with the
              industry’s most versatile content and insightful recommendations.
            </p>
            <h4>Our Purpose HOLD</h4>
            <p>
              <ul>
                <li>Educating the Bettor</li>
                <li>Providing Credibility</li>
                <li>Providing Value</li>
              </ul>
            </p>

            <p>
              For more information, please visit our <a href="/faqs">FAQ Page</a> or{' '}
              <a href="/contactus">Contact Us</a> directly!
            </p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
