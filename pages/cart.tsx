/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Dropdown, Menu } from 'antd';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { AppLayout, BannerSportsAndMatches, YellowCheckBox } from '@components/index';
import styles from '@styles/Cart.module.css';
import { CartItem } from '@type/Cart';
import PackageAPIs from '@apis/package.apis';
import { PageProps } from '@type/Main';
import { BillingPlan, Package } from '@type/Packages';
import { ReduxState } from '@redux/reducers';
import SubscriptionsApis from '@apis/subscriptions.apis';
import { MinusIcon } from '@components/SvgIcons';

const TAX_RATE = 0.15;

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <LazyLoad>
        <img src="/images/cart_page_bg.png" className={styles.bgImage} />
      </LazyLoad>
      <div className={styles.heroBannerContent}>
        <h1>The Cart</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <BannerSportsAndMatches />
    </div>
  );
}

type CartTotalWidgetProps = {
  mobile: boolean;
  cartItems: CartItem[];
  onCheckout: () => void;
};

function CartTotalWidget({ cartItems, mobile, onCheckout }: CartTotalWidgetProps) {
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
        <div className={styles.totalCount}>{cartItems.length} Items</div>
        <div className={styles.totalPrice}>{`${totalPrice}.00`}</div>
        <div className={styles.taxRow}>
          <span>Tax:</span>
          <span>{`${TAX_RATE * 100}%`}</span>
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
        <Button className={styles.checkoutBtn} onClick={onCheckout}>
          Proceed to Checkout
        </Button>
      </div>
      <div className={styles.totalPriceWidgetContentMobile}>
        {showDetails && <h5>Cart Totals</h5>}
        <div className={styles.priceRow}>
          <div className={styles.totalCount}>{cartItems.length} Items</div>
          <div className={styles.totalPrice}>
            <span>{`$${totalPrice}.00`}</span>
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
            <div className={styles.taxRow}>
              <span>Tax:</span>
              <span>{TAX_RATE * 100}%</span>
            </div>
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
        <Button className={styles.checkoutBtn} onClick={onCheckout}>
          Proceed to Checkout
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
  const [tempCartItems, setTempCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setTempCartItems(cartItems);
  }, [cartItems]);

  const changeCartItem = (index: number, key: keyof CartItem, value: string | boolean) => {
    const updated = tempCartItems.slice();
    switch (key) {
      case 'auto_renewal':
        if (typeof value === 'boolean') {
          updated[index].auto_renewal = value;
        }
        break;
      default:
    }
    setTempCartItems(updated);
  };
  const removeCartAt = (index: number) => {
    const updated = tempCartItems.slice();
    updated.splice(index, 1);
    setTempCartItems(updated);
  };
  const changedPlan = (index: number, plan: BillingPlan) => {
    const updated = tempCartItems.slice();
    updated[index].plan = plan;
    setTempCartItems(updated);
  };

  const proceedCheckout = () => {
    tempCartItems.forEach(async (item) => {
      // Add To Subscriptions
      await SubscriptionsApis.addSubscription({
        plan_id: item.plan.id,
        sports: item.sports !== undefined ? [item.sports.id] : []
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('----- data:', data);
        });
    });
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Cart</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <section className={styles.cartItemsSection}>
            <div className={styles.cartItems}>
              {tempCartItems.length === 0 && <em>Cart is empty</em>}
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
                        <div className={styles.checkboxContainer}>
                          <YellowCheckBox
                            checked={item.auto_renewal}
                            onChangeStatus={() =>
                              changeCartItem(index, 'auto_renewal', !item.auto_renewal)
                            }
                            label={'Automatic Renewal'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.cartItemPrice}>{`$${item.plan.price}.00`}</div>
                    <Button
                      type={'link'}
                      icon={<MinusIcon className={styles.minusIcon} />}
                      onClick={() => removeCartAt(index)}></Button>
                  </div>
                </div>
              ))}
            </div>
            <CartTotalWidget
              mobile={false}
              cartItems={tempCartItems}
              onCheckout={proceedCheckout}
            />
          </section>
          <section className={styles.promoCodeSection}>
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
          </section>
          <CartTotalWidget mobile={true} cartItems={tempCartItems} onCheckout={proceedCheckout} />
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
