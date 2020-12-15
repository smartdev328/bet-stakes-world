import { all, put, takeLatest } from 'redux-saga/effects';
import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from '../actions';

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users');
    const data = yield res.json();
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      error,
      type: LOAD_USER_FAILURE,
    });
  }
}

function* rootSaga() {
  yield all([
    takeLatest(LOAD_USER, loadDataSaga),
  ]);
}

export default rootSaga;
