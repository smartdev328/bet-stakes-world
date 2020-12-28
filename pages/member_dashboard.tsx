import Head from 'next/head';
import { Image } from 'antd';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import styles from '@styles/MemberDashboard.module.css';

export default function MemberDashboard() {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Member Dashboard</title>
      </Head>
      <AppLayout>
        <HeroBanner />
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <Image src="/images/member_dashboard.jpg" preview={false} className={styles.bgImage} />
      <BannerSportsAndMatches />
    </div>
  );
}
