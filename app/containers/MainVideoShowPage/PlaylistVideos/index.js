/**
 *
 * PlaylistVideos
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import MainLayout from 'layouts/MainLayout';
import { convertSecondsToTime, getCreatedAge } from 'utils/helpers';
import { push } from 'connected-react-router';
import { ROUTE_VIDEO_MAIN } from 'containers/App/routes';
import { PlayArrow, PlaylistPlay } from '@material-ui/icons';
import { StyledPlaylistVideos, StyledPlaylistHeader } from '../styled';
export function PlaylistVideos({ playlist, dispatch, currentVideoId }) {
  function redirectToVideoPage(slug) {
    dispatch(push(ROUTE_VIDEO_MAIN.replace(':slug', slug)));
  }

  const i = 0;

  return (
    <React.Fragment>
      <StyledPlaylistHeader className="playlistHeader">
        <div>
          <h4 className="playlistTitle">{playlist.title}</h4>
          <span className="playlistSize">{playlist.size} ویدیو</span>
        </div>
        <PlaylistPlay />
      </StyledPlaylistHeader>
      <StyledPlaylistVideos>
        {playlist.videos.map(item => (
          <div
            className={`playlistVideoWrapper ${
              currentVideoId === item.id ? 'activeVideo' : ''
            }`}
            key={item.id}
          >
            <div className="playIcon">
              {currentVideoId === item.id && <PlayArrow />}
            </div>
            <div
              className="playlistBanner"
              onClick={() => redirectToVideoPage(item.slug)}
            >
              <img src={item.banner_link} />
              <b className="duration">{convertSecondsToTime(item.duration)}</b>
            </div>
            <div className="playlistVideoInfo">
              <h2
                className="playlistVideoTitle"
                onClick={() => redirectToVideoPage(item.slug)}
              >
                {item.title}
              </h2>
              <span className="playlistVideoUser">کاربر</span>
              <div className="playlistVideoViews">
                <span>{item.views} بازدید</span>
                <span>{getCreatedAge(item.created_age)}</span>
              </div>
            </div>
          </div>
        ))}
      </StyledPlaylistVideos>
    </React.Fragment>
  );
}

PlaylistVideos.propTypes = {
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
)(PlaylistVideos);
