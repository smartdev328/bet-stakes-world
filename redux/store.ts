import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import rootSaga from './sagas';

const bindMiddleware = (middleware: SagaMiddleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  /* eslint-disable */
  const store: any = createStore(combineReducers(reducers), bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });