/**
 *
 * SideBar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import avatarImage from 'images/avatar-is-channel.png';
import {
  PeopleAltOutlined,
  PeopleOutlineOutlined,
  SettingsOutlined as SettingIcon,
  SubscriptionsOutlined,
  AccountCircle,
  SettingsOutlined as SettingsIcon,
  DashboardOutlined as DashboardIcon,
  MovieOutlined as MovieIcon,
  ModeCommentOutlined as CommentIcon,
  SubscriptionsOutlined as FollowedChannelsIcon,
  PieChartOutlined as ChartIcon,
  PowerSettingsNewOutlined as LoguotIcon,
} from '@material-ui/icons';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectLocation,
  makeSelectUserMe,
  makeSelectLogout,
} from 'containers/App/selectors';
import { push } from 'connected-react-router';
import {
  ROUTE_DASHBOARD,
  ROUTE_MY_VIDEOS,
  ROUTE_FOLLOWED_LIST,
  ROUTE_COMMENTS,
  ROUTE_CHANNEL_STATISTICS,
  ROUTE_MY_CHANNEL,
  ROUTE_MY_PROFILE,
  ROUTE_USERS_MANAGE,
  ROUTE_VIDEOS_MANAGE,
} from 'containers/App/routes';
import { logoutAction } from 'containers/App/actions';
import { isAdmin } from 'utils/auth';

const StyledSideBar = styled.div`
  width: 240px;
  min-height: calc(100vh - 55px);
  position: fixed;
  margin-top: 55px;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);

  & .top {
    padding-top: 2em;
    padding-bottom: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  & .avatar {
    width: 100px;
    height: 100px;
    border: 1px solid #fff;
    border-radius: 100%;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
    position: relative;
  }
  & .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }

  & .avatar .settingIcon {
    position: absolute;
    top: 11px;
    left: -2px;
    display: inline-block;
    background: #fff;
    border-radius: 100%;
    padding: 2px;
    color: #6f7285;
    cursor: pointer;
  }

  & .avatar .settingIcon:hover {
    background: #eee;
    color: #6f7285;
  }

  & .channelName {
    font-size: 1.1em;
    font-weight: 600;
    margin-top: 1em;
    text-align: center;
    color: #484b62;
    cursor: pointer;
  }
  & .MuiListItemText-root {
    text-align: right;
  }

  & .MuiTypography-body1 {
    color: #6f7285;
    font-size: 1.1em;
    font-weight: 500;
  }
  & .MuiListItemIcon-root {
    min-width: 35px;
  }

  & .bottom .MuiSvgIcon-root {
    color: #6f7285;
  }

  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
  & .MuiListItem-root.Mui-selected,
  .MuiListItem-root.Mui-selected:hover {
    background-color: #f5f5f9;
  }
  & .MuiListItem-root.Mui-selected .MuiSvgIcon-root {
    color: #df0f50;
  }
  & .MuiListItem-root:hover {
    background-color: #f5f5f9;
  }
`;

function SideBar({ dispatch, location, user, logoutData }) {
  return (
    <StyledSideBar>
      <div className="top">
        <div className="avatar">
          <img src={user.data.avatar} />
          <span
            className="settingIcon"
            onClick={() => dispatch(push(ROUTE_MY_PROFILE))}
          >
            <SettingIcon fontSize="small" />
          </span>
          <div
            className="channelName"
            onClick={() =>
              dispatch(
                push(ROUTE_MY_CHANNEL.replace(':name', user.data.channel.name)),
              )
            }
          >
            {user.data.channel.name}
          </div>
        </div>
      </div>
      <div className="bottom">
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            onClick={() => dispatch(push(ROUTE_DASHBOARD))}
            selected={location.pathname === ROUTE_DASHBOARD}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="داشبورد" />
          </ListItem>

          {isAdmin() && (
            <React.Fragment>
              <ListItem
                button
                onClick={() => dispatch(push(ROUTE_USERS_MANAGE))}
                selected={location.pathname === ROUTE_USERS_MANAGE}
              >
                <ListItemIcon>
                  <PeopleAltOutlined />
                </ListItemIcon>
                <ListItemText primary="مدیریت کاربران" />
              </ListItem>

              <ListItem
                button
                onClick={() => dispatch(push(ROUTE_VIDEOS_MANAGE))}
                selected={location.pathname === ROUTE_VIDEOS_MANAGE}
              >
                <ListItemIcon>
                  <SubscriptionsOutlined />
                </ListItemIcon>
                <ListItemText primary="مدیریت ویدیوها" />
              </ListItem>
            </React.Fragment>
          )}

          <ListItem
            button
            onClick={() => dispatch(push(ROUTE_MY_VIDEOS))}
            selected={location.pathname === ROUTE_MY_VIDEOS}
          >
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="ویدیوهای من" />
          </ListItem>
          <ListItem
            button
            onClick={() => dispatch(push(ROUTE_COMMENTS))}
            selected={location.pathname === ROUTE_COMMENTS}
          >
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <ListItemText primary="دیدگاه ها" />
          </ListItem>
          <ListItem
            button
            onClick={() => dispatch(push(ROUTE_FOLLOWED_LIST))}
            selected={location.pathname === ROUTE_FOLLOWED_LIST}
          >
            <ListItemIcon>
              <FollowedChannelsIcon />
            </ListItemIcon>
            <ListItemText primary="کانال های دنبال شده" />
          </ListItem>
          <ListItem
            button
            onClick={() => dispatch(push(ROUTE_CHANNEL_STATISTICS))}
            selected={location.pathname === ROUTE_CHANNEL_STATISTICS}
          >
            <ListItemIcon>
              <ChartIcon />
            </ListItemIcon>
            <ListItemText primary="آمار بازدید" />
          </ListItem>
          <ListItem
            button
            onClick={() => dispatch(logoutAction())}
            disabled={logoutData.loading}
          >
            <ListItemIcon>
              <LoguotIcon />
            </ListItemIcon>
            <ListItemText primary="خروج ازحساب کاربری" />
          </ListItem>
        </List>
      </div>
    </StyledSideBar>
  );
}

SideBar.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  user: makeSelectUserMe(),
  logoutData: makeSelectLogout(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default withConnect(SideBar);
