import Head from 'next/head';
import React from 'react';

import { AppLayout } from '@components/index';

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Contact Us</title>
        <meta name="description" content="Daily Stakes Contact Us Page" />
      </Head>
      <AppLayout>
        <h3>Contact Us</h3>
      </AppLayout>
    </>
  );
}
