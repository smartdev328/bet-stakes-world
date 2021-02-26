import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Dropdown, Menu, notification, Spin } from 'antd';
import LazyLoad from 'react-lazyload';
import { useSelector, useDispatch } from 'react-redux';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useStripe } from '@stripe/react-stripe-js';
import NumberFormat from 'react-number-format';

import {
  AppLayout,
  BannerSportsAndMatches,
  CartLoginForm,
  CartSignupForm
} from '@components/index';
import styles from '@styles/Cart.module.css';
import { CartItem, CheckoutItem } from '@type/Cart';
import PackageAPIs from '@apis/package.apis';
import { PageProps } from '@type/Main';
import { BillingPlan, Package } from '@type/Packages';
import { ReduxState } from '@redux/reducers';
import { MinusIcon } from '@components/SvgIcons';
import CheckoutAPIs from '@apis/checkout.apis';
import { CreateUserType, LoginUserType } from '@type/Users';

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
};

function CartTotalWidget({
  loading,
  cartItems,
  mobile,
  onCheckout,
  disabled
}: CartTotalWidgetProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.plan.price;
  });
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
          <span>N/A</span>
        </div>
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
  changePlan
}: {
  pack: Package;
  selectedPlan: BillingPlan;
  changePlan: (plan: BillingPlan) => void;
}) {
  const [packTypeMenuOpen, setPackTypeMenuOpen] = useState<boolean>(false);
  const [tempPlan, setTempPlan] = useState<BillingPlan>(selectedPlan);

  const billingPlans = pack.billing_plans.filter((plan) => plan.description !== 'add-on');

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
  const { error, loading } = useSelector((state: ReduxState) => state.user);
  const [tempCartItems, setTempCartItems] = useState<CartItem[]>([]);
  const [proceeding, setProceeding] = useState<boolean>(false);
  const [formView, setFormView] = useState<string>('');
  const [isSignupFormValid, setSignUpFormValid] = useState<boolean>(false);
  const [loginFormData, setLoginFormData] = useState<LoginUserType>({
    email: undefined,
    password: undefined
  });
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
  const [cartForVisitor] = useState<boolean>(!token);

  const dispatch = useDispatch();
  const stripe = useStripe();

  useEffect(() => {
    setTempCartItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (error === null && !loading && formSubmitted) {
      proceedCheckout();
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
      // Add To Subscriptions
      const subscriptionParams: CheckoutItem = {
        plan_id: item.plan.id,
        sports: item.sports !== undefined ? [item.sports.id] : []
      };
      checkoutItems.push(subscriptionParams);
    });

    CheckoutAPIs.createSession({
      items: checkoutItems
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
          setProceeding(false);
          if (error) {
            notification['error']({
              message: 'Checkout Error!',
              description: error.message
            });
          }
          dispatch({ type: 'UPDATE_CART', payload: [] });
        }
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
      dispatch({
        type: 'LOGIN_USER',
        payload: {
          identifier: loginFormData.email,
          password: loginFormData.password
        }
      });
      setFormSubmitted(true);
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

  const cartLoginFormChanged = (formData: LoginUserType, isValid: boolean) => {
    setLoginFormData(formData);
    setSignUpFormValid(isValid);
  };

  const cartSignupFormChanged = (formData: CreateUserType, isValid: boolean) => {
    setSignupFormData(formData);
    setSignUpFormValid(isValid);
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
                  {formView === '' && (
                    <>
                      <CartSignupForm
                        signupFormChanged={cartSignupFormChanged}
                        onCartLogin={() => setFormView('LOGIN')}
                      />
                    </>
                  )}
                  {formView === 'LOGIN' && (
                    <>
                      <CartLoginForm
                        loginFormChanged={cartLoginFormChanged}
                        onCartSignup={() => setFormView('')}
                      />
                    </>
                  )}
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
                      <img
                        src={item.sports?.logo || 'https://via.placeholder.com/100'}
                        alt={item.sports?.name}
                      />
                      <div className={styles.cartItemInfo}>
                        <span className={styles.cartItemName}>{item.pack.name}</span>
                        <span className={styles.cartItemDesc}>
                          {item.pack.name.indexOf('VIP All Access') > -1
                            ? 'All Sports'
                            : item.sports?.name}
                        </span>
                      </div>
                    </div>
                    <div className={styles.cartItemPlans}>
                      <div className={styles.cartItemPlansContent}>
                        {packages?.map((pack, idx: number) => (
                          <React.Fragment key={idx}>
                            {pack.id === item.plan.package && pack.description !== 'add-on' && (
                              <PlanDropdown
                                pack={pack}
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
                  </div>
                </div>
              ))}
            </div>
            <CartTotalWidget
              mobile={false}
              loading={proceeding}
              cartItems={tempCartItems}
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
