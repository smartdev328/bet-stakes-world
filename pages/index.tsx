import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';
import { useRouter } from 'next/router';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import { StarSvg, CarouselArrowIcon } from '@components/SvgIcons';
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
        <title>The Daily Stakes</title>
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
                Soccer, NCAAF, NCAAB, Formula 1 & UFC.
              </span>
              <li>
                <div className={styles.square_icon} />
                <span>Sports Betting Picks & Analysis</span>
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
          <LazyLoad height={683}>
            <img
              src={'/images/hero_banner_right_2.svg'}
              alt="Hero Banner Background Image"
              className={styles.heroBannerRightBg}
            />
          </LazyLoad>
          <div className={styles.container}>
            <Carousel autoplay className={styles.carousel}>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button className={styles.carousel_slide_subscribeBtn}>Subscribe Now</Button>
                </div>
              </div>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button className={styles.carousel_slide_subscribeBtn}>Subscribe Now</Button>
                </div>
              </div>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button className={styles.carousel_slide_subscribeBtn}>Subscribe Now</Button>
                </div>
              </div>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button className={styles.carousel_slide_subscribeBtn}>Subscribe Now</Button>
                </div>
              </div>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button className={styles.carousel_slide_subscribeBtn}>Subscribe Now</Button>
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
  const router = useRouter();
  const goLearnMore = () => {
    router.push('/shop');
  };

  return (
    <div className={styles.membershipOffers}>
      <div className={styles.membershipOffers_title}>Our Membership Offerings</div>
      <div className={styles.membershipOffers_desc}>
        Upon signing up to one our packages, you will receive access to your customized member
        dashboard which will include your specified picks, key stats & trends, our weekly pro tip,
        hands on support & an expert bankroll management system.
      </div>
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
                <span className={styles.price}>$89.00</span>
              </div>
              <ul className={styles.plan_content_details_desc}>
                <li>Receive Access to ALL Plays for the Sport(s) of Your Choice</li>
                <li>Sports Include NBA, NFL, Soccer, MLB, NCAAF, NCAAB, UFC & Formula 1</li>
                <li>Customized Dashboard Including Automated Record Tracking</li>
                <li>Weekly, Monthly, Season & Playoff Packages Available. </li>
              </ul>
              <Button className={styles.learn_more_btn} onClick={goLearnMore}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className={`${styles.plan} ${styles.main_plan}`}>
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
                <div className={styles.price}>$40.00</div>
              </div>
              <ul className={styles.plan_content_details_desc}>
                <li>Receive Access to ALL Plays for ALL Sports, Including BONUS Plays</li>
                <li>Customized Dashboard Including Automated Record Tracking</li>
                <li>
                  Advanced Stats for Each Bet, Weekly Pro Tips & Bankroll Management Strategies
                </li>
                <li>Daily, Weekly, Monthly & Annual Packages Available. </li>
                <li>Daily Card Includes TheDailyStakes Protection</li>
              </ul>
              <Button className={styles.learn_more_btn} onClick={goLearnMore}>
                Learn More
              </Button>
            </div>
          </div>
          <div className={styles.plan_extra_content}>Best&nbsp;&nbsp;Deal!</div>
        </div>
        <div className={styles.plan}>
          <div className={styles.plan_content}>
            <div className={styles.plan_content_info}>
              <div className={styles.plan_content_title}>Fantasy</div>
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
                <li>DFS Lineups for Single Game & Tournament Style Contests</li>
                <li>Sports Include NBA, NFL & MLB</li>
                <li>Lineup Formats Included for DraftKings, Fanduel & Yahoo Sportsbooks</li>
                <li>Includes Advanced Stats, Projected Points, Player Props & Other Key Metrics</li>
                <li>Weekly, Monthly & Annual Packages Available</li>
              </ul>
              <Button className={styles.learn_more_btn} onClick={goLearnMore}>
                Learn More
              </Button>
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
    soccer: false
  });
  const toggleSelectCard = (prop: SpoortCardName) => {
    const copySelectedCards = Object.assign({}, selectedCards);
    copySelectedCards[prop] = !copySelectedCards[prop];
    setSelectedCards(copySelectedCards);
  };

  const sportsData: SportCardsSelection[] = [
    {
      name: 'VIP',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR ALL SPORTS',
      image: () => <NBA_SVG className={styles.sports_card_image} />,
      style: () => styles.nba_box,
      value: SpoortCardName.nba,
      selectedStyle: () => selectedCards.nba && styles.nba_box_active,
      selected: selectedCards.nba
    },
    {
      name: 'NBA',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR ALL SPORTS NBA',
      image: () => <NBA_SVG className={styles.sports_card_image} />,
      style: () => styles.nba_box,
      value: SpoortCardName.nba,
      selectedStyle: () => selectedCards.nba && styles.nba_box_active,
      selected: selectedCards.nba
    },
    {
      name: 'NFL',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR ALL SPORTS NFL',
      image: () => <NFL_SVG className={styles.sports_card_image} />,
      style: () => styles.nfl_box,
      value: SpoortCardName.nfl,
      selectedStyle: () => selectedCards.nfl && styles.nfl_box_active,
      selected: selectedCards.nfl
    },
    {
      name: 'MLB',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR ALL SPORTS MLB',
      image: () => <MLB_SVG className={styles.sports_card_image} />,
      style: () => styles.mlb_box,
      value: SpoortCardName.mlb,
      selectedStyle: () => selectedCards.mlb && styles.mlb_box_active,
      selected: selectedCards.mlb
    },
    {
      name: 'SOCCER',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR ALL SPORTS SOCCER',
      image: () => <SOCCER_SVG className={styles.sports_card_image} />,
      style: () => styles.soccer_box,
      value: SpoortCardName.soccer,
      selectedStyle: () => selectedCards.soccer && styles.soccer_box_active,
      selected: selectedCards.soccer
    },
    {
      name: 'FORMULA 1',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR ALL SPORTS FORMULA 1',
      image: () => <F1_SVG className={styles.sports_card_image} />,
      style: () => styles.f1_box,
      value: SpoortCardName.f1,
      selectedStyle: () => selectedCards.f1 && styles.f1_box_active,
      selected: selectedCards.f1
    },
    {
      name: 'UFC',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR ALL SPORTS UFC',
      image: () => <UFC_SVG className={styles.sports_card_image} />,
      style: () => styles.ufc_box,
      value: SpoortCardName.ufc,
      selectedStyle: () => selectedCards.ufc && styles.ufc_box_active,
      selected: selectedCards.ufc
    },
    {
      name: 'NCAAB',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR ALL SPORTS NCAAB',
      image: () => <NBA_SVG className={styles.sports_card_image} />,
      style: () => styles.nba_box,
      value: SpoortCardName.ncaab,
      selectedStyle: () => selectedCards.ncaab && styles.nba_box_active,
      selected: selectedCards.ncaab
    },
    {
      name: 'NCAAF',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR ALL SPORTS NCAAF',
      image: () => <NFL_SVG className={styles.sports_card_image} />,
      style: () => styles.nfl_box,
      value: SpoortCardName.ncaaf,
      selectedStyle: () => selectedCards.ncaaf && styles.nfl_box_active,
      selected: selectedCards.ncaaf
    },

    {
      name: 'NBA DFS',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR [ENTER SPORT]',
      image: () => <NBA_SVG className={styles.sports_card_image} />,
      style: () => styles.nba_box,
      value: SpoortCardName.nba_dfs,
      selectedStyle: () => selectedCards.nba_dfs && styles.nba_box_active,
      selected: selectedCards.nba_dfs
    },
    {
      name: 'NFL DFS',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR [ENTER SPORT]',
      image: () => <NFL_SVG className={styles.sports_card_image} />,
      style: () => styles.nfl_box,
      value: SpoortCardName.nfl_dfs,
      selectedStyle: () => selectedCards.nfl_dfs && styles.nfl_box_active,
      selected: selectedCards.nfl_dfs
    },
    {
      name: 'MLB DFS',
      description: 'ACCESS TO ALL PLAYS & PARLAYS FOR [ENTER SPORT]',
      image: () => <MLB_SVG className={styles.sports_card_image} />,
      style: () => styles.mlb_box,
      value: SpoortCardName.mlb_dfs,
      selectedStyle: () => selectedCards.mlb_dfs && styles.mlb_box_active,
      selected: selectedCards.mlb_dfs
    }
  ];

  const [sportsDataForMobile, setSportsDataForMobile] = useState<SportCardsSelection[]>([
    ...sportsData
  ]);

  useEffect(() => {
    console.log('sportsDataForMobile', sportsDataForMobile);
  }, [sportsDataForMobile]);
  return (
    <div className={styles.bet_on_sports}>
      <div className={styles.bet_on_sports_title}>
        Bet on any or all of these <strong>sports</strong>
      </div>
      <div className={styles.bet_on_sports_desc}>
        <p>Select the sports you would like to bet on and continue to checkout</p>
        <Button className={styles.checkout_btn}>Continue to checkout</Button>
      </div>

      <div className={styles.mobile_column_display}>
        <Button
          className={styles.mobile_display_buttons}
          onClick={() => setSportsDataForMobile(sportsData.slice(0, 1))}>
          VIP ALL ACCESS
        </Button>
        <Button
          className={styles.mobile_display_buttons}
          onClick={() => setSportsDataForMobile(sportsData.slice(1, 9))}>
          SPORTS CARD
        </Button>
        <Button
          className={styles.mobile_display_buttons}
          onClick={() => setSportsDataForMobile(sportsData.slice(9, 13))}>
          FANTASY SPORTS
        </Button>
        <div>
          <div>
            <div className={styles.sports_cards}>
              {sportsDataForMobile.map((item: SportCardsSelection) => (
                <div>
                  <div className={styles.sports_card}>
                    <div
                      className={`${styles.sports_card_box} ${item.style} ${item.selectedStyle}`}
                      onClick={() => toggleSelectCard(item.value)}>
                      {item.selected && (
                        <img
                          src="/images/check_mark.svg"
                          alt="Check mark Icon"
                          className={styles.sports_card_checkmark}
                        />
                      )}
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
              <div>
                <div className={styles.sports_card}>
                  <div
                    className={`${styles.sports_card_box} ${item.style} ${item.selectedStyle}`}
                    onClick={() => toggleSelectCard(item.value)}>
                    {item.selected && (
                      <img
                        src="/images/check_mark.svg"
                        alt="Check mark Icon"
                        className={styles.sports_card_checkmark}
                      />
                    )}
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

      <Button className={styles.mobile_checkout_btn}>Continue to checkout</Button>
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
                  src="/images/testimonial1.png"
                  alt="Testimonial Background"
                  className={styles.testimonial_image}
                />
              </LazyLoad>
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Carl ***** | New Jersey</div>
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
                  src="/images/testimonial1.png"
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
                  src="/images/testimonial1.png"
                  alt="Testimonial Background"
                  className={styles.testimonial_image}
                />
              </LazyLoad>
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Jason ****** | Colorado</div>
                <div className={styles.testimonial_desc}>NFL Sports Card</div>
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
                  src="/images/testimonial1.png"
                  alt="Testimonial Background"
                  className={styles.testimonial_image}
                />
              </LazyLoad>
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Trevor **** | Michigan</div>
                <div className={styles.testimonial_desc}>Fantasy Sports & Football Cards</div>
                <Rate allowHalf defaultValue={5} disabled />
                <div className={styles.testimonial_quote}>
                  “I&#39;ve always been a fan of player props and DFS picks. TheDailyStakes takes on
                  a unique approach to DFS & I love it. Affordable, consistent, and great
                  information. Excited to jump on their CFB & NFL packages again. 5 stars!”
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
                  src="/images/testimonial1.png"
                  alt="Testimonial Background"
                  className={styles.testimonial_image}
                />
              </LazyLoad>
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Marcus ****| Tennessee</div>
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
            <span>THE DAILY INSIGHTS</span>
            <Link href="/">
              <a>View More</a>
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
                  <img src="/images/news_bg.jpg" alt="News Background" />
                </LazyLoad>
                <div className={styles.news_content}>
                  <p className={styles.news_info}>Formula 1 | July 31, 2020 @ 1:11 PM</p>
                  <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                  <p className={styles.news_desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Link href="/">
                    <a>Read Article</a>
                  </Link>
                </div>
                <div className="news_overlay" />
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <LazyLoad height={590}>
                  <img src="/images/news_bg.jpg" alt="News Background" />
                </LazyLoad>
                <div className={styles.news_content}>
                  <p className={styles.news_info}>Formula 1 | July 31, 2020 @ 1:11 PM</p>
                  <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                  <p className={styles.news_desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Link href="/">
                    <a>Read Article</a>
                  </Link>
                </div>
                <div className="news_overlay" />
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <LazyLoad height={590}>
                  <img src="/images/news_bg.jpg" alt="News Background" />
                </LazyLoad>
                <div className={styles.news_content}>
                  <p className={styles.news_info}>Formula 1 | July 31, 2020 @ 1:11 PM</p>
                  <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                  <p className={styles.news_desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Link href="/">
                    <a>Read Article</a>
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
