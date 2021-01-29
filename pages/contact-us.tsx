import Head from 'next/head';
import React from 'react';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';

export default function ContactUs({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Contact Us</title>
        <meta name="description" content="Daily Stakes Contact Us Page" />
      </Head>
      <AppLayout token={token} subscriptions={subscriptions}>
        <h3>Contact Us</h3>
      </AppLayout>
    </>
  );
}
