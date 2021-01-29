import Head from 'next/head';
import React from 'react';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';

export default function FAQs({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - FAQs</title>
        <meta name="description" content="Daily Stakes FAQs Page" />
      </Head>
      <AppLayout token={token} subscriptions={subscriptions}>
        <h3>FAQs</h3>
      </AppLayout>
    </>
  );
}
