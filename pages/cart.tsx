/* eslint-disable react/display-name */
import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Dropdown, Menu } from 'antd';
import LazyLoad from 'react-lazyload';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { AppLayout, BannerSportsAndMatches, YellowCheckBox } from '@components/index';
import styles from '@styles/Cart.module.css';
import { CartItem } from '@type/Cart';
import PackageAPIs from '@apis/package.apis';
import { PageDefaultProps } from '@type/Main';
import { BillingPlan, Package } from '@type/Packages';

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
};

function CartTotalWidget({ mobile }: CartTotalWidgetProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <div className={`${styles.totalPriceWidget} ${mobile && styles.isMobileVisible}`}>
      <LazyLoad>
        <img src="/images/All-sports-bg.svg" alt="Total Price Widget background" />
      </LazyLoad>
      <div className={styles.totalPriceWidgetContent}>
        <h5>Cart Totals</h5>
        <div className={styles.totalCount}>3 Items</div>
        <div className={styles.totalPrice}>$399.00</div>
        <div className={styles.taxRow}>
          <span>Tax:</span>
          <span>15%</span>
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
        <Button className={styles.checkoutBtn}>Proceed to Checkout</Button>
      </div>
      <div className={styles.totalPriceWidgetContentMobile}>
        {showDetails && <h5>Cart Totals</h5>}
        <div className={styles.priceRow}>
          <div className={styles.totalCount}>3 Items</div>
          <div className={styles.totalPrice}>
            <span>$399.00</span>
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
              <span>15%</span>
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
        <Button className={styles.checkoutBtn}>Proceed to Checkout</Button>
      </div>
    </div>
  );
}

const Mock_CartItems: CartItem[] = [
  {
    name: 'Sports Card',
    desc: 'NBA',
    image: 'https://via.placeholder.com/100',
    price: 89,
    auto_renewal: true
  },
  {
    name: 'VIP All Access',
    desc: 'All Sports',
    image: 'https://via.placeholder.com/100',
    price: 300,
    auto_renewal: true
  },
  {
    name: 'Fantasy',
    desc: 'NFL',
    image: 'https://via.placeholder.com/100',
    price: 10,
    auto_renewal: false
  }
];

function PlanDropdown({
  pack,
  changePlan
}: {
  pack: Package;
  changePlan: (plan: BillingPlan) => void;
}) {
  const [packTypeMenuOpen, setPackTypeMenuOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan>(pack.billing_plans[0]);

  const PackTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      {pack.billing_plans?.map((plan: BillingPlan, index: number) => (
        <Menu.Item
          key={index}
          className={styles.sportMenuItem}
          onClick={() => {
            setPackTypeMenuOpen(false);
            setSelectedPlan(plan);
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
        <span>{selectedPlan?.name}</span>
        {packTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
        {!packTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
      </div>
    </Dropdown>
  );
}

export default function Cart({ packages }: PageDefaultProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(Mock_CartItems);
  const changeCartItem = (index: number, key: keyof CartItem, value: string | boolean) => {
    const updated = cartItems.slice();
    switch (key) {
      case 'name':
        if (typeof value === 'string') {
          updated[index].name = value;
        }
        break;
      case 'auto_renewal':
        if (typeof value === 'boolean') {
          updated[index].auto_renewal = value;
        }
        break;
      default:
    }
    setCartItems(updated);
  };

  const changedPlan = (plan: BillingPlan) => {
    console.log('---------- plan changed', plan);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Cart</title>
      </Head>
      <AppLayout bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <section className={styles.cartItemsSection}>
            <div className={styles.cartItems}>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <div className={styles.cartItemMain}>
                    <img src={item.image} alt={item.name} />
                    <div className={styles.cartItemInfo}>
                      <span className={styles.cartItemName}>{item.name}</span>
                      <span className={styles.cartItemDesc}>{item.desc}</span>
                    </div>
                  </div>
                  <div className={styles.cartItemPlans}>
                    <div className={styles.cartItemPlansContent}>
                      {packages?.map((pack, index: number) => (
                        <React.Fragment key={index}>
                          {pack.name.indexOf(item.name) > -1 && (
                            <PlanDropdown pack={pack} changePlan={changedPlan} />
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
                  <div className={styles.cartItemPrice}>{`$${item.price}.00`}</div>
                </div>
              ))}
            </div>
            <CartTotalWidget mobile={false} />
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
          <CartTotalWidget mobile={true} />
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
