/**
 *
 * VideoPlayerContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import LoadingSpinner from 'video-react/lib/components/LoadingSpinner';
import ControlBar from 'video-react/lib/components/control-bar/ControlBar';
import PlaybackRateMenuButton from 'video-react/lib/components/control-bar/PlaybackRateMenuButton';
import ReplayControl from 'video-react/lib/components/control-bar/ReplayControl';
import ForwardControl from 'video-react/lib/components/control-bar/ForwardControl';
import BigPlayButton from 'video-react/lib/components/BigPlayButton';

export function VideoPlayerContainer({ video }) {
  return (
    <Player poster={video.banner_link} src={video.link}>
      <LoadingSpinner />
      <ControlBar autoHide disableCompletely={false}>
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={30} order={1.2} />
      </ControlBar>
      <BigPlayButton position="center" />
    </Player>
  );
}

VideoPlayerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
)(VideoPlayerContainer);
