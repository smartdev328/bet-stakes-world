import {
  CLOSE_LOGIN_MODAL,
  OPEN_LOGIN_MODAL,
  CLOSE_FORGOT_PASS_MODAL,
  OPEN_FORGOT_PASS_MODAL,
  OPEN_RESET_PASS_MODAL,
  CLOSE_RESET_PASS_MODAL
} from '../actions';
import { HYDRATE } from 'next-redux-wrapper';

type PlaceholderDataType = {
  name: string;
};

export type CommonReducerState = {
  isModalOpen: boolean;
  isForgotPassModalOpen: boolean;
  isResetPassModalOpen: boolean;
};

export type CommonStateAction = {
  payload?: PlaceholderDataType;
  error?: string;
  type: string;
};

const initialState: CommonReducerState = {
  isModalOpen: false,
  isForgotPassModalOpen: false,
  isResetPassModalOpen: false
};

export function commonReducer(state = initialState, action: CommonStateAction) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        ...{ isModalOpen: true }
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        ...{ isModalOpen: false }
      };
    case OPEN_FORGOT_PASS_MODAL:
      return {
        ...state,
        ...{ isForgotPassModalOpen: true }
      };
    case CLOSE_FORGOT_PASS_MODAL:
      return {
        ...state,
        ...{ isForgotPassModalOpen: false }
      };
    case OPEN_RESET_PASS_MODAL:
      return {
        ...state,
        ...{ isResetPassModalOpen: true }
      };
    case CLOSE_RESET_PASS_MODAL:
      return {
        ...state,
        ...{ isResetPassModalOpen: false }
      };
    default:
      return state;
  }
}
