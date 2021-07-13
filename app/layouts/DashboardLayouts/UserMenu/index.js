/**
 *
 * UserMenu
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, IconButton, Menu, MenuItem } from '@material-ui/core';

import {
  AccountCircle,
  SettingsOutlined as SettingsIcon,
  DashboardOutlined as DashboardIcon,
  MovieOutlined as MovieIcon,
  ModeCommentOutlined as CommentIcon,
  SubscriptionsOutlined as FollowedChannelsIcon,
  PieChartOutlined as ChartIcon,
  PowerSettingsNewOutlined as LoguotIcon,
  PersonOutline,
  PeopleAltOutlined,
  SubscriptionsOutlined,
} from '@material-ui/icons';
import {
  ROUTE_DASHBOARD,
  ROUTE_MY_VIDEOS,
  ROUTE_COMMENTS,
  ROUTE_FOLLOWED_LIST,
  ROUTE_CHANNEL_STATISTICS,
  ROUTE_LOGIN,
  ROUTE_MY_PROFILE,
  ROUTE_USERS_MANAGE,
  ROUTE_VIDEOS_MANAGE,
  ROUTE_MY_CHANNEL,
} from 'containers/App/routes';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectLocation,
  makeSelectLogout,
  makeSelectUserMe,
} from 'containers/App/selectors';
import { getUserMeAction, logoutAction } from 'containers/App/actions';
import { avaratImage } from 'images/avatar-is-channel.png';
import { isAdmin, isLogin } from 'utils/auth';

const StyledMenu = styled(Menu)`
  margin-top: 40px;

  & ul {
    padding-top: 0;
  }

  & li {
    min-width: 250px;
    color: #484b62;
    font-size: 0.9rem;
    font-weight: 300;
    margin-top: 0;
    padding: 10px;
  }

  & .channelMenu {
    display: block;
    padding: 10px 40px;
    text-align: right;
    background-color: #f5f5f9;
  }
  & .channelMenu:hover {
    background-color: #f5f5f9;
  }

  & .channelMenu .channelMenuAccount {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    float: right;
    margin-right: -30px;
    margin-left: 7px;
    color: #6f7285;
  }
  & .channelMenu .channelNameMenu {
    display: block;
  }
  & .channelMenu .channelSettingMenu {
    display: block;
    font-size: 0.8rem;
    margin-top: 5px;
    cursor: pointer;
  }
  & .channelMenu .channelSettingMenu .MuiSvgIcon-root {
    font-size: 0.8rem;
    margin-left: 3px;
  }

  & .otherMenuItem .MuiSvgIcon-root {
    color: #6f7285;
    font-size: 1.2rem;
    margin-left: 7px;
  }
  .MuiListItem-root.Mui-selected {
    background-color: #f5f5f9;
    .MuiSvgIcon-root {
      color: #df0f50;
    }
  }
  .MuiListItem-root:hover,
  .MuiListItem-root.Mui-selected:hover {
    background-color: #f5f5f9;
  }
`;

const StyledLoginButton = styled(Button)`
  .MuiButton-root {
    border-radius: 15px !important;
  }

  .loginText {
    color: #6f7285;
  }
  @media (max-width: 576px) {
    .loginText {
      display: none;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  & .avatarImage {
    width: 36px;
    height: 36px;
    border-radius: 100%;
  }
`;

function UserMenu({ dispatch, location, user, logoutUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path = null) => {
    if (path) {
      dispatch(push(path));
    }
    setAnchorEl(null);
  };

  function redirectToChannel() {
    dispatch(push(ROUTE_MY_CHANNEL.replace(':name', user.data.channel.name)));
  }

  return (
    <React.Fragment>
      {isLogin() && (
        <React.Fragment>
          <StyledIconButton
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <img
              src={user.data.avatar ? user.data.avatar : avaratImage}
              className="avatarImage"
            />
          </StyledIconButton>
          <StyledMenu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
          >
            <MenuItem className="channelMenu">
              <img
                src={user.data.avatar ? user.data.avatar : avaratImage}
                className="channelMenuAccount"
                onClick={() => redirectToChannel()}
              />

              <b
                className="channelNameMenu"
                onClick={() => redirectToChannel()}
              >
                {user.data && user.data.channel.name}
              </b>
              <div
                className="channelSettingMenu"
                onClick={() => dispatch(push(ROUTE_MY_PROFILE))}
              >
                <SettingsIcon />
                <span>تنظیمات</span>
              </div>
            </MenuItem>

            <MenuItem
              onClick={() => handleClose(ROUTE_DASHBOARD)}
              selected={location.pathname === ROUTE_DASHBOARD}
              className="otherMenuItem"
            >
              <DashboardIcon />
              داشبورد
            </MenuItem>

            {isAdmin() && (
              <div>
                <MenuItem
                  onClick={() => handleClose(ROUTE_USERS_MANAGE)}
                  selected={location.pathname === ROUTE_USERS_MANAGE}
                  className="otherMenuItem"
                >
                  <PeopleAltOutlined />
                  مدیریت کاربران
                </MenuItem>

                <MenuItem
                  onClick={() => handleClose(ROUTE_VIDEOS_MANAGE)}
                  selected={location.pathname === ROUTE_VIDEOS_MANAGE}
                  className="otherMenuItem"
                >
                  <SubscriptionsOutlined />
                  مدیریت ویدیوها
                </MenuItem>
              </div>
            )}

            <MenuItem
              onClick={() => handleClose(ROUTE_MY_VIDEOS)}
              selected={location.pathname === ROUTE_MY_VIDEOS}
              className="otherMenuItem"
            >
              <MovieIcon />
              ویدیوهای من
            </MenuItem>
            <MenuItem
              onClick={() => handleClose(ROUTE_COMMENTS)}
              selected={location.pathname === ROUTE_COMMENTS}
              className="otherMenuItem"
            >
              <CommentIcon />
              دیدگاه ها
            </MenuItem>
            <MenuItem
              onClick={() => handleClose(ROUTE_FOLLOWED_LIST)}
              selected={location.pathname === ROUTE_FOLLOWED_LIST}
              className="otherMenuItem"
            >
              <FollowedChannelsIcon />
              کانال های دنبال شده
            </MenuItem>
            <MenuItem
              onClick={() => handleClose(ROUTE_CHANNEL_STATISTICS)}
              selected={location.pathname === ROUTE_CHANNEL_STATISTICS}
              className="otherMenuItem"
            >
              <ChartIcon />
              آمار بازدید
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                dispatch(logoutAction());
              }}
              className="otherMenuItem"
              disabled={logoutUser && logoutUser.loading}
            >
              <LoguotIcon />
              خروج ازحساب کاربری
            </MenuItem>
          </StyledMenu>
        </React.Fragment>
      )}
      {!isLogin() && (
        <StyledLoginButton onClick={() => dispatch(push(ROUTE_LOGIN))}>
          <span className="loginText">ورود یا عضویت</span>
          <PersonOutline />
        </StyledLoginButton>
      )}
    </React.Fragment>
  );
}

UserMenu.propTypes = {};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  user: makeSelectUserMe(),
  logoutUser: makeSelectLogout(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserMenu);
