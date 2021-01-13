/* eslint-disable react/display-name */
import { useState } from 'react';
import Head from 'next/head';
import { Row, Button } from 'antd';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import { CartAddOnType, CartType, CartSportCardType } from '@type/cart';
import {
  PlusIcon,
  EmptyCircleIcon,
  CheckedCircleIcon,
  NormalCheckIcon
} from '@components/SvgIcons';
import styles from '@styles/Shop.module.css';

export default function Shop() {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Shop</title>
      </Head>
      <AppLayout bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <MembershipOfferings />
          <div className={styles.offering_details}>
            <Intro />
            <ProductsAndCartBox />
            <FAQs />
          </div>
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

function MembershipOfferings() {
  const [currentPlan, setCurrentPlan] = useState<string>('all');
  return (
    <div className={styles.membershipOffers_plans}>
      <div className={`${styles.plan} ${currentPlan === 'sports_card' && styles.active}`}>
        <div className={styles.plan_content}>
          <div className={styles.plan_content_info} onClick={() => setCurrentPlan('sports_card')}>
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
          <div className={styles.plan_content_info} onClick={() => setCurrentPlan('all')}>
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
          <div className={styles.plan_content_info} onClick={() => setCurrentPlan('fantasy')}>
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
      <Row align={'top'}>
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

function FAQs() {
  return (
    <div className={styles.faqs}>
      <h4>VIP All Access Card FAQ</h4>
      <ul>
        <li>
          <PlusIcon className={styles.faqIcon} />
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</span>
        </li>
        <li>
          <PlusIcon className={styles.faqIcon} />
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</span>
        </li>
        <li>
          <PlusIcon className={styles.faqIcon} />
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</span>
        </li>
        <li>
          <PlusIcon className={styles.faqIcon} />
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</span>
        </li>
        <li>
          <PlusIcon className={styles.faqIcon} />
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</span>
        </li>
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
            <div>
              {cart.sportCard.title && <p>{cart.sportCard.title}</p>}
              {cart.addOn.title && <p>{`+ ${cart.addOn.title}`}</p>}
            </div>
            <div className={styles.totalPrice}>${totalPrice}.00</div>
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
