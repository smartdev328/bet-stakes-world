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
  LOGIN_USER_REQUEST,
  FORGOT_PASS,
  FORGOT_PASS_REQUEST,
  FORGOT_PASS_FAILURE,
  FORGOT_PASS_SUCCESS,
  RESET_PASS,
  RESET_PASS_REQUEST,
  RESET_PASS_FAILURE,
  RESET_PASS_SUCCESS,
  SEND_CONFIRM_EMAIL
} from '../actions';
import {
  CreateUserReducerAction,
  LoginUserReducerAction,
  ForgotResetPassReducerAction,
  ResetPassReducerAction
} from '@redux/reducers/user';
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

function* forgotPassSaga({ payload }: ForgotResetPassReducerAction) {
  try {
    yield put({
      type: FORGOT_PASS_REQUEST
    });
    const res = yield UserAPIs.forgotPass(payload);
    const data = yield res.json();
    if (data.statusCode >= 400) {
      yield put({
        type: FORGOT_PASS_FAILURE,
        error: data.message[0].messages[0].message
      });
    } else {
      yield put({
        type: FORGOT_PASS_SUCCESS
      });
    }
  } catch (error) {
    yield put({
      error: error.message,
      type: FORGOT_PASS_FAILURE
    });
  }
}

function* resetPassSaga({ payload }: ResetPassReducerAction) {
  try {
    yield put({
      type: RESET_PASS_REQUEST
    });
    const res = yield UserAPIs.resetPass(payload);
    const data = yield res.json();
    if (data.statusCode >= 400) {
      yield put({
        type: RESET_PASS_FAILURE,
        error: data.message[0].messages[0].message
      });
    } else {
      yield put({
        type: RESET_PASS_SUCCESS
      });
    }
  } catch (error) {
    yield put({
      error: error.message,
      type: RESET_PASS_FAILURE
    });
  }
}

function* sendConfirmEmailSaga({ payload }: ForgotResetPassReducerAction) {
  yield UserAPIs.sendConfirmEmail(payload);
}

function* rootSaga() {
  yield all([
    takeLatest(LOAD_USER, loadDataSaga),
    takeLatest(SIGNUP_USER, registerUserSaga),
    takeLatest(LOGIN_USER, loginUserSaga),
    takeLatest(FORGOT_PASS, forgotPassSaga),
    takeLatest(RESET_PASS, resetPassSaga),
    takeLatest(SEND_CONFIRM_EMAIL, sendConfirmEmailSaga)
  ]);
}

export default rootSaga;
