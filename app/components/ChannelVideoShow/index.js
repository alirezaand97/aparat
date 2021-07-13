/**
 *
 * VideoItem
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { convertSecondsToTime, getCreatedAge } from 'utils/helpers';
import { Grid, IconButton } from '@material-ui/core';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import { ROUTE_SHOW_VIDEO } from 'containers/App/routes';
import { createStructuredSelector } from 'reselect';

const StyledVideoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18%;
  margin: 0 0 0.7em 0.7em;
  height: 200px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  position: relative;

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

  & .duration {
    position: absolute;
    top: 40%;
    left: 14px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    padding: 0 4px;
  }
  img {
    width: 100%;
    height: 55%;
    max-height: 55%;
    cursor: pointer;
  }

  & .title {
    font-size: 0.9em;
    font-weight: 600;
    line-height: 1.8em;
    color: #484b62;
    display: block;
    overflow: hidden;
    max-height: 40px;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  & .viewsContainer {
    font-size: 0.9em;
    font-weight: 300;
    color: #6f7285;
    margin: 7px 0;
    padding: 0;

    span {
      display: inline-block;
      margin-left: 1em;
    }
    & .tag {
      display: inline-block;
      float: left;
      color: #05a3e8;
      background-color: rgba(5, 163, 232, 0.15);
      border-radius: 3px;
      padding: 1px;
      padding: 0.1em;
    }
  }

  & .contentWrapper {
    padding: 15px;
  }

  & .MuiSvgIcon-root:hover {
    color: #df0f50;
  }
`;
function VideoItem({ video, dispatch }) {
  function RedirectToVideoPage() {
    if (!video.republished) {
      dispatch(push(ROUTE_SHOW_VIDEO.replace(':slug', video.slug)));
    }
  }

  return (
    <StyledVideoItem item xs={12} sm={6} md={4} lg={3}>
      <img src={video.banner_link} onClick={RedirectToVideoPage} />
      <b className="duration">{convertSecondsToTime(video.duration)}</b>
      <div className="contentWrapper">
        <b className="title" title={video.title} onClick={RedirectToVideoPage}>
          {video.title}
        </b>
        <div className="viewsContainer">
          <span className="views">{video.views} بازدید</span>
          <span className="views">{getCreatedAge(video.created_age)}</span>
          {!!video.republished && <span className="tag">بازنشر</span>}
        </div>
      </div>
    </StyledVideoItem>
  );
}

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
)(VideoItem);
