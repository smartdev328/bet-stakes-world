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
            <h4>Contact Us</h4>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
