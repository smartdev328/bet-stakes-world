/* eslint-disable react/display-name */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Spin } from 'antd';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { AppLayout, BannerSportsAndMatches, CartDrawer } from '@components/index';
import { CartItem } from '@type/Cart';
import {
  PlusIcon,
  EmptyCircleIcon,
  CheckedCircleIcon,
  NormalCheckIcon,
  MinusIcon,
  CloseIcon
} from '@components/SvgIcons';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import styles from '@styles/Shop.module.css';
import { PageProps } from '@type/Main';
import PackageAPIs from '@apis/package.apis';
import { BillingPlan, Package } from '@type/Packages';
import { Sport } from '@type/Sports';
import { ReduxState } from '@redux/reducers';
import { FAQsARR, FAQsDesc } from '@constants/index';

type ProductsAndCartBoxProps = {
  sports: Sport[];
  pack: Package;
  cartItems: CartItem[];
  addToCart: (pack: Package, _: CartItem[]) => void;
  changeTempCart: (pack: Package, _: CartItem[]) => void;
};

export default function Shop({ token, subscriptions, packages, sports }: PageProps) {
  const { query } = useRouter();
  const [currentPlan, setCurrentPlan] = useState<string>('');
  const { items: cartItems } = useSelector((state: ReduxState) => state.cart);
  const [tempCartItems, setTempCartItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sports.length > 0) {
      if (typeof query.plan === 'string' && typeof query.plan !== undefined) {
        setCurrentPlan(query.plan);
      } else {
        setCurrentPlan('all');
      }
    }
  }, [query, sports]);

  useEffect(() => {
    setTempCartItems(cartItems);
  }, []);

  const changeTempCart = (pack: Package, items: CartItem[]) => {
    const newItems = tempCartItems.filter((item) => item.plan.package !== pack.id);
    if (pack.name.indexOf('VIP All Access') > -1) {
      items.forEach((item) => {
        newItems.push(item);
      });
    } else {
      items.forEach((item) => {
        const idx = newItems.findIndex(
          (cartIt) => cartIt.plan.id === item.plan.id && cartIt.sports?.id === item.sports?.id
        );
        if (idx < 0) {
          newItems.push(item);
        }
      });
    }
    setTempCartItems(newItems);
  };

  const addToCart = (pack: Package, items: CartItem[]) => {
    if (items.length === 0) {
      return;
    }
    const newItems = cartItems.filter((item) => item.plan.package !== pack.id);
    if (pack.name.indexOf('VIP All Access') > -1) {
      items.forEach((item) => {
        newItems.push(item);
      });
    } else {
      items.forEach((item) => {
        const idx = newItems.findIndex(
          (cartIt) => cartIt.plan.id === item.plan.id && cartIt.sports?.id === item.sports?.id
        );
        if (idx < 0) {
          newItems.push(item);
        }
      });
    }
    dispatch({ type: 'UPDATE_CART', payload: newItems });
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const updateCart = (items: CartItem[]) => {
    dispatch({ type: 'UPDATE_CART', payload: items });
    setTempCartItems(items);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Shop</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        {packages && (
          <CartDrawer
            open={isDrawerOpen}
            cartItems={cartItems}
            onClose={closeDrawer}
            packages={packages}
            onChangeCart={updateCart}
          />
        )}
        <HeroBanner />
        <div className={styles.container}>
          <MembershipOfferings currentPlan={currentPlan} changePlan={setCurrentPlan} />
          {currentPlan === 'sports_card' && (
            <div className={styles.offering_details}>
              <IntroForSportsCard />
              {packages && (
                <ProductsAndCartBoxForSportsCard
                  sports={sports}
                  cartItems={tempCartItems}
                  addToCart={addToCart}
                  changeTempCart={changeTempCart}
                  pack={packages.filter((pack) => pack.name === 'Sports Card')[0]}
                />
              )}
              <FAQs title={'Sports Card FAQ'} currentPlan={currentPlan} />
            </div>
          )}
          {currentPlan === 'all' && (
            <div className={styles.offering_details}>
              <Intro />
              {packages && (
                <ProductsAndCartBox
                  sports={sports}
                  cartItems={tempCartItems}
                  addToCart={addToCart}
                  changeTempCart={changeTempCart}
                  pack={packages.filter((pack) => pack.name === 'VIP All Access')[0]}
                />
              )}
              <FAQs title={'VIP All Access Card FAQ'} currentPlan={currentPlan} />
            </div>
          )}
          {currentPlan === 'fantasy' && (
            <div className={styles.offering_details}>
              <IntroForFantasy />
              {packages && (
                <ProductsAndCartBoxForFantasy
                  sports={sports}
                  cartItems={tempCartItems}
                  changeTempCart={changeTempCart}
                  addToCart={addToCart}
                  pack={packages.filter((pack) => pack.name === 'Fantasy')[0]}
                />
              )}
              <FAQs title={'FANTASY FAQ'} currentPlan={currentPlan} />
            </div>
          )}
          {currentPlan === '' && (
            <div className={styles.emptyContent}>
              <Spin size="large" />
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
              <span>ALL PLAYS FOR THE SPORT(S) OF YOUR CHOICE.</span>
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
              <span>ALL PLAYS. ALL SPORTS.</span>
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
              <span>OPTIMAL DFS LINEUPS</span>
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
          <div className={styles.sectionTitle}>VIP All Access Card</div>
          <div className={styles.introDesc}>
            Includes Access to Straight Bets, Parlays, Player Props, Bonus Wildcard Parlays, & other
            Bet Types for All Sports.
          </div>
        </div>
      </Row>
      <ul>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Sports Include NBA, MLB, NFL, Soccer, NCAAF, NCAAB, UFC & Formula 1
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Customized Dashboard Including Automated Record Tracking
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Advanced Stats for Each Bet, Weekly Pro Tips & Bankroll Management Strategies
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Monthly & Annual Packages Include In-Game Bets
        </li>
      </ul>
      <div className={styles.extra_info}>
        *The DailyStakes Protection: For the Daily VIP All Access Card only, if over 50% of the
        plays are losses, the next day is FREE*
      </div>
    </div>
  );
}

type FAQPropsType = {
  title: string;
  currentPlan: 'all' | 'sports_card' | 'fantasy';
};

function FAQs({ title, currentPlan }: FAQPropsType) {
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
        {FAQsARR[currentPlan].map((faq: string, index: number) => (
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
              <p dangerouslySetInnerHTML={{ __html: FAQsDesc[currentPlan][index] }}></p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductsAndCartBox({
  pack,
  addToCart,
  cartItems,
  changeTempCart
}: ProductsAndCartBoxProps) {
  pack.billing_plans.sort(function (a, b) {
    return a.price - b.price >= 0 ? 1 : -1;
  });
  const [tempCart, setTempCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartFromProps(cartItems);
  }, [cartItems]);

  const setCartFromProps = (cartItems: CartItem[]) => {
    const itemsFromCart = cartItems.filter((cartIt) => cartIt.plan.package === pack.id);
    setTempCart(
      itemsFromCart.length > 0
        ? itemsFromCart
        : [
            {
              sports: undefined,
              plan: pack.billing_plans[0],
              pack,
              auto_renewal: false,
              owner: 0
            }
          ]
    );
  };

  const changeSportCard = (plan: BillingPlan) => {
    const newCart = [
      {
        sports: undefined,
        plan,
        pack,
        auto_renewal: false,
        owner: 0
      }
    ];
    setTempCart(newCart);
    changeTempCart(pack, newCart);
  };

  let totalPrice = 0;
  tempCart.forEach((item) => {
    totalPrice += item.plan.price;
  });

  pack.billing_plans.sort((a, b) => (a.price - b.price > 0 ? 1 : -1));
  const billingPlans = pack.billing_plans.filter((plan) => plan.description !== 'add-on');

  return (
    <>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select Card Type</div>
        <ul>
          {billingPlans.map((plan: BillingPlan, index: number) => (
            <li
              key={index}
              className={tempCart[0]?.plan.id === plan.id ? styles.active : ''}
              onClick={() => changeSportCard(plan)}>
              {tempCart[0]?.plan.id === plan.id && (
                <CheckedCircleIcon className={styles.checkedStatusIcon} />
              )}
              {tempCart[0]?.plan.id !== plan.id && (
                <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
              )}
              <span className={styles.sportsCard_name}>{plan.duration}</span>
              <span className={styles.sportsCard_value}>${plan.price}.00</span>
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
              <div>{tempCart[0] && <p>{tempCart[0]?.plan.name}</p>}</div>
              <div className={styles.totalPrice}>${totalPrice}.00</div>
            </div>
            <Button className={styles.addToCartBtn} onClick={() => addToCart(pack, tempCart)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function IntroForFantasy() {
  return (
    <div className={styles.introSection}>
      <Row align={'top'} wrap={false} className={styles.introSectionRow}>
        <div className={styles.introContent}>
          <div className={styles.sectionTitle}>Fantasy Picks</div>
          <div className={styles.introDesc}>
            Includes Access to Main Slate & Single Slate Tournaments for DraftKings, Fanduel & Yahoo
            Sports Formats.
          </div>
        </div>
      </Row>
      <ul>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Advanced Player Stats & Trends for Each Optimal DFS Lineup Released
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Projected Points, Expected Value, Player Prop Comparisons & Bankroll Tips
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Our Annual VIP Fantasy Package Includes NBA, NFL & MLB
        </li>
      </ul>
    </div>
  );
}

function ProductsAndCartBoxForFantasy({
  sports,
  pack,
  addToCart,
  cartItems,
  changeTempCart
}: ProductsAndCartBoxProps) {
  pack.billing_plans.sort(function (a, b) {
    return a.price - b.price >= 0 ? 1 : -1;
  });
  const [tempCart, setTempCart] = useState<CartItem[]>([]);

  const [activeSport, setActiveSport] = useState<Sport>(sports[0]);

  useEffect(() => {
    setCartFromProps(cartItems);
  }, [cartItems]);

  const setCartFromProps = (cartItems: CartItem[]) => {
    const itemsFromCart = cartItems.filter((cartIt) => cartIt.plan.package === pack.id);
    setTempCart(
      itemsFromCart.length > 0
        ? itemsFromCart
        : [
            {
              sports: sports[0],
              plan: pack.billing_plans[0],
              pack,
              auto_renewal: false,
              owner: 0
            }
          ]
    );
  };

  const changeSportCard = (plan: BillingPlan) => {
    const newCart = tempCart.slice();
    const itemIdx = newCart.findIndex((item) => item.sports?.id === activeSport.id);
    if (itemIdx > -1) {
      if (newCart[itemIdx].plan.duration !== plan.duration) {
        newCart.splice(itemIdx, 1);
        newCart.push({
          sports: activeSport,
          plan,
          pack,
          auto_renewal: false,
          owner: 10
        });
      } else {
        newCart.splice(itemIdx, 1);
      }
    } else {
      newCart.push({
        sports: activeSport,
        plan,
        pack,
        auto_renewal: false,
        owner: 10
      });
    }
    setTempCart(newCart);
    changeTempCart(pack, newCart);
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

  const onChangeItemAt = (sport: Sport) => {
    setActiveSport(sport);
  };

  const removeCartAt = (cart: any, index: number) => {
    const newCart = cart;
    newCart.splice(index, 1);
    changeTempCart(pack, newCart);
  };

  let totalPrice = 0;
  tempCart.forEach((item) => {
    totalPrice += item.plan.price;
  });
  pack.billing_plans.sort((a, b) => (a.price - b.price > 0 ? 1 : -1));
  const billingPlans = pack.billing_plans.filter((plan) => plan.description !== 'add-on');

  return (
    <>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select any number of sports</div>
        <div className={styles.sportsTypeContent}>
          {sports.slice(0, 3).map((sport: Sport, index: number) => (
            <div key={index}>
              <Button className={styles.dropdownBtnWrapper} onClick={() => onChangeItemAt(sport)}>
                <div
                  className={`${styles.dropdownBtn} ${
                    styles[
                      'dropdown_' +
                        SPORTS_INFO.filter(
                          (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                        )[0]?.id
                    ]
                  }`}
                  style={{
                    background:
                      activeSport.id === sport.id
                        ? SPORTS_INFO.filter(
                            (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                          )[0]?.background
                        : ''
                  }}>
                  {SPORTS_INFO.filter(
                    (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                  )[0]?.logo()}
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
          {billingPlans.map((plan: BillingPlan, index: number) => (
            <li
              key={index}
              className={
                tempCart.filter(
                  (item) => item.sports?.id === activeSport.id && item.plan.id === plan.id
                ).length > 0
                  ? styles.active
                  : ''
              }
              onClick={() => changeSportCard(plan)}>
              {tempCart.filter(
                (item) => item.sports?.id === activeSport.id && item.plan.id === plan.id
              ).length > 0 && <CheckedCircleIcon className={styles.checkedStatusIcon} />}
              {tempCart.filter(
                (item) => item.sports?.id === activeSport.id && item.plan.id === plan.id
              ).length === 0 && <EmptyCircleIcon className={styles.uncheckedStatusIcon} />}
              <span className={styles.sportsCard_name}>{plan.duration}</span>
              <span className={styles.sportsCard_value}>${plan.price}.00</span>
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
                {tempCart.map((item, index) => (
                  <p key={index}>
                    {item.sports?.name} - {item.plan.duration}
                    <Button
                      type={'link'}
                      className={styles.removeCartItemBtn}
                      icon={<CloseIcon className={styles.closeIcon} />}
                      onClick={() => removeCartAt(tempCart, index)}></Button>
                  </p>
                ))}
              </div>
              <div className={styles.totalPrice}>${totalPrice}.00</div>
            </div>
            <Button className={styles.addToCartBtn} onClick={() => addToCart(pack, tempCart)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function IntroForSportsCard() {
  return (
    <div className={styles.introSection}>
      <Row align={'top'} wrap={false} className={styles.introSectionRow}>
        <div className={styles.introContent}>
          <div className={styles.sectionTitle}>Sports Card</div>
          <div className={styles.introDesc}>
            Includes Access to Straight Bets, Parlays, Player Props, Bonus Wildcard Parlays, & other
            Bet Types for the Sport(s) of Your Choice.
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
          Customized Dashboard Including Automated Record Tracking
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Advanced Stats for Each Bet, Weekly Pro Tips & Bankroll Management Strategies
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Event Based Sports Available: UFC & Formula 1
        </li>
      </ul>
      <div className={styles.extra_info}>
        *Soccer includes all Major Leagues and Tournaments Including the English Premier League,
        MLS, La Liga, Serie A, Bundesliga, UEFA Champions League, & others.
      </div>
    </div>
  );
}

function ProductsAndCartBoxForSportsCard({
  sports,
  pack,
  addToCart,
  cartItems,
  changeTempCart
}: ProductsAndCartBoxProps) {
  pack.billing_plans.sort(function (a, b) {
    return a.price - b.price >= 0 ? 1 : -1;
  });
  const [tempCart, setTempCart] = useState<CartItem[]>([]);
  // const [addOnTempCart, setAddOnTempCart] = useState<CartItem[]>([]);
  const [activeSport, setActiveSport] = useState<Sport>(sports[0]);

  const setCartFromProps = (cartItems: CartItem[]) => {
    const itemsFromCart = cartItems.filter((cartIt) => cartIt.plan.package === pack.id);
    setTempCart(
      itemsFromCart.length > 0
        ? itemsFromCart
        : [
            {
              sports: sports[0],
              plan: pack.billing_plans[0],
              pack,
              auto_renewal: false,
              owner: 0
            }
          ]
    );
  };

  useEffect(() => {
    setCartFromProps(cartItems);
  }, [cartItems]);

  const changeSportCard = (plan: BillingPlan) => {
    const newCart = tempCart.slice();
    const itemIdx = newCart.findIndex((item) => item.sports?.id === activeSport.id);
    if (itemIdx > -1) {
      if (newCart[itemIdx].plan.duration !== plan.duration) {
        newCart.splice(itemIdx, 1);
        newCart.push({
          sports: activeSport,
          plan,
          pack,
          auto_renewal: false,
          owner: 10
        });
      } else {
        newCart.splice(itemIdx, 1);
      }
    } else {
      newCart.push({
        sports: activeSport,
        plan,
        pack,
        auto_renewal: false,
        owner: 10
      });
    }
    setTempCart(newCart);
    changeTempCart(pack, newCart);
  };

  // const changeAddOn = (plan: BillingPlan) => {
  //   const newCart = addOnTempCart.slice();
  //   const itemIdx = newCart.findIndex((item) => item.sports?.id === activeSport.id);
  //   if (itemIdx > -1) {
  //     newCart.splice(itemIdx, 1);
  //     if (newCart[itemIdx].plan.duration !== plan.duration) {
  //       newCart.push({
  //         sports: activeSport,
  //         plan,
  //         auto_renewal: false,
  //         owner: 10
  //       });
  //     }
  //   }
  //   setAddOnTempCart(newCart);
  // };

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

  const onChangeItemAt = (sport: Sport) => {
    setActiveSport(sport);
  };

  let totalPrice = 0;
  tempCart.forEach((item) => {
    totalPrice += item.plan.price;
  });

  const removeCartAt = (cart: any, index: number) => {
    const newCart = cart;
    newCart.splice(index, 1);
    changeTempCart(pack, newCart);
  };

  pack.billing_plans.sort((a, b) => (a.price - b.price > 0 ? 1 : -1));
  const billingPlans = pack.billing_plans.filter((plan) => plan.description !== 'add-on');

  return (
    <>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select a sport</div>
        <div className={styles.sportsTypeContent}>
          {sports.map((sport: Sport, index: number) => (
            <div key={index}>
              <Button className={styles.dropdownBtnWrapper} onClick={() => onChangeItemAt(sport)}>
                <div
                  className={`${styles.dropdownBtn} ${
                    styles[
                      'dropdown_' +
                        SPORTS_INFO.filter(
                          (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                        )[0]?.id
                    ]
                  }`}
                  style={{
                    background:
                      activeSport.id === sport.id
                        ? SPORTS_INFO.filter(
                            (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                          )[0]?.background
                        : ''
                  }}>
                  {SPORTS_INFO.filter(
                    (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                  )[0]?.logo()}
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
          {billingPlans.map((plan: BillingPlan, index: number) => (
            <li
              key={index}
              className={
                tempCart.filter(
                  (item) => item.sports?.id === activeSport.id && item.plan.id === plan.id
                ).length > 0
                  ? styles.active
                  : ''
              }
              onClick={() => changeSportCard(plan)}>
              {tempCart.filter(
                (item) => item.sports?.id === activeSport.id && item.plan.id === plan.id
              ).length > 0 && <CheckedCircleIcon className={styles.checkedStatusIcon} />}
              {tempCart.filter(
                (item) => item.sports?.id === activeSport.id && item.plan.id === plan.id
              ).length === 0 && <EmptyCircleIcon className={styles.uncheckedStatusIcon} />}
              <span className={styles.sportsCard_name}>{plan.duration}</span>
              <span className={styles.sportsCard_value}>${plan.price}.00</span>
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
                {tempCart.map((item, index) => (
                  <p key={index}>
                    {item.sports?.name} - {item.plan.duration}
                    <Button
                      type={'link'}
                      className={styles.removeCartItemBtn}
                      icon={<CloseIcon className={styles.closeIcon} />}
                      onClick={() => removeCartAt(tempCart, index)}></Button>
                  </p>
                ))}
              </div>
              <div className={styles.totalPrice}>${totalPrice}.00</div>
            </div>
            <Button className={styles.addToCartBtn} onClick={() => addToCart(pack, tempCart)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await PackageAPIs.getPackages();
  const packages = await res.json();

  return {
    props: {
      packages
    }
  };
}
