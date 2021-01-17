import { all, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST
} from '../actions';
import { CreateUserReducerAction, LoginUserReducerAction } from '@redux/reducers/user';
import UserAPIs from '@apis/user.apis';

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users');
    const data = yield res.json();
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      error,
      type: LOAD_USER_FAILURE
    });
  }
}

function* registerUserSaga({ payload }: CreateUserReducerAction) {
  try {
    yield put({
      type: SIGNUP_USER_REQUEST
    });
    const res = yield UserAPIs.createUser(payload);
    const data = yield res.json();
    if (data.statusCode >= 400) {
      yield put({
        type: SIGNUP_USER_FAILURE,
        error: data.message[0].messages[0].message
      });
    } else {
      yield put({
        type: SIGNUP_USER_SUCCESS,
        payload: data
      });
    }
  } catch (error) {
    yield put({
      error: error.message,
      type: SIGNUP_USER_FAILURE
    });
  }
}

function* loginUserSaga({ payload }: LoginUserReducerAction) {
  try {
    yield put({
      type: LOGIN_USER_REQUEST
    });
    const res = yield UserAPIs.login(payload);
    const data = yield res.json();
    if (data.statusCode >= 400) {
      yield put({
        type: LOGIN_USER_FAILURE,
        error: data.message[0].messages[0].message
      });
    } else {
      yield put({
        type: LOGIN_USER_SUCCESS,
        payload: data
      });
    }
  } catch (error) {
    yield put({
      error: error.message,
      type: LOGIN_USER_FAILURE
    });
  }
}

function* rootSaga() {
  yield all([
    takeLatest(LOAD_USER, loadDataSaga),
    takeLatest(SIGNUP_USER, registerUserSaga),
    takeLatest(LOGIN_USER, loginUserSaga)
  ]);
}

export default rootSaga;
