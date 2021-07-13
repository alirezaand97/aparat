/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOGOUT, LOGOUT_SUCCESS } from 'containers/App/constants';
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

export const initialState = {
  loginUser: {
    username: null,
    password: null,
    user: null,
    error: null,
  },
  registerUser: {
    params: null,
    data: null,
    error: null,
  },
  verificationUser: {
    params: null,
    data: null,
    error: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_ACTION:
        draft.loginUser.username = action.username;
        draft.loginUser.password = action.password;
        draft.loginUser.user = null;
        draft.loginUser.error = null;
        break;
      case LOGIN_SUCCESS_ACTION:
        draft.loginUser.user = action.user;
        draft.loginUser.username = null;
        draft.loginUser.password = null;
        draft.loginUser.error = null;
        break;
      case LOGIN_FAIL_ACTION:
        draft.loginUser.username = null;
        draft.loginUser.password = null;
        draft.loginUser.user = null;
        draft.loginUser.error = action.error;
        break;

      case LOGIN_REINIT:
        draft.loginUser.user = null;
        draft.loginUser.error = null;
        break;

      case LOGOUT_SUCCESS:
        draft.loginUser = initialState.loginUser;
        break;

      case REGISTER_ACTION:
        draft.registerUser.params = action.params;
        draft.registerUser.data = null;
        draft.registerUser.error = null;
        break;
      case REGISTER_SUCCESS_ACTION:
        draft.registerUser.params = null;
        draft.registerUser.data = action.data;
        draft.registerUser.error = null;
        break;
      case REGISTER_FAIL_ACTION:
        draft.registerUser.params = null;
        draft.registerUser.user = null;
        draft.registerUser.error = action.error;
        break;
      case REGISTER_RE_INIT:
        draft.registerUser = initialState.registerUser;
        break;

      case VERIFICATION_ACTION:
        draft.verificationUser.params = action.params;
        draft.verificationUser.data = null;
        draft.verificationUser.error = null;
        break;
      case VERIFICATION_SUCCESS_ACTION:
        draft.verificationUser.params = null;
        draft.verificationUser.data = action.data;
        draft.verificationUser.error = null;
        break;
      case VERIFICATION_FAIL_ACTION:
        draft.verificationUser.params = null;
        draft.verificationUser.user = null;
        draft.verificationUser.error = action.error;
        break;
      case VERIFICATION_RE_INIT:
        draft.verificationUser = initialState.verificationUser;
        break;
    }
  });

export default loginPageReducer;
