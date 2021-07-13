/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import LoginPage from 'containers/LoginPage/Loadable';
import { useInjectReducer } from 'utils/injectReducer';
import RenderError from 'components/RenderError/index';
import DashboardPage from 'containers/DashboardPage/Loadable';
import UploadPage from 'containers/UploadPage/Loadable';
import MyVideosPage from 'containers/MyVideosPage/Loadable';
import VideoShowPage from 'containers/VideoShowPage/Loadable';
import { useInjectSaga } from 'utils/injectSaga';
import UpdateVideoPage from 'containers/UpdateVideoPage/Loadable';
import FollowChannelPage from 'containers/FollowChannelPage/Loadable';
import CommentsPage from 'containers/CommentsPage/Loadable';
import ChannelStatistics from 'containers/ChannelStatistics/Loadable';
import MyChannelPage from 'containers/MyChannelPage/Loadable';
import UserProfilePage from 'containers/UserProfilePage/Loadable';
import { isAdmin, isLogin } from 'utils/auth';
import MainVideoShowPage from 'containers/MainVideoShowPage/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import UsersManagePage from 'containers/UsersManagePage/Loadable';
import VideosManage from 'containers/VideosManage/Loadable';
import FavoritesAndFollowingVideos from 'containers/FavoritesAndFollowingVideos/Loadable';
import CategoryVideos from 'containers/CategoryVideos/Loadable';
import SuperPrivateRoute from './Router/SuperPrivateRoute';
import PublicRoute from './Router/PublicRoute';
import PrivateRoute from './Router/PrivateRoute';
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_DASHBOARD,
  ROUTE_UPLOADNEW,
  ROUTE_MY_VIDEOS,
  ROUTE_UPDATE_VIDEO,
  ROUTE_SHOW_VIDEO,
  ROUTE_FOLLOWED_LIST,
  ROUTE_COMMENTS,
  ROUTE_CHANNEL_STATISTICS,
  ROUTE_MY_CHANNEL,
  ROUTE_MY_PROFILE,
  ROUTE_MY_PROFILE_BANNER,
  ROUTE_MY_PROFILE_CATEGORIES,
  ROUTE_MY_PROFILE_UNREGISTER,
  ROUTE_CHANGE_EMAIL,
  ROUTE_CHANGE_MOBILE,
  ROUTE_CHANGE_PASSWORD,
  ROUTE_VIDEO_MAIN,
  ROUTE_SEARCH,
  ROUTE_NOT_FOUND,
  ROUTE_USERS_MANAGE,
  ROUTE_VIDEOS_MANAGE,
  ROUTE_FAVORITE_VIDEOS,
  ROUTE_FOLLOWINGS_VIDEOS,
  ROUTE_CATEGORY_VIDEOS,
} from './routes';
import GlobalStyle from '../../global-styles';
import reducer from './reducer';
import saga from './saga';
function App() {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  isLogin();
  return (
    <div>
      <RenderError />
      <Switch>
        <PrivateRoute component={DashboardPage} exact path={ROUTE_DASHBOARD} />
        <PrivateRoute exact path={ROUTE_UPLOADNEW} component={UploadPage} />
        <PrivateRoute exact path={ROUTE_MY_VIDEOS} component={MyVideosPage} />
        <PrivateRoute
          exact
          path={ROUTE_UPDATE_VIDEO}
          component={UpdateVideoPage}
        />
        <PrivateRoute exact path={ROUTE_SHOW_VIDEO} component={VideoShowPage} />
        <PrivateRoute
          exact
          path={ROUTE_FOLLOWED_LIST}
          component={FollowChannelPage}
        />
        <PrivateRoute exact path={ROUTE_COMMENTS} component={CommentsPage} />
        <PrivateRoute
          exact
          path={ROUTE_CHANNEL_STATISTICS}
          component={ChannelStatistics}
        />
        <PrivateRoute
          exact
          path={ROUTE_MY_PROFILE}
          component={UserProfilePage}
        />
        <PrivateRoute
          exact
          path={ROUTE_CHANGE_EMAIL}
          component={UserProfilePage}
        />
        <PrivateRoute
          exact
          path={ROUTE_CHANGE_MOBILE}
          component={UserProfilePage}
        />
        <PrivateRoute
          exact
          path={ROUTE_CHANGE_PASSWORD}
          component={UserProfilePage}
        />
        <PrivateRoute
          exact
          path={ROUTE_MY_PROFILE_BANNER}
          component={UserProfilePage}
        />
        <PrivateRoute
          exact
          path={ROUTE_MY_PROFILE_CATEGORIES}
          component={UserProfilePage}
        />
        <PrivateRoute
          exact
          path={ROUTE_MY_PROFILE_UNREGISTER}
          component={UserProfilePage}
        />

        <SuperPrivateRoute
          exact
          path={ROUTE_USERS_MANAGE}
          component={UsersManagePage}
        />
        <SuperPrivateRoute
          exact
          path={ROUTE_VIDEOS_MANAGE}
          component={VideosManage}
        />

        <PublicRoute exact path={ROUTE_HOME} component={HomePage} />
        <PublicRoute
          restricted={false}
          exact
          path={ROUTE_LOGIN}
          component={LoginPage}
        />
        <PublicRoute exact path={ROUTE_MY_CHANNEL} component={MyChannelPage} />
        <PublicRoute
          exact
          path={ROUTE_VIDEO_MAIN}
          component={MainVideoShowPage}
        />
        <PublicRoute exact path={ROUTE_SEARCH} component={SearchPage} />

        <PrivateRoute
          exact
          path={ROUTE_FAVORITE_VIDEOS}
          component={FavoritesAndFollowingVideos}
        />
        <PrivateRoute
          exact
          path={ROUTE_FOLLOWINGS_VIDEOS}
          component={FavoritesAndFollowingVideos}
        />

        <PublicRoute
          exact
          path={ROUTE_CATEGORY_VIDEOS}
          component={CategoryVideos}
        />
        <PublicRoute component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

export default App;
