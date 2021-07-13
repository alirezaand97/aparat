/**
 *
 * UserProfilePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import DashboardLayouts from 'layouts/DashboardLayouts';
import {
  ROUTE_CHANGE_EMAIL,
  ROUTE_CHANGE_MOBILE,
  ROUTE_CHANGE_PASSWORD,
  ROUTE_MY_PROFILE,
  ROUTE_MY_PROFILE_BANNER,
  ROUTE_MY_PROFILE_CATEGORIES,
  ROUTE_MY_PROFILE_UNREGISTER,
} from 'containers/App/routes';
import { FilterList } from 'components/FilterList';
import { push } from 'connected-react-router';
import UnRegisterUser from './UnRegisterUser';
import CategoriesTab from './CategoriesTab';
import UploadChannelBanner from './UploadChannelBanner';
import UpdateChannelInfo from './UpdateChannelInfo';
import UpdatePassword from './UpdatePassword';
import UpdateEmailOrMobile from './UpdateEmailOrMobile';

const filterValues = {
  [ROUTE_MY_PROFILE]: 'اطلاعات کانال',
  [ROUTE_MY_PROFILE_BANNER]: 'تصویر پروفایل و کاور',
  [ROUTE_MY_PROFILE_CATEGORIES]: 'تنظیمات دسته‌بندی',
  [ROUTE_MY_PROFILE_UNREGISTER]: 'لغو عضویت',
};
export function UserProfilePage({ dispatch }) {
  const filterTab =
    location.pathname === ROUTE_CHANGE_EMAIL ||
    location.pathname === ROUTE_CHANGE_PASSWORD ||
    location.pathname === ROUTE_CHANGE_MOBILE
      ? ROUTE_MY_PROFILE
      : location.pathname;

  const CURRENT_MENU = location.pathname;
  function changeCurrentUrl(routePath) {
    dispatch(push(routePath));
  }

  return (
    <DashboardLayouts>
      <Helmet>
        <title>UserProfilePage</title>
        <meta name="description" content="Description of UserProfilePage" />
      </Helmet>
      <FilterList
        values={filterValues}
        filter={filterTab}
        onChangeFilter={changeCurrentUrl}
      />
      {CURRENT_MENU === ROUTE_MY_PROFILE_UNREGISTER && <UnRegisterUser />}
      {CURRENT_MENU === ROUTE_MY_PROFILE_CATEGORIES && <CategoriesTab />}
      {CURRENT_MENU === ROUTE_MY_PROFILE_BANNER && <UploadChannelBanner />}
      {CURRENT_MENU === ROUTE_MY_PROFILE && <UpdateChannelInfo />}
      {CURRENT_MENU === ROUTE_CHANGE_PASSWORD && <UpdatePassword />}
      {CURRENT_MENU === ROUTE_CHANGE_EMAIL && (
        <UpdateEmailOrMobile type="email" />
      )}
      {CURRENT_MENU === ROUTE_CHANGE_MOBILE && (
        <UpdateEmailOrMobile type="mobile" />
      )}
    </DashboardLayouts>
  );
}

UserProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserProfilePage);
