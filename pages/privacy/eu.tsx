import Head from 'next/head';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function Privacy({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Europe Privacy</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={`${styles.content} ${styles.privacy}`}>
            <h3>Privacy Policy</h3>
            <h4>THE DAILY STAKES INC.</h4>

            <h5>Privacy Notice for European Visitors</h5>
            <p>
              This section of the Privacy Policy applies only if you use our website or Services
              covered by the Privacy Policy from a country that is a Member State of the European
              Union, and it supplements the information in the Privacy Policy.
            </p>
            <p>
              TDS Inc. is the data controller for processing of information defined as personal data
              under applicable data protection law (“Personal Data”).
            </p>

            <h5>Legal Basis For Data Processing</h5>
            <p>
              We process Personal Data for the purposes set out in the Privacy Policy. Our legal
              basis to process Personal Data includes processing that is: necessary for the
              performance of the contract between you and CBS (for example, to provide you with the
              Services you request and to identify and authenticate you so you may use the website);
              necessary to comply with legal requirements (for example, to comply with applicable
              accounting rules and to make mandatory disclosures to law enforcement); necessary for
              our legitimate interests (for example, to manage our relationship with you and to
              improve the website and our Services); and based on consent by our customers (for
              example, to communicate with you about our products and services and provide you with
              marketing information), which may subsequently be withdrawn at any time by contacting
              us (using the contact instructions below) without affecting the lawfulness of
              processing based on consent before its withdrawal.
            </p>

            <h5>EU Data Subject Rights</h5>
            <p>
              The EU General Data Protection Regulation (GDPR) provides certain rights for EU data
              subjects. You may decline to share certain personal information with us, in which case
              we may not be able to provide some of the features and functionality of our Services.
              These rights include, in accordance with applicable law, the right to object to or
              request the restriction of processing of your Personal Data, and to request access to,
              rectification, erasure and portability of your own Personal Data. Requests should be
              submitted by contacting us (using the contact instructions below).
            </p>
            <p>
              You may make changes to the personal information collected by our account registration
              pages by logging into the appropriate Service and updating the account settings page.
              We will make commercially reasonable efforts to provide you reasonable access to your
              personal information within 30 days of your access request to the contact address
              below. We provide this access so that you may review, make corrections, or request
              deletion of your personal information. If we cannot honor your request within 30 days,
              we will inform you when we will be able to provide such access. If for some reason
              access is denied, we will provide an explanation as to why access is denied. When
              technically feasible, at your request, we will provide your personal data to you or
              transmit it directly to another controller.
            </p>
            <p>
              We will retain your personal information for as long as it is reasonably necessary for
              the purposes set out in the Privacy Policy, considering the time period reasonably
              necessary to: provide the Services to you; exercise the choices and rights you have
              requested; comply with our contractual obligations; enforce our terms for use of the
              Services; and, comply with legal and regulatory requirements.
            </p>
            <p>
              If you have any unresolved privacy concern that we have not addressed satisfactorily
              after contacting us, you have the right to contact the appropriate EU Data Protection
              Authority and lodge a complaint.
            </p>

            <h5>Third Party Online Advertising</h5>
            <p>
              We enable certain third party advertising exchanges to place advertisements on our
              sites. With your consent, those advertising exchanges collect your IP address and/or a
              unique advertising ID that is used by the advertising exchange to identify you across
              the internet.
            </p>
            <p>
              The European Digital Advertising Alliance “EDAA” has developed a guide to online
              behavioural advertising and has developed an opt out page to manage online behavioural
              advertising preferences with EDAA member companies available at{' '}
              <a href="www.YourOnlineChoices.com">www.YourOnlineChoices.com</a>.
            </p>

            <h5>Contact Us</h5>
            <p>
              For all EU Data Subject Rights requests, if you have any questions, or complaints,
              regarding the collection or use of your personal information or the content of this
              policy, or if you wish to withdraw your consent to us using your data, please contact
              us at <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>. Back-up
              data of personal information will only be retained as long as it is necessary for data
              security purposes and will not be retained indefinitely.
            </p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
