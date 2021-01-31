import { RESET_CART, UPDATE_CART } from '../actions';
import { HYDRATE } from 'next-redux-wrapper';
import { CartItem } from '@type/Cart';

export type CartStateAction = {
  payload: CartItem[];
  type: string;
};

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: []
};

export function cartReducer(state = initialState, action: CartStateAction) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }
    case UPDATE_CART:
      return {
        ...state,
        ...{ items: action.payload }
      };
    case RESET_CART:
      return {
        ...state,
        ...{ items: [] }
      };

    default:
      return state;
  }
}
