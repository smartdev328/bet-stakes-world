import { userReducer, UserReducerState } from './user';

export const reducers = {
  user: userReducer
};

export type ReducerKeys = keyof typeof reducers;

export type ReduxState = {
  user: UserReducerState;
};

export default reducers;
