import Head from 'next/head';
import React from 'react';

import { AppLayout } from '@components/index';

export default function FAQs() {
  return (
    <>
      <Head>
        <title>The Daily Stakes - FAQs</title>
        <meta name="description" content="Daily Stakes FAQs Page" />
      </Head>
      <AppLayout>
        <h3>FAQs</h3>
      </AppLayout>
    </>
  );
}
