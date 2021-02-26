import { BillingPlan, Package } from './Packages';
import { Sport } from './Sports';

export type CartSportCardType = {
  title: string | undefined;
  price: number | undefined;
  id?: string;
};
export type CartAddOnType = {
  title: string | undefined;
  price: number | undefined;
  id?: string;
};

export type CartType = {
  sportCard: CartSportCardType;
  addOn: CartAddOnType;
};

export type CartItem = {
  plan: BillingPlan;
  sports: Sport | undefined;
  pack: Package;
  auto_renewal: boolean;
};

export type CheckoutItem = {
  plan_id: string;
  sports: number[];
};

export type CreateCheckoutSessionParams = {
  items: CheckoutItem[];
};

export type CheckoutSessionType = {
  id: string;
  amount_total?: number;
  currency?: number;
};
