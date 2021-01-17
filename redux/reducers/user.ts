import {
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE
} from '../actions';
import { HYDRATE } from 'next-redux-wrapper';
import { CreateUserType } from '@type/Users';

type PlaceholderDataType = {
  name: string;
};

export type UserReducerState = {
  profile: PlaceholderDataType | null;
  error: string | null;
  loading: boolean;
};

export type CreateUserReducerAction = {
  payload: CreateUserType;
  type: string;
};

export type UserStateAction = {
  payload?: PlaceholderDataType;
  error?: string;
  loading?: boolean;
  type: string;
};

const initialState: UserReducerState = {
  error: null,
  profile: null,
  loading: false
};

export function userReducer(state = initialState, action: UserStateAction) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    case LOAD_USER_FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        ...{ profile: action.payload }
      };
    case SIGNUP_USER_REQUEST:
      return {
        ...state,
        ...{ loading: true, error: null }
      };
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        ...{ profile: action.payload, loading: false }
      };

    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        ...{ error: action.error, loading: false }
      };

    default:
      return state;
  }
}
