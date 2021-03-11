import Head from 'next/head';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function Privacy({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Canada Privacy</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={`${styles.content} ${styles.privacy}`}>
            <h3>Privacy Policy</h3>
            <h4>THE DAILY STAKES INC.</h4>

            <h5>Privacy Notice for Canadian Visitors</h5>
            <p>This Privacy Policy complies with the requirements of the Personal Information Protection and Electronic Documents Act (PIPEDA). Under Canadian law, you have a right to access any personal information we hold about you. You may ask us to access and/or correct your information by writing to us at the address below. Please note that we may require you to send us proof of your identity before providing you with access to your personal information. If you send us a request to access or correct information, then we will contact you within 30 days (although it may take us longer to fully respond to your request).</p>
            <p>Our general privacy policy makes clear that we may share information with third parties, such as co-branded partners and authorized third parties. However, we will only share your information with such parties where we have your express or implied consent to do so. If you object to our sharing your information with such parties, or if you do not wish to receive marketing communications (such as emails) from us or our third party partners, then you may contact us here to let us know your objection at any time.</p>
            

            <h5>Contact Us</h5>
            <p>If you have any questions, or complaints, regarding the collection or use of your personal information or the content of this policy, or if you wish to withdraw your consent to us using your data, please e-mail us at <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>. Back-up data of personal information will only be retained as long as it is necessary for data security purposes and will not be retained indefinitely.</p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
