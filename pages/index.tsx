import Head from 'next/head';

import AppLayout from '@components/AppLayout';
// import styles from '@styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Daily Stakes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <h1>Daily Stakes Content</h1>
      </AppLayout>
    </>
  );
}
