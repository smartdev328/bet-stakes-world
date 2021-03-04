import { RESET_CART, UPDATE_CART, LOAD_CART } from '../actions';
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
    case LOAD_CART: {
      const cartItems = localStorage.getItem('cart_items') || '[]';
      return {
        ...state,
        ...{ items: JSON.parse(cartItems) }
      };
    }
    case UPDATE_CART: {
      localStorage.setItem('cart_items', JSON.stringify(action.payload));
      return {
        ...state,
        ...{ items: action.payload }
      };
    }
    case RESET_CART: {
      localStorage.setItem('cart_items', JSON.stringify([]));
      return {
        ...state,
        ...{ items: [] }
      };
    }
    default:
      return state;
  }
}
