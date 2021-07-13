/**
 *
 * MainVideoItem
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { convertSecondsToTime, getCreatedAge } from 'utils/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectDeleteVideo } from 'containers/App/selectors';
import { push } from 'connected-react-router';
import { ROUTE_MY_CHANNEL, ROUTE_VIDEO_MAIN } from 'containers/App/routes';
import ConfirmModal from '../ConfirmModal';

const StyledMainVideoItem = styled.div`
  position: relative;
  height: 230px;
  max-height: 100vh;
  text-align: right;
  width: 18%;
  margin: 0 0 0.7em 0.7em;

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

  .videoBannerImage {
    width: 100%;
    height: 50%;
    cursor: pointer;
  }
  .videoTitle {
    font-size: 0.9em;
    font-weight: 600;
    line-height: 1.8em;
    color: #484b62;
    display: block;
    overflow: hidden;
    max-height: 50px;
    margin: 0;
    padding-top: 1em;
    cursor: pointer;
  }

  .channelName {
    font-size: 0.9rem;
    line-height: 2;
    display: block;
    color: #7a7d95;
    cursor: pointer;
  }
  .videoViews {
    direction: rtl;
    margin-top: 1em;
  }
  .videoViews span {
    display: inline-block;
    margin-left: 0.8rem;
  }
  .videoDuration {
    position: absolute;
    top: 40%;
    left: 14px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    padding: 0 4px;
  }
`;
function MainVideoItem({ video, dispatch }) {
  function redirectToUserPage() {
    dispatch(push(ROUTE_MY_CHANNEL.replace(':name', video.user.channel.name)));
  }

  function redirectToMainVideoShow() {
    dispatch(push(ROUTE_VIDEO_MAIN.replace(':slug', video.slug)));
  }

  return (
    <StyledMainVideoItem>
      <img
        src={video.banner_link}
        className="videoBannerImage"
        onClick={() => redirectToMainVideoShow()}
      />
      <b className="videoDuration">{convertSecondsToTime(video.duration)}</b>
      <b className="videoTitle" onClick={() => redirectToMainVideoShow()}>
        {video.title}
      </b>
      <span className="channelName" onClick={() => redirectToUserPage()}>
        {video.user.channel.name}
      </span>
      <div className="videoViews">
        <span>{video.views} بازدید </span>
        <span>{getCreatedAge(video.created_age)}</span>
      </div>
    </StyledMainVideoItem>
  );
}

MainVideoItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MainVideoItem);
