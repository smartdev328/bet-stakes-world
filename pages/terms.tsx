import Head from 'next/head';
import Link from 'next/link';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function Terms({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Terms</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={`${styles.content} ${styles.privacy}`}>
            <h3>Terms & Conditions</h3>
            <h4>THE DAILY STAKES INC.</h4>
            <h5>Terms and Conditions of Use</h5>
            <p>
              These Terms and Conditions of Use (the <b>“Terms of Use”</b>) apply to all associated
              sites owned or operated by the The Daily Stakes Inc. (“hereinafter referred to as{' '}
              <b>“TDS”</b>), its subsidiaries and affiliates including, but not limited to, TDS’
              website currently located at{' '}
              <Link href="https://www.thedailystakes.com">
                <a>www.thedailystakes.com</a>
              </Link>{' '}
              (hereinafter collectively referred to as the <strong>“Site”</strong>). It is important
              that you read and understand these policies as they apply to you and the particular
              country, state, or jurisdiction where you reside. It is important for you to
              understand these terms and conditions before you access the Site, the content
              contained therein and/or using the services provided by TDS. If you do not agree to
              the terms and conditions regarding the use of the website and/or the services
              provided, please do not use the Site, the services or the content. You also may be
              subject to additional terms and conditions that may apply when you use affiliate
              services, third-party content or third-party software.
            </p>
            <p>
              <strong>
                YOU ACKNOWLEDGE AND AGREE THAT BY BROWSING OR USING THE CONTENT, SERVICES AND TOOLS
                OFFERED BY THE SITE, YOU HAVE AGREED, WITHOUT LIMITATION OR QUALIFICATION, TO BE
                BOUND BY THESE TERMS OF USE AND ANY ADDITIONAL TERMS THAT MAY APPLY. IF YOU DO NOT
                AGREE WITH THESE TERMS OF USE, PLEASE DO NOT USE THIS SITE.
              </strong>
            </p>
            <p>
              TDS reserves the right, at its sole discretion, to change, modify, add or remove
              portions of these Terms of Use, at any time, consistent with applicable law. It is
              your responsibility to check these Terms of Use periodically for changes prior to
              making use of any of TDS’ sites, affiliated sites, services or otherwise. TDS will
              post a notification on this Site or otherwise provide notice to you if these Terms of
              Use materially change. Such changes, whether in the form of modifications, additions,
              or deletions, shall become effective when specified in the relevant notification. If
              you do not agree to the changes, please do not continue to use this Site after the
              date they become effective. Your continued use of the Site following the posting of
              changes will mean that you accept and agree to the changes. As long as you comply with
              these Terms of Use, TDS grants you a personal, non-exclusive, non-transferable,
              limited privilege to enter and use the Site. As these provisions may change from time
              to time, we suggest you periodically review these terms and conditions.
            </p>

            <h5>1. Content & Intellectual Property</h5>
            <p>
              All content or services provided by TDS, including but not limited to, sports betting
              recommendations, proposed daily fantasy lineups, patterns, strategies, platforms,
              processes,  historical recommendation performance, lines, odds, betting systems,
              fantasy trends, picks, articles, texts, data, hidden text within source code,
              graphics, layouts, user interfaces, visual interfaces, photographs, videos,
              trademarks, logos, music, sounds, and computer code or other content (collectively
              hereinafter the “Content”), including but not limited to the design, structure,
              selection, coordination, expression, “look and feel” and arrangement of such Content,
              contained on the Site is owned by TDS or its licensors, and is protected by Canadian,
              U.S. and international intellectual property and proprietary rights, the whole being
              the sole and exclusive property of TDS.
            </p>
            <p>
              You must comply with all such laws and applicable copyright, trademark or other legal
              notices or restrictions. You shall not remove or alter any copyright, trademark, or
              other legal notices marked on the Content. As between you and TDS, TDS will retain all
              right, title, and interest in and to the Content. No transfer of ownership to any
              portion of the Content shall be made as a result of any access you are granted. Except
              as specifically provided below, we reserve all rights to the Content.
            </p>
            <p>
              You are only permitted to access and view the Content for personal, non-commercial
              purposes in accordance with the Terms of Use and may not build a business or other
              enterprise utilizing any of the Content, whether for profit or not. You may not copy,
              repurpose, or otherwise utilize the content for any purposes whatsoever, such Content
              being exclusive property of TDS.
            </p>
            <p>
              All trademarks appearing on this Site are the property of their respective owners,
              including, in some instances, TDS and/or its partner companies. Nothing contained on
              this Site should be understood as granting you a license to use any of the copyrights,
              trademarks, service marks, or logos owned by TDS or by any third party.
            </p>
            <p>
              When accessing this Site, you agree to obey the law and to respect the intellectual
              property rights of TDS and others. You agree that you shall be solely responsible for
              any violations of any applicable laws and for any infringement of third-party rights
              caused by any Feedback (as defined below), User Content (as defined below), and PII
              (as defined below) that you provide or transmit to TDS.
            </p>
            <p>
              All materials contained or distributed in this website (the <b>“Materials”</b>) are
              owned by TDS or its licensors. Except for downloading one copy of the Materials on any
              single computer for your personal, non-commercial home use, you must not reproduce,
              modify, copy, publish, transmit, prepare derivative works based upon, distribute,
              perform or display the Materials without first obtaining the written permission of TDS
              and, if applicable, any other copyright owner. You acknowledge that you do not acquire
              any ownership rights by downloading or printing the Materials. Materials may not be
              used in any unauthorized manner.
            </p>

            <h5>2. Your Use of the Site; Restrictions</h5>
            <p>
              You may browse this Site and all associated content solely for your personal use and
              enjoyment. Except as expressly provided in these Terms of Use, no part of the Site may
              be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded,
              translated, transmitted, sold, distributed, or otherwise exploited in any way
              (including, but not limited to, by “mirroring”) to any other computer, server, website
              or other medium for publication or distribution or for any commercial enterprise,
              without TDS’ express prior written consent.
            </p>
            <p>
              You may not use any “deep-link”, “page-scrape”, “robot”, “spider” or other automatic
              device, program, algorithm or methodology, or any similar or equivalent manual
              process, to access, acquire, copy or monitor any portion of the Site, or in any way
              reproduce or circumvent the navigational structure or presentation of the Site, to
              obtain or attempt to obtain any materials, documents or information through any means
              not purposely made available to you through the Site. You may not attempt to gain
              unauthorized access to any portion or feature of the Site, or any other systems or
              networks connected to the Site or to any server of TDS, or to any of the services
              offered on or through the Site, by hacking, password “mining” or any other
              illegitimate means.
            </p>
            <p>
              You may not probe, scan or test the vulnerability of the Site or any network connected
              to the Site, nor breach the security or authentication measures on the Site or any
              network connected to the Site. You may not modify, reverse engineer, decompile,
              disassemble, reduce or attempt to reduce to a human-perceivable form any of the source
              code used in providing this Site, trace or seek to trace any information on any other
              user of or visitor to the Site, or any other customer of TDS, including any TDS
              account not owned by you, to its source, or exploit the Site or any service or
              information made available or offered by or through the Site, in any way where the
              purpose is to reveal any information, including but not limited to PII , other than
              your own information, as provided for by the Site.
            </p>
            <p>
              Accounts may not be shared and may only be used by one individual per account. You are
              responsible for taking reasonable steps to maintain the confidentiality of information
              related to your account, including your username and password, and you are responsible
              for all activities under your account that you can reasonably control, the whole to
              the complete exoneration of TDS.  You agree to promptly notify us of any unauthorized
              use of your username, password or other account information, or of any other breach of
              security that you become aware of involving your account or the services offered by
              TDS via the Site.
            </p>
            <p>
              You agree that you will not take any action that imposes an unreasonable or
              disproportionately large load on the infrastructure of the Site or TDS’ systems or
              networks, or any systems or networks connected to the Site or to TDS.
            </p>
            <p>
              You agree not to use any device, software or routine to interfere or attempt to
              interfere with the proper working of the Site or any transaction being conducted on
              the Site, or with any other person’s use of the Site, including, but not limited to,
              by interfering or attempting to interfere with service to any visitor, host, or
              network, such as by means of submitting a virus or any other harmful component to this
              Site, or by overloading, “flooding,” “spamming,” “mail bombing,” or “crashing” this
              Site. In addition, you agree not to use this Site to send unsolicited e-mail,
              including, without limitation, promotions, or advertisements for products or services.
              You also agree not to frame or utilize framing techniques to enclose any aspect of
              this Site, such as any trademark, logo, or other proprietary information (including,
              but not limited to, images, text, page layout, or form), or to use any metatags or any
              other “hidden text” utilizing TDS’ name or trademarks without TDS’ express written
              consent.
            </p>
            <p>
              You may not forge headers or otherwise manipulate identifiers in order to disguise the
              origin of any message or transmittal you send to TDS on or through the Site or any
              service offered on or through the Site. You may not pretend that you are, or that you
              represent, someone else, or impersonate any other individual or entity.
            </p>
            <p>
              You may not use the Site, including, but not limited to, any Content or Materials
              contained therein, for any purpose that is unlawful or prohibited by these Terms of
              Use, or to solicit the performance of any illegal activity or other activity which
              infringes the rights of TDS or others. Without limiting the generality of any terms or
              conditions set forth herein, in using the Site, you may not transmit or solicit: (a)
              any unlawful, threatening, abusive, libelous, defamatory, obscene, vulgar,
              pornographic, profane or indecent information of any kind, including images and
              language; (b) any message that constitutes, or encourages or incites conduct that
              would constitute, a criminal offense or gives rise to civil liability; or (c) any
              information, software or other material which violates or infringes upon the rights of
              others, including material which is an invasion of privacy or publicity rights or
              which is protected by copyright, trademark or other proprietary right, or derivative
              works with respect thereto, without first obtaining permission from the owner or right
              holder. Any violation of TDS’s system or network security may subject you to civil
              and/or criminal liability.
            </p>

            <h5>3. Feedback & User Content</h5>
            <p>
              Any feedback, suggestions, questions, comments, ideas, notes, concepts, and other
              similar information relating to the Site or TDS that you provide to TDS (but excluding
              your PII) (collectively the <b>“Feedback”</b>) is deemed to be TDS’ proprietary
              information. TDS may use such Feedback for any purpose, including, but not limited to,
              improvement and modification of the Site, and TDS shall own all rights, title and
              interest in and to the Feedback and such improvements and modifications.
            </p>
            <p>
              This Site may contain message boards, profiles, and other interactive features that
              allow users to post, submit, publish, display, or transmit content and materials,
              including, but not limited to, photos, videos, other creative transmissions (
              <b>“User Content”</b>). All User Content must comply with the standards set out in
              these Terms of Use. By providing any User Content on this Site, you hereby grant to
              TDS and its affiliates, and each of their respective licensees, successors, and
              assigns a non-exclusive, irrevocable, unrestricted, perpetual, transferable, worldwide
              and royalty-free and fully paid-up right and license to use, reproduce, modify,
              perform, display, distribute, and otherwise exploit the User Content for any purpose.
              You represent and warrant that you own or control all rights in and to the User
              Content and have the right to grant the license granted above to TDS and its
              affiliates, and each of their respective licensees, successors, and assigns. TDS is
              not responsible or liable to any third party for the contents or accuracy of any User
              Content posted by you or any other user of the Site.
            </p>
            <p>
              The terms “Feedback” and “User Content” do not include any personally identifiable
              information, such as your name, e-mail address, physical address, phone number(s), and
              credit card information (collectively referred to as <b>“PII”</b>) that you may
              provide to TDS, and which is subject to the privacy standards set forth in TDS’s
              Privacy Policy -please refer to same for further information. To access parts of this
              Site or some of the resources it offers, you may be asked to provide certain
              information, including, but not limited to, PII. It is a condition of your use of this
              Site that all the information you provide on this Site, including, but not limited to,
              PII, is correct, current and complete.
            </p>

            <h5>4. Purchases; Other Terms and Conditions</h5>
            <p>
              When you purchase a digital product, the price will be made clear during the order
              process. You agree to pay the price that is stated at the time of your order, as well
              as any applicable taxes. You also agree to the billing frequency stated at the time of
              your order.
            </p>
            <p>
              Discount eligibility is determined at the time of the order. Discounts cannot be
              applied retroactively.
            </p>
            <p>All prices are in United States Dollars, unless otherwise stated.</p>
            <p>
              TDS reserves the right to change prices and fees at any time. We will notify you in
              advance if the regular rate of a product changes from what was stated at the time of
              your order. You will have the opportunity to accept the new price or cancel your
              subscription or purchase from that point forward.
            </p>
            <p>
              Applicable taxes may vary. We are not able to notify you in advance of changes in
              applicable taxes.
            </p>
            <p>
              If a stated price is determined by us in our sole discretion to be in error, we are
              not under any obligation to offer you the product at that price. We will notify you of
              the error and give you the opportunity to cancel your order and obtain a refund if
              payment has already been made.
            </p>
            <p>
              Your subscription may not include access to all areas of the digital product, and you
              may have to pay additional fees for full access. These additional charges will be
              clearly stated.
            </p>
            <p>
              When you use your digital product, you may incur other additional charges from third
              party service providers, such as telecommunications fees, data fees or service
              provider fees. You are responsible for paying any additional charges.
            </p>
            <p>
              Additional terms and conditions may apply to purchases of goods or services and to
              specific portions or features of the Site, including, but not limited to, contests,
              promotions or other similar features (as further described in Section 5 below), all of
              which terms are made a part of these Terms of Use by this reference. You agree to
              abide by such other terms and conditions, including where applicable representing that
              you are of sufficient legal age to use or participate in such service or feature. If
              there is a conflict between these Terms of Use and the terms posted for or applicable
              to a specific portion of the Site or for any service offered on or through the Site,
              the latter terms shall control with respect to your use of that portion of the Site or
              the specific service. TDS may make changes to any products or services offered on the
              Site, or to the applicable prices for any such products or services, at any time, in
              accordance with the notice procedures set forth above.
            </p>
            <p>
              You may cancel your TDS subscription at any time – however, there are no refunds for
              cancellation. Payments are non-refundable and there are no refunds or credits for
              partially used billing periods, subject to the{' '}
              <Link href="/refund-policy">
                <a>Cancellation and Refund Policy</a>
              </Link>
            </p>
            <p>
              You can cancel your subscription to TDS at any time, and you will continue to have
              access to the Site and the services you have purchased for the remainder of your
              applicable billing cycle. To cancel your subscription, go to the Settings Page in your
              account on our website and follow the instructions for cancellation. If you cancel
              your subscription, your subscription will automatically end at the end of your current
              billing period.
            </p>
            <p>
              Your subscription to TDS’ services may begin with a free or discounted trial. The
              duration of the trial period of your subscription will be specified during checkout
              and is intended to allow first-time subscribers to try our services offered via the
              Site. Trials require at least one valid payment method associated with your account.
              We will charge the subscription fee for your next billing cycle to your payment method
              at the end of the trial period and your subscription will automatically start unless
              you cancel your subscription prior to the end of the trial period. To view the
              applicable subscription price and end date of your trial period, visit our website and
              click the Settings Page once logged in. Once a charge is made, there is no refund
              available and you will need to follow the cancellation process to avoid being charged
              at the completion of your current billing period.
            </p>
            <p>
              The introductory and/or discounted rate includes access to the respective membership
              level and automatically renews (see package details) at the normal membership rate
              unless canceled by the customer. It is the responsibility of the member to keep track
              of the account expiration date and cancel prior to renewal. Members can review their
              expiration date and/or cancel active memberships at any time by logging in and
              visiting the Settings Page.
            </p>
            <p>
              If you believe someone else has used your account or you are being charged for a
              product you do not have, please contact us at info@thedailystakes.com.
            </p>

            <h5>5. Promotions, Contests, and Sweepstakes</h5>
            <p>
              Notwithstanding the foregoing, ownership and use of all User Content, Feedback, and
              PII submitted in connection with a sweepstakes, contest, giveaway or other promotion
              (collectively hereinafter referred to as a <b>“Promotion”</b>), shall be subject to
              the applicable Promotion’s “Official Rules” or other terms of service. If you
              participate in a Promotion, such terms of service, may, for example, permit TDS to
              contact you to verify your eligibility, use your physical address for the purposes of
              prize fulfillment, share your PII with third parties providing services in connection
              with such Promotion or for purposes of prize fulfillment, and/or use other information
              submitted with your entry for future marketing, such as to notify you of a product or
              subsequent Promotion that we think may be of interest to you. If you no longer wish to
              receive information about products or Promotions, you may opt out of receiving further
              information by clicking on the “Unsubscribe” link included in such e-mails. Please
              also note that if you win a Promotion, some of your PII may be disclosed on a winners
              list as required by law. In the event that the awarding of any prizes to winners of
              Promotions is challenged by any legal authority or user of the Site or services
              offered thereby, TDS reserves the right in its sole discretion to determine whether or
              not to award or deny such prizes.  For clarity, TDS shall at all times retain the
              right to rescind, cancel, award, deny or otherwise dictate the treatment of any prizes
              or awards, the whole at TDS’ sole and unfettered discretion.
            </p>

            <h5>6. Privacy</h5>
            <p>
              TDS’s Privacy Policy applies to the use of this Site, and its terms are made a part of
              these Terms of Use by this reference. To view TDS’s Privacy Policy, click{' '}
              <Link href="/privacy">
                <a></a>
              </Link>
              here. Additionally, by using the Site, you acknowledge and agree that Internet
              transmissions are never completely private, encrypted or secure. You understand that
              any message or information you send to the Site may be read or intercepted by others,
              even if there is a special notice that a particular transmission (for example, credit
              card information) is encrypted.
            </p>

            <h5>7. Third-Party Content, Links and Services</h5>
            <p>
              The Site may display content or tools provided by third parties, links to third-party
              web pages, or both, including advertisements and solicitations to purchase products or
              services (collectively, <b>“Third-Party Content”</b>). In consideration for the
              convenience of TDS making this Third-Party Content available or accessible to you, you
              acknowledge that TDS has not reviewed all of the Third-Party Content and that TDS is
              not responsible or liable for any such Third-Party Content, including, but not limited
              to, the privacy practices of third parties offering such Third-Party Content; you must
              contact the third party directly for any remedies that may be available to you. Please
              be aware that access to any Third-Party Content does not constitute an endorsement by
              TDS or any of its subsidiaries or affiliates of any third parties or Third-Party
              Content. Likewise, TDS is not the seller of products purchased from third parties
              offering Third-Party Content and is in no way responsible for shipping their products.
              TDS may from time to time engage certain affiliates or other third parties to provide
              all or part of the services offered by TDS to you, and you hereby acknowledge and
              agree that such third-party participation is acceptable.
            </p>
            <p>
              If TDS provides links to social media platforms, such as Facebook, Twitter or Tik Tok,
              and you choose to visit those websites through TDS’s links, please note that the
              information you post, transmit, or otherwise make available on those websites may be
              viewed by the general public. TDS does not control User Content on social media
              homepages and is not responsible for any third-party use of your User Content that you
              have posted, transmitted, or otherwise made available there. You take complete
              responsibility of for such use of third-party sites to the entire exoneration of TDS.
            </p>

            <h5>8. Monitoring; Copyright Complaints</h5>
            <p>
              You agree that TDS has the right, but not the obligation, to monitor, edit, disclose,
              refuse to post, or remove at any time, for any reason in TDS’ sole discretion, any
              Materials and Content anywhere on this Site. Notwithstanding this right, TDS does not
              and cannot review all Materials, User Content, PII, and Feedback submitted to this
              Site. If notified, TDS may investigate an allegation that content transmitted to TDS
              is in violation of these Terms of Use, and TDS will determine whether to have the
              communication removed. However, TDS is under no obligation to remove content and
              assumes no responsibility or liability arising from or relating to any actions or
              content transmitted by or between you or any third party within or outside of this
              Site, including, but not limited to, any error, defamation, libel, slander, omission,
              falsehood, obscenity, pornography, profanity, danger, or inaccuracy contained therein.
            </p>
            <p>
              TDS may, in appropriate circumstances and at its sole discretion, terminate the access
              of users who infringe the copyrights of others. If you believe that your work has been
              copied and is accessible on this Site in a way that constitutes copyright
              infringement, you may notify TDS by providing the following information:
            </p>
            <ul>
              <li>
                a physical or electronic signature of the person authorized to act on behalf of the
                owner of an exclusive right that is allegedly infringed;
              </li>
              <li>
                identification of the copyrighted work claimed to have been infringed, or if
                multiple copyrighted works at this Site are covered by a single notification, a
                representative list of such works at this Site;
              </li>
              <li>
                identification of the material that is claimed to be infringing or to be the subject
                of infringing activity and that is to be removed or access to which is to be
                disabled, and information reasonably sufficient to permit TDS to locate the
                material;
              </li>
              <li>
                information reasonably sufficient to permit TDS to contact you, such as an address,
                telephone number, and if available, an e-mail address;
              </li>
              <li>
                a statement that you have a good faith belief that use of the material in the manner
                complained of is not authorized by you, your agent, or the law; and
              </li>
              <li>
                a statement that the information in the notification is accurate, and, under penalty
                of perjury, that you are authorized to act on behalf of the owner of an exclusive
                right that is allegedly infringed.
              </li>
            </ul>
            <p>
              Please send the communication to TDS by e-mail to:
              <br />
              &nbsp;&nbsp;E-mail: info@thedailystakes.com &nbsp;&nbsp;E-mail Subject: “TDS Copyright
              Request”
            </p>

            <h5>9. Disclaimers</h5>
            <p>
              TDS DOES NOT PROMISE THAT THE SITE OR ANY CONTENT, PRODUCT, SERVICE OR FEATURE OF THE
              SITE WILL BE AVAILABLE, ERROR-FREE, OR UNINTERRUPTED, OR THAT ANY DEFECTS WILL BE
              CORRECTED, OR THAT YOUR USE OF THE SITE WILL PROVIDE SPECIFIC RESULTS. THE SITE AND
              ITS CONTENT ARE DELIVERED ON AN “AS-IS” AND “AS-AVAILABLE” BASIS WITHOUT WARRANTIES OF
              ANY KIND. ALL INFORMATION PROVIDED ON THE SITE IS SUBJECT TO CHANGE WITHOUT NOTICE.
              TDS CANNOT ENSURE THAT THE SITE, INCLUDING, BUT NOT LIMITED TO, ANY FILES OR OTHER
              DATA YOU DOWNLOAD FROM THE SITE, WILL BE FREE OF VIRUSES OR CONTAMINATION OR
              DESTRUCTIVE FEATURES. TDS DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT
              NOT LIMITED TO, ANY WARRANTIES OF ACCURACY, NON-INFRINGEMENT, MERCHANTABILITY AND
              FITNESS FOR A PARTICULAR PURPOSE. TDS DISCLAIMS ANY AND ALL LIABILITY FOR THE ACTS,
              OMISSIONS AND CONDUCT OF ANY THIRD PARTIES IN CONNECTION WITH OR RELATED TO YOUR USE
              OF THE SITE AND/OR ANY SERVICES OF TDS. YOU ASSUME TOTAL RESPONSIBILITY FOR YOUR USE
              OF THE SITE AND ANY THIRD-PARTY CONTENT. YOUR SOLE REMEDY AGAINST TDS FOR
              DISSATISFACTION WITH THE SITE OR ANY CONTENT IS TO STOP USING THE SITE OR ANY SUCH
              CONTENT. THIS LIMITATION OF RELIEF IS A PART OF THE BARGAIN BETWEEN THE PARTIES.
            </p>
            <p>
              You understand that the Site contains information about sports, fantasy sports, and
              sports betting, but that this information and Content does not constitute “advice”,
              nor does it constitute any “recommendation” on whether or how to engage in daily
              fantasy or sports betting activities. TDS ACCEPTS NO LIABILITY OR RESPONSIBILITY
              WHATSOEVER FOR ANY LOSS OR DAMAGE OF ANY KIND ARISING OUT OF THE USE OF ANY OF THE
              SITE, INCLUDING, BUT NOT LIMITED TO, ANY CONTENT OR MATERIAL FOUND THEREIN, OR AS A
              RESULT OF BETTING RISKS OR FANTASY SPORTS RISKS. ANY SPORTS BETTING OR FANTASY SPORTS
              ACTIVITY IS INHERENTLY RISKY UNDERTAKEN AT YOUR OWN RISK.
            </p>
            <p>
              THE SERVICES PROVIDED BY TDS VIA THE SITE, THE CONTENT AND THE MATERIALS ARE INTENDED
              FOR EDUCATION PURPOSES EXCLUSIVELY, BUT IF YOU CHOOSE TO EXECUTE ANY BETTING OR
              TRADING SIGNALS AND UTILIZE THE SERVICES PROVIDED BY TDS VIA THE SITE, THE CONTENT OR
              THE MATERIALS WITH REAL MONEY IN A REAL ACCOUNT OR BET USING THE FOREGOING THEN YOU
              ASSUME FULL RESPONSIBILITY TO THE DECISIONS TO BUY AND SELL, PLACE WAGERS OR ASSUME
              RISK AS YOUR OWN DECISIONS AND ACCEPT FULL AND TOTAL RESPONSIBILITY TO THE OUTCOMES OF
              THESE DECISIONS INCLUDING BUT NOT LIMITED TO: VERIFYING TEST RESULTS, VERIFYING
              SYNCHRONIZATION OF DATA SIGNALS FROM MULTIPLE MARKETS/PROVIDERS, VERIFYING DATA WAS
              READILY AVAILABLE AT THE TIME OF ENTRIES, AND MORE. TDS TAKES NO RESPONSIBILITY FOR
              YOUR FINANCIAL GAIN OR LOSS STEMMING FROM, AMONG OTHER, YOUR USE OF THE SERVICES
              PROVIDED VIA THE SITE, THE CONTENT OR THE MATERIALS.
            </p>
            <p>
              ANY ADVICE OR OPINION PROVIDED BY TDS (OR ANY AFFILIATED PARTY OR ‘DBA’) IS MEANT TO
              BE IMPERSONAL AND IS NOT TAILORED TO ANY INDIVIDUAL. ANY ADVICE, SIGNALS OR PRODUCTS
              ARE UNIFORM AND DISTRIBUTED EQUALLY TO ALL PURCHASING PARTIES. TDS DOES NOT REPRESENT
              HAVING ANY LICENSES, APPROVALS, CERTIFICATIONS OR OTHERWISE PERMITTING SAME TO ASSERT
              TAILORED OR PERSONAL ADVICE OR SERVICES, SUBJECT TO ANY PROFESSIONAL ORDER OR
              OTHERWISE.
            </p>

            <h5>10. Applicable Law and Venue; Dispute Resolution</h5>
            <p>
              These Terms of Use shall be governed in all respects by the laws of the province of
              Quebec, Canada and the federal laws of Canada, as applicable. Unless resolved
              amicably, any and all disputes, controversies, or differences which may arise between
              the parties hereto, out of or in relation to or in connection with these Terms of Use,
              whether directly or indrectly, or the breach thereof, shall be solely and finally
              settled by binding arbitration. Such arbitration shall be held in Montreal, Quebec,
              and shall be before a single arbitrator of TDS&apos; choosing, at TDS&apos; sole
              discretion.
            </p>

            <h5>11. Member Behavior</h5>
            <p>
              You agree that in connection with your use of the Site, the services, and the Content
              provided by TDS, you as a client and/or visitor will not: a. upload, post, email or
              otherwise transmit any content that is unlawful, harmful, threatening, abusive,
              harassing, tortuous, defamatory, vulgar, obscene, libelous, invasive of anyone&apos;s
              privacy, hateful, or racially, ethnically or otherwise objectionable; b. harm or
              attempt to harm minors in any way; c. impersonate any person or entity or falsely
              state or otherwise misrepresent your affiliation with a person or entity; d. upload,
              post, email or otherwise transmit any content that you do not have a right to transmit
              under any law or under contractual or fiduciary relationships (such as inside
              information, proprietary and confidential information learned or disclosed as part of
              employment relationships or under nondisclosure agreements); e. upload, post, email or
              otherwise transmit any content that infringes any patent, trademark, trade secret,
              copyright or other intellectual property right of any party; f. upload, post, email or
              otherwise transmit any unsolicited or unauthorized advertising, promotional materials,
              &quot;junk mail,&quot; &quot;spam,&quot; &quot;chain letters,&quot; &quot;pyramid
              schemes,&quot; or any other form of solicitation; g. upload, post, email or otherwise
              transmit any material that contains software viruses or any other computer code, files
              or programs designed to interrupt, destroy or limit the functionality of any computer
              software or hardware or telecommunications equipment; h. interfere with or disrupt the
              website, the services, the content or servers or networks connected to the website,
              the services or the content, or disobey any requirements, procedures, policies or
              regulations of networks connected to the website, the services and/or the content; i.
              intentionally or unintentionally violate any applicable local, state, national or
              international law. j. reproduce, re-publish, download, post, transmit, distribute,
              copy, publicly display or otherwise use any content or any derivative works based on
              the website, services, content or the software, in whole or in part.
            </p>
            <p>
              THE SITE IS INTENDED FOR ADULTS AGES 18 AND OVER. USERS UNDER 18 YEARS OLD ARE
              PROHIBITED FROM USING THE SITE FOR ANY PURPOSE. BY USING THIS SITE, YOU REPRESENT THAT
              YOU ARE AT LEAST 18 YEARS OF AGE.
            </p>

            <h5>12. Limitation Of Liability</h5>
            <p>
              UNDER NO CIRCUMSTANCES ARE TDS, ITS OFFICERS, DIRECTORS, AFFILIATES, OR LICENSORS
              LIABLE TO YOU FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DIRECT,
              INCIDENTAL, INDIRECT, PUNITIVE, EXEMPLARY, RELIANCE, OR CONSEQUENTIAL, OR SPECIAL
              DAMAGES WHETHER OR NOT FORESEEN, LOST PROFITS, OR DAMAGES RESULTING FROM LOST DATA) ON
              ACCOUNT OF YOUR USE, MISUSE, OR RELIANCE ON THE INFORMATION AND SERVICES AVAILABLE ON
              THE SITE. THIS LIMITATION OF LIABILITY SHALL APPLY TO PREVENT RECOVERY OF DIRECT,
              INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES ARISING
              FROM ANY CLAIM RELATING TO THESE TERMS OF USE OR THE SUBJECT MATTER HEREOF, WHETHER
              SUCH CLAIM IS BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER
              LEGAL THEORY EVEN IF TDS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              The above limitation applies to your use, misuse, or reliance upon the Site,
              including, without limitation, damages you may incur because of Third-Party Content
              advertised on, or linked to the Site.
            </p>
            <p>
              TDS makes no warranty that (i) the service will meet your requirements, (ii) the
              service will be uninterrupted, timely, secure, or error–free, (iii) the service will
              be accurate or reliable, (iv) the quality of any products, services, information, or
              other material purchased or obtained by you through the service will meet your
              expectations, and (v) any errors in the software will be corrected in an expedient
              manner.
            </p>
            <p>
              Any material or content submitted to TDS, downloaded or otherwise obtained through the
              use of the service is done at your own discretion and risk and that you will be solely
              responsible for any damage to your computer system or loss of data that results from
              the submission or download of any such material. No advice or information, whether
              oral or written, obtained by you from TDS or through or from the service shall create
              any warranty not expressly stated in these terms
            </p>
            <p>
              Any cause of action or claim you may have with respect to this Site must be commenced
              within one (1) year after the claim or cause of action arises.
            </p>
            <p>
              Some jurisdictions do not allow the exclusion of certain warranties, the shortening of
              the applicable statute of limitations, or the limitation or exclusion of liability for
              incidental or consequential damages. Accordingly, in certain jurisdictions, some of
              the above limitations may not apply to you; all other provisions of these Terms of Use
              shall remain in full force and effect.
            </p>

            <h5>13. Indemnification</h5>
            <p>
              You hereby irrevocably agree to defend, indemnify, and hold harmless TDS and its
              affiliates and their officers, directors, employees, consultants, agents, licensors,
              and suppliers from and against any and all claims, losses, expenses, liabilities,
              settlements, litigation, damages, and/or costs (including, but not limited to, fees,
              costs and other expenses of attorneys and expert witnesses) arising out of or related
              to: (i) your use of the Site, including, but not limited to, any Materials or User
              Content, (ii) any violation of these Terms of Use or applicable law by you in
              connection with your use of the Site, including, but not limited to, any Materials or
              User Content, (iii) any actual or alleged infringement by you, or any person accessing
              the Site, including, but not limited to, any Materials or User Content, using your
              password or account identifier, of any intellectual property or privacy or other right
              of any third party, or (iv) any unauthorized use of password protected Materials or
              User Content utilizing your account information, whether or not known or authorized by
              you.
            </p>
            <p>
              TDS reserves the right, at its own expense, to assume the exclusive defense and
              control of any matter otherwise subject to indemnification by you at your expense, and
              you shall not in any event settle or otherwise dispose of any matter without TDS’s
              prior written consent.
            </p>
            <p>
              You agree to indemnify and hold TDS, and its subsidiaries, affiliates, officers,
              agents, co-branders or other partners, and employees, harmless from any claim or
              demand, including reasonable attorneys’ fees, made by any third party due to or
              arising out your use of the services provided by TDS via the Site, your connection to
              same, your violation of the Terms of Service, or your violation of any rights of
              another.
            </p>

            <h5>14. Rights to Terminate Use</h5>
            <p>
              Upon termination of your account for any reason, TDS will retain your data in
              accordance with its{' '}
              <Link href="/privacy">
                <a>Privacy Policy</a>
              </Link>
              . Even if your account is terminated, be aware that these Terms of Use, to the extent
              any provisions by their nature will survive any expiration or termination of these
              Terms of Use, shall so survive.
            </p>
            <p>
              To the extent that any part of this Site offers subscriptions to users, TDS reserves
              the right to cancel any such subscriptions at any time in its sole and absolute
              discretion, upon which time affected users shall be notified of such cancellation.
            </p>
            <p>
              You agree that TDS reserves the right, without prejudice to its other rights, to
              suspend or terminate your use of the Site at any time where TDS has determined, in its
              sole discretion that the use of the Site by you is, or was, in breach of these Terms
              of Use. ACCORDINGLY, IN ITS SOLE DISCRETION, IN ADDITION TO ANY OTHER RIGHTS OR
              REMEDIES AVAILABLE TO TDS AND WITHOUT ANY LIABILITY WHATSOEVER, TDS AT ANY TIME AND
              WITHOUT NOTICE MAY TERMINATE OR RESTRICT ACCESS YOUR ACCESS TO THE SITE AND/OR THE
              SERVICES.
            </p>
            <p>
              You also agree that any violation by you of these Terms of Use may constitute an
              unlawful and unfair business practice and cause irreparable harm to TDS, for which
              monetary damages would be inadequate, and you consent to TDS obtaining any injunctive
              or equitable relief that TDS deems necessary or appropriate in such circumstances.
              These remedies are in addition to any other remedies TDS may have at law or in equity.
            </p>

            <h5>15. Special Advice Related to Sports Wagering</h5>
            <p>
              If you intend to use the Service for any purpose related to gambling or wagering money
              or items of value on the outcome(s) of sports games or contests, you acknowledge that
              TDS provides no assurances whatsoever regarding the accuracy of the services, the Site
              or the Content or Materials, especially regarding the effectiveness of information
              included in the Service as applied to sports wagering and daily fantasy wagering. You
              acknowledge the significant risk for personal loss that may result from basing
              wagering decisions on information included in the services or the Site, and you agree
              that you will not interpret information provided by the services or the Site as a
              recommendation or encouragement by us for you to gamble or take part in any unlawful
              activities.
            </p>
            <p>
              YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT THE COMPANY DOES NOT WARRANT OR GUARANTEE THE
              PICKS (INCLUDING THE ACCURACY THEREOF) OR WINNINGS WHATSOEVER UNLESS OTHERWISE
              EXPRESSLY AGREED TO IN WRITING.  THE COMPANY PROVIDES PICKS WARRANTY FREE AND
              GUARANTEE FREE AND HEREBY EXPRESSLY DISCLAIMS ANY WARRANTY OR GUARANTEE, IN EACH CASE,
              EXPRESS OR IMPLIED OR OTHERWISE.
            </p>

            <h5>16. Voting</h5>
            <p>
              TDS may offer you the opportunity to vote in connection with certain events. By
              casting your vote, you are agreeing to abide by the Terms of Use and any and all
              voting guidelines posted on the Site.
            </p>

            <h5>17. Refunds</h5>
            <p>
              Please see our refund policy{' '}
              <Link href="/refund-policy">
                <a>here</a>
              </Link>{' '}
              or contact us at <a href="mailto:info@thedailystakes.com">infothedailystakes.com</a>.
            </p>

            <h5>18. Miscellaneous</h5>
            <p>
              TDS’s failure to insist upon or enforce strict performance of any provision of these
              Terms of Use shall not be construed as a waiver of any provision or right. Neither the
              course of conduct between the parties nor trade practice shall act to modify any of
              these Terms of Use. TDS may assign its rights and duties under these Terms of Use to
              any party at any time without notice to you and without your express consent. You will
              not assign any of your rights or delegate any of your obligations under these Terms of
              Use without TDS’s prior written consent. Any purported assignment or delegation in
              violation of this Section is null and void. No assignment or delegation relieves you
              of any of your obligations under these Terms of Use. If any provision of these Terms
              of Use is held unlawful, void, or for any reason unenforceable, then that provision
              shall be deemed severable from these Terms of Use and shall not affect the validity
              and enforceability of any remaining provisions. Sections 1, 2, 3, 5, 6, 7, 8, 9, 10,
              11, 12, 13, 14, 15, and 16, along with any other provisions which by their nature
              should survive, shall survive any termination of these Terms of Use. These Terms of
              Use, together with TDS’s{' '}
              <Link href="/privacy">
                <a>Privacy Policy</a>
              </Link>
              , constitute the entire agreement between the parties pertaining to the subject matter
              hereof and supersede in their entirety any and all written or oral agreements
              previously existing between the parties with respect to such subject matter.
            </p>
            <p>
              If you have any questions or comments regarding these Terms of Use, TDS’s{' '}
              <Link href="/privacy">
                <a>Privacy Policy</a>
              </Link>
              , or this Site, please feel free to contact TDS by e-mail at{' '}
              <a href="mailto:info@thedailystakes.com">infothedailystakes.com</a>
            </p>
            <p>
              <em>These Terms of Use were last updated on March 8, 2021</em>
            </p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
