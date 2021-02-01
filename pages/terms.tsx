import Head from 'next/head';
import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function FAQs({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Terms</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h4>Terms and Conditions</h4>
            <p>
              The Daily Stakes, Inc. is a North American digital sports consulting & media company
              focused on the rapidly evolving sports betting and daily fantasy sports landscape. The
              company uses data driven models to provide users with predictive sports analytics,
              credible bet recommendations, premium content, and advanced bankroll management
              strategies via its membership packages.{' '}
            </p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
