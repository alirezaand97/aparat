/**
 *
 * ChannelStatistics
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import DashboardLayouts from 'layouts/DashboardLayouts';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { getChannelStatisticsAction } from 'containers/App/actions';
import { makeSelectGetChannelStatistics } from 'containers/App/selectors';
import Loading from 'components/Loading';
import ChannelStatisticsCard from './ChannelStatisticsCard';
import ChannelStatisticsChart from './ChannelStatisticsChart';
import ChannelStatisticsTopVideos from './ChannelStatisticsTopVideos';

const Wrapper = styled(Grid)`
  max-width: 1150px;
  margin: auto;
`;
export function ChannelStatistics({ getChannelStatistic, channelStatistics }) {
  const [range, setRange] = useState(7);
  useEffect(() => {
    getChannelStatistic(range);
  }, [range]);

  return (
    <DashboardLayouts>
      <Helmet>
        <title>ChannelStatistics</title>
        <meta name="مشاهده ویدیو" content="مشاهده ویدیو" />
      </Helmet>
      {channelStatistics.params && <Loading />}
      {channelStatistics.data && (
        <React.Fragment>
          <ChannelStatisticsCard statistics={channelStatistics.data} />
          <ChannelStatisticsChart
            statistics={channelStatistics.data.views}
            range={range}
            onChangeRange={setRange}
          />
          <ChannelStatisticsTopVideos statistics={channelStatistics.data} />
        </React.Fragment>
      )}
    </DashboardLayouts>
  );
}

ChannelStatistics.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getChannelStatistic: params => dispatch(getChannelStatisticsAction(params)),
  };
}

const mapStateToProps = createStructuredSelector({
  channelStatistics: makeSelectGetChannelStatistics(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChannelStatistics);
