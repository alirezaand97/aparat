import { takeLatest, put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import { setAuth } from 'utils/auth';
import {
  globalErrorHappen,
  getUserMeAction,
  notificationShowAction,
} from 'containers/App/actions';
import { LoginApi, registerApi, verificationUserApi } from 'api/auth';
import { getUserMeFromServer } from 'containers/App/saga';
import { makeSelectUserMe } from 'containers/App/selectors';
import { ROUTE_DASHBOARD } from 'containers/App/routes';
import { to_valid_mobile } from 'utils/helpers';
import {
  LOGIN_ACTION,
  REGISTER_ACTION,
  VERIFICATION_ACTION,
} from './constants';
import {
  loginSuccessAction,
  loginFailAction,
  registerSuccessAction,
  registerFailAction,
  verificationSuccessAction,
  verificationFailAction,
  loginAction,
} from './actions';
function* loginToServer({ username, password }) {
  try {
    const response = yield call(LoginApi, { username, password }); // لاگین کاربر
    setAuth({ ...response.data }); // ثبت توکن در لوکال برای دریافت اطلاعات userMe
    yield getUserMeFromServer(); // دریافت اطلاعات کاربر از سرور
    const userMe = yield select(makeSelectUserMe());
    if (userMe.error) {
      throw userMe.error;
    }
    setAuth({ ...response.data, me: userMe.data });
    yield put(loginSuccessAction(response.data));
    yield put(push('/dashboard'));
  } catch (error) {
    if (error.response && error.response.status === 400) {
      yield put(loginFailAction(error));
    } else {
      yield put(globalErrorHappen(error));
    }
  }
}

function* registerToServer({ params }) {
  try {
    const response = yield call(registerApi, params);
    yield put(registerSuccessAction(response.data));
  } catch (error) {
    yield put(registerFailAction(error));
    if (error.response.status == 400) {
      yield put(
        notificationShowAction(
          'کاربری با این مشخصات موجود است. برای ثبت نام مجدداطلاعات جدید وارد کنید',
          'error',
        ),
      );
    }
    if (error.response.status == 500) {
      yield put(
        notificationShowAction('خطایی رخ داده است. مجددا تلاش کنید', 'error'),
      );
    }
  }
}

function* verificationUserToServer({ params }) {
  try {
    const response = yield call(verificationUserApi, params);
    yield put(verificationSuccessAction(response.data));
    let username = null;
    if (params.mobile) {
      username = to_valid_mobile(params.mobile);
    } else {
      username = params.email;
    }
    yield put(loginAction(username, username));
    yield put(
      notificationShowAction(
        'گذرواژه شما همان نام کاربری هنگام ورود شماست. در بخش پروفایل می توانید آن را تغییر دهید',
        'success',
      ),
    );
  } catch (error) {
    yield put(verificationFailAction(error));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN_ACTION, loginToServer);
  yield takeLatest(REGISTER_ACTION, registerToServer);
  yield takeLatest(VERIFICATION_ACTION, verificationUserToServer);
}
