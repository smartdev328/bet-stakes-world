import { BillingPlan } from './Packages';
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
  owner: number;
  plan: BillingPlan;
  sports: Sport;
  auto_renewal: boolean;
};
