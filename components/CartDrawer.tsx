import React, { useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import Link from 'next/link';
import NumberFormat from 'react-number-format';

import { BillingPlan, Package } from '@type/Packages';
import { CartItem } from '@type/Cart';

import styles from './CartDrawer.module.css';
import { CloseIcon } from './SvgIcons';
import { PACKAGE_NAMES } from '@constants/';

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

  return (
    <>
      {open && <div className={styles.cartDrawerWrapper} onClick={onClose}></div>}
      <div className={`${open && styles.open} ${styles.cartDrawer}`}>
        <Button
          ghost
          className={styles.closeIconBtn}
          icon={<CloseIcon className={styles.closeIcon} />}
          onClick={onClose}
        />
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
                  <img
                    src={item.sports?.logo || 'https://via.placeholder.com/100'}
                    alt={item.sports?.name}
                  />
                  <div className={styles.cartItemInfo}>
                    <span className={styles.cartItemName}>{item.pack.name}</span>
                    <span className={styles.cartItemDesc}>
                      {item.pack.name.toUpperCase().indexOf(PACKAGE_NAMES.VIP_ALL_ACCESS) > -1
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
                  className={styles.removeCartItemBtn}
                  icon={<CloseIcon className={styles.closeIcon} />}
                  onClick={() => removeCartAt(index)}></Button>
              </div>
            ))}
          </div>
          {cartItems.length !== 0 && (
            <div className={styles.goToCartRow}>
              <Link href="/cart">
                <Button
                  loading={cartClicked}
                  className={styles.goToCartBtn}
                  onClick={() => setCartClicked(true)}>
                  Go to Cart
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
