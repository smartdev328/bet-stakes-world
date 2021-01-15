import { userReducer, UserReducerState } from './user';
import { commonReducer, CommonReducerState } from './common';

export const reducers = {
  user: userReducer,
  common: commonReducer
};

export type ReducerKeys = keyof typeof reducers;

export type ReduxState = {
  user: UserReducerState;
  common: CommonReducerState;
};

export default reducers;
