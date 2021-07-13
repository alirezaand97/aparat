/**
 *
 * VideoItem
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CheckOutlined, AddOutlined } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectDeleteVideo } from 'containers/App/selectors';
import { FOLLOWER_TYPE, FOLLOWING_TYPE } from 'utils/constants';
import {
  unfollowChannelAction,
  followChannelAction,
} from 'containers/App/actions';
import { push } from 'connected-react-router';
import { ROUTE_MY_CHANNEL } from 'containers/App/routes';

const StyledChannelItem = styled.div`
  width: 23%;
  margin: 0 0 0.7em 0.7em;
  width: 18%;
  height: auto;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);

  .container {
    padding: 1em 0.8em;
    text-align: center;
  }
  .avatar img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }

  .title {
    color: #484b62;
    margin: 0;
    padding: 0.9em 0 0.6em 0;
    font-size: 0.9em;
    cursor: pointer;
  }

  .description {
    padding: 0;
    margin: 0;
  }
  .description span {
    color: #6f7285;
    font-weight: 400;
    font-size: 0.9em;
    display: inline-block;
  }
  .description span:first-child {
    padding-left: 3px;
  }
  .description span:last-child {
    padding-right: 3px;
  }

  .followButton {
    border-radius: 20px;
    width: 100%;
    max-width: 120px;
    margin: 40px 0 5px 0;

    .MuiSvgIcon-root {
      width: 16px;
    }
  }

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
`;
function FollowItem({ follow, dispatch, unFollowChannel, followChannel }) {
  function handleRedirectToUserChannel() {
    dispatch(push(ROUTE_MY_CHANNEL.replace(':name', follow.channel.name)));
  }
  return (
    <StyledChannelItem item xs={12} sm={6} md={4} lg={3}>
      <div className="container">
        <div className="avatar">
          <img src={follow.avatar} />
        </div>
        <h2 className="title" onClick={() => handleRedirectToUserChannel()}>
          {follow.name}
        </h2>
        <p className="description">
          <span>{follow.followers_count} دنبال کننده</span>.
          <span>{follow.videos_count} ویدیو</span>
        </p>
        {((follow.type === FOLLOWING_TYPE && !follow.unfollowed) ||
          follow.followed) && (
          <Button
            variant="outlined"
            className="followButton"
            onClick={() => unFollowChannel(follow.name)}
          >
            <CheckOutlined /> دنبال شده{' '}
          </Button>
        )}
        {(follow.type === FOLLOWER_TYPE || follow.unfollowed) &&
          !follow.followed && (
          <Button
            variant="contained"
            color="secondary"
            className="followButton"
            onClick={() => followChannel(follow.name)}
          >
            {' '}
            <AddOutlined /> دنبال کردن{' '}
          </Button>
        )}
      </div>
    </StyledChannelItem>
  );
}

FollowItem.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    unFollowChannel: name => dispatch(unfollowChannelAction(name)),
    followChannel: name => dispatch(followChannelAction(name)),
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
)(FollowItem);
