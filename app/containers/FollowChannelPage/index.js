/**
 *
 * FollowChannelPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { getFollowListAction } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectGetFollowList } from 'containers/App/selectors';
import DashboardLayouts from 'layouts/DashboardLayouts';
import { FOLLOWING_TYPE, FOLLOWER_TYPE } from 'utils/constants';
import FilterFollows from 'components/FilterList';
import FollowChannelList from 'components/FollowChannelList';
import ErrorAlert from 'components/ErrorAlert';
import Loading from 'components/Loading';

const filterValues = {
  [FOLLOWING_TYPE]: 'کانال های دنبال شده',
  [FOLLOWER_TYPE]: 'دنبال کنندگان شما',
};

export function FollowChannelPage({
  getFollowList,
  followList,
  clearGetFollowListError,
}) {
  const [filter, setFilter] = useState(FOLLOWING_TYPE);

  function filteredFollowChannel() {
    if (followList.data) {
      const data = followList.data.filter(
        item =>
          item.type === filter ||
          (item.type === FOLLOWER_TYPE &&
            item.followed &&
            filter === FOLLOWING_TYPE) ||
          (item.type === FOLLOWER_TYPE &&
            item.unfollowed &&
            filter === FOLLOWING_TYPE),
      );
      return _.uniqBy(data, x => x.id);
    }
  }

  useEffect(() => {
    getFollowList();
  }, []);

  return (
    <DashboardLayouts>
      <Helmet>
        <title>FollowChannelPage</title>
        <meta name="description" content="Description of FollowChannelPage" />
      </Helmet>
      {followList.error && (
        <ErrorAlert
          onCloaseAlert={clearGetFollowListError}
          error={followList.error}
          redirectTo={{ url: '/comments', text: 'دنبال کنندگان' }}
        />
      )}
      {followList.data && (
        <React.Fragment>
          <FilterFollows
            onChangeFilter={setFilter}
            filter={filter}
            values={filterValues}
          />
          <FollowChannelList
            follows={filteredFollowChannel()}
            filter={filter}
          />
        </React.Fragment>
      )}
      {followList.loading && (
        <Loading text="در حال دریافت لیست دنبال کنندگان..." />
      )}
    </DashboardLayouts>
  );
}

FollowChannelPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getFollowList: () => dispatch(getFollowListAction()),
    clearGetFollowListError: () => dispatch(clearGetFollowListError()),
  };
}
const mapStateToProps = createStructuredSelector({
  followList: makeSelectGetFollowList(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FollowChannelPage);
