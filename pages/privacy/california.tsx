import Head from 'next/head';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function Privacy({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - California Privacy</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={`${styles.content} ${styles.privacy}`}>
            <h3>Privacy Policy</h3>
            <h4>THE DAILY STAKES INC.</h4>

            <h5>Privacy Notice for California Visitors</h5>
            <br />
            <h5>California Privacy Rights</h5>
            <p>
              If you are a California resident, you may have certain rights. California law may
              permit you to request that we:
            </p>
            <ul>
              <li>
                Provide you the categories of personal information we have collected or disclosed
                about you in the last twelve months; the categories of sources of such information;
                the business or commercial purpose for collecting or selling your personal
                information; and the categories of third parties with whom we shared personal
                information.
              </li>
              <li>Provide access to and/or a copy of certain information we hold about you.</li>
              <li>Delete certain information we have about you.</li>
            </ul>
            <p>
              You may have the right to receive information about the financial incentives that we
              offer to you (if any). You also have the right to not be discriminated against (as
              provided for in applicable law) for exercising certain of your rights. Certain
              information may be exempt from such requests under applicable law. For example, we
              need certain types of information so that we can provide the Site and for compliance
              with applicable law. If you ask us to delete certain information, you may no longer be
              able to access or use the Site.
            </p>
            <p>
              California Civil Code Section § 1798.83 permits users of our Site that are California
              residents to request, once per year, that we disclose the identity of any third
              parties with whom we have shared personal information for the third parties’ direct
              marketing purposes within the previous calendar year, along with the type of personal
              information disclosed. To make such a request, please send an email to 
              <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>.
            </p>
            <p>
              If would like to exercise any of these rights, please contact us at 
              <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>. You will be
              required to verify your identify before we fulfill your request. You can also
              designate an authorized agent to make a request on your behalf. To do so, you must
              provide us with written authorization or a power of attorney, signed by you, for the
              agent to act on your behalf. You will still need to verify your identity directly with
              us.
            </p>

            <h5>Categories of personal information we collect.</h5>
            <p>
              Throughout this Policy, we discuss in detail the specific pieces of Personal
              Information we collect from and about users. Under the CCPA, we are also required to
              provide you with the “categories” of Personal Information we collect. The categories
              we collect are:
            </p>
            <ul>
              <li>your first and last name;</li>
              <li>your title and your company’s name;</li>
              <li>
                your home, billing, or other physical address (including street name, name of a city
                or town, state/province, postal code);
              </li>
              <li>your e-mail address;</li>
              <li>your telephone number;</li>
              <li>
                your educational background, employment experience, and job interest (for job
                applicants submitting information electronically);
              </li>
              <li>
                physical characteristics or description (e.g., if you voluntarily submit a photo to
                your login page)
              </li>
              <li>
                any other identifier that permits TDS to make physical or online contact with you;
                and
              </li>
              <li>
                any information that TDS collects online from you and maintains in association with
                your account, such as: (a) your username, (b) your password, and/or (c) your credit
                card account information.
              </li>
            </ul>

            <h5>How we use these categories of personal information.</h5>
            <p>
              We and our service providers may use the categories of Personal Information we collect
              from and about you for the following business purposes and commercial (as those terms
              are defined in applicable law):
            </p>
            <ul>
              <li>Our or our service provider’s operational purposes;</li>
              <li>Auditing consumer interactions on our site (e.g., measuring ad impressions);</li>
              <li>
                Detecting, protecting against, and prosecuting security incidents and fraudulent or
                illegal activity;
              </li>
              <li>Bug detection and error reporting;</li>
              <li>
                Customizing content that we or our service providers display on the Services (e.g.,
                contextual ads);
              </li>
              <li>
                Providing the Services (e.g., account servicing and maintenance, customer service,
                advertising and marketing, analytics, and communication about the Services);
              </li>
              <li>
                Improving our existing Services and developing new services (e.g., by conducting
                research to develop new products or features);
              </li>
              <li>
                Other uses that advance our commercial or economic interests, such as third party
                advertising and communicating with you about relevant offers from third party
                partners;
              </li>
              <li>Other uses about which we notify you.</li>
            </ul>
            <p>
              Examples of these types of uses are discussed throughout our privacy policy. We may
              also use the categories of Personal Information for compliance with applicable laws
              and regulations, and we may combine the information we collect (“aggregate”) or remove
              pieces of information (“de-identify”) to limit or prevent identification of any
              particular user or device.
            </p>
            <p>
              Except as set forth herein, unless you have provided consent, TDS will not (a) sell,
              rent or lease your Personal Information to third parties, and (b) disclose your
              Personal Information to third parties for their own marketing purposes.
            </p>

            <h5>Categories of personal information we disclose for business purposes</h5>
            <p>
              TDS may disclose the following categories of information about you or your use of the
              Site for business purposes (as defined by applicable law) or as required by applicable
              law:
            </p>
            <ul>
              <li>identifiers (such as name, address, email address);</li>
              <li>
                commercial information (such as transaction data and wager information); financial
                data (such as credit card information); internet or other network or device activity
                (such as browsing history or Site usage);
              </li>
              <li>
                general geolocation information (e.g., your city and state based on IP address or
                precise location, with your consent);
              </li>
              <li>
                professional or employment related data; audio or visual information (such as call
                recordings if you do not opt out);
              </li>
              <li>potentially protected classifications (such as gender);</li>
              <li>
                physical characteristics or description (e.g., if you voluntarily submit a photo);
                and
              </li>
              <li>other information that identifies or can be reasonably associated with you.</li>
            </ul>

            <h5>Sale of Personal Information</h5>
            <p>
              California residents may opt out of the “sale” of their personal information. Under
              the CCPA, sale is broadly defined such that it may include allowing third parties to
              collect or receive certain information, such as cookies, IP address, and/or browsing
              behavior, to deliver targeted advertising on the Services or other services.
              Advertising, including targeted advertising, enables us to provide you certain content
              for free and allows us to provide you offers relevant to you.
            </p>
            <p>
              Depending on what Services you use, we may provide the following categories of
              personal information to third parties for these purposes:
            </p>
            <ul>
              <li>
                For online targeted advertising purposes: demographic and statistical information,
                user-generated content, device information and identifiers, connection and usage
                data, geolocation, and social media information.
              </li>
              <li>
                For sharing with third parties to send you relevant offers and promotions and
                opportunities: contact and registration information; demographic and statistical
                information, commercial data (such as transaction data and wager information),
                employment and education data, user-generated content, and geolocation.
              </li>
            </ul>
            <p>
              If you would like to opt out of TDS’ use of your information for such purposes that
              are considered a “sale” under California law, you may do so by submitting a sale
              opt-out request by emailing us at 
              <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>. Please note that
              we do not knowingly sell the personal information of minors under 16 years of age
              without legally required affirmative authorization.
            </p>

            <h5>Contact Us</h5>
            <p>
              If you have any questions, or complaints, regarding the collection or use of your
              personal information or the content of this policy, or if you wish to withdraw your
              consent to us using your data, please e-mail us at 
              <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>. Back-up data of
              personal information will only be retained as long as it is necessary for data
              security purposes and will not be retained indefinitely.
            </p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
