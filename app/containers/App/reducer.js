/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { COMMENT_STATE_ACCEPTED } from 'utils/constants';
import { getAuth } from 'utils/auth';
import {
  GLOBAL_ERROR_HAPPEN,
  GLOBAL_ERROR_CLEAR,
  DRAWER_OPEN,
  UPLOAD_VIDEO,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAIL,
  UPLOAD_VIDEO_PROGRESS,
  GET_MY_VIDEOS,
  GET_MY_VIDEOS_SUCCESS,
  GET_MY_VIDEOS_FAIL,
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAIL,
  GET_APARAT_CATEGORIES,
  GET_APARAT_CATEGORIES_SUCCESS,
  GET_APARAT_CATEGORIES_FAIL,
  GET_CHANNEL_CATEGORIES,
  GET_CHANNEL_CATEGORIES_SUCCESS,
  GET_CHANNEL_CATEGORIES_FAIL,
  ADD_CHANNEL_CATEGORIES,
  ADD_CHANNEL_CATEGORIES_SUCCESS,
  ADD_CHANNEL_CATEGORIES_FAIL,
  EDIT_CHANNEL_CATEGORIES,
  EDIT_CHANNEL_CATEGORIES_SUCCESS,
  EDIT_CHANNEL_CATEGORIES_FAIL,
  ADD_TAGS,
  ADD_TAGS_SUCCESS,
  ADD_TAGS_FAIL,
  ADD_PLAYLIST,
  ADD_PLAYLIST_SUCCESS,
  ADD_PLAYLIST_FAIL,
  GET_PLAYLISTS,
  GET_PLAYLISTS_SUCCESS,
  GET_PLAYLISTS_FAIL,
  CREATE_VIDEO,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_FAIL,
  UPLOAD_BANNER,
  UPLOAD_BANNER_SUCCESS,
  UPLOAD_BANNER_FAIL,
  DELETE_VIDEO,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
  CLEAR_VIDEO_DATA_AFTER_CREATE,
  CLEAR_VIDEO_DELETE_ERROR,
  GET_VIDEO,
  GET_VIDEO_SUCCESS,
  GET_VIDEO_FAIL,
  CLEAR_GET_VIDEO_AFTER_UNMOUNT,
  CLEAR_GET_VIDEO_ERROR,
  CLEAR_UPLOAD_BANNER_ERROR,
  UPDATE_VIDEO,
  UPDATE_VIDEO_SUCCESS,
  UPDATE_VIDEO_FAIL,
  CLEAR_UPDATE_VIDEO_DATA,
  GET_STATISTIC,
  GET_STATISTIC_SUCCESS,
  GET_STATISTIC_FAIL,
  CLEAR_GET_STATISTIC_DATA,
  GET_FOLLOW_LIST,
  GET_FOLLOW_LIST_SUCCESS,
  GET_FOLLOW_LIST_FAIL,
  UNFOLLOW_CHANNEL,
  UNFOLLOW_CHANNEL_SUCCESS,
  UNFOLLOW_CHANNEL_FAIL,
  FOLLOW_CHANNEL,
  FOLLOW_CHANNEL_SUCCESS,
  FOLLOW_CHANNEL_FAIL,
  GET_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  CLEAR_GET_FOLLOW_LIST_ERROR,
  POST_COMMENT,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  CLEAR_POST_COMMENT_ERROR,
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  REMOVE_COMMENT,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAIL,
  CHANGE_STATE_COMMENT,
  CHANGE_STATE_COMMENT_SUCCESS,
  CHANGE_STATE_COMMENT_FAIL,
  GET_CHANNEL_STATISTICS,
  GET_CHANNEL_STATISTICS_SUCCESS,
  GET_CHANNEL_STATISTICS_FAIL,
  GET_CHANNEL_STATISTICS_CLEAR_DATA,
  GET_USER_ME,
  GET_USER_ME_SUCCESS,
  GET_USER_ME_FAIL,
  GET_CHANNEL_INFO,
  GET_CHANNEL_INFO_SUCCESS,
  GET_CHANNEL_INFO_FAIL,
  GET_CHANNEL_INFO_CLEAR_DATA,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UNREGISTER_USER,
  UNREGISTER_USER_SUCCESS,
  UNREGISTER_USER_FAIL,
  Upload_CHANNEL_BANNER,
  Upload_CHANNEL_BANNER_SUCCESS,
  Upload_CHANNEL_BANNER_FAIL,
  UPDATE_CHANNEL_INFO,
  UPDATE_CHANNEL_INFO_SUCCESS,
  UPDATE_CHANNEL_INFO_FAIL,
  UPDATE_USER_SOCIALS,
  UPDATE_USER_SOCIALS_SUCCESS,
  UPDATE_USER_SOCIALS_FAIL,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
  CLEAR_UPDATE_USER_PASSWORD,
  UPDATE_USER_EMAIL_OR_MOBILE,
  UPDATE_USER_EMAIL_OR_MOBILE_SUCCESS,
  UPDATE_USER_EMAIL_OR_MOBILE_FAIL,
  SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE,
  SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE_SUCCESS,
  SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE_FAIL,
  CANCEL_UPDATE_EMAIL_MOBILE,
  GET_CATEGORIZED_VIDEOS,
  GET_CATEGORIZED_VIDEOS_SUCCESS,
  GET_CATEGORIZED_VIDEOS_FAIL,
  LIKE_OR_DISLIKE_VIDEO,
  LIKE_OR_DISLIKE_VIDEO_SUCCESS,
  LIKE_OR_DISLIKE_VIDEO_FAIL,
  REPUBLISH_VIDEO,
  REPUBLISH_VIDEO_SUCCESS,
  REPUBLISH_VIDEO_FAIL,
  SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_FAIL,
  CLEAR_SEARCH_VIDEOS_FAIL,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  RESET_USER_PASSWORD,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CLEAR_ELETE_USER_DATA,
  GET_ALL_VIDEOS_TO_MANAGE,
  GET_ALL_VIDEOS_TO_MANAGE_SUCCESS,
  GET_ALL_VIDEOS_TO_MANAGE_FAIL,
  VIDEO_CHANGE_STATE,
  VIDEO_CHANGE_STATE_SUCCESS,
  VIDEO_CHANGE_STATE_FAIL,
  GET_FAVORITE_VIDEOS,
  GET_FAVORITE_VIDEOS_SUCCESS,
  GET_FAVORITE_VIDEOS_FAIL,
  GET_FOLLOWINGS_VIDEOS,
  GET_FOLLOWINGS_VIDEOS_SUCCESS,
  GET_FOLLOWINGS_VIDEOS_FAIL,
  GET_CATEGORY_VIDEOS,
  GET_CATEGORY_VIDEOS_SUCCESS,
  GET_CATEGORY_VIDEOS_FAIL,
} from './constants';

const authData = getAuth();
export const initialState = {
  error: null,
  drawerIsOpen: false,
  userMe: {
    data: authData && authData.me ? authData.me : [], // خواندن اطلاعات کاربر از لوکال استورج
    error: null,
  },
  notification: {
    notifText: null,
    notifType: null,
    redirectTo: null,
  },
  fileUpload: {
    file: null,
    data: null,
    error: null,
    percentage: 0,
  },
  uploadBanner: {
    banner: null,
    data: null,
    error: null,
  },
  createVideo: {
    params: null,
    data: null,
    error: null,
  },
  getMyVideos: {
    params: null,
    data: null,
    error: null,
  },
  deleteVideo: {
    slug: null,
    error: null,
  },
  getVideo: {
    slug: null,
    data: null,
    error: null,
  },
  updateVideo: {
    slug: null,
    params: null,
    data: null,
    error: null,
  },
  getStatistic: {
    slug: null,
    params: null,
    data: null,
    error: null,
  },
  tags: {
    data: [],
    error: null,
  },
  addTag: {
    tag: null,
    data: null,
    error: null,
  },
  aparatCategories: {
    data: [],
    error: null,
  },
  channelCategories: {
    data: [],
    error: null,
  },
  addedChannelCategory: {
    category: null,
    data: null,
    error: null,
  },
  editChannelCategory: {
    category: null,
    id: null,
    data: null,
    error: null,
  },
  userPlaylists: {
    data: [],
    error: null,
  },
  addUserPlaylist: {
    playlist: null,
    data: null,
    error: null,
  },
  followList: {
    loading: false,
    data: null,
    error: null,
  },
  unfollowChannel: {
    name: null,
    error: null,
  },
  followChannel: {
    name: null,
    error: null,
  },
  comments: {
    loading: false,
    data: null,
    error: null,
  },
  postComment: {
    params: null,
    data: null,
    error: null,
  },
  removeComment: {
    id: null,
    error: null,
  },
  changeStateComment: {
    id: null,
    state: null,
    error: null,
  },
  channelStatistics: {
    params: null,
    data: null,
    error: null,
  },
  ChannelInfo: {
    name: null,
    data: null,
    error: null,
  },
  logout: {
    loading: false,
    error: null,
  },
  unRegisterUser: {
    loading: false,
    error: null,
  },
  uploadChannelBanner: {
    banner: null,
    data: null,
    error: null,
  },
  updateChannelInfo: {
    params: null,
    data: null,
    error: null,
  },
  updateUserSocials: {
    params: null,
    data: null,
    error: null,
  },
  updateUserPassword: {
    params: null,
    data: null,
    error: null,
  },
  updateUserEmailOrPhone: {
    params: null,
    data: null,
    error: null,
  },
  changeEmailMobileConfirmCode: {
    params: null,
    data: null,
    error: null,
  },
  categorizedVideos: {
    loading: false,
    data: null,
    error: null,
  },
  likeOrDislikeVideo: {
    slug: null,
    like: null,
    data: null,
    error: null,
  },
  repulishVideo: {
    slug: null,
    data: null,
    error: null,
  },
  searchVideos: {
    params: null,
    data: null,
    error: null,
  },
  getUsers: {
    params: null,
    data: null,
    error: null,
  },
  updateUser: {
    params: null,
    data: null,
    error: null,
  },
  userResetPassword: {
    params: null,
    data: null,
    error: null,
  },
  deleteUser: {
    params: null,
    data: null,
    error: null,
  },
  getAllVideosToManage: {
    params: null,
    data: null,
    error: null,
  },
  videoChangeState: {
    params: null,
    data: null,
    error: null,
  },
  favoriteVideos: {
    loading: false,
    data: null,
    error: null,
  },
  followingsVideos: {
    loading: false,
    data: null,
    error: null,
  },
  categoryVideos: {
    params: null,
    data: null,
    error: null,
  },
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GLOBAL_ERROR_HAPPEN:
        draft.error = action.error;
        break;
      case GLOBAL_ERROR_CLEAR:
        draft.error = null;
        break;
      case DRAWER_OPEN:
        draft.drawerIsOpen = undefined ? !draft.drawerIsOpen : action.open;
        break;

      case NOTIFICATION_SHOW:
        draft.notification.notifText = action.notifText;
        draft.notification.notifType = action.notifType;
        draft.notification.redirectTo = action.redirectTo;
        break;
      case NOTIFICATION_HIDE:
        draft.notification.notifText = null;
        draft.notification.notifType = null;
        draft.notification.redirectTo = null;
        break;

      case UPLOAD_VIDEO:
        draft.fileUpload.file = action.video;
        break;
      case UPLOAD_VIDEO_SUCCESS:
        draft.fileUpload.data = action.data;
        break;
      case UPLOAD_VIDEO_FAIL:
        draft.fileUpload.error = action.error;
        break;
      case UPLOAD_VIDEO_PROGRESS:
        draft.fileUpload.percentage = action.percentage;
        break;

      case UPLOAD_BANNER:
        draft.uploadBanner.banner = action.banner;
        draft.uploadBanner.error = null;
        draft.uploadBanner.data = null;
        break;
      case UPLOAD_BANNER_SUCCESS:
        draft.uploadBanner.data = action.data;
        draft.uploadBanner.error = null;
        draft.uploadBanner.banner = null;
        break;
      case UPLOAD_BANNER_FAIL:
        draft.uploadBanner.error = action.error;
        draft.uploadBanner.banner = null;
        draft.uploadBanner.data = null;
        break;

      case CLEAR_UPLOAD_BANNER_ERROR:
        draft.uploadBanner.error = null;
        break;

      case CREATE_VIDEO:
        draft.createVideo.params = action.params;
        draft.createVideo.error = null;
        draft.createVideo.data = null;
        break;
      case CREATE_VIDEO_SUCCESS:
        draft.createVideo.data = action.data;
        draft.createVideo.error = null;
        draft.createVideo.params = null;
        break;
      case CREATE_VIDEO_FAIL:
        draft.createVideo.error = action.error;
        draft.createVideo.data = null;
        draft.createVideo.params = null;
        break;

      case GET_MY_VIDEOS:
        draft.getMyVideos.params = action.params;
        draft.getMyVideos.error = null;
        break;
      case GET_MY_VIDEOS_SUCCESS:
        draft.getMyVideos.data = action.data;
        draft.getMyVideos.error = null;
        draft.getMyVideos.params = null;
        break;
      case GET_MY_VIDEOS_FAIL:
        draft.getMyVideos.error = action.error;
        draft.getMyVideos.params = null;
        break;

      case DELETE_VIDEO:
        draft.deleteVideo.slug = action.slug;
        draft.deleteVideo.error = null;
        break;
      case DELETE_VIDEO_SUCCESS:
        draft.deleteVideo.error = null;
        draft.deleteVideo.slug = null;
        draft.getMyVideos.data = state.getMyVideos.data.filter(
          video => video.slug !== state.deleteVideo.slug,
        );
        break;
      case DELETE_VIDEO_FAIL:
        draft.deleteVideo.error = action.error;
        draft.deleteVideo.slug = null;
        break;

      case CLEAR_VIDEO_DATA_AFTER_CREATE:
        draft.createVideo = initialState.createVideo;
        draft.uploadBanner = initialState.uploadBanner;
        draft.fileUpload = initialState.fileUpload;
        break;

      case CLEAR_VIDEO_DELETE_ERROR:
        draft.deleteVideo.error = null;
        break;

      case GET_VIDEO:
        draft.getVideo.slug = action.slug;
        draft.getVideo.error = null;
        draft.getVideo.data = null;
        break;
      case GET_VIDEO_SUCCESS:
        draft.getVideo.error = null;
        draft.getVideo.slug = null;
        draft.getVideo.data = action.data;
        break;
      case GET_VIDEO_FAIL:
        draft.getVideo.error = action.error;
        draft.getVideo.slug = null;
        draft.getVideo.data = null;
        break;

      case CLEAR_GET_VIDEO_AFTER_UNMOUNT:
        draft.getVideo = initialState.getVideo;
        break;
      case CLEAR_GET_VIDEO_ERROR:
        draft.getVideo.error = null;
        break;

      case UPDATE_VIDEO:
        draft.updateVideo.slug = action.slug;
        draft.updateVideo.params = action.params;
        draft.updateVideo.error = null;
        draft.updateVideo.data = null;
        break;
      case UPDATE_VIDEO_SUCCESS:
        draft.updateVideo.error = null;
        draft.updateVideo.slug = null;
        draft.updateVideo.params = null;
        draft.updateVideo.data = action.data;
        break;
      case UPDATE_VIDEO_FAIL:
        draft.updateVideo.error = action.error;
        draft.updateVideo.slug = null;
        draft.updateVideo.params = null;
        draft.updateVideo.data = null;
        break;

      case CLEAR_UPDATE_VIDEO_DATA:
        draft.updateVideo = initialState.updateVideo;
        draft.uploadBanner = initialState.uploadBanner;
        break;

      case GET_STATISTIC:
        draft.getStatistic.slug = action.slug;
        draft.getStatistic.params = action.params;
        draft.getStatistic.error = null;
        draft.getStatistic.data = null;
        break;
      case GET_STATISTIC_SUCCESS:
        draft.getStatistic.error = null;
        draft.getStatistic.slug = null;
        draft.getStatistic.params = null;
        draft.getStatistic.data = action.data;
        break;
      case GET_STATISTIC_FAIL:
        draft.getStatistic.error = action.error;
        draft.getStatistic.slug = null;
        draft.getStatistic.params = null;
        draft.getStatistic.data = null;
        break;

      case CLEAR_GET_STATISTIC_DATA:
        draft.getStatistic = initialState.getStatistic;
        break;

      case GET_TAGS:
        draft.tags.error = null;
        break;
      case GET_TAGS_SUCCESS:
        draft.tags.data = action.data;
        draft.tags.error = null;
        break;
      case GET_TAGS_FAIL:
        draft.tags.error = action.error;
        break;

      case ADD_TAGS:
        draft.addTag.tag = action.tag;
        draft.addTag.error = null;
        draft.addTag.data = null;
        break;
      case ADD_TAGS_SUCCESS:
        draft.addTag.data = action.data;
        draft.addTag.tag = null;
        draft.addTag.error = null;
        break;
      case ADD_TAGS_FAIL:
        draft.addTag.error = action.error;
        draft.addTag.data = null;
        draft.addTag.tag = null;
        break;

      case GET_APARAT_CATEGORIES:
        draft.aparatCategories.error = null;
        break;
      case GET_APARAT_CATEGORIES_SUCCESS:
        draft.aparatCategories.data = action.data;
        draft.aparatCategories.error = null;
        break;
      case GET_APARAT_CATEGORIES_FAIL:
        draft.aparatCategories.error = action.error;
        break;

      case GET_CHANNEL_CATEGORIES:
        draft.channelCategories.error = null;
        break;
      case GET_CHANNEL_CATEGORIES_SUCCESS:
        draft.channelCategories.data = action.data;
        draft.channelCategories.error = null;
        break;
      case GET_CHANNEL_CATEGORIES_FAIL:
        draft.channelCategories.error = action.error;
        break;

      case ADD_CHANNEL_CATEGORIES:
        draft.addedChannelCategory.error = null;
        draft.addedChannelCategory.data = null;
        draft.addedChannelCategory.category = action.category;
        break;
      case ADD_CHANNEL_CATEGORIES_SUCCESS:
        draft.addedChannelCategory.data = action.data;
        draft.addedChannelCategory.error = null;
        draft.addedChannelCategory.category = null;
        draft.channelCategories.data = [
          ...state.channelCategories.data,
          action.data,
        ];
        break;
      case ADD_CHANNEL_CATEGORIES_FAIL:
        draft.addedChannelCategory.error = action.error;
        draft.addedChannelCategory.data = null;
        draft.addedChannelCategory.category = null;
        break;

      case EDIT_CHANNEL_CATEGORIES:
        draft.editChannelCategory.error = null;
        draft.editChannelCategory.data = null;
        draft.editChannelCategory.category = action.category;
        draft.editChannelCategory.id = action.id;
        break;
      case EDIT_CHANNEL_CATEGORIES_SUCCESS:
        draft.editChannelCategory.data = action.data;
        draft.editChannelCategory.error = null;
        draft.editChannelCategory.category = null;
        draft.editChannelCategory.id = null;
        draft.channelCategories.data = state.channelCategories.data.map(
          item => {
            if (item.id === Number(state.editChannelCategory.id)) {
              return {
                ...item,
                title: state.editChannelCategory.category,
              };
            }

            return item;
          },
        );
        break;
      case EDIT_CHANNEL_CATEGORIES_FAIL:
        draft.editChannelCategory.error = action.error;
        draft.editChannelCategory.data = null;
        draft.editChannelCategory.category = null;
        draft.editChannelCategory.id = null;
        break;

      case GET_PLAYLISTS:
        draft.userPlaylists.error = null;
        break;
      case GET_PLAYLISTS_SUCCESS:
        draft.userPlaylists.data = action.data;
        draft.userPlaylists.error = null;
        break;
      case GET_PLAYLISTS_FAIL:
        draft.userPlaylists.error = action.error;
        break;

      case ADD_PLAYLIST:
        draft.addUserPlaylist.error = null;
        draft.addUserPlaylist.data = null;
        draft.addUserPlaylist.playlist = action.playlist;
        break;
      case ADD_PLAYLIST_SUCCESS:
        draft.addUserPlaylist.data = action.data;
        draft.addUserPlaylist.error = null;
        draft.addUserPlaylist.playlist = null;
        break;
      case ADD_PLAYLIST_FAIL:
        draft.addUserPlaylist.error = action.error;
        draft.addUserPlaylist.data = null;
        draft.addUserPlaylist.playlist = null;
        break;

      case GET_FOLLOW_LIST:
        draft.followList.loading = true;
        draft.followList.error = null;
        draft.followList.data = null;
        break;
      case GET_FOLLOW_LIST_SUCCESS:
        draft.followList.loading = false;
        draft.followList.data = action.data;
        draft.followList.error = null;
        break;
      case GET_FOLLOW_LIST_FAIL:
        draft.followList.loading = false;
        draft.followList.error = action.error;
        draft.followList.data = null;
        break;
      case CLEAR_GET_FOLLOW_LIST_ERROR:
        draft.followList.error = null;
        draft.followList.data = null;
        break;

      case UNFOLLOW_CHANNEL:
        draft.unfollowChannel.name = action.name;
        draft.unfollowChannel.error = null;
        break;
      case UNFOLLOW_CHANNEL_SUCCESS:
        if (state.followList.data) {
          draft.followList.data = state.followList.data.map(item => {
            if (item.name === state.unfollowChannel.name) {
              return {
                ...item,
                unfollowed: true,
                followed: false,
              };
            }

            return item;
          });
        }
        if (state.getVideo.data) {
          draft.getVideo.data.channel.is_followed = false;
        }

        if (state.ChannelInfo.data) {
          draft.ChannelInfo.data.channel.is_followed = false;
        }
        draft.unfollowChannel.name = null;
        break;
      case UNFOLLOW_CHANNEL_FAIL:
        draft.unfollowChannel.error = action.error;
        draft.unfollowChannel.name = null;
        break;

      case FOLLOW_CHANNEL:
        draft.followChannel.name = action.name;
        draft.followChannel.error = null;
        break;
      case FOLLOW_CHANNEL_SUCCESS:
        if (state.followList.data) {
          draft.followList.data = state.followList.data.map(item => {
            if (item.name === state.followChannel.name) {
              return {
                ...item,
                unfollowed: false,
                followed: true,
              };
            }

            return item;
          });
        }
        // هندل کردن فالو و انفالو به روش استفاده شده در صفحه ویدیو و هندل شدن در بک اند
        if (state.getVideo.data) {
          draft.getVideo.data.channel.is_followed = true;
        }

        if (state.ChannelInfo.data) {
          draft.ChannelInfo.data.channel.is_followed = true;
        }
        draft.followChannel.name = null;
        break;
      case FOLLOW_CHANNEL_FAIL:
        draft.followChannel.error = action.error;
        draft.followChannel.name = null;
        break;

      case GET_COMMENTS:
        draft.comments.loading = true;
        draft.comments.error = null;
        draft.comments.data = null;
        break;
      case GET_COMMENTS_SUCCESS:
        draft.comments.loading = false;
        draft.comments.data = action.data;
        draft.comments.error = null;
        draft.notification = initialState.notification;
        break;
      case GET_COMMENTS_FAIL:
        draft.comments.loading = false;
        draft.comments.error = action.error;
        draft.comments.data = null;
        break;

      case POST_COMMENT:
        draft.postComment.params = action.params;
        draft.postComment.error = null;
        draft.postComment.data = null;
        break;
      case POST_COMMENT_SUCCESS:
        draft.postComment.data = action.data;

        if (
          state.postComment.params.videoIsForUser &&
          state.getVideo.data.id === state.postComment.params.video_id
        ) {
          const newComment = { ...action.data, user: state.userMe.data };

          if (state.postComment.params.parent_id) {
            draft.getVideo.data.comments = state.getVideo.data.comments.map(
              comment => {
                if (comment.id === state.postComment.params.parent_id) {
                  return {
                    ...comment,
                    children: [...comment.children, newComment],
                  };
                }
                return comment;
              },
            );
          } else {
            draft.getVideo.data.comments = [
              ...state.getVideo.data.comments,
              newComment,
            ];
          }
        }

        draft.postComment.params = null;
        draft.postComment.error = null;

        break;
      case POST_COMMENT_FAIL:
        draft.postComment.error = action.error;
        draft.postComment.data = null;
        draft.postComment.params = null;
        break;
      case CLEAR_POST_COMMENT_ERROR:
        draft.postComment.error = null;
        break;

      case REMOVE_COMMENT:
        draft.removeComment.id = action.id;
        draft.removeComment.error = null;
        break;
      case REMOVE_COMMENT_SUCCESS:
        if (state.comments.data) {
          draft.comments.data = state.comments.data.filter(
            item =>
              item.id !== state.removeComment.id &&
              item.parent_id !== state.removeComment.id,
          );
        }

        if (state.getVideo.data) {
          draft.getVideo.data.comments = state.getVideo.data.comments.filter(
            item =>
              item.id !== state.removeComment.id &&
              item.parent_id !== state.removeComment.id,
          );
        }

        draft.removeComment.error = null;
        break;
      case REMOVE_COMMENT_FAIL:
        draft.removeComment.error = action.error;
        draft.removeComment.id = null;
        break;

      case CHANGE_STATE_COMMENT:
        draft.changeStateComment.id = action.id;
        draft.changeStateComment.state = action.state;
        draft.changeStateComment.error = null;
        break;
      case CHANGE_STATE_COMMENT_SUCCESS:
        if (state.comments.data) {
          draft.comments.data = state.comments.data.map(item => {
            if (item.id === state.changeStateComment.id) {
              return { ...item, state: COMMENT_STATE_ACCEPTED };
            }

            return item;
          });
        }
        draft.changeStateComment.id = null;
        draft.changeStateComment.state = null;
        draft.changeStateComment.error = null;

        draft.changeStateComment.error = null;
        break;
      case CHANGE_STATE_COMMENT_FAIL:
        draft.changeStateComment.error = action.error;
        draft.changeStateComment.id = null;
        draft.changeStateComment.state = null;
        break;

      case GET_CHANNEL_STATISTICS:
        draft.channelStatistics.params = action.params;
        draft.channelStatistics.error = null;
        break;
      case GET_CHANNEL_STATISTICS_SUCCESS:
        draft.channelStatistics.data = action.data;
        draft.channelStatistics.error = null;
        draft.channelStatistics.params = null;
        break;
      case GET_CHANNEL_STATISTICS_FAIL:
        draft.channelStatistics.error = action.error;
        draft.channelStatistics.data = null;
        draft.channelStatistics.params = null;
        break;
      case GET_CHANNEL_STATISTICS_CLEAR_DATA:
        draft.channelStatistics = initialState.channelStatistics;
        break;

      case GET_CHANNEL_INFO:
        draft.ChannelInfo.name = action.name;
        draft.ChannelInfo.error = null;
        draft.ChannelInfo.data = null;
        break;
      case GET_CHANNEL_INFO_SUCCESS:
        draft.ChannelInfo.data = action.data;
        draft.ChannelInfo.name = null;
        break;
      case GET_CHANNEL_INFO_FAIL:
        draft.ChannelInfo.error = action.error;
        draft.ChannelInfo.data = null;
        draft.ChannelInfo.name = null;
        break;
      case GET_CHANNEL_INFO_CLEAR_DATA:
        draft.ChannelInfo = initialState.ChannelInfo;
        break;

      case GET_USER_ME:
        draft.userMe.error = null;
        break;
      case GET_USER_ME_SUCCESS:
        draft.userMe.data = action.data;
        draft.userMe.error = null;
        break;
      case GET_USER_ME_FAIL:
        draft.userMe.error = action.error;
        draft.userMe.data = null;
        break;

      // وقتی کاربر خارج می شود باید توکن از لوکال استورج حذف شود
      case LOGOUT:
        draft.logout.loading = true; // برای غیرفعال کردن دکمه و نمایش لودینگ
        draft.logout.error = null;
        break;
      case LOGOUT_SUCCESS:
        draft.logout.loading = false;
        draft.logout.error = null;
        Object.keys(initialState).forEach(key => {
          draft[key] = initialState[key];
        }); // حذف تک به تک داده های موجود در ریداکس پس از خروج
        // عملیات بالا را در reducer مربوط به لاگین هم انجام می دهیم
        draft.userMe.data = null;
        break;
      case LOGOUT_FAIL:
        draft.logout.error = action.error;
        draft.logout.loading = false;
        break;

      case UNREGISTER_USER:
        draft.unRegisterUser.loading = true;
        draft.unRegisterUser.error = null;
        break;
      // وقتی لغو عضویت می شود داده ای برای موفقیت بر نمی گردد
      case UNREGISTER_USER_FAIL:
        draft.unRegisterUser.error = action.error;
        draft.unRegisterUser.loading = false;
        break;

      case Upload_CHANNEL_BANNER:
        draft.uploadChannelBanner.banner = action.banner;
        draft.uploadChannelBanner.data = null;
        draft.uploadChannelBanner.error = null;
        break;
      case Upload_CHANNEL_BANNER_SUCCESS:
        draft.uploadChannelBanner.data = action.data;
        draft.uploadChannelBanner.banner = null;
        draft.uploadChannelBanner.error = null;
        draft.userMe.data.avatar = action.data.banner;

        break;
      case Upload_CHANNEL_BANNER_FAIL:
        draft.uploadChannelBanner.error = action.error;
        draft.uploadChannelBanner.banner = null;
        draft.uploadChannelBanner.data = null;
        break;

      case UPDATE_CHANNEL_INFO:
        draft.updateChannelInfo.params = action.params;
        draft.updateChannelInfo.data = null;
        draft.updateChannelInfo.error = null;
        break;
      case UPDATE_CHANNEL_INFO_SUCCESS:
        draft.updateChannelInfo.data = action.data;
        draft.updateChannelInfo.params = null;
        draft.updateChannelInfo.error = null;
        draft.userMe.data.website = state.updateChannelInfo.params.website;
        draft.userMe.data.channel.name = state.updateChannelInfo.params.name;
        draft.userMe.data.channel.info = state.updateChannelInfo.params.info;

        break;
      case UPDATE_CHANNEL_INFO_FAIL:
        draft.updateChannelInfo.error = action.error;
        draft.updateChannelInfo.params = null;
        draft.updateChannelInfo.data = null;
        break;

      case UPDATE_USER_SOCIALS:
        draft.updateUserSocials.params = action.params;
        draft.updateUserSocials.data = null;
        draft.updateUserSocials.error = null;
        break;
      case UPDATE_USER_SOCIALS_SUCCESS:
        draft.updateUserSocials.data = action.data;
        draft.updateUserSocials.params = null;
        draft.updateUserSocials.error = null;
        draft.userMe.data.channel.socials = state.updateUserSocials.params;

        break;
      case UPDATE_USER_SOCIALS_FAIL:
        draft.updateUserSocials.error = action.error;
        draft.updateUserSocials.params = null;
        draft.updateUserSocials.data = null;
        break;

      case UPDATE_USER_PASSWORD:
        draft.updateUserPassword.params = action.params;
        draft.updateUserPassword.data = null;
        draft.updateUserPassword.error = null;
        break;
      case UPDATE_USER_PASSWORD_SUCCESS:
        draft.updateUserPassword.data = action.data;
        draft.updateUserPassword.params = null;
        draft.updateUserPassword.error = null;

        break;
      case UPDATE_USER_PASSWORD_FAIL:
        draft.updateUserPassword.error = action.error;
        draft.updateUserPassword.params = null;
        draft.updateUserPassword.data = null;
        break;
      case CLEAR_UPDATE_USER_PASSWORD:
        draft.updateUserPassword = initialState.updateUserPassword;

      case UPDATE_USER_EMAIL_OR_MOBILE:
        draft.updateUserEmailOrPhone.params = action.params;
        draft.updateUserEmailOrPhone.data = null;
        draft.updateUserEmailOrPhone.error = null;
        break;
      case UPDATE_USER_EMAIL_OR_MOBILE_SUCCESS:
        draft.updateUserEmailOrPhone.data = action.data;
        draft.updateUserEmailOrPhone.params = null;
        draft.updateUserEmailOrPhone.error = null;

        break;
      case UPDATE_USER_EMAIL_OR_MOBILE_FAIL:
        draft.updateUserEmailOrPhone.error = action.error;
        draft.updateUserEmailOrPhone.params = null;
        draft.updateUserEmailOrPhone.data = null;
        break;

      case SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE:
        draft.changeEmailMobileConfirmCode.params = action.params;
        draft.changeEmailMobileConfirmCode.data = null;
        draft.changeEmailMobileConfirmCode.error = null;
        break;
      case SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE_SUCCESS:
        draft.changeEmailMobileConfirmCode.data = action.data;
        draft.changeEmailMobileConfirmCode.params = null;
        draft.changeEmailMobileConfirmCode.error = null;

        draft.userMe.data = { ...state.userMe.data, ...action.data };
        break;

      case SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE_FAIL:
        draft.changeEmailMobileConfirmCode.error = action.error;
        draft.changeEmailMobileConfirmCode.params = null;
        draft.changeEmailMobileConfirmCode.data = null;

      case CANCEL_UPDATE_EMAIL_MOBILE:
        draft.changeEmailMobileConfirmCode =
          initialState.changeEmailMobileConfirmCode;
        draft.updateUserEmailOrPhone = initialState.updateUserEmailOrPhone;
        break;

      case GET_CATEGORIZED_VIDEOS:
        draft.categorizedVideos.loading = true;
        draft.categorizedVideos.data = null;
        draft.categorizedVideos.error = null;
        break;
      case GET_CATEGORIZED_VIDEOS_SUCCESS:
        draft.categorizedVideos.data = action.data;
        draft.categorizedVideos.loading = false;
        draft.categorizedVideos.error = null;

        break;
      case GET_CATEGORIZED_VIDEOS_FAIL:
        draft.categorizedVideos.error = action.error;
        draft.categorizedVideos.loading = false;
        draft.categorizedVideos.data = null;
        break;

      case LIKE_OR_DISLIKE_VIDEO:
        draft.likeOrDislikeVideo.slug = action.slug;
        draft.likeOrDislikeVideo.like = action.like;
        draft.likeOrDislikeVideo.data = null;
        draft.likeOrDislikeVideo.error = null;
        break;
      case LIKE_OR_DISLIKE_VIDEO_SUCCESS:
        draft.likeOrDislikeVideo.data = action.data;
        draft.likeOrDislikeVideo.slug = null;
        draft.likeOrDislikeVideo.like = null;
        draft.likeOrDislikeVideo.error = null;
        draft.getVideo.data.like_count = state.likeOrDislikeVideo.like
          ? state.getVideo.data.like_count - 1
          : state.getVideo.data.like_count + 1;
        draft.getVideo.data.liked = state.likeOrDislikeVideo.like ? 0 : 1;

        break;
      case LIKE_OR_DISLIKE_VIDEO_FAIL:
        draft.likeOrDislikeVideo.error = action.error;
        draft.likeOrDislikeVideo.slug = null;
        draft.likeOrDislikeVideo.like = null;
        draft.likeOrDislikeVideo.data = null;

        break;

      case REPUBLISH_VIDEO:
        draft.repulishVideo.slug = action.slug;
        draft.repulishVideo.data = null;
        draft.repulishVideo.error = null;
        break;
      case REPUBLISH_VIDEO_SUCCESS:
        draft.repulishVideo.data = action.data;
        draft.repulishVideo.slug = null;
        draft.repulishVideo.error = null;
        break;
      case REPUBLISH_VIDEO_FAIL:
        draft.repulishVideo.error = action.error;
        draft.repulishVideo.slug = null;
        draft.repulishVideo.data = null;
        break;

      case SEARCH_VIDEOS:
        draft.searchVideos.params = action.params;
        draft.searchVideos.data = null;
        draft.searchVideos.error = null;
        break;
      case SEARCH_VIDEOS_SUCCESS:
        draft.searchVideos.data = action.data;
        draft.searchVideos.params = null;
        draft.searchVideos.error = null;
        break;
      case SEARCH_VIDEOS_FAIL:
        draft.searchVideos.error = action.error;
        draft.searchVideos.params = null;
        draft.searchVideos.data = null;
        break;

      case CLEAR_SEARCH_VIDEOS_FAIL:
        draft.searchVideos = initialState.searchVideos;

      case GET_USERS:
        draft.getUsers.params = action.params;
        draft.getUsers.data = null;
        draft.getUsers.error = null;
        break;
      case GET_USERS_SUCCESS:
        draft.getUsers.data = action.data;
        draft.getUsers.params = null;
        draft.getUsers.error = null;
        break;
      case GET_USERS_FAIL:
        draft.getUsers.error = action.error;
        draft.getUsers.params = null;
        draft.getUsers.data = null;
        break;

      case UPDATE_USER:
        draft.updateUser.params = action.params;
        draft.updateUser.data = null;
        draft.updateUser.error = null;
        break;
      case UPDATE_USER_SUCCESS:
        draft.updateUser.data = action.data;
        if (state.getUsers.data && state.getUsers.data.data) {
          draft.getUsers.data.data = state.getUsers.data.data.map(item =>
            item.id === state.updateUser.params.id
              ? { ...item, ...action.data }
              : item,
          );
        }
        draft.updateUser.params = null;
        draft.updateUser.error = null;
        break;
      case UPDATE_USER_FAIL:
        draft.updateUser.error = action.error;
        draft.updateUser.params = null;
        draft.updateUser.data = null;
        break;

      case RESET_USER_PASSWORD:
        draft.userResetPassword.params = action.params;
        draft.userResetPassword.data = null;
        draft.userResetPassword.error = null;
        break;
      case RESET_USER_PASSWORD_SUCCESS:
        draft.userResetPassword.data = action.data;
        draft.userResetPassword.params = null;
        draft.userResetPassword.error = null;
        break;
      case RESET_USER_PASSWORD_FAIL:
        draft.userResetPassword.error = action.error;
        draft.userResetPassword.params = null;
        draft.userResetPassword.data = null;
        break;

      case DELETE_USER:
        draft.deleteUser.params = action.params;
        draft.deleteUser.data = null;
        draft.deleteUser.error = null;
        break;
      case DELETE_USER_SUCCESS:
        draft.deleteUser.data = action.data;
        if (state.getUsers.data && state.getUsers.data.data) {
          draft.getUsers.data.data = state.getUsers.data.data.filter(
            item => item.id != state.deleteUser.params,
          );
        }
        draft.deleteUser.params = null;
        draft.deleteUser.error = null;
        break;
      case DELETE_USER_FAIL:
        draft.deleteUser.error = action.error;
        draft.deleteUser.params = null;
        draft.deleteUser.data = null;
        break;

      case CLEAR_ELETE_USER_DATA:
        draft.deleteUser = initialState.deleteUser;
        break;

      case GET_ALL_VIDEOS_TO_MANAGE:
        draft.getAllVideosToManage.params = action.params;
        draft.getAllVideosToManage.data = null;
        draft.getAllVideosToManage.error = null;
        break;
      case GET_ALL_VIDEOS_TO_MANAGE_SUCCESS:
        draft.getAllVideosToManage.data = action.data;
        draft.getAllVideosToManage.params = null;
        draft.getAllVideosToManage.error = null;
        break;
      case GET_ALL_VIDEOS_TO_MANAGE_FAIL:
        draft.getAllVideosToManage.error = action.error;
        draft.getAllVideosToManage.params = null;
        draft.getAllVideosToManage.data = null;
        break;

      case VIDEO_CHANGE_STATE:
        draft.videoChangeState.params = action.params;
        draft.videoChangeState.data = null;
        draft.videoChangeState.error = null;
        break;
      case VIDEO_CHANGE_STATE_SUCCESS:
        draft.videoChangeState.data = action.data;
        draft.getAllVideosToManage.data.data = state.getAllVideosToManage.data.data.map(
          video =>
            video.slug === action.data.slug
              ? { ...video, state: action.data.state }
              : video,
        );
        draft.videoChangeState.params = null;
        draft.videoChangeState.error = null;
        break;
      case VIDEO_CHANGE_STATE_FAIL:
        draft.videoChangeState.error = action.error;
        draft.videoChangeState.params = null;
        draft.videoChangeState.data = null;
        break;

      case GET_FAVORITE_VIDEOS:
        draft.favoriteVideos.loading = true;
        draft.favoriteVideos.data = null;
        draft.favoriteVideos.error = null;
        break;
      case GET_FAVORITE_VIDEOS_SUCCESS:
        draft.favoriteVideos.data = action.data;
        draft.favoriteVideos.loading = false;
        draft.favoriteVideos.error = null;
        break;
      case GET_FAVORITE_VIDEOS_FAIL:
        draft.favoriteVideos.error = action.error;
        draft.favoriteVideos.loading = false;
        draft.favoriteVideos.data = null;
        break;

      case GET_FOLLOWINGS_VIDEOS:
        draft.followingsVideos.loading = true;
        draft.followingsVideos.data = null;
        draft.followingsVideos.error = null;
        break;
      case GET_FOLLOWINGS_VIDEOS_SUCCESS:
        draft.followingsVideos.data = action.data;
        draft.followingsVideos.loading = false;
        draft.followingsVideos.error = null;
        break;
      case GET_FOLLOWINGS_VIDEOS_FAIL:
        draft.followingsVideos.error = action.error;
        draft.followingsVideos.loading = false;
        draft.followingsVideos.data = null;
        break;

      case GET_CATEGORY_VIDEOS:
        draft.categoryVideos.params = action.params;
        draft.categoryVideos.data = null;
        draft.categoryVideos.error = null;
        break;
      case GET_CATEGORY_VIDEOS_SUCCESS:
        draft.categoryVideos.data = action.data;
        draft.categoryVideos.params = null;
        draft.categoryVideos.error = null;
        break;
      case GET_CATEGORY_VIDEOS_FAIL:
        draft.categoryVideos.error = action.error;
        draft.categoryVideos.params = null;
        draft.categoryVideos.data = null;
        break;
    }
  });

export default appReducer;
