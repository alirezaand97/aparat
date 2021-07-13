/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_FAIL_ACTION,
  LOGIN_REINIT,
  REGISTER_ACTION,
  REGISTER_SUCCESS_ACTION,
  REGISTER_FAIL_ACTION,
  REGISTER_RE_INIT,
  VERIFICATION_ACTION,
  VERIFICATION_SUCCESS_ACTION,
  VERIFICATION_FAIL_ACTION,
  VERIFICATION_RE_INIT,
} from './constants';

export function loginAction(username, password) {
  return {
    type: LOGIN_ACTION,
    username,
    password,
  };
}

export function loginSuccessAction(user) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    user,
  };
}

export function loginFailAction(error) {
  return {
    type: LOGIN_FAIL_ACTION,
    error,
  };
}

export function loginReinit() {
  return {
    type: LOGIN_REINIT,
  };
}

export function registerAction(params) {
  return {
    type: REGISTER_ACTION,
    params,
  };
}

export function registerSuccessAction(data) {
  return {
    type: REGISTER_SUCCESS_ACTION,
    data,
  };
}

export function registerFailAction(error) {
  return {
    type: REGISTER_FAIL_ACTION,
    error,
  };
}

export function registerReInit() {
  return {
    type: REGISTER_RE_INIT,
  };
}

export function verificationAction(params) {
  return {
    type: VERIFICATION_ACTION,
    params,
  };
}

export function verificationSuccessAction(data) {
  return {
    type: VERIFICATION_SUCCESS_ACTION,
    data,
  };
}

export function verificationFailAction(error) {
  return {
    type: VERIFICATION_FAIL_ACTION,
    error,
  };
}

export function verificationReInitAction() {
  return {
    type: VERIFICATION_RE_INIT,
  };
}
