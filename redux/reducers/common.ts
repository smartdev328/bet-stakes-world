import { CLOSE_MODAL, OPEN_MODAL } from '../actions';
import { HYDRATE } from 'next-redux-wrapper';

type PlaceholderDataType = {
  name: string;
};

export type CommonReducerState = {
  isModalOpen: boolean;
};

export type CommonStateAction = {
  payload?: PlaceholderDataType;
  error?: string;
  type: string;
};

const initialState: CommonReducerState = {
  isModalOpen: false
};

export function commonReducer(state = initialState, action: CommonStateAction) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    case OPEN_MODAL:
      return {
        ...state,
        ...{ isModalOpen: true }
      };

    case CLOSE_MODAL:
      return {
        ...state,
        ...{ isModalOpen: false }
      };
    default:
      return state;
  }
}
