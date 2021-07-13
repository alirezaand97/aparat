/**
 *
 * VideoShowPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import DashboardLayouts from 'layouts/DashboardLayouts';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectGetVideo,
  makeSelectVideoStatistic,
} from 'containers/App/selectors';
import {
  getVideoAction,
  clearGetVideoError,
  getStatisticAction,
} from 'containers/App/actions';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import Loading from 'components/Loading';
import ErrorAlert from 'components/ErrorAlert';
import { ROUTE_SHOW_VIDEO, ROUTE_MY_VIDEOS } from 'containers/App/routes';
import VideoStatistic from './VideoStatistic';
import VideoThumb from './VideoThumb';
import VideoStatisticChart from './VideoStatisticChart';
const Wrapper = styled(Grid)`
  max-width: 1150px;
  margin: auto;
`;
export function VideoShowPage({
  match,
  video,
  getVideo,
  clearGetVideoError,
  getVideoStatistic,
  videoStatistic,
}) {
  const [range, setRange] = useState(7);
  useEffect(() => {
    getVideo(match.params.slug);
  }, []);
  useEffect(() => {
    getVideoStatistic(match.params.slug, range);
  }, [range]); // اگر مقدار range تغییر کرد دوباره رندر کن

  return (
    <DashboardLayouts>
      <Helmet>
        <title>VideoShowPage</title>
        <meta name="مشاهده ویدیو" content="مشاهده ویدیو" />
      </Helmet>
      {video && video.slug && <Loading />}
      {video && video.error && (
        <ErrorAlert
          error={video.error}
          onCloaseAlert={clearGetVideoError}
          redirectTo={{
            url: ROUTE_MY_VIDEOS.replace(':slug', match.params.slug),
            text: 'ویدیوهای من',
          }}
        />
      )}
      <Wrapper>
        <VideoThumb video={video.data} xs={12} />
        {video.data && videoStatistic.data && (
          <VideoStatistic
            video={video.data}
            statistic={videoStatistic.data}
            xs={12}
          />
        )}

        {videoStatistic.data && (
          <VideoStatisticChart
            statistic={videoStatistic.data.views}
            range={range}
            onChangeRange={setRange}
            xs={12}
          />
        )}
      </Wrapper>
    </DashboardLayouts>
  );
}

VideoShowPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getVideo: slug => dispatch(getVideoAction(slug)),
    clearGetVideoError: () => dispatch(clearGetVideoError()),
    getVideoStatistic: (slug, params) =>
      dispatch(getStatisticAction(slug, params)),
  };
}

const mapStateToProps = createStructuredSelector({
  video: makeSelectGetVideo(),
  videoStatistic: makeSelectVideoStatistic(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VideoShowPage);
