import Head from 'next/head';
import Link from 'next/link';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function RefundPolicy({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Cancellation and Refund Policy</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={`${styles.content} ${styles.privacy}`}>
            <h3>Cancellation and Refund Policy</h3>
            <h4>THE DAILY STAKES INC.</h4>
            <h5>Cancellation and Refund Policy</h5>

            <h5>1.1. Definitions</h5>
            <p>The term "digital product" refers to paid digital products available from The Daily Stakes Inc. (hereinafter referred to as <b>“TDS”</b>), including both TDS digital subscriptions and one-time purchases.</p>

            <h5>2.1. Cancellation and Refunds of Digital Subscriptions</h5>
            <p>When you cancel a subscription, you cancel only future charges associated with your subscription. You may notify us of your intent to cancel at any time, but the cancellation will become effective at the end of your current billing period.</p>
            <p>Cancellations are available on any packages exceeding one month (e.g. annual membership), based on the remaining time left for a purchased membership package(s), following a monthly billing cycle.</p>
            <p>Cancellations are effective the following billing cycle. You will not receive a refund for the current billing cycle. You will continue to have the same access and benefits of your product for the remainder of the current billing period.</p>
            <p>TDS reserves the right to issue refunds or credits at our sole discretion. If we issue a refund or credit, we are under no obligation to issue the same or similar refund in the future.</p>
            
            <h5><em>Changes to Content or Access to the TDS subscriptions</em></h5>
            <p>TDS reserves the right to make changes to our digital products at any time. If we temporarily reduce or eliminate the charge for content or access that you are currently paying for under different terms, you will not receive a refund.</p>

            <h5><em>Subscription Cancellations by TDS</em></h5>
            <p>We reserve the right to suspend or terminate your subscription or product for any reason, with or without notice and without further obligation. You will not be entitled to a refund in these circumstances. If any or all of our digital products are temporarily unavailable, you will not receive a refund. We reserve the right to issue refunds or credits at our sole discretion. If we issue a refund or credit, we are under no obligation to issue the same or similar refund in the future.</p>

            <h5>2.2. Cancellation During Promotional Periods</h5>
            <p>Certain promotions may not permit cancellation during the promotional period. You agree to the cancellation and refund terms stated at the time of purchase.</p>

            <h5>2.3. Cancellation and Refunds of One-Time Purchases</h5>
            <p>One-time purchases cannot be canceled or refunded. All one-time purchases of any digital products are completed on a non-refundable and “as is” basis, without warranty of any kind by TDS with regards to the use for a particular purpose or otherwise (see package details).</p>
            <p>TDS reserves the right to make changes to our digital products at anytime. If we temporarily reduce or eliminate the charge for content or access that you are currently paying for under different terms, you will not receive a refund.</p>
            <p>We reserve the right to issue refunds or credits at our sole discretion. If we issue a refund or credit, we are under no obligation to issue the same or similar refund in the future.</p>

            <h5>2.4 TDS Protection</h5>
            <p>TDS Protection applies only to the Daily VIP All Access Card exclusively and only when indicated at the time of purchase. If greater than fifty percent (50%) of the Daily VIP All Access Card picks provided by TDS result in losses for a given day, TDS agrees to provide the next day’s Daily VIP All Access Card free of charge. For further clarity and as an example only, if 10 picks are released within a VIP All Access Card, and 6 results in losses for a given day, then the Daily VIP All Access Card for the next day will be free. To be clear, this policy is independent of profitability and based solely on the quantum of picks as depicted in the example above.</p>
            <p>For further information, TDS maybe be contacted using the form on our <Link href="/contact-us"><a>contact us page</a></Link>.</p>
            <p><em>The Cancellation & Refund policy was last updated on March 8, 2021</em></p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
