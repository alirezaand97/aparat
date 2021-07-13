/**
 *
 * VideoItem
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Grid, IconButton } from '@material-ui/core';

import { compose } from 'redux';
import { PlaylistPlayOutlined } from '@material-ui/icons';
import { push } from 'connected-react-router';
import { ROUTE_VIDEO_MAIN } from 'containers/App/routes';
import { connect } from 'react-redux';

const StyledPlaylistItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 17%;
  margin: 0 0 0.7em 0.7em;
  height: 150px;
  position: relative;
  cursor: pointer;

  @media (max-width: 1200px) {
    width: calc(20% - 0.75em);
  }

  @media (max-width: 980px) {
    width: calc(33% - 0.75em);
    .container .avatar img {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 480px) {
    width: calc(50% - 0.75em);
  }

  @media (max-width: 360px) {
    width: calc(100% - 0.75em);
  }

  .playlistBannerContainer {
    position: relative;
    height: 70%;

    .playlistIconContainer {
      color: #fff;
      background-color: rgba(41, 42, 51, 0.8);
      width: 35%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      h5 {
        margin: 0;
        padding: 0;
      }
      .MuiSvgIcon-root {
        font-size: 2.5rem;
      }
    }
    .playlistTitle {
      font-size: 0.9rem;
    }

    .playlistBanner {
      width: 100%;
      height: 100%;
    }
  }
`;
function PlaylistItem({ playlist, dispatch }) {
  console.log();
  return (
    <StyledPlaylistItem
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      onClick={() =>
        dispatch(push(ROUTE_VIDEO_MAIN.replace(':slug', playlist.video.slug)))
      }
    >
      <div className="playlistBannerContainer">
        <div className="playlistIconContainer">
          <PlaylistPlayOutlined />
          <h5>{playlist.size} ویدیو</h5>
        </div>
        <img src={playlist.video.banner_link} className="playlistBanner" />
        <h5 className="playlistTitle">{playlist.title}</h5>
      </div>
    </StyledPlaylistItem>
  );
}

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
)(PlaylistItem);
