/**
 *
 * MyChannelHeader
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';
import {
  AddOutlined,
  CheckOutlined,
  SettingsOutlined,
} from '@material-ui/icons';
import { push } from 'connected-react-router';
import { ROUTE_LOGIN, ROUTE_MY_PROFILE } from 'containers/App/routes';
import {
  clearGetFollowListError,
  followChannelAction,
  getFollowListAction,
  getVideoAction,
  unfollowChannelAction,
} from 'containers/App/actions';
import { getAuth, isLogin } from 'utils/auth';
import { makeSelectGetFollowList } from 'containers/App/selectors';

const StyledChannelInfoHeader = styled(Grid)`
  height: 200px;
  background: url(${props => props.banner});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;

  .headerInfoBar {
    background: #fff;
    height: 80px;
    box-shadow: 0 5px 20px 0 rgba(41, 42, 51, 0.14);

    .headerInfoWrapper {
      max-width: 1450px;
      height: 80px;
      padding: 0 2em;
      display: flex;
    }
    .headerInfoAvatar {
      flex-grow: 1;
      position: relative;
      display: flex;
      align-items: center;

      img {
        width: 9em;
        height: 9em;
        border-radius: 50%;
        position: absolute;
        border: 2px solid #fff;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
        top: -45px;
      }

      .channelName {
        color: #484b62;
        font-size: 1.1rem;
        margin: 0.2rem;
      }
      .channelNameWrapper {
        margin-right: 9.5em;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
      }
      .settingButton {
        padding: 0.4em 1.5em;
        background: #05a3e8;
        border-radius: 25px;
        margin: 0 15px;
        color: #fff;

        .MuiSvgIcon-root {
          font-size: 1.2em;
          margin-left: 5px;
        }
      }
      .followButton {
        padding: 0.4em 1.5em;
        border-radius: 25px;
        margin: 0 15px;

        .MuiSvgIcon-root {
          font-size: 1.2em;
          margin-left: 5px;
        }
      }
    }

    .headerInfoVideos {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .headerInfoItems {
        padding: 0 15px;
        text-align: center;

        h5 {
          margin: 0;
          padding: 5px 0;
          font-size: 1.2em;
        }
      }
    }
  }

  @media (max-width: 576px) {
    .headerInfoVideos {
      display: none !important;
    }
    .headerInfoWrapper {
      padding: 0 1.5em !important;
    }
    .headerInfoAvatar img {
      width: 7em !important;
      height: 7em !important;
    }
    .channelNameWrapper {
      margin-right: 6.5em !important;
    }
  }
`;
export function MyChannelHeader({
  dispatch,
  channelInfo,
  followChannel,
  unFollowChannel,
}) {
  const { is_followed } = channelInfo.channel;
  const isMe = isLogin() && channelInfo.user.id === getAuth().me.id;

  console.log(isMe, is_followed, channelInfo);

  function handleFollowOrUnFollow() {
    if (isLogin()) {
      if (is_followed) {
        unFollowChannel(channelInfo.channel.name);
      } else {
        followChannel(channelInfo.channel.name);
      }
    } else {
      dispatch(push(ROUTE_LOGIN));
    }
  }

  function redirectToMyProfile() {
    dispatch(push(ROUTE_MY_PROFILE));
  }
  return (
    <StyledChannelInfoHeader banner={channelInfo.channel.banner}>
      <div className="headerInfoBar">
        <div className="headerInfoWrapper">
          <div className="headerInfoAvatar ">
            <img src={channelInfo.user.avatar} />
            <div className="channelNameWrapper">
              <h4 className="channelName">{channelInfo.channel.name}</h4>

              {isLogin() && isMe ? (
                <Button
                  className="settingButton"
                  variant="contained"
                  onClick={() => redirectToMyProfile()}
                >
                  <SettingsOutlined />
                  تنظیمات
                </Button>
              ) : (
                <Button
                  className="followButton"
                  variant={`${is_followed ? 'outlined' : 'contained'}`}
                  color={`${is_followed ? '' : 'secondary'}`}
                  onClick={() => handleFollowOrUnFollow()}
                >
                  {is_followed ? <CheckOutlined /> : <AddOutlined />}
                  {is_followed ? 'دنبال شده' : 'دنبال کردن'}
                </Button>
              )}
            </div>
          </div>
          <div className="headerInfoVideos">
            <div className="headerInfoItems">
              <h5>{channelInfo.channel.videos_count}</h5>
              <span>ویدیوها</span>
            </div>
            <div className="headerInfoItems">
              <h5>{channelInfo.channel.video_views}</h5>
              <span>بازدیدها</span>
            </div>
          </div>
        </div>
      </div>
    </StyledChannelInfoHeader>
  );
}

MyChannelHeader.defaulProps = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    followChannel: name => dispatch(followChannelAction(name)),
    unFollowChannel: name => dispatch(unfollowChannelAction(name)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyChannelHeader);
