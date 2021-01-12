/* eslint-disable react/display-name */
import Head from 'next/head';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import styles from '@styles/Shop.module.css';

export default function Shop() {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Shop</title>
      </Head>
      <AppLayout bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}></div>
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <img src="/images/shop_dashboard.jpg" className={styles.bgImage} />
      <div className={styles.heroBannerContent}>
        <h1>The Shop</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <BannerSportsAndMatches />
    </div>
  );
}
