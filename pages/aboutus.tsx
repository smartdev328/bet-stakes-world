import Head from 'next/head';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function AboutUs({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - About Us</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h4>About Us</h4>
            <p>
              The Daily Stakes, Inc. is a North American digital sports consulting & media company
              focused on the rapidly evolving sports betting and daily fantasy sports landscape. The
              company uses data driven models to provide users with predictive sports analytics,
              credible bet recommendations, premium content, and advanced bankroll management
              strategies via its membership packages.{' '}
            </p>
            <h4>Our Story</h4>
            <p>
              Formally established in 2021 upon forming a partnership amongst professionals working
              in the finance & consulting space, TheDailyStakes is rapidly becoming one of the most
              well- known names in the industry.
            </p>

            <p>
              Our deep-rooted passion for sports & quantitative analyses were the driving pillars
              leading to the creation of TheDailyStakes. Being experienced sports bettors ourselves,
              we observed time and time again a major gap in the industry: *Providing credible bet
              recommendations backed by hard data while simultaneously educating the bettor.
            </p>

            <p>
              Our team continues to grow as the ever-changing sports betting and DFS landscape
              evolves with the legalization of sports betting emerging in North America.
            </p>
            <h4>Our Mission</h4>
            <p>
              To be the sports consulting industry leader by providing our users with the industry’s
              most versatile content and insightful recommendations.
            </p>
            <h4>Our Purpose HOLD</h4>
            <p>
              <ul>
                <li>Educating the Bettor</li>
                <br></br>
                <p>
                  The old saying holds true: Knowledge is Power. We don’t simply recommend picks and
                  expect users to bet mindlessly. We include detailed stats & trends behind the
                  selection of each pick.{' '}
                </p>
                <p>
                  Furthermore, we aim to continuously provide users with content in order to arm
                  them to become more insightful bettors. This is done through our weekly pro tip,
                  ongoing sports betting articles, & bankroll management tactics that users can
                  constantly add to their repertoire.
                </p>
                <li>Providing Credibility</li>
                <br></br>
                <p>
                  Although the Supreme Court legalized sports betting in America on a state level,
                  the sports consulting industry remains largely unregulated. Self proclaimed
                  “experts” have emerged selling picks using misleading marketing tactics and no
                  transparency.
                </p>
                <p>
                  We self-regulate ourselves in an unrelated part of the industry by being 100%
                  transparent through our automated record tracker. A majority of “experts” only
                  provide a pick. Our value proposition is more than just picks. No shady marketing
                  tactics are used here at TheDailyStakes. Our goal is to provide our users with the
                  most credible and honest user experience available.
                </p>
                <li>Providing Value</li>
                <br></br>
                <p>
                  Our ultimate goal is to provide value to our users in as my facets as possible. We
                  aim to continuously absorb feedback and enhance our value offering to what our
                  users want. We embrace the importance of innovation and adaptability here at
                  TheDailyStakes and this remains at the forefront of our priorities.
                </p>
              </ul>
            </p>

            <p>
              For more information, please visit our <a href="/faqs">FAQ Page</a> or{' '}
              <a href="/contact-us">Contact Us</a> directly!
            </p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
