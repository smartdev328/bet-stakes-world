/* eslint-disable react/display-name */
import { useState } from 'react';
import Head from 'next/head';
import { Row, Button } from 'antd';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import { CartAddOnType, CartType, CartSportCardType } from '@type/Cart';
import {
  PlusIcon,
  EmptyCircleIcon,
  CheckedCircleIcon,
  NormalCheckIcon,
  MinusIcon
} from '@components/SvgIcons';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import styles from '@styles/Shop.module.css';
import { SportInfoType, PageProps } from '@type/Main';

export default function Shop({ token, subscriptions }: PageProps) {
  const [currentPlan, setCurrentPlan] = useState<string>('all');

  return (
    <>
      <Head>
        <title>The Daily Stakes - Shop</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <MembershipOfferings currentPlan={currentPlan} changePlan={setCurrentPlan} />
          {currentPlan === 'sports_card' && (
            <div className={styles.offering_details}>
              <IntroForSportsCard />
              <ProductsAndCartBoxForSportsCard />
              <FAQs title={'Sports Card FAQ'} />
            </div>
          )}
          {currentPlan === 'all' && (
            <div className={styles.offering_details}>
              <Intro />
              <ProductsAndCartBox />
              <FAQs title={'VIP All Access Card FAQ'} />
            </div>
          )}
          {currentPlan === 'fantasy' && (
            <div className={styles.offering_details}>
              <IntroForFantasy />
              <ProductsAndCartBoxForFantasy />
              <FAQs title={'FANTASY FAQ'} />
            </div>
          )}
        </div>
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <img src="/images/shop_dashboard.jpg" className={styles.bgImage} />
      <div className={styles.heroBannerContent}>
        <h1>The Shop</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <BannerSportsAndMatches />
    </div>
  );
}

type MembershipOfferingsPropsType = {
  currentPlan: string;
  changePlan: (_: string) => void;
};

function MembershipOfferings({ currentPlan, changePlan }: MembershipOfferingsPropsType) {
  return (
    <div className={styles.membershipOffers_plans}>
      <div className={`${styles.plan} ${currentPlan === 'sports_card' && styles.active}`}>
        <div className={styles.plan_content}>
          <div className={styles.plan_content_info} onClick={() => changePlan('sports_card')}>
            <div className={styles.plan_content_title}>Sports Card</div>
            <div className={styles.plan_content_desc}>
              <span>3.2k Active Players</span>
              <span>100k Total Winnings</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.plan} ${styles.main_plan} ${currentPlan === 'all' && styles.active}`}>
        <div className={styles.plan_content}>
          <div className={styles.plan_content_info} onClick={() => changePlan('all')}>
            <div className={styles.plan_content_title}>VIP ALL ACCESS CARD</div>
            <div className={styles.plan_content_desc}>
              <span>3.2k Active Players</span>
              <span>100k Total Winnings</span>
            </div>
            <LazyLoad>
              <img src="/images/offerings_active_ring.svg" alt="Offerings Active Background" />
            </LazyLoad>
          </div>
        </div>
        <div className={styles.plan_extra_content}>Best&nbsp;&nbsp;Deal!</div>
      </div>
      <div className={`${styles.plan} ${currentPlan === 'fantasy' && styles.active}`}>
        <div className={styles.plan_content}>
          <div className={styles.plan_content_info} onClick={() => changePlan('fantasy')}>
            <div className={styles.plan_content_title}>Fantasy</div>
            <div className={styles.plan_content_desc}>
              <span>3.2k Active Players</span>
              <span>100k Total Winnings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div className={styles.introSection}>
      <Row align={'top'} wrap={false} className={styles.introSectionRow}>
        <LazyLoad>
          <div className={styles.introSectionBg}>
            <img src="/images/All-sports-bg.svg" alt="All Sports Background" />
          </div>
        </LazyLoad>
        <div className={styles.introContent}>
          <div className={styles.sectionTitle}>About the VIP All Access Card</div>
          <div className={styles.introDesc}>
            Includes access to straight bets, parlays and betting strategies for ALL sports.
          </div>
        </div>
      </Row>
      <ul>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
      </ul>
      <div className={styles.extra_info}>
        *For Daily Card only. Money back guarantee if over 50% of plays are loses. No Questions
        asked*
      </div>
    </div>
  );
}

const FAQs_ARR = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit?'
];

function FAQs({ title }: { title: string }) {
  const [faqIsVisible, setFaqIsVisible] = useState<boolean[]>([]);
  const toggleFAQ = (index: number) => {
    const updated = faqIsVisible.slice();
    updated[index] = !updated[index];
    setFaqIsVisible(updated);
  };

  return (
    <div className={styles.faqs}>
      <h4>{title}</h4>
      <ul>
        {FAQs_ARR.map((faq: string, index: number) => (
          <li key={index}>
            <div className={styles.faq_title}>
              {!faqIsVisible[index] && (
                <PlusIcon className={styles.faqIcon} onClick={() => toggleFAQ(index)} />
              )}
              {faqIsVisible[index] && (
                <MinusIcon className={styles.faqIcon} onClick={() => toggleFAQ(index)} />
              )}
              <span>{faq}</span>
            </div>
            {faqIsVisible[index] && (
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductsAndCartBox() {
  const CardOptions: CartSportCardType[] = [
    {
      title: '* Daily *',
      price: 40
    },
    {
      title: 'Weekly',
      price: 120
    },
    {
      title: 'Monthly',
      price: 300
    },
    {
      title: 'Quarterly',
      price: 600
    },
    {
      title: 'Semi-Annual',
      price: 850
    },
    {
      title: 'Annual',
      price: 1000
    }
  ];
  const AddOns: CartAddOnType[] = [
    {
      title: 'Expert Bankroll MGMT',
      id: '',
      price: 55
    }
  ];
  const [cart, setCart] = useState<CartType>({ sportCard: CardOptions[0], addOn: AddOns[0] });

  const changeSportCard = (card: CartSportCardType) => {
    if (cart.sportCard.title === card.title) {
      setCart({
        ...cart,
        sportCard: {
          title: undefined,
          price: undefined
        }
      });
    } else {
      setCart({
        ...cart,
        sportCard: card
      });
    }
  };

  const changeAddOn = (addOn: CartAddOnType) => {
    if (cart.addOn.title === addOn.title) {
      setCart({
        ...cart,
        addOn: {
          title: undefined,
          price: undefined
        }
      });
    } else {
      setCart({
        ...cart,
        addOn
      });
    }
  };

  const totalPrice =
    (cart.sportCard.price ? cart.sportCard.price : 0) + (cart.addOn.price ? cart.addOn.price : 0);
  return (
    <>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select Card Type</div>
        <ul>
          {CardOptions.map((card, index) => (
            <li
              key={index}
              className={cart.sportCard.title === card.title ? styles.active : ''}
              onClick={() => changeSportCard(card)}>
              {cart.sportCard.title === card.title && (
                <CheckedCircleIcon className={styles.checkedStatusIcon} />
              )}
              {cart.sportCard.title !== card.title && (
                <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
              )}
              <span className={styles.sportsCard_name}>{card.title}</span>
              <span className={styles.sportsCard_value}>${card.price}.00</span>
            </li>
          ))}
        </ul>
        <div className={styles.cartBox}>
          <LazyLoad>
            <img src="/images/All-sports-bg.svg" alt="All Sports Background" />
          </LazyLoad>
          <div className={styles.cartBoxContent}>
            <h4>Package Total</h4>
            <div className={styles.cartBoxContentDesc}>
              <div>
                {cart.sportCard.title && <p>{cart.sportCard.title}</p>}
                {cart.addOn.title && <p>{`+ ${cart.addOn.title}`}</p>}
              </div>
              <div className={styles.totalPrice}>${totalPrice}.00</div>
            </div>
            <Button className={styles.addToCartBtn}>Add to Cart</Button>
          </div>
        </div>
      </div>
      <div className={styles.packageAddOns}>
        <div className={styles.sectionTitle}>Package Add-Ons</div>
        <ul>
          {AddOns.map((addOn, index) => (
            <li
              key={index}
              className={cart.addOn.title === addOn.title ? styles.active : ''}
              onClick={() => changeAddOn(addOn)}>
              {cart.addOn.title === addOn.title && (
                <CheckedCircleIcon className={styles.checkedStatusIcon} />
              )}
              {cart.addOn.title !== addOn.title && (
                <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
              )}
              <div className={styles.sportsCard_name_row}>
                <span className={styles.sportsCard_name}>{addOn.title}</span>
                <Link href="/">
                  <a>View Details</a>
                </Link>
              </div>
              <span className={styles.sportsCard_value}>${addOn.price}.00</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function IntroForFantasy() {
  return (
    <div className={styles.introSection}>
      <Row align={'top'} wrap={false} className={styles.introSectionRow}>
        <div className={styles.introContent}>
          <div className={styles.sectionTitle}>About the Fantasy Picks</div>
          <div className={styles.introDesc}>
            Ut ornare amet adipiscing eu augue. Metus eget in maecenas elementum maecenas duis
            mauris.
          </div>
        </div>
      </Row>
      <ul>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
      </ul>
    </div>
  );
}

function ProductsAndCartBoxForFantasy() {
  const CardOptions: CartSportCardType[] = [
    {
      title: 'Daily Lineups',
      price: 10
    },
    {
      title: 'Seasonal Lineups',
      price: 100
    }
  ];
  const AddOns: CartAddOnType[] = [
    {
      title: 'Season Lineup Changes',
      id: '',
      price: 40
    }
  ];
  const [cart, setCart] = useState<CartType>({ sportCard: CardOptions[0], addOn: AddOns[0] });
  const [sportsStatus, setSportsStatus] = useState<boolean[]>([]);

  const changeSportCard = (card: CartSportCardType) => {
    if (cart.sportCard.title === card.title) {
      setCart({
        ...cart,
        sportCard: {
          title: undefined,
          price: undefined
        }
      });
    } else {
      setCart({
        ...cart,
        sportCard: card
      });
    }
  };

  const changeAddOn = (addOn: CartAddOnType) => {
    if (cart.addOn.title === addOn.title) {
      setCart({
        ...cart,
        addOn: {
          title: undefined,
          price: undefined
        }
      });
    } else {
      setCart({
        ...cart,
        addOn
      });
    }
  };

  const SPORTS_INFO = [
    {
      name: 'NBA',
      id: 'NBA',
      background: '#EC4C15',
      logo: () => <NBA_SVG className={styles.sports_logo} />
    },
    {
      name: 'NFL',
      id: 'NFL',
      background: '#91442A',
      logo: () => <NFL_SVG className={styles.sports_logo} />
    },
    {
      name: 'MLB',
      id: 'MLB',
      background: '#1878FB',
      logo: () => <MLB_SVG className={styles.sports_logo} />
    }
  ];
  const onChangeItemAt = (index: number) => {
    const items = sportsStatus.slice();
    items[index] = !items[index];
    setSportsStatus(items);
  };

  const totalPrice =
    (cart.sportCard.price ? cart.sportCard.price : 0) + (cart.addOn.price ? cart.addOn.price : 0);
  return (
    <>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select any number of sports</div>
        <div className={styles.sportsTypeContent}>
          {SPORTS_INFO.map((sport: SportInfoType, index: number) => (
            <div key={index}>
              <Button className={styles.dropdownBtnWrapper} onClick={() => onChangeItemAt(index)}>
                <div
                  className={`${styles.dropdownBtn} ${styles['dropdown_' + sport.id]}`}
                  style={{
                    background: sportsStatus[index] ? sport.background : ''
                  }}>
                  {sport.logo()}
                  <span>{sport.name}</span>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select Card Type</div>
        <ul>
          {CardOptions.map((card, index) => (
            <li
              key={index}
              className={cart.sportCard.title === card.title ? styles.active : ''}
              onClick={() => changeSportCard(card)}>
              {cart.sportCard.title === card.title && (
                <CheckedCircleIcon className={styles.checkedStatusIcon} />
              )}
              {cart.sportCard.title !== card.title && (
                <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
              )}
              <span className={styles.sportsCard_name}>{card.title}</span>
              <span className={styles.sportsCard_value}>${card.price}.00</span>
            </li>
          ))}
        </ul>
        <div className={styles.cartBox}>
          <LazyLoad>
            <img src="/images/All-sports-bg.svg" alt="All Sports Background" />
          </LazyLoad>
          <div className={styles.cartBoxContent}>
            <h4>Package Total</h4>
            <div className={styles.cartBoxContentDesc}>
              <div>
                {cart.sportCard.title && <p>{cart.sportCard.title}</p>}
                {cart.addOn.title && <p>{`+ ${cart.addOn.title}`}</p>}
              </div>
              <div className={styles.totalPrice}>${totalPrice}.00</div>
            </div>
            <Button className={styles.addToCartBtn}>Add to Cart</Button>
          </div>
        </div>
      </div>
      <div className={styles.packageAddOns}>
        <div className={styles.sectionTitle}>Package Add-Ons</div>
        <ul>
          {AddOns.map((addOn, index) => (
            <li
              key={index}
              className={cart.addOn.title === addOn.title ? styles.active : ''}
              onClick={() => changeAddOn(addOn)}>
              {cart.addOn.title === addOn.title && (
                <CheckedCircleIcon className={styles.checkedStatusIcon} />
              )}
              {cart.addOn.title !== addOn.title && (
                <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
              )}
              <div className={styles.sportsCard_name_row}>
                <span className={styles.sportsCard_name}>{addOn.title}</span>
                <Link href="/">
                  <a>View Details</a>
                </Link>
              </div>
              <span className={styles.sportsCard_value}>${addOn.price}.00</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function IntroForSportsCard() {
  return (
    <div className={styles.introSection}>
      <Row align={'top'} wrap={false} className={styles.introSectionRow}>
        <div className={styles.introContent}>
          <div className={styles.sectionTitle}>About the Sports Card</div>
          <div className={styles.introDesc}>
            Includes access to straight bets, parlays and betting strategies for the given sport(s)
            of your choice.
          </div>
        </div>
      </Row>
      <div className={`${styles.introDesc} ${styles.mobile_introDesc}`}>
        Includes access to straight bets, parlays and betting strategies for the given sport(s) your
        choice.
      </div>
      <ul>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
      </ul>
    </div>
  );
}

function ProductsAndCartBoxForSportsCard() {
  const CardOptions: CartSportCardType[] = [
    {
      title: 'Weekly',
      price: 89
    },
    {
      title: 'Monthly',
      price: 289
    }
  ];
  const AddOns: CartAddOnType[] = [
    {
      title: 'Expert Bankroll MGMT',
      id: '',
      price: 55
    }
  ];
  const [cart, setCart] = useState<CartType>({ sportCard: CardOptions[0], addOn: AddOns[0] });
  const [sportsStatus, setSportsStatus] = useState<boolean[]>([]);

  const changeSportCard = (card: CartSportCardType) => {
    if (cart.sportCard.title === card.title) {
      setCart({
        ...cart,
        sportCard: {
          title: undefined,
          price: undefined
        }
      });
    } else {
      setCart({
        ...cart,
        sportCard: card
      });
    }
  };

  const changeAddOn = (addOn: CartAddOnType) => {
    if (cart.addOn.title === addOn.title) {
      setCart({
        ...cart,
        addOn: {
          title: undefined,
          price: undefined
        }
      });
    } else {
      setCart({
        ...cart,
        addOn
      });
    }
  };

  const SPORTS_INFO = [
    {
      name: 'NBA',
      id: 'NBA',
      background: '#EC4C15',
      logo: () => <NBA_SVG className={styles.sports_logo} />
    },
    {
      name: 'NFL',
      id: 'NFL',
      background: '#91442A',
      logo: () => <NFL_SVG className={styles.sports_logo} />
    },
    {
      name: 'MLB',
      id: 'MLB',
      background: '#1878FB',
      logo: () => <MLB_SVG className={styles.sports_logo} />
    },
    {
      name: 'NCAAF',
      id: 'NCAAF',
      background: '#91442A',
      logo: () => <NFL_SVG className={styles.sports_logo} />
    },
    {
      name: 'NCAAB',
      id: 'NCAAB',
      background: '#EC4C15',
      logo: () => <NBA_SVG className={styles.sports_logo} />
    },
    {
      name: 'SOCCER',
      id: 'SOCCER',
      background: '#6DCF40',
      logo: () => <SOCCER_SVG className={styles.sports_logo} />
    },
    {
      name: 'UFC',
      id: 'UFC',
      background: '#F9282B',
      logo: () => <UFC_SVG className={styles.sports_logo} />
    },
    {
      name: 'FORMULA 1',
      id: 'F1',
      background: '#505054',
      logo: () => <F1_SVG className={styles.sports_logo} />
    }
  ];

  const onChangeItemAt = (index: number) => {
    const items = sportsStatus.slice();
    items[index] = !items[index];
    setSportsStatus(items);
  };

  const totalPrice =
    (cart.sportCard.price ? cart.sportCard.price : 0) + (cart.addOn.price ? cart.addOn.price : 0);
  return (
    <>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select any number of sports</div>
        <div className={styles.sportsTypeContent}>
          {SPORTS_INFO.map((sport: SportInfoType, index: number) => (
            <div key={index}>
              <Button className={styles.dropdownBtnWrapper} onClick={() => onChangeItemAt(index)}>
                <div
                  className={`${styles.dropdownBtn} ${styles['dropdown_' + sport.id]}`}
                  style={{
                    background: sportsStatus[index] ? sport.background : ''
                  }}>
                  {sport.logo()}
                  <span>{sport.name}</span>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select Card Type</div>
        <ul>
          {CardOptions.map((card, index) => (
            <li
              key={index}
              className={cart.sportCard.title === card.title ? styles.active : ''}
              onClick={() => changeSportCard(card)}>
              {cart.sportCard.title === card.title && (
                <CheckedCircleIcon className={styles.checkedStatusIcon} />
              )}
              {cart.sportCard.title !== card.title && (
                <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
              )}
              <span className={styles.sportsCard_name}>{card.title}</span>
              <span className={styles.sportsCard_value}>${card.price}.00</span>
            </li>
          ))}
        </ul>
        <div className={styles.cartBox}>
          <LazyLoad>
            <img src="/images/All-sports-bg.svg" alt="All Sports Background" />
          </LazyLoad>
          <div className={styles.cartBoxContent}>
            <h4>Package Total</h4>
            <div className={styles.cartBoxContentDesc}>
              <div>
                {cart.sportCard.title && <p>{cart.sportCard.title}</p>}
                {cart.addOn.title && <p>{`+ ${cart.addOn.title}`}</p>}
              </div>
              <div className={styles.totalPrice}>${totalPrice}.00</div>
            </div>
            <Button className={styles.addToCartBtn}>Add to Cart</Button>
          </div>
        </div>
      </div>
      <div className={styles.packageAddOns}>
        <div className={styles.sectionTitle}>Package Add-Ons</div>
        <ul>
          {AddOns.map((addOn, index) => (
            <li
              key={index}
              className={cart.addOn.title === addOn.title ? styles.active : ''}
              onClick={() => changeAddOn(addOn)}>
              {cart.addOn.title === addOn.title && (
                <CheckedCircleIcon className={styles.checkedStatusIcon} />
              )}
              {cart.addOn.title !== addOn.title && (
                <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
              )}
              <div className={styles.sportsCard_name_row}>
                <span className={styles.sportsCard_name}>{addOn.title}</span>
                <Link href="/">
                  <a>View Details</a>
                </Link>
              </div>
              <span className={styles.sportsCard_value}>${addOn.price}.00</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
