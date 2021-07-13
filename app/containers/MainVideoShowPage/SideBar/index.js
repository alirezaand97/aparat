/**
 *
 * SideBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import MainLayout from 'layouts/MainLayout';
import { StyledSideBar } from '../styled';
import SimularVideos from '../SimularVideos';
import PlaylistVideos from '../PlaylistVideos';
export function SideBar({ video }) {
  return (
    <StyledSideBar item xs={12} md={4} lg={3} className="VideoSideBar">
      {video && video.playlist && !!video.playlist.videos.length && (
        <PlaylistVideos playlist={video.playlist} currentVideoId={video.id} />
      )}
      {video && video.related && !!video.related.length && (
        <SimularVideos videos={video.related} />
      )}
    </StyledSideBar>
  );
}

SideBar.propTypes = {
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
)(SideBar);
