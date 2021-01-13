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
