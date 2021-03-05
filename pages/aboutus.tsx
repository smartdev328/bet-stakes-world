import Head from 'next/head';

import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';
import { Row, Col } from 'antd';
import dynamic from 'next/dynamic';
const Button = dynamic(() => import('antd/lib/button'));

export default function AboutUs({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - About Us</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div>
          <div>
            <div className={styles.ourPurpose_background}></div>
            <div className={styles.aboutus_container}>
              <Row className={styles.row}>
                <Col lg={8} md={24} className={styles.dsimage_container}>
                  <img
                    src="/images/about-us-dailystake.svg"
                    alt="The Daily Stakes"
                    className={styles.dailystake_image}
                  />
                </Col>
                <Col lg={16} md={24} className={styles.ds_detail_col}>
                  <p className={styles.dailyStake_details}>
                    The Daily Stakes, Inc. is a North American digital sports consulting & media
                    company focused on the rapidly evolving sports betting and daily fantasy sports
                    landscape. The company uses data driven models to provide users with predictive
                    sports analytics, credible bet recommendations, premium content, and advanced
                    bankroll management strategies via its membership packages.
                  </p>
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col lg={8} md={24} className={styles.aboutUs_headings_col}>
                  <p className={styles.aboutUs_headings}>THE DS MISSION</p>
                </Col>
                <Col lg={16} md={24}>
                  <p className={styles.dsMission_details}>
                    To be the sports consulting industry leader by providing our users with the
                    industry’s most versatile content and insightful recommendations.
                  </p>
                </Col>
              </Row>

              <Row className={styles.row}>
                <Col lg={8} md={24} className={styles.aboutUs_headings_col}>
                  <p className={styles.aboutUs_headings}>THE DS &nbsp; &nbsp; STORY</p>
                </Col>
                <Col lg={16} md={24}>
                  <p className={styles.dsStory_details}>
                    Formally established in 2021 upon forming a partnership amongst professionals
                    working in the finance & consulting space, TheDailyStakes is rapidly becoming
                    one of the most well- known names in the industry.
                  </p>
                  <p className={styles.dsStory_details}>
                    Our deep-rooted passion for sports & quantitative analyses were the driving
                    pillars leading to the creation of TheDailyStakes. Being experienced sports
                    bettors ourselves, we observed time and time again a major gap in the industry:
                    *Providing credible bet recommendations backed by hard data while simultaneously
                    educating the bettor.
                  </p>
                  <p className={styles.dsStory_details}>
                    Our team continues to grow as the ever-changing sports betting and DFS landscape
                    evolves with the legalization of sports betting emerging in North America.
                  </p>
                </Col>
              </Row>

              <Row className={styles.row}>
                <Col lg={8} md={24} className={styles.aboutUs_headings_col}>
                  <p className={styles.aboutUs_headings}>THE DS PURPOSE</p>
                </Col>
                <Col lg={16} md={24}>
                  <p>
                    <h5 className={styles.ourPurpose_subheadings}>EDUCATING THE BETTOR</h5>

                    <p className={styles.dsPurpose_details}>
                      The old saying holds true: Knowledge is Power. We don’t simply recommend picks
                      and expect users to bet mindlessly. We include detailed stats & trends behind
                      the selection of each pick.
                    </p>
                    <p className={styles.dsPurpose_details}>
                      Furthermore, we aim to continuously provide users with content in order to arm
                      them to become more insightful bettors. This is done through our weekly pro
                      tip, ongoing sports betting articles, & bankroll management tactics that users
                      can constantly add to their repertoire.
                    </p>
                    <h5 className={styles.ourPurpose_subheadings}>PROVIDING CREDIBILITY</h5>

                    <p className={styles.dsPurpose_details}>
                      Although the Supreme Court legalized sports betting in America on a state
                      level, the sports consulting industry remains largely unregulated. Self
                      proclaimed “experts” have emerged selling picks using misleading marketing
                      tactics and no transparency.
                    </p>
                    <p className={styles.dsPurpose_details}>
                      We self-regulate ourselves in an unrelated part of the industry by being 100%
                      transparent through our automated record tracker. A majority of “experts” only
                      provide a pick. Our value proposition is more than just picks. No shady
                      marketing tactics are used here at TheDailyStakes. Our goal is to provide our
                      users with the most credible and honest user experience available.
                    </p>
                    <h5 className={styles.ourPurpose_subheadings}>PROVIDING VALUE</h5>

                    <p className={styles.dsPurpose_details}>
                      Our ultimate goal is to provide value to our users in as my facets as
                      possible. We aim to continuously absorb feedback and enhance our value
                      offering to what our users want. We embrace the importance of innovation and
                      adaptability here at TheDailyStakes and this remains at the forefront of our
                      priorities.
                    </p>
                  </p>
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col lg={8} md={24} className={styles.aboutUs_headings_col}>
                  <p className={styles.aboutUs_headings}>THE DS COVERAGE</p>
                </Col>

                <Col lg={16} md={24} className={styles.coverage_main}>
                  <h5 className={styles.dsCoverage_subheadings}>SPORTS</h5>
                  <div className={styles.sport_car_container}>
                    <img src="/images/about_nba.svg" className={styles.coverage_images} />
                    <img src="/images/about_nfl.svg" className={styles.coverage_images} />
                    <img src="/images/about_mbl.svg" className={styles.coverage_images} />
                    <img src="/images/about_soccer.svg" className={styles.coverage_images} />
                  </div>

                  <div className={styles.sport_car_container}>
                    <img src="/images/about_ncaab.svg" className={styles.coverage_images} />
                    <img src="/images/about_ncaff.svg" className={styles.coverage_images} />
                    <img src="/images/about_ufc.svg" className={styles.coverage_images} />
                    <img src="/images/about_f1.svg" className={styles.coverage_images} />
                  </div>
                  <h5 className={styles.dsCoverage_subheadings}>DAILY FANTASY LINEUPS</h5>
                  <div className={styles.sport_car_container}>
                    <img src="/images/about_nba.svg" className={styles.coverage_images} />
                    <img src="/images/about_nfl.svg" className={styles.coverage_images} />
                    <img src="/images/about_mbl.svg" className={styles.coverage_images} />
                  </div>

                  <h5 className={styles.dsCoverage_subheadings_sportsbook}>
                    SPORTSBOOK FORMATS INCLUDED
                  </h5>
                  <div className={styles.sport_car_container}>
                    <img src="/images/about_draftkings.png" className={styles.sportsbook_images} />
                    <img src="/images/about_fanduel.png" className={styles.sportsbook_images} />
                    <img src="/images/about_daily.png" className={styles.sportsbook_images} />
                  </div>

                  <div className={styles.button_div}>
                    <h5 className={styles.dsCoverage_subheadings_interesting}>
                      INTERESTED IN WINNING WITH US?
                    </h5>
                    <Button className={styles.checkout_btn}>Continue to Shop</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
