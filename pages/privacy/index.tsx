import Head from 'next/head';
import Link from 'next/link';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function Privacy({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>TheDailyStakes - Privacy</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={`${styles.content} ${styles.privacy}`}>
            <h3>Privacy Policy</h3>
            <h4>THE DAILY STAKES INC.</h4>

            <h5>Privacy Policy</h5>
            <p>
              This Privacy Policy (the <b>“Privacy Policy”</b>) describes the information, data
              collection, and other privacy practices for the sites owned or operated by us as The
              Daily Stakes Inc. (<b>“TDS”</b>), including, but not limited to, the TDS website
              currently located at <a href="/">www.thedailystakes.com</a> (the <b>“Site”</b>). This
              Privacy Policy addresses, without limitation, what type of information is gathered and
              tracked, how the information is used, and with whom the information is shared. This
              Privacy Policy applies to all of your interactions with the TDS, including but not
              limited to when you purchase products or services, sign up for a newsletter or provide
              information to TDS at a trade show or other event. By visiting our Site or submitting
              your Personal Information (as defined below) to us by any means, you are thereby
              providing your express consent to our collection, use and disclosure of your Personal
              Information as described in this Privacy Policy. If you do not agree to the terms of
              this Privacy Policy, please exit our Site immediately and do not provide Personal
              Information to us.
            </p>

            <h5>What Information We Collect:</h5>
            <p>
              This Privacy Policy applies to all information collected by or submitted to TDS and
              third parties acting on its behalf. “Personal Information” is data that reasonably can
              be used to identify, relate to, or describe an individual, such as your name, e-mail
              address, physical address, phone number(s), and credit card information. You do not
              need to provide us Personal Information to simply browse our Site. However, we may
              collect certain Personal Information and information about your activities while
              browsing our Site, as described below.
            </p>

            <h5>Information Collected Directly From You:</h5>
            <p>
              When you visit and/or use our Site, we may collect information from you, including but
              not limited to, the following:
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
            <p>
              TDS may also collect Personal Information from individuals (with their consent) at
              conventions, trade shows and expositions.
            </p>

            <h5>Information Collected Automatically:</h5>
            <p>
              As you use and access our Site, we and our service providers (which are third party
              companies that work on our behalf to provide and enhance the Site) may use a variety
              of technologies to automatically collect information, including but not limited to:
            </p>

            <ul>
              <li>
                <b>Usage Information.</b> Please be aware that our Site collects usage data, such as
                the source address from which a page request originates (i.e., your IP address,
                domain name, type of computer), date and time of the page request, the referring web
                site (if any), and other parameters in the URL (e.g., search criteria). We use this
                data, for instance, to better understand our Site usage in the aggregate so that we
                know what areas of our Site users prefer (e.g., based on the number of visits to
                those areas). This information is stored in log files and is used for aggregated and
                statistical reporting. It is not attributed to you as an individual (i.e., log files
                are not associated with any particular user, computer, or browser).
              </li>
              <li>
                <b>Location Information.</b> We collect and process general information about the
                location of the device from which you are accessing the Site (e.g., approximate
                geographic location inferred from an IP address).
              </li>
              <li>
                <b>Cookies and Browser Information.</b> TDS uses cookies for a variety of purposes.
                A cookie is a name for tokens of information that our Site may provide to your
                browser while you are at the Site. Cookies are stored on your device’s hard drive
                and, once placed there, the cookie will remain until you remove it. We use cookies
                for a variety of purposes, including but not limited to (a) helping us keep track of
                the items that you place in your shopping cart; (b) helping us to better understand
                our Site usage in the aggregate so that we know what areas of the Site users prefer;
                (c) to collect information that will help us customize content specific to your
                interests and make your navigation of our Site easier during subsequent visits and
                (d) to customize affiliate content to your preferences and suggest third-party
                partners you may be interested in visiting according to your specific use of the
                Site. We also use cookies when you register for our online groups to authenticate
                you and provide you access to those areas of the Site and to simplify your data
                entry for some of our online forms. We may also use temporary or “session” cookies
                to help you learn more about and/or order our services. If you simply want to
                browse, you do not have to accept cookies from the Site. Should you decide, however,
                that you would like to register and login to special areas of the Site and you have
                modified your browser settings not to accept cookies, you will need to re-set your
                browser to accept the cookies that we send it. Otherwise, you may not be able to
                participate in certain areas of the Site. Most browsers are defaulted to accept and
                maintain cookies.
              </li>
              <li>
                <b>Web Beacons.</b> Web beacons (also known as “web bugs”) are small strings of code
                that provide a method of delivering a graphic image on a web page or in an e-mail
                message for the purpose of transferring data. We may use web beacons (or clear GIFs)
                on our Site or include them in the e-mail messages we send you for many purposes,
                including site traffic reporting, unique visitor counts, advertising e-mail auditing
                and reporting, and personalization. Information gathered through web beacons may be
                linked to your Personal Information.
              </li>
              <li>
                <b>IP Addresses and Log Files.</b> An Internet Protocol (“IP”) address is a number
                assigned to each computer on a network to identify your computer every time you log
                on to the Internet. We may keep track of IP addresses to troubleshoot technical
                concerns and to maintain the safety and security of our Site, such as by reviewing
                your IP address in combination with your Personal Information for credit fraud
                protection and risk reduction. In addition, we may use IP addresses to analyze
                trends, administer this Site, track traffic patterns, and gather demographic
                information for aggregate use.
              </li>
            </ul>

            <h5>Use of Personal Information</h5>
            <p>
              TDS collects and uses Personal Information to operate and improve its Site and deliver
              the services or carry out the transactions you have requested. These uses may include
              providing you with more effective customer service; making the Site or services easier
              to use by eliminating the need for you to repeatedly enter the same information;
              performing research and analysis aimed at improving our products, services and
              technologies; and displaying content and advertising that are customized to your
              interests and preferences. Specific circumstances may include when:
            </p>
            <ul>
              <li>
                you make purchases of products or services. If you request something from the Site
                (for example, a product or service, a callback, or specific marketing materials), we
                will use the information you provide to fulfill your request;
              </li>
              <li>you request support for TDS products or services;</li>
              <li>you create a user account (e.g., login user name and password) on the Site;</li>
              <li>you request information or materials (e.g., whitepapers or newsletters);</li>
              <li>
                you participate in surveys and evaluations. As part of a transaction, we may contact
                you as part of our customer satisfaction surveys or for market research purposes;
              </li>
              <li>
                you participate in promotions, contests or giveaways, which we may offer from time
                to time;
              </li>
              <li>
                physical characteristics or description (e.g., if you voluntarily submit a photo to
                your login page)
              </li>
              <li>you apply for a job, or submit your resume to TDS; or</li>
              <li>you submit questions or comments to us.</li>
            </ul>
            <p>
              We also use your Personal Information to communicate with you. We may elect at our
              discretion, but are under no obligation to, send certain necessary service
              communications such as welcome letters, billing reminders, information on technical
              service issues, and security announcements. Some of TDS’ services may send periodic
              member letters that are considered part of the service. We may also contact you to
              inform you of other products or services available from TDS and its affiliates.
              Personal Information collected on the Site and services may be stored and processed in
              Canada and the United States, and by using the Site, product or service, you consent
              to any such transfer of information. We may anonymize or aggregate Personal
              Information and share it with third parties for any purpose, including to better
              understand users’ activity on our Site and provide services to our visitors.
            </p>

            <h5>Sharing With Third Parties:</h5>
            <p>We may disclose and/or share your information under the following circumstances:</p>
            <ul>
              <li>
                <b>Affiliates and Subsidiaries.</b> We may share the information we collect within
                TDS with third parties.
              </li>
              <li>
                <b>Service Providers.</b> We may provide access to or share your information with
                select entities that use the information only to perform services on our behalf.
                These service providers provide a variety of services to us, including without
                limitation, processing and delivery of mailings, providing customer support, hosting
                websites, processing transactions, performing statistical analysis of our services,
                administering of promotions, sweepstakes, surveys, providing marketing assistance or
                similar such services, data storage, security, fraud prevention, and other services.
                These companies will be permitted to obtain only the Personal Information they need
                to deliver the service, are required to maintain the confidentiality of the Personal
                Information, and are prohibited from using it for any other purpose.
              </li>
              <li>
                <b>Business Partners.</b> Some services of TDS may be co-branded and offered in
                conjunction with another company. If you register for or use such services, both TDS
                and the other company may receive information collected as part of the co-branded
                services.
              </li>
              <li>
                <b>Direct Marketing.</b> We may share the information with third party partners to
                provide you with information, including marketing, about services that we think you
                might want and to promote TDS’ products and services to you.
              </li>
              <li>
                <b>Business Transactions.</b> We may disclose your Personal Information in
                connection with the evaluation of or entering into a corporate transaction where all
                or a portion of our business or assets (including our associated customer lists
                containing your Personal Information) change ownership, are sold, or are
                transferred. Such a transaction would include a bankruptcy proceeding. If we
                purchase a business, the Personal Information received with that business will be
                treated in accordance with our Privacy Policy in effect at that time, so long as it
                is practicable and permissible to do so.
              </li>
              <li>
                <b>Third Parties for Legal Purposes.</b> From time to time, we may use your Personal
                Information: (a) if we need to respond to valid legal process, including, but not
                limited to, a search warrant, subpoena, or court order, and any other instance when
                we believe we are required to do so by law; or (b) if we deem it necessary to
                disclose Personal Information, in our sole discretion, to comply with any applicable
                law, regulation, legal process or governmental request, or to protect our rights or
                interests, including to enforce our Terms of Service, this Privacy Policy, or other
                contracts with you, including investigation of potential violations of those
                agreements. We may also use or disclose Personal Information to respond to claims
                that any content violates the rights of third parties; and/or to protect our rights,
                property or personal safety, or that of our agents and affiliates, our users and/or
                the public. This includes exchanging information with other companies and
                organizations for information security, fraud protection, spam/malware prevention,
                and similar purposes.
              </li>
              <li>
                <b>Online Advertising and Direct Marketing.</b> We may work with third parties that
                collect and use information about your website and mobile app usage over time and
                across our and non-affiliated websites and mobile apps including on different
                devices and browsers. These partners may use cookies, web beacons, pixels, and other
                similar technology to collect this information, and use it to infer your interests
                and deliver relevant advertising to your browser or device, and browsers or devices
                associated with it.. You may opt out of Google’s use of cookies for behavioral
                advertising by visiting the Google advertising opt-out page. We do not control these
                opt-out links or whether any particular company chooses to participate in these
                opt-out programs. We are not responsible for any choices you make using these
                mechanisms or the continued availability or accuracy of these mechanisms.
              </li>
            </ul>
            <p>
              When you exercise choice through these tools, you will still receive advertising but
              that advertising may be less relevant to you. After you make your choices, data will
              no longer be collected from your browser or device for interest-based advertising on
              that browser or device, or associated browsers or devices. Additionally, data from
              those associated browsers and devices will not be used for interest-based advertising
              on the browser or device for which you made your choices. Data may still be collected
              for other purposes, such as analytics, reporting, and research. If you delete your
              cookies, reset your mobile identifier, or use multiple browsers or devices, you will
              need to register your opt-out choices again.
            </p>

            <h5>Website Analytics and Do-Not-Track:</h5>
            <ul>
              <li>
                <b>Website Analytics.</b> We may use third-party web analytics services on our Site
                to collect and analyze usage information through cookies and similar tools; engage
                in auditing, research, or reporting; and provide certain features to you. To prevent
                Google Analytics from using your information for analytics, you may install the
                Google Analytics Opt-out Browser Add-on by clicking{' '}
                <a href="https://tools.google.com/dlpage/gaoptout">here</a>.
              </li>
              <li>
                <b>Notice Concerning Do Not Track.</b> Do Not Track (“DNT”) is a privacy preference
                that users can set in certain web browsers. We are committed to providing you with
                meaningful choices about the information collected on our Site for third party
                purposes. However, we do not currently recognize or respond to browser-initiated DNT
                signals. To learn more about Do Not Track, you can do so 
                <a href="https://allaboutdnt.com/">here</a>.
              </li>
            </ul>

            <h5>Unaffiliated Third Parties on the Site:</h5>
            <p>
              If you voluntarily disclose information in an e-mail or other communication with third
              parties found on the Site or in other materials, that information, along with any
              other information disclosed in your communication, can be collected and correlated and
              used by such third parties and may result in you receiving unsolicited messages from
              other persons. Such collection, correlation, use and messages are beyond our control.
              We do not warrant specific third parties or their goods or services, regardless of
              whether such third parties offer goods or services on the Site from time to time. Any
              relationship between you and such third parties will be governed exclusively by the
              terms offered by the third party and agreed to by you. If you provide these third
              parties with any Personal Information or other information, their use of such
              information will be subject to their privacy policies, if any, and will not be
              governed by this Privacy Policy. In addition, if you accept third-party goods or
              services advertised on the Site, a third party may be able to determine that you have
              a relationship with us (e.g., if the offer is made only through the Site).
            </p>

            <h5>Your Choices:</h5>
            <p>
              TDS provides a number of ways for you to “opt-out” of receiving additional information
              from us or having us provide your Personal Information to our partners. We may offer
              you these choices at the time you give us your information.
            </p>
            <p>
              If you do not wish to continue receiving certain marketing materials (e.g., email
              messages), you can opt-out of receiving these materials by following the unsubscribe
              instructions provided in the materials. This option does not apply to communications
              primarily for the purpose of administering orders, contracts, support, product safety
              warnings, software updates, or other administrative and transactional notices.
            </p>
            <p>
              For additional information about our privacy practices and additional rights you may
              have please click on the appropriate link for your jurisdiction:
              <br />
              <h6>
                <Link href="/privacy/california">
                  <a>Privacy Notice for California Visitors</a>
                </Link>
              </h6>
              <h6>
                <Link href="/privacy/nevada">
                  <a>Privacy Notice for Nevada Visitors</a>
                </Link>
              </h6>
              <h6>
                <Link href="/privacy/australia">
                  <a>Privacy Notice for Australian Visitors</a>
                </Link>
              </h6>
              <h6>
                <Link href="/privacy/canada">
                  <a>Privacy Notice for Canadian Visitors</a>
                </Link>
              </h6>
              <h6>
                <Link href="/privacy/eu">
                  <a>Privacy Notice for The European Union</a>
                </Link>
              </h6>
            </p>

            <h5>How to Update Your Information:</h5>
            <ul>
              <li>
                Email Newsletters: Should your email address change, you may manage your
                subscription by unsubscribing to our newsletter and re-subscribing with your new
                email address.
              </li>
              <li>
                Specialized Areas: Specialized areas of our Site that require you to register may
                identify, at the point of collection, the ways available for you to update your
                information.
              </li>
              <li>
                Generally: At any time, you may update your information by e-mailing us at 
                <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>
              </li>
            </ul>

            <h5>Safeguarding Your Personal Information:</h5>
            <p>
              We recognize industry standards and employ security safeguards designed to protect
              your Personal Information from unauthorized access and misuse. We use the most
              accurate and current information you provide in order to process your request.
            </p>
            <p>
              Unfortunately, the transmission of information via the Internet is not completely
              secure. Although we do our best to protect your information, we cannot guarantee the
              security of any information you transmit to the Site. Any transmission of information,
              including Personal Information, is at your own risk. We are not responsible for
              circumvention of any privacy settings or security measures contained on this Site.
            </p>
            <p>
              If a password is used to help protect your accounts and Personal Information, it is
              your responsibility to keep your password confidential. Do not share this information
              with anyone. If you are sharing a computer with anyone or using a public computer, you
              should always log out before leaving a site or service to protect access to your
              information from subsequent users.
            </p>

            <h5>Links to Other Sites:</h5>
            <p>
              TDS’ Site often provides links to third-party websites, such as those of our business
              partners and online advertisers. You should review their privacy policies to learn
              more about what, why, and how they collect and use Personal Information. Please be
              aware that these websites are not under our control, and we have no responsibility for
              the privacy practices of such other websites. This Privacy Policy applies solely to
              information collected by this Site. We make no guarantees about the accuracy,
              currency, content or quality of the information provided by such third-party sites,
              and we assume no responsibility for unintended, objectionable, inaccurate, misleading,
              or unlawful content that may reside on those sites. For avoidance of doubt, if we
              provide links to social media platforms, such as Facebook, Twitter or Tik Tok, and you
              choose to visit those websites through our links, please note that the information you
              post, transmit or otherwise make available on those websites may be viewed by the
              general public. We do not control user-posted content on social media homepages and
              are not responsible for any third-party use of your information that you have posted,
              transmitted or otherwise made available there.
            </p>

            <h5>For Questions or Concerns:</h5>
            <p>
              If you have questions or concerns regarding this Privacy Policy, please e-mail us at 
              <a href="mailto:info@thedailystakes.com">info@thedailystakes.com</a>.
            </p>

            <h5>Changes to the Privacy Policy</h5>
            <p>
              This Privacy Policy is incorporated into our Terms and Conditions. TDS reserves the
              right to change this Privacy Policy from time to time, consistent with applicable law.
              If we do make material changes to this Privacy Policy, the revised Privacy Policy will
              be posted on this Site, and we will post a notification of such changes on the Site.
              Such changes, whether in the form of modifications, additions, or deletions, shall be
              effective when specified in the relevant notification or, if the change is immaterial,
              immediately upon appearing on this Site. Any use by you of this Site after such
              changes shall conclusively be deemed to be your acceptance of such revisions. We
              encourage you to review this Privacy Policy periodically to be informed of any such
              revisions.
            </p>
            <p>
              To the extent there is a conflict between this Privacy Policy and our Terms and
              Conditions, the Terms and Conditions shall supersede and control, save and except with
              all matters related to your Personal Information
            </p>

            <h5>NOTICE TO CHILDREN UNDER THE AGE OF 18 AND THEIR PARENTS OR LEGAL GUARDIANS:</h5>
            <p>
              THE SITE IS INTENDED FOR ADULTS. WE DO NOT KNOWINGLY OR INTENTIONALLY COLLECT PERSONAL
              INFORMATION FROM ANYONE UNDER THE AGE OF MAJORITY, WHETHER 18 OR 21. IF YOU ARE UNDER
              THE AGE OF MAJORITY, WHETHER 18 OR 21, PLEASE DO NOT PROVIDE ANY PERSONAL INFORMATION
              TO THEDAILYSTAKES. IF YOU KNOW OF ANYONE UNDER THE AGE OF MAJORITY, WHETHER 18 OR 21
              WHO HAS PROVIDED US WITH INFORMATION, PLEASE CONTACT US IMMEDIATELY AND WE WILL REMOVE
              THE INFORMATION. BY USING THIS SITE, YOU REPRESENT THAT YOU ARE AT LEAST 18 YEARS OF
              AGE.
            </p>
            <p>
              <em>This Privacy Policy was last updated on March 8, 2021.</em>
            </p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
