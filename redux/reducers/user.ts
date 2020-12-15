import { LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from '../actions'
import { HYDRATE } from 'next-redux-wrapper'

export type UserReducerState = {
  placeholderData: any;
  error: string | null;
};

export type UserStateAction = {
  payload?: any;
  error?: string;
  type: string;
};

const initialState: UserReducerState = {
  error: null,
  placeholderData: null,
}

export function userReducer(state = initialState, action: UserStateAction) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }

    case LOAD_USER_FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      }

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        ...{ placeholderData: action.payload },
      }

    default:
      return state
  }
}
