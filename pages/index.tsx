import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';

import { AppLayout, BannerSportsAndMatches, DSProtection } from '@components/index';
import { StarSvg, ClickableArrowIcon, CarouselArrowIcon } from '@components/SvgIcons';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import {
  PageProps,
  SlickArrowType,
  SportCardsSelectionType,
  SportCardsSelection,
  SpoortCardName
} from '@type/Main';
import styles from '@styles/Home.module.css';

const Carousel = dynamic(() => import('antd/lib/carousel'));
const Rate = dynamic(() => import('antd/lib/rate'));
const Button = dynamic(() => import('antd/lib/button'));

export default function Home({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>TheDailyStakes</title>
        <meta name="description" content="Daily Stakes Homepage" />
      </Head>
      <AppLayout token={token} subscriptions={subscriptions}>
        <HeroBanner />
        <MembershipOfferings />
        <OurDailyStandards />
        <BetOnSports />
        <Testimonials />
        <SportsNewsCarousel />
        <SubscribeNow />
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  const NextArrow = ({ currentSlide, slideCount, ...props }: SlickArrowType) => (
    <div {...props} key={`next_${currentSlide}_${slideCount}`} className="next_arrow slick-next">
      <ClickableArrowIcon className={styles.home_banner_next} />
    </div>
  );
  const PrevArrow = ({ currentSlide, slideCount, ...props }: SlickArrowType) => (
    <div {...props} key={`next_${currentSlide}_${slideCount}`} className="prev_arrow slick-prev">
      <ClickableArrowIcon className={styles.home_banner_prev} />
    </div>
  );
  return (
    <section className="hero-banner">
      <div className={styles.heroBanner}>
        <div className={styles.heroBannerLeft}>
          <div className={styles.container}>
            <div className={styles.main_desc}>sports is not a game of chance</div>
            <div className={styles.second_desc}>
              <span>it’s a game of skill</span>
              <span className={styles.tagline}>OUR WINNING STATS. YOUR WINNING PICKS.</span>
            </div>
            <ul>
              <span>
                Complete sports analytics source for all major sports including NFL, NBA, MLB,
                Soccer, NCAAF, NCAAB, Formula 1, and UFC
              </span>
              <li>
                <div className={styles.square_icon} />
                <span>Sports Betting Picks</span>
              </li>
              <li>
                <div className={styles.square_icon} />
                <span>Optimal Daily Fantasy Lineups</span>
              </li>
              <li>
                <div className={styles.square_icon} />
                <span>Advanced Stats & Trends</span>
              </li>
              <li>
                <div className={styles.square_icon} />
                <span>Proven Track Record</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.heroBannerRight}>
          <div className={styles.container}>
            <Carousel
              autoplay={false}
              arrows
              autoplaySpeed={6000}
              className={styles.carousel}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}>
              <div>
                <div className={`${styles.carousel_slide} ${styles.slide1}`}>
                  <div className={styles.carousel_slide_text}>
                    <h3>SUBSCRIBE NOW TO GET</h3>
                    <h1>FREE ACCESS!</h1>
                    <Row>
                      <Col span={8} className={styles.feature}>
                        FREE BETS
                      </Col>
                      <Col span={8} className={styles.feature}>
                        PREDICTIONS
                      </Col>
                      <Col span={8} className={styles.feature}>
                        DISCOUNTS
                      </Col>
                    </Row>
                  </div>
                  <Link href="/signup">
                    <a>
                      <Button className={styles.carousel_slide_subscribeBtn}>Subscribe Now</Button>
                    </a>
                  </Link>
                </div>
              </div>
              <div>
                <div className={`${styles.carousel_slide} ${styles.slide2}`}>
                  <div className={styles.carousel_slide_text}>
                    <h1>NEW CUSTOMERS</h1>
                    <div className={styles.discountInfo}>
                      <span>50% OFF</span>
                      <span>ANY PACKAGE AT CHECKOUT</span>
                    </div>
                    <div className={styles.discountCode}>
                      <span>PROMO CODE:</span>
                      <span>TEAMTDS</span>
                    </div>
                  </div>
                  <Link href="/shop">
                    <a>
                      <Button className={styles.carousel_slide_subscribeBtn}>SHOP NOW</Button>
                    </a>
                  </Link>
                </div>
              </div>
              <div>
                <div className={`${styles.carousel_slide} ${styles.slide3}`}>
                  <div className={styles.carousel_slide_text}>
                    <div className={styles.slide3_subtitle}>
                      <span>MARCH MADNESS</span>
                      <span>2021</span>
                    </div>
                    <div className={styles.slide3_title}>
                      FOR MORE INFO, <br />
                      VISIT OUR ARTICLE @ BLOG.THEDAILYSTAKES.COM
                    </div>
                  </div>
                  <Link href="https://blog.thedailystakes.com/after-a-one-year-hiatus-march-madness-is-back-before-you-fill-your-ncaa-bracket-read-our-preview-for-an-inside-look-at-the-matchups/">
                    <a target="_blank">
                      <Button className={styles.carousel_slide_readmoreBtn}>READ MORE</Button>
                    </a>
                  </Link>
                </div>
              </div>
              <div>
                <div className={`${styles.carousel_slide} ${styles.slide4}`}>
                  <div className={styles.carousel_slide_text}>
                    <h3>BUY THIS CARD & GET DFS FREE</h3>
                    <Row>
                      <Col span={12} className="text-center">
                        <div className={`${styles.nbaCard} ${styles.nbaCardActive}`}>
                          <div className={styles.nbaCardSvgWrapper}>
                            <NBA_SVG className={styles.nbaCardActiveSvg}></NBA_SVG>
                          </div>
                          <div className={styles.nbaCardContent}>
                            <div className={styles.nbaCardTitle}>NBA</div>
                            <div className={styles.nbaCardDesc}>
                              ACCCESS TO ALL PLAYS & PARLAYS FOR NBA
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col span={12} className="text-center">
                        {/* NBA Card */}
                        <div className={styles.nbaCard}>
                          <div className={styles.nbaCardSvgWrapper}>
                            <NBA_SVG className={styles.nbaCardSvg}></NBA_SVG>
                          </div>
                          <div className={styles.nbaCardContent}>
                            <div className={styles.nbaCardTitle}>NBA dfs</div>
                            <div className={styles.nbaCardDesc}>
                              DAILY FANTASY LINEUPS for fanduel, draftkings & Yahoo Sports
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className={styles.promoCode}>
                      <span>PROMO CODE:</span>
                      <div className={styles.promoCodeValue}>
                        <span>DOUBLEDIP</span>
                        <span className={styles.promoCodeDesc}>
                          ONLY APPLICABLE TO MONTHLY ACCESS
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href="/shop?plan=sports_card">
                    <a>
                      <Button className={styles.carousel_slide_subscribeBtn}>View Plays</Button>
                    </a>
                  </Link>
                </div>
              </div>
              <div>
                <div className={`${styles.carousel_slide} ${styles.slide5}`}>
                  <div className={styles.carousel_slide_text}>
                    <h2>DON’T HAVE A BOOK YET?</h2>
                    <div className={styles.desc}>Thedailystakes HAS got you covered</div>
                    <div className={styles.logos}>
                      <img src="/images/logos.png" alt="" />
                    </div>
                  </div>
                  <Link href="https://blog.thedailystakes.com/category/sportsbook-reviews/">
                    <a target="_blank">
                      <Button className={styles.carousel_slide_subscribeBtn}>Visit Now</Button>
                    </a>
                  </Link>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
        <BannerSportsAndMatches />
      </div>
    </section>
  );
}

function MembershipOfferings() {
  return (
    <div className={styles.membershipOffers}>
      <div className={styles.membershipOffers_title}>Our Membership Offerings</div>
      <div className={styles.membershipOffers_desc}>
        Upon signing up to one of our packages, you will receive access to your customized member
        dashboard which will include your specified picks, key stats & trends, our weekly pro tip,
        hands on support & an expert bankroll management system.
      </div>
      <div className={styles.plan_extra_content_mobile}>Best&nbsp;&nbsp;Deal!</div>
      <div className={styles.membershipOffers_plans}>
        <div className={styles.plan}>
          <div className={styles.plan_content}>
            <div className={styles.plan_content_info}>
              <div className={styles.plan_content_title}>Sports Card</div>
              <div className={styles.plan_content_desc}>
                ALL PLAYS FOR THE SPORT(S) OF YOUR CHOICE.
              </div>
            </div>
            <div className={styles.plan_content_details}>
              <div className={styles.price_view}>
                <div>
                  <strong>1 sport weekly</strong> Starting at
                </div>
                <span className={styles.price}>$19.99</span>
              </div>
              <ul className={styles.plan_content_details_desc}>
                <li>
                  <span>Receive Access to ALL Plays for the Sport(s) of Your Choice</span>
                </li>
                <li>
                  <span>Sports Include NBA, NFL, Soccer, MLB, NCAAF, NCAAB, UFC & Formula 1</span>
                </li>
                <li>
                  <span>Customized Dashboard Including Automated Record Tracking</span>
                </li>
                <li>
                  <span>Weekly, Monthly, Season & Playoff Packages Available.</span>
                </li>
              </ul>
              <Link href="/shop?plan=sports_card">
                <Button className={styles.learn_more_btn}>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className={`${styles.plan} ${styles.main_plan}`}>
          <div className={styles.plan_extra_content}>Best&nbsp;&nbsp;Deal!</div>
          <div className={styles.plan_content}>
            <div className={styles.plan_content_info}>
              <div className={styles.plan_content_title}>VIP ALL ACCESS CARD</div>
              <div className={styles.plan_content_desc}>ALL PLAYS. ALL SPORTS.</div>
            </div>
            <div className={styles.plan_content_details}>
              <div className={styles.price_view}>
                <LazyLoad height={200}>
                  <img
                    src="/images/deal_circle.svg"
                    className={styles.deal_circle}
                    alt="Big Deal Circle"
                  />
                </LazyLoad>
                <div>
                  <strong>All sports Daily</strong> Starting at
                </div>
                <div className={styles.price}>$9.99</div>
              </div>
              <ul className={styles.plan_content_details_desc}>
                <li>
                  <span>Receive Access to ALL Plays for ALL Sports, Including BONUS Plays</span>
                </li>
                <li>
                  <span>Customized Dashboard Including Automated Record Tracking</span>
                </li>
                <li>
                  <span>
                    Advanced Stats for Each Bet, Weekly Pro Tips & Bankroll Management Strategies
                  </span>
                </li>
                <li>
                  <span>Daily, Weekly, Monthly & Annual Packages Available.</span>
                </li>
                <li>
                  <span>Daily Card Includes TheDailyStakes Protection</span>
                </li>
              </ul>
              <Link href="/shop?plan=all">
                <Button className={styles.learn_more_btn}>Learn More</Button>
              </Link>
            </div>
          </div>
          <div className={styles.protection_div}>
            <DSProtection />
          </div>
        </div>

        <div className={styles.protection_div_mobile}>
          <DSProtection />
        </div>

        <div className={styles.plan}>
          <div className={styles.plan_content}>
            <div className={styles.plan_content_info}>
              <div className={styles.plan_content_title}>DAILY FANTASY CARD</div>
              <div className={styles.plan_content_desc}>OPTIMAL DFS LINEUPS.</div>
            </div>
            <div className={styles.plan_content_details}>
              <div className={styles.price_view}>
                <div>
                  <strong>Daily Lineups</strong> Starting at
                </div>
                <div className={styles.price}>$10.00</div>
              </div>
              <ul className={styles.plan_content_details_desc}>
                <li>
                  <span>DFS Lineups for Single Slate & Main Slate Game Styles</span>
                </li>
                <li>
                  <span>Premium Player Prop Recommendations</span>
                </li>
                <li>
                  <span>Sports Include NBA, NFL & MLB</span>
                </li>
                <li>
                  <span>
                    Lineup Formats Included for DraftKings, Fanduel & Yahoo Sportsbooks Contest
                    Types
                  </span>
                </li>
                <li>
                  <span>Daily, Weekly, & Monthly Packages Available</span>
                </li>
              </ul>
              <Link href="/shop?plan=fantasy">
                <Button className={styles.learn_more_btn}>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OurDailyStandards() {
  return (
    <div className={styles.daily_standards}>
      <LazyLoad height={1000}>
        <img
          src={'/images/daily_standards_bg1.png'}
          alt="Daily Standards Background"
          className={styles.daily_standards_bg}
        />
      </LazyLoad>
      <div className={styles.daily_standards_title}>
        Our daily
        <br />
        standards
      </div>
      <div className={styles.daily_standards_list}>
        <div className={styles.daily_standards_item}>
          <LazyLoad height={62}>
            <img
              src={'/images/daily_standards_analytics.svg'}
              alt="Daily Standards Analytics"
              className={styles.daily_standards_icon}
            />
          </LazyLoad>
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Analytical Approach</h4>
              <img src="/images/wave.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              Bet on numbers, not emotions. Stats, trends, and advanced analysis is our top priority
              at The DailyStakes. Every pick is researched with in depth analytics and back tested
              using various multi variant models to ensure we are providing the highest value to our
              clients. We don’t just provide picks, we give you key stats and trends behind each
              one.
            </p>
          </div>
        </div>
        <div className={styles.daily_standards_item}>
          <LazyLoad height={62}>
            <img
              src={'/images/daily_standards_customer.svg'}
              alt="Daily Standards Customer"
              className={styles.daily_standards_icon}
            />
          </LazyLoad>
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Client Focused</h4>
              <img src="/images/wave.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              Whether you’re a sports fan, casual bettor, or a sharp, we have you covered. Our motto
              is to approach everything from the clients perspective. Our team is made available
              24/7 to provide the highest quality assistance, ranging from the most basic technical
              issues to the most complex strategic questions.
            </p>
          </div>
        </div>
        <div className={styles.daily_standards_item}>
          <LazyLoad height={62}>
            <img
              src={'/images/daily_standards_working.svg'}
              alt="Daily Standards Working"
              className={styles.daily_standards_icon}
            />
          </LazyLoad>
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Industrious</h4>
              <img src="/images/wave2.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              The foundation of our success is based on hard work. Keeping up with injury reports,
              lineup changes, weather conditions, value picks, amongst other key considerations
              require a tremendous amount of work and diligence. This is embedded in our culture.
            </p>
          </div>
        </div>
        <div className={styles.daily_standards_item}>
          <LazyLoad height={62}>
            <img
              src={'/images/daily_standards_pedigre.svg'}
              alt="Daily Standards Pedigre"
              className={styles.daily_standards_icon}
            />
          </LazyLoad>
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Credibility</h4>
              <img src="/images/wave4.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              {`Consistency is key, and we've built a proven track record over time. The sports
              consulting landscape is currently riddled with “experts” claiming unrealistic win
              records with the use of shady marketing tactics on social media. We are 100%
              transparent with all of our results & impose self-regulation via our automated record
              tracker & yesterday's plays.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BetOnSports() {
  const [activePack, setActivePack] = useState<string>('');
  const [selectedCards, setSelectedCards] = useState<SportCardsSelectionType>({
    nba: false,
    nfl: false,
    mlb: false,
    ufc: false,
    f1: false,
    ncaaf: false,
    nfl_dfs: false,
    ncaab: false,
    nba_dfs: false,
    mlb_dfs: false,
    soccer: false,
    vip: false
  });
  const toggleSelectCard = (prop: SpoortCardName) => {
    const copySelectedCards = Object.assign({}, selectedCards);
    copySelectedCards[prop] = !copySelectedCards[prop];
    setSportsDataForMobile(
      sportsDataForMobile.map((item) => {
        if (item.value === prop) {
          item.selected = copySelectedCards[prop];
          return item;
        }
        return item;
      })
    );
    setSelectedCards(copySelectedCards);
  };

  const sportsData: SportCardsSelection[] = [
    {
      name: 'VIP',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR ALL SPORTS',
      image: <img src={'/images/vip.svg'} className={styles.vip_sport_card} />,
      style: styles.vip_box,
      value: SpoortCardName.vip,
      selectedStyle: styles.vip_box_active,
      selected: selectedCards.vip
    },
    {
      name: 'NBA',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR NBA',
      image: <NBA_SVG className={styles.sports_card_image} />,
      style: styles.nba_box,
      value: SpoortCardName.nba,
      selectedStyle: styles.nba_box_active,
      selected: selectedCards.nba
    },
    {
      name: 'NFL',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR NFL',
      image: <NFL_SVG className={styles.sports_card_image} />,
      style: styles.nfl_box,
      value: SpoortCardName.nfl,
      selectedStyle: styles.nfl_box_active,
      selected: selectedCards.nfl
    },
    {
      name: 'MLB',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR MLB',
      image: <MLB_SVG className={styles.sports_card_image} />,
      style: styles.mlb_box,
      value: SpoortCardName.mlb,
      selectedStyle: styles.mlb_box_active,
      selected: selectedCards.mlb
    },
    {
      name: 'SOCCER',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR SOCCER',
      image: <SOCCER_SVG className={styles.sports_card_image} />,
      style: styles.soccer_box,
      value: SpoortCardName.soccer,
      selectedStyle: styles.soccer_box_active,
      selected: selectedCards.soccer
    },
    {
      name: 'FORMULA 1',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR FORMULA 1',
      image: <F1_SVG className={styles.sports_card_image} />,
      style: styles.f1_box,
      value: SpoortCardName.f1,
      selectedStyle: styles.f1_box_active,
      selected: selectedCards.f1
    },
    {
      name: 'UFC',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR UFC',
      image: <UFC_SVG className={styles.sports_card_image} />,
      style: styles.ufc_box,
      value: SpoortCardName.ufc,
      selectedStyle: styles.ufc_box_active,
      selected: selectedCards.ufc
    },
    {
      name: 'NCAAB',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR NCAAB',
      image: <NBA_SVG className={styles.sports_card_image} />,
      style: styles.nba_box,
      value: SpoortCardName.ncaab,
      selectedStyle: styles.nba_box_active,
      selected: selectedCards.ncaab
    },
    {
      name: 'NCAAF',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR NCAAF',
      image: <NFL_SVG className={styles.sports_card_image} />,
      style: styles.nfl_box,
      value: SpoortCardName.ncaaf,
      selectedStyle: styles.nfl_box_active,
      selected: selectedCards.ncaaf
    },

    {
      name: 'NBA DFS',
      description: 'DAILY FANTASY LINEUPS for fanduel, draftkings & Yahoo Sports',
      image: <NBA_SVG className={styles.sports_card_image} />,
      style: styles.nba_box,
      value: SpoortCardName.nba_dfs,
      selectedStyle: styles.nba_box_active,
      selected: selectedCards.nba_dfs
    },
    {
      name: 'NFL DFS',
      description: 'DAILY FANTASY LINEUPS for fanduel, draftkings & Yahoo Sports',
      image: <NFL_SVG className={styles.sports_card_image} />,
      style: styles.nfl_box,
      value: SpoortCardName.nfl_dfs,
      selectedStyle: styles.nfl_box_active,
      selected: selectedCards.nfl_dfs
    },
    {
      name: 'MLB DFS',
      description: 'DAILY FANTASY LINEUPS for fanduel, draftkings & Yahoo Sports',
      image: <MLB_SVG className={styles.sports_card_image} />,
      style: styles.mlb_box,
      value: SpoortCardName.mlb_dfs,
      selectedStyle: styles.mlb_box_active,
      selected: selectedCards.mlb_dfs
    }
  ];

  const [sportsDataForMobile, setSportsDataForMobile] = useState<SportCardsSelection[]>([
    sportsData[0]
  ]);

  return (
    <div className={styles.bet_on_sports}>
      <div className={styles.bet_on_sports_title}>
        Bet on any or all of these <strong>sports</strong>
      </div>
      <div className={styles.bet_on_sports_desc}>
        <p>Select the sport(s) you would like to bet and continue to the shop page</p>
        <Link href="/shop">
          <Button className={styles.checkout_btn}>Continue to SHOP</Button>
        </Link>
      </div>

      <div className={styles.mobile_column_display}>
        <Button
          className={`${styles.mobile_display_buttons} ${
            activePack === 'vip' ? styles.active : ''
          }`}
          onClick={() => {
            setSportsDataForMobile(sportsData.slice(0, 1));
            setActivePack('vip');
          }}>
          VIP ALL ACCESS CARD
        </Button>
        <Button
          className={`${styles.mobile_display_buttons} ${
            activePack === 'sports_card' ? styles.active : ''
          }`}
          onClick={() => {
            setSportsDataForMobile(sportsData.slice(1, 9));
            setActivePack('sports_card');
          }}>
          SPORTS CARD
        </Button>
        <Button
          className={`${styles.mobile_display_buttons} ${
            activePack === 'fantasy' ? styles.active : ''
          }`}
          onClick={() => {
            setSportsDataForMobile(sportsData.slice(9, 13));
            setActivePack('fantasy');
          }}>
          DAILY FANTASY CARD
        </Button>
        <div>
          <div>
            <div
              className={
                sportsDataForMobile.length > 1 ? styles.sports_cards : styles.sports_cards_for_vip
              }>
              {sportsDataForMobile.map((item: SportCardsSelection) => (
                <div key={item.name}>
                  {item.name === 'VIP' ? <p className={styles.best_deal_text}>best Deal!</p> : null}
                  <div className={styles.sports_card}>
                    <div
                      className={`${styles.sports_card_box_mobile} ${item.style} ${
                        item.selected ? item.selectedStyle : ''
                      }`}
                      onClick={() => toggleSelectCard(item.value)}>
                      {item.selected ? (
                        item.name === 'VIP' ? (
                          <img
                            src="/images/golden_check_mark.svg"
                            alt="Check mark Icon"
                            className={styles.sports_card_checkmark}
                          />
                        ) : (
                          <img
                            src="/images/check_mark.svg"
                            alt="Check mark Icon"
                            className={styles.sports_card_checkmark}
                          />
                        )
                      ) : null}
                      {item.image}
                      <div className={styles.sports_card_box_content}>
                        <h3>{item.name}</h3>
                        <div className={styles.desc}>
                          <div>{item.description}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.laptop_display}>
        <div>
          <div className={styles.sports_cards}>
            {sportsData.map((item: SportCardsSelection) => (
              <div key={item.name}>
                <div className={styles.sports_card}>
                  <div
                    className={`${styles.sports_card_box} ${item.style} ${
                      item.selected ? item.selectedStyle : ''
                    }`}
                    onClick={() => toggleSelectCard(item.value)}>
                    {item.selected ? (
                      item.name === 'VIP' ? (
                        <img
                          src="/images/golden_check_mark.svg"
                          alt="Check mark Icon"
                          className={styles.sports_card_checkmark}
                        />
                      ) : (
                        <img
                          src="/images/check_mark.svg"
                          alt="Check mark Icon"
                          className={styles.sports_card_checkmark}
                        />
                      )
                    ) : null}
                    {item.image}
                    <div className={styles.sports_card_box_content}>
                      <h3>{item.name}</h3>
                      <div className={styles.desc}>
                        <div>{item.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* older code of sports is below */}
      <Link href="/shop">
        <Button className={styles.mobile_checkout_btn}>Continue to SHOP page</Button>
      </Link>
    </div>
  );
}

function Testimonials() {
  const NextArrow = ({ currentSlide, slideCount, ...props }: SlickArrowType) => (
    <div {...props} key={`next_${currentSlide}_${slideCount}`} className="next_arrow slick-next">
      <CarouselArrowIcon />
    </div>
  );
  const PrevArrow = ({ currentSlide, slideCount, ...props }: SlickArrowType) => (
    <div {...props} key={`next_${currentSlide}_${slideCount}`} className="prev_arrow slick-prev">
      <CarouselArrowIcon />
    </div>
  );

  return (
    <div className={styles.testimonials}>
      <LazyLoad height={990}>
        <img
          src={'/images/testimonials.png'}
          alt="Testimonials Background"
          className={styles.testimonials_bg}
        />
      </LazyLoad>
      <Carousel
        className="testimonials-carousel"
        infinite
        dots
        initialSlide={0}
        arrows
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}>
        <div>
          <div className={styles.testimonial}>
            <div className={styles.testimonial_top}>
              <StarSvg className={styles.black_star} />
            </div>
            <div className={styles.testimonial_content}>
              <LazyLoad height={590}>
                <img
                  src="/images/testimonial1.jpeg"
                  alt="Testimonial Background"
                  className={styles.testimonial_image}
                />
              </LazyLoad>
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Carl ***** | Canada </div>
                <div className={styles.testimonial_desc}>VIP All Access</div>
                <Rate allowHalf defaultValue={5} disabled />
                <div className={styles.testimonial_quote}>
                  “I&#39;ve tried other cappers and TheDailyStakes is by far the most credible,
                  transparent, and winning source I&#39;ve found. Not only are their prices more
                  affordable, they offer a tremendous amount of value and win consistently. These
                  guys are more than just cappers. They offer the full suite offering and their
                  member dashboard is next level!”
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.testimonial}>
            <div className={styles.testimonial_top}>
              <StarSvg className={styles.black_star} />
            </div>
            <div className={styles.testimonial_content}>
              <LazyLoad height={590}>
                <img
                  src="/images/testimonial2.png"
                  alt="Testimonial Background"
                  className={styles.testimonial_image}
                />
              </LazyLoad>
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Brian ******* | Toronto</div>
                <div className={styles.testimonial_desc}>NBA Sports Card</div>
                <Rate allowHalf defaultValue={5} disabled />
                <div className={styles.testimonial_quote}>
                  “I&#39;m a fan of ball and purchased the NBA package for my second month in a row.
                  The best recommendations I&#39;ve ever had. They help me confirm some of my
                  existing leans & you can tell they put effort into having the best user experience
                  in mind.”
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.testimonial}>
            <div className={styles.testimonial_top}>
              <StarSvg className={styles.black_star} />
            </div>
            <div className={styles.testimonial_content}>
              <LazyLoad height={590}>
                <img
                  src="/images/testimonial3.png"
                  alt="Testimonial Background"
                  className={styles.testimonial_image}
                />
              </LazyLoad>
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Jason ****** | New Jersey </div>
                <div className={styles.testimonial_desc}>Soccer Sports Card</div>
                <Rate allowHalf defaultValue={5} disabled />
                <div className={styles.testimonial_quote}>
                  “Best source for sports betting out there. No fluff picks and they don&#39;t sell
                  unrealistic dreams like other cappers do. Best part is that I’m making money while
                  watching my favorite sports and players! ”
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.testimonial}>
            <div className={styles.testimonial_top}>
              <StarSvg className={styles.black_star} />
            </div>
            <div className={styles.testimonial_content}>
              <LazyLoad height={590}>
                <img
                  src="/images/testimonial4.jpeg"
                  alt="Testimonial Background"
                  className={styles.testimonial_image}
                />
              </LazyLoad>
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Trevor **** | Michigan</div>
                <div className={styles.testimonial_desc}>Fantasy Sports & Football Cards</div>
                <Rate allowHalf defaultValue={5} disabled />
                <div className={styles.testimonial_quote}>
                  “Affordable, consistent, and great information. Excited to jump on their CFB & NFL
                  packages again. 5 stars!”
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.testimonial}>
            <div className={styles.testimonial_top}>
              <StarSvg className={styles.black_star} />
            </div>
            <div className={styles.testimonial_content}>
              <LazyLoad height={590}>
                <img
                  src="/images/testimonial5.jpeg"
                  alt="Testimonial Background"
                  className={styles.testimonial_image}
                />
              </LazyLoad>
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Marcus ****| Colorado </div>
                <div className={styles.testimonial_desc}>Fantasy Sports & VIP All Access Cards</div>
                <Rate allowHalf defaultValue={5} disabled />
                <div className={styles.testimonial_quote}>
                  “Best in the industry hands down. From their analysis to service, they got it
                  covered. I&#39;m subscribed to both the VIP All Access & DFS package. They go out
                  of their way to answer any questions I have for a given game. They also release
                  great content on their social media platforms. Gamechangers in the space.”
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

function SportsNewsCarousel() {
  const NextArrow = ({ currentSlide, slideCount, ...props }: SlickArrowType) => (
    <div {...props} key={`next_${currentSlide}_${slideCount}`} className="next_arrow slick-next">
      <CarouselArrowIcon />
    </div>
  );
  const PrevArrow = ({ currentSlide, slideCount, ...props }: SlickArrowType) => (
    <div {...props} key={`next_${currentSlide}_${slideCount}`} className="prev_arrow slick-prev">
      <CarouselArrowIcon />
    </div>
  );
  return (
    <div className={styles.news_carousel}>
      <LazyLoad height={990}>
        <img
          src={'/images/news_bg.jpg'}
          alt="News Carousel Background"
          className={styles.news_carousel_bgimg}
        />
      </LazyLoad>
      <div className={styles.news_carousel_bg_overlay} />
      <div className={styles.news_carousel_bg}>
        <div className={styles.news_carousel_content}>
          <div className={styles.title_row}>
            <div>
              <span>THE DAILY INSIGHTS</span>
              <span className={styles.title_row_desc}>
                SPORTS BETTING STRATEGIES, ANALYTICS, & PREDICTIONS
              </span>
            </div>
            <Link href="https://blog.thedailystakes.com/">
              <a target="_blank">View More</a>
            </Link>
          </div>
          <Carousel
            className="news-carousel"
            arrows
            dots={false}
            centerMode
            variableWidth
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
            centerPadding="60px">
            <div>
              <div className={styles.news}>
                <LazyLoad height={590}>
                  <img
                    src="https://blog.thedailystakes.com/wp-content/uploads/2021/01/Group-273.png"
                    alt="News Background"
                  />
                </LazyLoad>
                <div className={styles.news_content}>
                  <h3>
                    THE NBA IS ONE OF THE MOST POPULAR SPORTS TO BET ON, BUT YOU NEED TO READ THESE
                    5 TIPS BEFORE PLACING YOUR NEXT BET
                  </h3>
                  <p className={styles.news_desc}>Betting strategies for the NBA</p>
                  <Link href="https://blog.thedailystakes.com/nba-betting-strategies/">
                    <a target="_blank">Read Article</a>
                  </Link>
                </div>
                <div className="news_overlay" />
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <LazyLoad height={590}>
                  <img
                    src="https://blog.thedailystakes.com/wp-content/uploads/2021/03/Psychology-of-betting.jpg"
                    alt="News Background"
                  />
                </LazyLoad>
                <div className={styles.news_content}>
                  <h3>
                    HOW PSYCHOLOGY AND TENDENCIES IMPACT SPORTS BETTORS AND TWO COMMON FALLACIES
                    THAT CAUSE BETTORS TO LOSE MONEY
                  </h3>
                  <p className={styles.news_desc}>
                    Sports Betting Psychology - Two Fallacies to Avoid
                  </p>
                  <Link href="https://blog.thedailystakes.com/sports-betting-psychology-two-fallacies-to-avoid/">
                    <a target="_blank">Read Article</a>
                  </Link>
                </div>
                <div className="news_overlay" />
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <LazyLoad height={590}>
                  <img
                    src="https://blog.thedailystakes.com/wp-content/uploads/2021/01/BASEBALL-Artile.png"
                    alt="News Background"
                  />
                </LazyLoad>
                <div className={styles.news_content}>
                  <h3>
                    BASEBALL IS ONE OF THE MOST PROFITABLE SPORTS TO BET ON. CHECK OUT OUR TIPS ON
                    HOW TO MAKE SOME MONEY THIS SEASON!
                  </h3>
                  <p className={styles.news_desc}>MLB betting strategies</p>
                  <Link href="https://blog.thedailystakes.com/mlb-betting-strategies/">
                    <a target="_blank">Read Article</a>
                  </Link>
                </div>
                <div className="news_overlay" />
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <LazyLoad height={590}>
                  <img
                    src="https://blog.thedailystakes.com/wp-content/uploads/2021/01/sports-betting.jpg"
                    alt="News Background"
                  />
                </LazyLoad>
                <div className={styles.news_content}>
                  <h3>
                    THE MOST UNDERRATED ELEMENT OF SPORTS BETTING? BANKROLL MANAGEMENT: HERE ARE SIX
                    BETTING SYSTEMS YOU NEED TO KNOW
                  </h3>
                  <p className={styles.news_desc}>
                    Six Sports Betting Bankroll Strategies All Bettors Need To Know
                  </p>
                  <Link href="https://blog.thedailystakes.com/sports-betting-bankroll-strategies-all-bettors-need-to-know/">
                    <a target="_blank">Read Article</a>
                  </Link>
                </div>
                <div className="news_overlay" />
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <LazyLoad height={590}>
                  <img
                    src="https://blog.thedailystakes.com/wp-content/uploads/2021/03/dfs.jpg"
                    alt="News Background"
                  />
                </LazyLoad>
                <div className={styles.news_content}>
                  <h3>
                    DRAFTKINGS, FANDUEL AND YAHOO SPORTS ALL OFFER EXCITING AND DEEP DAILY FANTASY
                    EXPERIENCES BUT WHICH IS THE BEST?
                  </h3>
                  <p className={styles.news_desc}>
                    Daily Fantasy Review: Draftkings, FanDuel and Yahoo Sports!
                  </p>
                  <Link href="https://blog.thedailystakes.com/draftkings-fanduel-and-yahoo-sports-all-offer-exciting-and-deep-daily-fantasy-experiences-but-which-is-the-best/">
                    <a target="_blank">Read Article</a>
                  </Link>
                </div>
                <div className="news_overlay" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

function SubscribeNow() {
  const router = useRouter();
  const goSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className={styles.subscribenow}>
      <div className={styles.subscribenow_container}>
        <div className={styles.subscribenow_left}>
          <LazyLoad height={140}>
            <img
              alt="Curve Arrow Icon"
              src="/images/curve_arrow.svg"
              className={styles.subscribenow_curve}
            />
          </LazyLoad>
          <div className={styles.subscribenow_title1}>Start winning now,</div>
          <div className={styles.subscribenow_title2}>it’s Ea$y!</div>
          <div className={styles.subscribenow_desc}>
            Subscribe Now for Free & Join the Winning Team.
          </div>
        </div>
        <div className={styles.subscribenow_right}>
          <div className={styles.btn_circle}>
            <LazyLoad height={170}>
              <img alt="Subscribe Button Icon" src="/images/subscribe_btn_circle.svg" />
            </LazyLoad>
            <Button className={styles.subscribe_btn} onClick={goSignUp}>
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
