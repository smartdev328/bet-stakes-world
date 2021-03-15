import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Dropdown, Menu, notification, Spin } from 'antd';
import LazyLoad from 'react-lazyload';
import { useSelector, useDispatch } from 'react-redux';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useStripe } from '@stripe/react-stripe-js';
import NumberFormat from 'react-number-format';

import { AppLayout, BannerSportsAndMatches, CartSignupForm } from '@components/index';
import styles from '@styles/Cart.module.css';
import { CartItem, CheckoutItem, CartItemValidation } from '@type/Cart';
import PackageAPIs from '@apis/package.apis';
import { PageProps } from '@type/Main';
import { BillingPlan, Package } from '@type/Packages';
import { ReduxState } from '@redux/reducers';
import { MinusIcon } from '@components/SvgIcons';
import CheckoutAPIs from '@apis/checkout.apis';
import { CreateUserType, UserProfile } from '@type/Users';
import { PACKAGE_NAMES } from '@constants/';

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <LazyLoad>
        <img src="/images/cart_page_bg.png" className={styles.bgImage} />
      </LazyLoad>
      <div className={styles.heroBannerContent}>
        <h1>YOUR CART</h1>
        <p>Guaranteed safe and secure checkout!</p>
      </div>
      <BannerSportsAndMatches />
    </div>
  );
}

type CartTotalWidgetProps = {
  mobile: boolean;
  loading: boolean;
  cartItems: CartItem[];
  onCheckout: () => void;
  disabled: boolean;
  discountCode: string;
  changeDiscountCode: (_: string) => void;
};

function CartTotalWidget({
  loading,
  cartItems,
  mobile,
  onCheckout,
  disabled,
  discountCode,
  changeDiscountCode
}: CartTotalWidgetProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<any | undefined>(undefined);

  const applyDiscount = () => {
    // Validate Discount
    CheckoutAPIs.validateDiscount(discountCode)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          notification['error']({
            message: 'Discount Error!',
            description: data.message
          });
        } else {
          const { coupon } = data.data;
          setCoupon(coupon);
        }
      })
  }

  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.plan.price;
  });
  if (coupon) {
    if (coupon.amount_off) {
      totalPrice -= coupon.amount_off / 100;
    } else if (coupon.percent_off) {
      totalPrice = totalPrice * (100 - coupon.percent_off) / 100;
    }
  }

  return (
    <div className={`${styles.totalPriceWidget} ${mobile && styles.isMobileVisible}`}>
      <LazyLoad>
        <img src="/images/All-sports-bg.svg" alt="Total Price Widget background" />
      </LazyLoad>
      <div className={styles.totalPriceWidgetContent}>
        <h5>Cart Totals</h5>
        <div className={styles.totalCount}>
          {cartItems.length > 0 ? `${cartItems.length} Items` : 'No Items'}
        </div>
        <div className={styles.totalPrice}>
          <NumberFormat
            displayType="text"
            thousandSeparator={true}
            prefix={'$'}
            fixedDecimalScale
            decimalScale={2}
            value={totalPrice}
          />
        </div>
        <div className={styles.discountRow}>
          <span>Discount:</span>
          {!coupon && <span>N/A</span>}
          {coupon && coupon.amount_off && (
            <NumberFormat
              displayType="text"
              thousandSeparator={true}
              prefix={'$'}
              fixedDecimalScale
              decimalScale={2}
              value={coupon.amount_off / 100}
            />
          )}
          {coupon && coupon.percent_off && <span>{`${coupon.percent_off}%`}</span>}
        </div>
        <div className={styles.couponRow}>
          <input
            placeholder="Enter Coupon Code"
            onChange={(e) => changeDiscountCode(e.target.value)}
          />
          <Button disabled={!discountCode} className={styles.couponBtn} onClick={applyDiscount}>
            Apply Coupon
          </Button>
        </div>
        <Button
          loading={loading}
          disabled={disabled}
          className={styles.checkoutBtn}
          onClick={onCheckout}>
          CHECKOUT
        </Button>
      </div>
      <div className={styles.totalPriceWidgetContentMobile}>
        {showDetails && <h5>Cart Totals</h5>}
        <div className={styles.priceRow}>
          <div className={styles.totalCount}>{cartItems.length} Items</div>
          <div className={styles.totalPrice}>
            <NumberFormat
              displayType="text"
              thousandSeparator={true}
              prefix={'$'}
              fixedDecimalScale
              decimalScale={2}
              value={totalPrice}
            />
            {!showDetails && (
              <CaretUpOutlined className={styles.caret_up} onClick={() => setShowDetails(true)} />
            )}
            {showDetails && (
              <CaretDownOutlined
                className={styles.caret_down}
                onClick={() => setShowDetails(false)}
              />
            )}
          </div>
        </div>
        {showDetails && (
          <>
            <div className={styles.discountRow}>
              <span>Discount:</span>
              <span>N/A</span>
            </div>
          </>
        )}
        <div className={styles.couponRow}>
          <input placeholder="Enter Coupon Code" />
          <Button disabled className={styles.couponBtn}>
            Apply Coupon
          </Button>
        </div>
        <Button
          loading={loading}
          disabled={disabled}
          className={styles.checkoutBtn}
          onClick={onCheckout}>
          Place Order
        </Button>
      </div>
    </div>
  );
}

function PlanDropdown({
  pack,
  selectedPlan,
  sport,
  changePlan
}: {
  pack: Package;
  selectedPlan: BillingPlan;
  sport: string | undefined;
  changePlan: (plan: BillingPlan) => void;
}) {
  const [packTypeMenuOpen, setPackTypeMenuOpen] = useState<boolean>(false);
  const [tempPlan, setTempPlan] = useState<BillingPlan>(selectedPlan);

  let billingPlans: BillingPlan[] = [];
  if (pack.name.toUpperCase().indexOf(PACKAGE_NAMES.SPORTS_CARD) > -1 && sport) {
    if (sport === 'UFC' || sport === 'FORMULA 1') {
      billingPlans = pack.billing_plans.filter((plan) => plan.name.indexOf('EVENT BASED') > -1);
    } else {
      billingPlans = pack.billing_plans.filter((plan) => plan.name.indexOf('EVENT BASED') < 0);
    }
  } else {
    billingPlans = pack.billing_plans.filter((plan) => plan.description !== 'add-on');
  }

  const PackTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      {billingPlans.map((plan: BillingPlan, index: number) => (
        <Menu.Item
          key={index}
          className={styles.sportMenuItem}
          onClick={() => {
            setPackTypeMenuOpen(false);
            setTempPlan(plan);
            changePlan(plan);
          }}>
          {`${plan.name}`}
        </Menu.Item>
      ))}
    </Menu>
  );

  const changePackMenuVisible = (status: boolean) => {
    setPackTypeMenuOpen(status);
  };

  return (
    <Dropdown
      overlay={PackTypeMenu}
      onVisibleChange={changePackMenuVisible}
      placement="bottomLeft"
      transitionName=""
      trigger={['click']}>
      <div className={styles.optionBtn}>
        <span>{tempPlan?.name}</span>
        {packTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
        {!packTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
      </div>
    </Dropdown>
  );
}

export default function Cart({ packages, token, subscriptions }: PageProps) {
  const { items: cartItems } = useSelector((state: ReduxState) => state.cart);
  const { error, loading, profile } = useSelector((state: ReduxState) => state.user);
  const [tempCartItems, setTempCartItems] = useState<CartItem[]>([]);
  const [proceeding, setProceeding] = useState<boolean>(false);
  const [formView, setFormView] = useState<string>('');
  const [isSignupFormValid, setSignUpFormValid] = useState<boolean>(false);
  const [signupFormData, setSignupFormData] = useState<CreateUserType>({
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    full_name: undefined,
    email: undefined,
    provider: undefined,
    mobile_number: undefined,
    password: undefined,
    verify_password: undefined
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isTryingLogin, setIsTryingLogin] = useState<boolean>(false);
  const [cartForVisitor, setCartForVisitor] = useState<boolean>(!token);
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>();
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [cartItemsValidation, setCartItemsValidation] = useState<CartItemValidation[]>([]);
  const [discountCode, setDiscountCode] = useState<string>('');

  const dispatch = useDispatch();
  const stripe = useStripe();

  useEffect(() => {
    setCartForVisitor(!token);
  }, [token]);

  useEffect(() => {
    setTempCartItems(cartItems);

    // Cart Validate
    if (cartItems.length > 0 && !isValidating && token) {
      setIsValidating(true);
      const checkoutItems: CheckoutItem[] = [];
      cartItems.forEach((item) => {
        // Add To Subscriptions
        const subscriptionParams: CheckoutItem = {
          plan_id: item.plan.id,
          sports: item.sports !== undefined ? [item.sports.id] : []
        };
        checkoutItems.push(subscriptionParams);
      });
      CheckoutAPIs.validateCart({ items: checkoutItems })
        .then((res) => res.json())
        .then((dt) => {
          if (dt.status !== 'success') {
            const { data } = dt.response;
            setCartItemsValidation(data);
          }
          setIsValidating(false);
        });
    }
  }, [cartItems]);

  useEffect(() => {
    if (error === null && !loading && formSubmitted) {
      proceedCheckout();
    }
    if (error === null && !loading && isTryingLogin && profile) {
      setFormView('LOGIN');
      setUserProfile(profile);
    }
    if (error && !loading && formView === 'LOGIN') {
      notification['error']({
        message: 'Login Error!',
        description: error
      });
      setProceeding(false);
    }
    if (formSubmitted && !loading && error && formView === '') {
      notification['error']({
        message: 'Registration Error!',
        description: error
      });
      setProceeding(false);
    }
  }, [error, loading]);

  const removeCartAt = (index: number) => {
    const updated = tempCartItems.slice();
    updated.splice(index, 1);
    dispatch({ type: 'UPDATE_CART', payload: updated });
  };
  const changedPlan = (index: number, plan: BillingPlan) => {
    const updated = tempCartItems.slice();
    updated[index].plan = plan;
    dispatch({ type: 'UPDATE_CART', payload: updated });
  };

  const proceedCheckout = () => {
    setProceeding(true);
    const checkoutItems: CheckoutItem[] = [];
    tempCartItems.forEach((item) => {
      const idx = checkoutItems.findIndex((it) => it.plan_id === item.plan.id);
      if (idx > -1) {
        if (item.sports?.id) {
          checkoutItems[idx].sports.push(item.sports?.id);
        }
      } else {
        const subscriptionParams: CheckoutItem = {
          plan_id: item.plan.id,
          sports: item.sports !== undefined ? [item.sports.id] : []
        };
        checkoutItems.push(subscriptionParams);
      }
    });
    CheckoutAPIs.createSession({
      items: checkoutItems,
      promotion_code: discountCode
    })
      .then((res) => res.json())
      .then(async (data) => {
        let hasError = false;
        if (data.status === 400) {
          notification['error']({
            message: 'Checkout Error!',
            description: data.message
          });
          hasError = true;
        } else if (data.statusCode === 400) {
          notification['error']({
            message: 'Checkout Error!',
            description: data.raw?.message
          });
          hasError = true;
        }
        if (!hasError && stripe) {
          const { checkoutSessionId } = data.data;
          const { error } = await stripe.redirectToCheckout({
            sessionId: checkoutSessionId
          });
          if (error) {
            notification['error']({
              message: 'Checkout Error!',
              description: error.message
            });
          }
        }
        setProceeding(false);
      })
      .catch((error) => {
        setProceeding(false);
        notification['error']({
          message: 'Checkout Error!',
          description: error.message
        });
      });
  };

  const proceedCheckoutForVisitor = () => {
    //
    setProceeding(true);
    if (formView === 'LOGIN') {
      proceedCheckout();
    } else {
      dispatch({
        type: 'SIGNUP_USER',
        payload: {
          ...signupFormData,
          provider: 'local'
        }
      });
      setFormSubmitted(true);
    }
  };

  const cartSignupFormChanged = (formData: CreateUserType, isValid: boolean) => {
    setSignupFormData(formData);
    setSignUpFormValid(isValid);
  };
  const onCartLogin = () => {
    if (formView === 'LOGIN') {
      setFormView('');
    } else {
      setIsTryingLogin(true);
      dispatch({ type: 'OPEN_LOGIN_MODAL' });
    }
  };
  const getCartItemName = (packName: string) => {
    if (packName.toUpperCase().indexOf(PACKAGE_NAMES.VIP_ALL_ACCESS) > -1) {
      return 'VIP ALL ACCESS CARD';
    } else if (packName.toUpperCase().indexOf(PACKAGE_NAMES.FANTASY) > -1) {
      return 'DAILY FANTASY CARD';
    } else if (packName.toUpperCase().indexOf(PACKAGE_NAMES.SPORTS_CARD) > -1) {
      return 'SPORTS CARD';
    }
    return '';
  };
  const getCartItemLogo = (packName: string, sportName: string) => {
    if (packName.toUpperCase().indexOf(PACKAGE_NAMES.VIP_ALL_ACCESS) > -1) {
      return '/images/sports/vip.svg';
    }
    return `/images/sports/${sportName.toLowerCase()}.svg`;
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Cart</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          {proceeding && (
            <div className={styles.containerLoadingWrapper}>
              <Spin size="large" />
            </div>
          )}
          <section className={styles.cartItemsSection}>
            <div className={styles.cartItems}>
              {cartForVisitor && (
                <>
                  <CartSignupForm
                    showLoginForm={formView === 'LOGIN'}
                    userProfile={userProfile}
                    signupFormChanged={cartSignupFormChanged}
                    onCartLogin={onCartLogin}
                  />
                  <br />
                  <br />
                </>
              )}
              {tempCartItems.length === 0 && (
                <p className={styles.noCart}>
                  <em>Cart is empty</em>
                </p>
              )}
              {tempCartItems.map((item, index) => (
                <div key={index} className={styles.cartItemWrapper}>
                  <div className={styles.cartItem}>
                    <div className={styles.cartItemMain}>
                      <img src={getCartItemLogo(item.pack.name, item.sports?.name || '')} alt="" />
                      <div className={styles.cartItemInfo}>
                        <span className={styles.cartItemName}>
                          {getCartItemName(item.pack.name)}
                        </span>
                        <span className={styles.cartItemDesc}>
                          {item.pack.name.toUpperCase().indexOf(PACKAGE_NAMES.VIP_ALL_ACCESS) > -1
                            ? 'VIP'
                            : item.sports?.name}
                        </span>
                      </div>
                    </div>
                    <div className={styles.cartItemDetails}>
                      <div className={styles.cartItemPlans}>
                        <div className={styles.cartItemPlansContent}>
                          {packages?.map((pack, idx: number) => (
                            <React.Fragment key={idx}>
                              {pack.id === item.plan.package && pack.description !== 'add-on' && (
                                <PlanDropdown
                                  pack={pack}
                                  sport={item.sports?.name}
                                  selectedPlan={item.plan}
                                  changePlan={(plan) => changedPlan(index, plan)}
                                />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      <div className={styles.cartItemPrice}>
                        <NumberFormat
                          displayType="text"
                          thousandSeparator={true}
                          prefix={'$'}
                          fixedDecimalScale
                          decimalScale={2}
                          value={item.plan.price}
                        />
                      </div>
                      <Button
                        type={'link'}
                        className={styles.removeCartBtn}
                        icon={<MinusIcon className={styles.minusIcon} />}
                        onClick={() => removeCartAt(index)}></Button>
                      {cartItemsValidation.findIndex(
                        (it) => it.plan === item.plan.id && it.sports[0] === item.sports?.id
                      ) > -1 && (
                        <div className={styles.cartItemValidationError}>
                          {`An active subscription already exists under your account for this package. Please remove this membership package from cart to avoid a duplicative purchase`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CartTotalWidget
              mobile={false}
              loading={proceeding}
              cartItems={tempCartItems}
              discountCode={discountCode}
              changeDiscountCode={(val) => setDiscountCode(val)}
              disabled={
                !cartForVisitor
                  ? tempCartItems.length === 0
                  : tempCartItems.length === 0 || !isSignupFormValid
              }
              onCheckout={!cartForVisitor ? proceedCheckout : proceedCheckoutForVisitor}
            />
          </section>
          {/* <section className={styles.promoCodeSection}>
            <LazyLoad>
              <img
                className={styles.promoCodeBg}
                src="/images/promo_code_section_bg.jpg"
                alt="PromoCode Section Background"
              />
            </LazyLoad>
            <div className={styles.promoCodeWrapper}>
              <div className={styles.descCol}>
                <div className={styles.value}>Save 25%</div>
                <div className={styles.offerDetails}>Limited time offer. One time use only.</div>
              </div>
              <div className={styles.promoCode}>
                <span>Promo Code: Daily-1234</span>
                <LazyLoad>
                  <img src="/images/promo_card_bg.svg" alt="Promo code Wrapper Image" />
                </LazyLoad>
              </div>
            </div>
          </section> */}
          <CartTotalWidget
            mobile={true}
            loading={proceeding}
            discountCode={discountCode}
            changeDiscountCode={(val) => setDiscountCode(val)}
            disabled={
              !cartForVisitor
                ? tempCartItems.length === 0
                : tempCartItems.length === 0 || !isSignupFormValid
            }
            cartItems={tempCartItems}
            onCheckout={!cartForVisitor ? proceedCheckout : proceedCheckoutForVisitor}
          />
        </div>
      </AppLayout>
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
