import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.loginUser,
  );

const makeSelectRegisterUser = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.registerUser,
  );

const makeSelectVerificationUser = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.verificationUser,
  );

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  makeSelectRegisterUser,
  makeSelectVerificationUser,
};
