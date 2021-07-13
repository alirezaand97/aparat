/**
 *
 * MainContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import MainLayout from 'layouts/MainLayout';
import { StyledMainContainer } from '../styled';
import { VideoPlayerContainer } from '../VideoPlayerContainer';
import VideoInfo from '../VideoInfo';
import { VideoComments } from '../VideoComments';

export function MainContainer({ video }) {
  const isFullWidth = video && !(video.playlist && video.related);

  return (
    <StyledMainContainer
      item
      xs={12}
      md={isFullWidth ? 12 : 8}
      lg={isFullWidth ? 12 : 9}
    >
      <VideoPlayerContainer video={video} />
      <VideoInfo video={video} />
      <VideoComments video={video} />
    </StyledMainContainer>
  );
}

MainContainer.propTypes = {
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
)(MainContainer);
