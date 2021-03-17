import { userReducer, UserReducerState } from './user';
import { commonReducer, CommonReducerState } from './common';
import { cartReducer, CartState } from './cart';

export const reducers = {
  user: userReducer,
  common: commonReducer,
  cart: cartReducer
};

export type ReducerKeys = keyof typeof reducers;

export type ReduxState = {
  user: UserReducerState;
  common: CommonReducerState;
  cart: CartState;
};

export default reducers;
