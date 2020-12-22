import Head from 'next/head';
import { Image, Carousel, Button, Dropdown, Menu } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { createRef, RefObject, useState } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import AppLayout from '@components/AppLayout';
import styles from '@styles/Home.module.css';

type ArrowIconProps = {
  className: string;
  onClick: () => void;
};

type SportInfoType = {
  name: string;
  logo: string;
};

function ArrowIcon({ className, onClick }: ArrowIconProps) {
  return (
    <svg
      width="12"
      height="20"
      className={className}
      viewBox="0 0 12 20"
      fill="none"
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M0 18.03L1.77 19.8L11.67 9.9L1.77 0L0 1.77L8.13 9.9L0 18.03H0Z" fill="#FFC700" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>The Daily Stakes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <HeroBanner />
        <MembershipOfferings />
        <OurDailyStandards />
      </AppLayout>
    </>
  );
}

const SPORTS_INFO = [
  {
    name: 'NBA',
    logo: '/images/nba_btn.svg'
  },
  {
    name: 'NFL',
    logo: '/images/nfl_btn.svg'
  },
  {
    name: 'MLB',
    logo: '/images/mlb_btn.svg'
  },
  {
    name: 'UFC',
    logo: '/images/ufc_btn.svg'
  },
  {
    name: 'Formula 1',
    logo: '/images/f1_btn.svg'
  },
  {
    name: 'SOCCER',
    logo: '/images/soccer_btn.svg'
  }
];

const MATCHES = [
  {
    name: 'NBA | MON 07/31 3:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 4:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 5:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 6:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 7:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 8:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 9:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 10:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  }
];

function HeroBanner() {
  const [nextArrowVisible, setNextArrowVisible] = useState<boolean>(true);
  const [prevArrowVisible, setPrevArrowVisible] = useState<boolean>(false);
  const [sportMenuOpen, setSportMenuOpen] = useState<boolean>(false);
  const [selectedSport, setSelectedSport] = useState<SportInfoType>(SPORTS_INFO[0]);
  const carouselRef: RefObject<CarouselRef> = createRef();

  const goCarouselBack = () => {
    carouselRef.current?.prev();
  };
  const goCarouselNext = () => {
    carouselRef.current?.next();
  };
  const changeSport = (sport: SportInfoType) => {
    setSelectedSport(sport);
    setSportMenuOpen(false);
  };
  const changeMenuVisible = (status: boolean) => {
    setSportMenuOpen(status);
  };
  const beforeSlideChange = (_: number, next: number) => {
    const slides = document.querySelectorAll('.matches-carousel .slick-dots li').length;
    if (slides == next + 1) {
      setNextArrowVisible(false);
    } else if (next == 0) {
      setPrevArrowVisible(false);
    } else {
      setPrevArrowVisible(true);
      setNextArrowVisible(true);
    }
  };

  const menu = (
    <Menu className={styles.sportMenu}>
      {SPORTS_INFO.map((sport) => (
        <Menu.Item
          key={sport.name}
          className={styles.sportMenuItem}
          onClick={() => changeSport(sport)}>
          {sport.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const responsive = [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 5,
        dots: true
      }
    },
    {
      breakpoint: 1120,
      settings: {
        slidesToShow: 4,
        dots: true
      }
    },
    {
      breakpoint: 940,
      settings: {
        slidesToShow: 3,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    }
  ];

  return (
    <section className="hero-banner">
      <div className={styles.heroBanner}>
        <div className={styles.heroBannerLeft}>
          <div className={styles.container}>
            <div className={styles.main_desc}>sports is not a game of chance,</div>
            <div className={styles.second_desc}>
              <span>it’s a game of skill</span>
            </div>
            <ul>
              <li>
                <div className={styles.square_icon} />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              </li>
              <li>
                <div className={styles.square_icon} />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              </li>
              <li>
                <div className={styles.square_icon} />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.heroBannerRight}>
          <Image
            preview={false}
            src="/images/hero_banner_right_2.svg"
            className={styles.heroBannerRightBg}
          />
          <div className={styles.container}>
            <Carousel autoplay className={styles.carousel}>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button type="primary" className={styles.carousel_slide_subscribeBtn}>
                    Subscribe Now
                  </Button>
                </div>
              </div>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button type="primary" className={styles.carousel_slide_subscribeBtn}>
                    Subscribe Now
                  </Button>
                </div>
              </div>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button type="primary" className={styles.carousel_slide_subscribeBtn}>
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
        <div className={styles.sports_and_matches}>
          <div className={styles.container}>
            <div className={styles.dropdownBox}>
              <Dropdown
                overlay={menu}
                onVisibleChange={changeMenuVisible}
                placement="bottomLeft"
                trigger={['click']}>
                <div className={styles.dropdownBtn}>
                  <Image
                    preview={false}
                    src={selectedSport.logo}
                    className={styles.dropdownBtnImg}
                  />
                  {sportMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
                  {!sportMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
                </div>
              </Dropdown>
            </div>
            <div className={styles.matchesCarouselView}>
              {prevArrowVisible && (
                <ArrowIcon className={styles.arrow_back_icon} onClick={goCarouselBack} />
              )}
              {nextArrowVisible && (
                <ArrowIcon className={styles.arrow_forward_icon} onClick={goCarouselNext} />
              )}
              <Carousel
                ref={carouselRef}
                dots={true}
                infinite={false}
                className="matches-carousel"
                responsive={responsive}
                initialSlide={0}
                beforeChange={beforeSlideChange}
                slidesToShow={6}>
                {MATCHES.map((match, index) => (
                  <div key={index}>
                    <div className={styles.match_view}>
                      <div className={styles.match_title}>{match.name}</div>
                      <div className={styles.match_content}>
                        <div className={styles.match_content_left}>
                          <div className={styles.team1}>
                            <div className={styles.team_logo_container}>
                              <Image
                                preview={false}
                                src={'/images/team_tor.png'}
                                className={styles.team_logo}
                              />
                            </div>
                            <span>{match.team1}</span>
                          </div>
                          <div className={styles.team2}>
                            <div className={styles.team_logo_container}>
                              <Image
                                preview={false}
                                src={'/images/team_lal.png'}
                                className={styles.team_logo}
                              />
                            </div>
                            <span>{match.team2}</span>
                          </div>
                        </div>
                        <div className={styles.match_content_right}>{match.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className={styles.gradient_bg}></div>
        </div>
      </div>
    </section>
  );
}

function MembershipOfferings() {
  return (
    <div className={styles.membershipOffers}>
      <div className={styles.membershipOffers_title}>Our Membership Offerings</div>
      <div className={styles.membershipOffers_desc}>
        Parturient luctus egestas venenatis ante euismod vitae. At molestie vitae pellentesque elit
        nam elementum nunc.
      </div>
      <div className={styles.membershipOffers_plans}>
        <div className={styles.plan}>
          <div className={styles.plan_content}>
            <div className={styles.plan_content_info}>
              <div className={styles.plan_content_title}>Sports Card</div>
              <div className={styles.plan_content_desc}>
                <span>3.2k Active Players</span>
                <span>100k Total Winnings</span>
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
                <li>Lorem ipsum dolor sit amet, consectetur</li>
                <li>Adipiscing elit. Sagittis pellentesque nulla</li>
                <li>Volutpat arcu. Elit, eget at neque auctor.</li>
                <li>Vignissim nisl risus vulputate Faucibus libero</li>
                <li>Morbi viverra</li>
              </ul>
              <Button className={styles.learn_more_btn}>Learn More</Button>
            </div>
          </div>
        </div>
        <div className={`${styles.plan} ${styles.main_plan}`}>
          <div className={styles.plan_content}>
            <div className={styles.plan_content_info}>
              <div className={styles.plan_content_title}>VIP ALL ACCESS CARD</div>
              <div className={styles.plan_content_desc}>
                <span>3.2k Active Players</span>
                <span>100k Total Winnings</span>
              </div>
            </div>
            <div className={styles.plan_content_details}>
              <div className={styles.price_view}>
                <img
                  src="/images/deal_circle.svg"
                  className={styles.deal_circle}
                  alt="Big Deal Circle"
                />
                <div>
                  <strong>All sports Daily</strong> Starting at
                </div>
                <div className={styles.price}>$40.00</div>
              </div>
              <ul className={styles.plan_content_details_desc}>
                <li>Lorem ipsum dolor sit amet, consectetur</li>
                <li>Adipiscing elit. Sagittis pellentesque nulla</li>
                <li>Volutpat arcu. Elit, eget at neque auctor.</li>
                <li>Vignissim nisl risus vulputate Faucibus libero</li>
                <li>Morbi viverra</li>
              </ul>
              <Button className={styles.learn_more_btn}>Learn More</Button>
            </div>
          </div>
          <div className={styles.plan_extra_content}>Best&nbsp;&nbsp;Deal!</div>
        </div>
        <div className={styles.plan}>
          <div className={styles.plan_content}>
            <div className={styles.plan_content_info}>
              <div className={styles.plan_content_title}>Fantasy</div>
              <div className={styles.plan_content_desc}>
                <span>3.2k Active Players</span>
                <span>100k Total Winnings</span>
              </div>
            </div>
            <div className={styles.plan_content_details}>
              <div className={styles.price_view}>
                <div>
                  <strong>Daily Lineups</strong> Starting at
                </div>
                <div className={styles.price}>$10.00</div>
              </div>
              <ul className={styles.plan_content_details_desc}>
                <li>Lorem ipsum dolor sit amet, consectetur</li>
                <li>Adipiscing elit. Sagittis pellentesque nulla</li>
                <li>Volutpat arcu. Elit, eget at neque auctor.</li>
                <li>Vignissim nisl risus vulputate Faucibus libero</li>
                <li>Morbi viverra</li>
              </ul>
              <Button className={styles.learn_more_btn}>Learn More</Button>
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
      <div className={styles.daily_standards_title}>
        Our daily
        <br />
        standards
      </div>
      <div className={styles.daily_standards_list}>
        <div className={styles.daily_standards_item}>
          <Image
            src={'/images/daily_standards_analytics.svg'}
            className={styles.daily_standards_icon}
          />
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Analytical Driven</h4>
              <img src="/images/wave.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              Numbers tell the story to everything we do. Every pick, every play, every action is
              researched and analysed to ensure our plays are a step ahead of the field. We never
              release a pick for the sake of filling our card (NO Fluff Picks)
            </p>
          </div>
        </div>
        <div className={styles.daily_standards_item}>
          <Image
            src={'/images/daily_standards_customer.svg'}
            className={styles.daily_standards_icon}
          />
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Customer Focused</h4>
              <img src="/images/wave.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              Serving our customers remains at the forefront of our business. Our entire team is
              available by email or by instagram around the clock. Refunds are given if there are
              any errors receiving picks.
            </p>
          </div>
        </div>
        <div className={styles.daily_standards_item}>
          <Image
            src={'/images/daily_standards_working.svg'}
            className={styles.daily_standards_icon}
          />
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Hardest Working</h4>
              <img src="/images/wave2.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              Plain and simple no one else will ever out work our team. Our objective is clear, help you win more plays.
            </p>
          </div>
        </div>
        <div className={styles.daily_standards_item}>
          <Image
            src={'/images/daily_standards_pedigre.svg'}
            className={styles.daily_standards_icon}
          />
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Pedigre</h4>
              <img src="/images/wave4.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              Time and time again we see our picks come out on top. While we will not claim
              enormously high and unrealistic win rates, our numbers, our picks, our work, cannot be
              beat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
