/**
 *
 * DashboardPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import DashboardLayouts from 'layouts/DashboardLayouts/index';
import ChannelStatisticsCard from 'containers/ChannelStatistics/ChannelStatisticsCard';
import { getChannelStatisticsAction } from 'containers/App/actions';
import { makeSelectGetChannelStatistics } from 'containers/App/selectors';
import Loading from 'components/Loading';
import makeSelectDashboardPage from './selectors';

export function DashboardPage({ statistics, getChannelStatistic }) {
  const [range, setRange] = useState(7);
  useEffect(() => {
    getChannelStatistic(range);
  }, [range]);

  return (
    <DashboardLayouts>
      <Helmet>
        <title>داشبورد</title>
        <meta name="description" content="Description of DashboardPage" />
      </Helmet>
      {statistics.data && (
        <ChannelStatisticsCard statistics={statistics.data} />
      )}
      {statistics.params && <Loading text="در حال دریافت اطلاعات ..." />}
    </DashboardLayouts>
  );
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
  statistics: makeSelectGetChannelStatistics(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getChannelStatistic: range => dispatch(getChannelStatisticsAction(range)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashboardPage);
