import React, { useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { useRouter } from 'next/router';

import { BillingPlan, Package } from '@type/Packages';
import { CartItem } from '@type/Cart';

import styles from './CartDrawer.module.css';
import { CloseIcon } from './SvgIcons';
import { PACKAGE_NAMES } from '@constants/';

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
          {`${plan.duration === 'SEMI_ANNUAL' ? 'SEASON' : plan.duration} ACCESS`}
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
        <span>{`${
          tempPlan?.duration === 'SEMI_ANNUAL' ? 'SEASON' : tempPlan.duration
        } ACCESS`}</span>
        {packTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
        {!packTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
      </div>
    </Dropdown>
  );
}

type CartDrawerProps = {
  packages: Package[];
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onChangeCart: (_: CartItem[]) => void;
};

export default function CartDrawer({
  packages,
  open,
  cartItems,
  onClose,
  onChangeCart
}: CartDrawerProps) {
  const [cartClicked, setCartClicked] = useState<boolean>(false);

  const router = useRouter();

  const removeCartAt = (index: number) => {
    const updated = cartItems.slice();
    updated.splice(index, 1);
    onChangeCart(updated);
  };
  const changedPlan = (index: number, plan: BillingPlan) => {
    const updated = cartItems.slice();
    updated[index].plan = plan;
    onChangeCart(updated);
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

  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.plan.price;
  });

  return (
    <>
      {open && <div className={styles.cartDrawerWrapper} onClick={onClose}></div>}
      <div className={`${open && styles.open} ${styles.cartDrawer}`}>
        <div className={styles.cartDrawerTitleRow}>
          <div className={styles.cartDrawerTitle}>YOUR CART</div>
          <Button
            ghost
            className={styles.closeIconBtn}
            icon={<CloseIcon className={styles.closeIcon} />}
            onClick={onClose}
          />
        </div>
        <div className={styles.cartItems}>
          <div className={styles.cartItemsMain}>
            {cartItems.length === 0 && (
              <p className={styles.noItem}>
                <em>Cart is empty</em>
              </p>
            )}
            {cartItems.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <div className={styles.cartItemMain}>
                  <img src={getCartItemLogo(item.pack.name, item.sports?.name || '')} alt="" />
                  <div className={styles.cartItemInfo}>
                    <div className={styles.cartItemInfoRow}>
                      <span className={styles.cartItemName}>{getCartItemName(item.pack.name)}</span>
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
                    </div>
                    <div className={styles.cartItemInfoRow}>
                      <span className={styles.cartItemDesc}>
                        {item.pack.name.toUpperCase().indexOf(PACKAGE_NAMES.VIP_ALL_ACCESS) > -1
                          ? 'VIP'
                          : item.sports?.name}
                      </span>
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
                </div>
                <Button
                  type={'link'}
                  className={styles.removeCartItemBtn}
                  onClick={() => removeCartAt(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div className={styles.totalDue}>
            <span className={styles.totalPriceText}>Total Due</span>
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
          </div>
          <div className={styles.cartCTAs}>
            <Button
              loading={cartClicked}
              disabled={cartItems.length === 0}
              className={`${styles.actionBtn} ${styles.goToCartBtn}`}
              onClick={() => {
                setCartClicked(true);
                router.push('/cart');
              }}>
              Continue to checkout
            </Button>
            <Button className={`${styles.actionBtn} ${styles.keepShoppingBtn}`} onClick={onClose}>
              Keep Shopping
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
