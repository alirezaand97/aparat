/*
 *
 * LoginPage actions
 *
 */

import {
  GLOBAL_ERROR_CLEAR,
  GLOBAL_ERROR_HAPPEN,
  DRAWER_OPEN,
  UPLOAD_VIDEO,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAIL,
  UPLOAD_VIDEO_PROGRESS,
  GET_TAGS,
  GET_TAGS_FAIL,
  GET_TAGS_SUCCESS,
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
  GET_PLAYLISTS,
  GET_PLAYLISTS_SUCCESS,
  GET_PLAYLISTS_FAIL,
  ADD_PLAYLIST,
  ADD_PLAYLIST_SUCCESS,
  ADD_PLAYLIST_FAIL,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_FAIL,
  CREATE_VIDEO,
  UPLOAD_BANNER,
  UPLOAD_BANNER_SUCCESS,
  UPLOAD_BANNER_FAIL,
  GET_MY_VIDEOS,
  GET_MY_VIDEOS_SUCCESS,
  GET_MY_VIDEOS_FAIL,
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

export function globalErrorHappen(error) {
  return {
    type: GLOBAL_ERROR_HAPPEN,
    error,
  };
}
export function globalErrorClear() {
  return {
    type: GLOBAL_ERROR_CLEAR,
  };
}
export function openDrawerAction(open) {
  return {
    type: DRAWER_OPEN,
    open,
  };
}

export function notificationShowAction(
  notifText,
  notifType,
  redirectTo = null,
) {
  return {
    type: NOTIFICATION_SHOW,
    notifText,
    notifType,
    redirectTo,
  };
}
export function notificationHideAction() {
  return {
    type: NOTIFICATION_HIDE,
  };
}

export function uploadVideoAction(video) {
  return {
    type: UPLOAD_VIDEO,
    video,
  };
}

export function uploadVideoSuccessAction(data) {
  return {
    type: UPLOAD_VIDEO_SUCCESS,
    data,
  };
}

export function uploadVideoFailAction(error) {
  return {
    type: UPLOAD_VIDEO_FAIL,
    error,
  };
}
export function uploadVideoProgressAction(percentage) {
  return {
    type: UPLOAD_VIDEO_PROGRESS,
    percentage,
  };
}

export function uploadBannerAction(banner) {
  return {
    type: UPLOAD_BANNER,
    banner,
  };
}
export function uploadBannerSuccessAction(data) {
  return {
    type: UPLOAD_BANNER_SUCCESS,
    data,
  };
}
export function uploadBannerFailAction(error) {
  return {
    type: UPLOAD_BANNER_FAIL,
    error,
  };
}
export function clearUploadBannerError(error) {
  return {
    type: CLEAR_UPLOAD_BANNER_ERROR,
  };
}

export function createVideoAction(params) {
  return {
    type: CREATE_VIDEO,
    params,
  };
}
export function createVideoSuccessAction(data) {
  return {
    type: CREATE_VIDEO_SUCCESS,
    data,
  };
}
export function createVideoFailAction(error) {
  return {
    type: CREATE_VIDEO_FAIL,
    error,
  };
}

export function getMyVideosAction(params) {
  return {
    type: GET_MY_VIDEOS,
    params,
  };
}
export function getMyVideosSuccessAction(data) {
  return {
    type: GET_MY_VIDEOS_SUCCESS,
    data,
  };
}
export function getMyVideosFailAction(error) {
  return {
    type: GET_MY_VIDEOS_FAIL,
    error,
  };
}

export function clearVideoDataAfterCreateAction() {
  return {
    type: CLEAR_VIDEO_DATA_AFTER_CREATE,
  };
}

export function clearVideoDeleteError() {
  return {
    type: CLEAR_VIDEO_DELETE_ERROR,
  };
}

export function deleteVideoAction(slug) {
  return {
    type: DELETE_VIDEO,
    slug,
  };
}
export function deleteVideoSuccessAction() {
  return {
    type: DELETE_VIDEO_SUCCESS,
  };
}
export function deleteVideoFailAction(error) {
  return {
    type: DELETE_VIDEO_FAIL,
    error,
  };
}

export function getVideoAction(slug) {
  return {
    type: GET_VIDEO,
    slug,
  };
}
export function getVideoSuccessAction(data) {
  return {
    type: GET_VIDEO_SUCCESS,
    data,
  };
}
export function getVideoFailAction(error) {
  return {
    type: GET_VIDEO_FAIL,
    error,
  };
}

export function cleargetVideoAferUnmount() {
  return {
    type: CLEAR_GET_VIDEO_AFTER_UNMOUNT,
  };
}

export function clearGetVideoError() {
  return {
    type: CLEAR_GET_VIDEO_ERROR,
  };
}

export function updateVideoAction(slug, params) {
  return {
    type: UPDATE_VIDEO,
    slug,
    params,
  };
}
export function updateVideoSuccessAction(data) {
  return {
    type: UPDATE_VIDEO_SUCCESS,
    data,
  };
}
export function updateVideoFailAction(error) {
  return {
    type: UPDATE_VIDEO_FAIL,
    error,
  };
}

export function clearUpdateVideoDataAction() {
  return {
    type: CLEAR_UPDATE_VIDEO_DATA,
  };
}

export function getStatisticAction(slug, params) {
  return {
    type: GET_STATISTIC,
    slug,
    params,
  };
}
export function getStatisticSuccessAction(data) {
  return {
    type: GET_STATISTIC_SUCCESS,
    data,
  };
}
export function getStatisticFailAction(error) {
  return {
    type: GET_STATISTIC_FAIL,
    error,
  };
}

export function cleargetStatisticDataAction() {
  return {
    type: CLEAR_GET_STATISTIC_DATA,
  };
}

export function getTagsAction() {
  return {
    type: GET_TAGS,
  };
}
export function getTagsSuccessAction(data) {
  return {
    type: GET_TAGS_SUCCESS,
    data,
  };
}
export function getTagsFailAction(error) {
  return {
    type: GET_TAGS_FAIL,
    error,
  };
}

export function addTagsAction(tag) {
  return {
    type: ADD_TAGS,
    tag,
  };
}
export function addTagsSuccessAction(data) {
  return {
    type: ADD_TAGS_SUCCESS,
    data,
  };
}
export function addTagsFailAction(error) {
  return {
    type: ADD_TAGS_FAIL,
    error,
  };
}

export function getAparatCategoriesAction() {
  return {
    type: GET_APARAT_CATEGORIES,
  };
}
export function getAparatCategoriesSuccessAction(data) {
  return {
    type: GET_APARAT_CATEGORIES_SUCCESS,
    data,
  };
}
export function getAparatCategoriesFailAction(error) {
  return {
    type: GET_APARAT_CATEGORIES_FAIL,
    error,
  };
}

export function getChannelCategoriesAction() {
  return {
    type: GET_CHANNEL_CATEGORIES,
  };
}
export function getChannelCategoriesSuccessAction(data) {
  return {
    type: GET_CHANNEL_CATEGORIES_SUCCESS,
    data,
  };
}
export function getChannelCategoriesFailAction(error) {
  return {
    type: GET_CHANNEL_CATEGORIES_FAIL,
    error,
  };
}

export function addChannelCategoriesAction(category) {
  return {
    type: ADD_CHANNEL_CATEGORIES,
    category,
  };
}
export function addChannelCategoriesSuccessAction(data) {
  return {
    type: ADD_CHANNEL_CATEGORIES_SUCCESS,
    data,
  };
}
export function addChannelCategoriesFailAction(error) {
  return {
    type: ADD_CHANNEL_CATEGORIES_FAIL,
    error,
  };
}

export function editChannelCategoriesAction(id, category) {
  return {
    type: EDIT_CHANNEL_CATEGORIES,
    id,
    category,
  };
}
export function editChannelCategoriesSuccessAction(data) {
  return {
    type: EDIT_CHANNEL_CATEGORIES_SUCCESS,
    data,
  };
}
export function editChannelCategoriesFailAction(error) {
  return {
    type: EDIT_CHANNEL_CATEGORIES_FAIL,
    error,
  };
}

export function getPlaylistsAction() {
  return {
    type: GET_PLAYLISTS,
  };
}
export function getPlaylistsSuccessAction(data) {
  return {
    type: GET_PLAYLISTS_SUCCESS,
    data,
  };
}
export function getPlaylistsFailAction(error) {
  return {
    type: GET_PLAYLISTS_FAIL,
    error,
  };
}

export function addPlaylistAction(playlist) {
  return {
    type: ADD_PLAYLIST,
    playlist,
  };
}
export function addPlaylistSuccessAction(data) {
  return {
    type: ADD_PLAYLIST_SUCCESS,
    data,
  };
}
export function addPlaylistFailAction(error) {
  return {
    type: ADD_PLAYLIST_FAIL,
    error,
  };
}

export function getFollowListAction() {
  return {
    type: GET_FOLLOW_LIST,
  };
}
export function getFollowListSuccessAction(data) {
  return {
    type: GET_FOLLOW_LIST_SUCCESS,
    data,
  };
}
export function getFollowListFailAction(error) {
  return {
    type: GET_FOLLOW_LIST_FAIL,
    error,
  };
}

export function unfollowChannelAction(name) {
  return {
    type: UNFOLLOW_CHANNEL,
    name,
  };
}
export function unfollowChannelSuccessAction() {
  return {
    type: UNFOLLOW_CHANNEL_SUCCESS,
  };
}
export function unfollowChannelFailAction(error) {
  return {
    type: UNFOLLOW_CHANNEL_FAIL,
    error,
  };
}
export function clearGetFollowListError() {
  return {
    type: CLEAR_GET_FOLLOW_LIST_ERROR,
  };
}

export function followChannelAction(name) {
  return {
    type: FOLLOW_CHANNEL,
    name,
  };
}
export function followChannelSuccessAction() {
  return {
    type: FOLLOW_CHANNEL_SUCCESS,
  };
}
export function followChannelFailAction(error) {
  return {
    type: FOLLOW_CHANNEL_FAIL,
    error,
  };
}

export function getCommentsAction() {
  return {
    type: GET_COMMENTS,
  };
}
export function getCommentsSuccessAction(data) {
  return {
    type: GET_COMMENTS_SUCCESS,
    data,
  };
}
export function getCommentsFailAction(error) {
  return {
    type: GET_COMMENTS_FAIL,
    error,
  };
}

export function postCommentAction(params) {
  return {
    type: POST_COMMENT,
    params,
  };
}
export function postCommentSuccessAction(data) {
  return {
    type: POST_COMMENT_SUCCESS,
    data,
  };
}
export function postCommentFailAction(error) {
  return {
    type: POST_COMMENT_FAIL,
    error,
  };
}
export function clearPostCommentError() {
  return {
    type: CLEAR_POST_COMMENT_ERROR,
  };
}

export function removeCommentAction(id) {
  return {
    type: REMOVE_COMMENT,
    id,
  };
}
export function removeCommentSuccessAction() {
  return {
    type: REMOVE_COMMENT_SUCCESS,
  };
}
export function removeCommentFailAction(error) {
  return {
    type: REMOVE_COMMENT_FAIL,
    error,
  };
}

export function changeStateCommentAction(id, state) {
  return {
    type: CHANGE_STATE_COMMENT,
    id,
    state,
  };
}
export function changeStateCommentSuccessAction() {
  return {
    type: CHANGE_STATE_COMMENT_SUCCESS,
  };
}
export function changeStateCommentFailAction(error) {
  return {
    type: CHANGE_STATE_COMMENT_FAIL,
    error,
  };
}

export function getChannelStatisticsAction(params) {
  return {
    type: GET_CHANNEL_STATISTICS,
    params,
  };
}

export function getChannelStatisticsSuccessAction(data) {
  return {
    type: GET_CHANNEL_STATISTICS_SUCCESS,
    data,
  };
}

export function getChannelStatisticsFailAction(error) {
  return {
    type: GET_CHANNEL_STATISTICS_FAIL,
    error,
  };
}

export function getChannelStatisticsClearDataAction() {
  return {
    type: GET_CHANNEL_STATISTICS_CLEAR_DATA,
  };
}

export function getChannelInfoAction(name) {
  return {
    type: GET_CHANNEL_INFO,
    name,
  };
}

export function getChannelInfoSuccessAction(data) {
  return {
    type: GET_CHANNEL_INFO_SUCCESS,
    data,
  };
}

export function getChannelInfoFailAction(error) {
  return {
    type: GET_CHANNEL_INFO_FAIL,
    error,
  };
}

export function getChannelInfoClearDataAction() {
  return {
    type: GET_CHANNEL_INFO_CLEAR_DATA,
  };
}

export function getUserMeAction() {
  return {
    type: GET_USER_ME,
  };
}

export function getUserMeSuccessAction(data) {
  return {
    type: GET_USER_ME_SUCCESS,
    data,
  };
}

export function getUserMeFailAction(error) {
  return {
    type: GET_USER_ME_FAIL,
    error,
  };
}

export function logoutAction() {
  return {
    type: LOGOUT,
  };
}

export function logoutSuccessAction() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutFailAction(error) {
  return {
    type: LOGOUT_FAIL,
    error,
  };
}

export function unRegisterUserAction() {
  return {
    type: UNREGISTER_USER,
  };
}

// وقتی لغو عضویت رخ می دهد داده ای دریافت نمی کنیم پس به success نیازی نداریم

export function unRegisterUserFailAction(error) {
  return {
    type: UNREGISTER_USER_FAIL,
    error,
  };
}

export function uploadChannelBannerAction(banner) {
  return {
    type: Upload_CHANNEL_BANNER,
    banner,
  };
}
export function uploadChannelBannerSuccessAction(data) {
  return {
    type: Upload_CHANNEL_BANNER_SUCCESS,
    data,
  };
}
export function uploadChannelBannerFailAction(error) {
  return {
    type: Upload_CHANNEL_BANNER_FAIL,
    error,
  };
}

export function updateChannelInfoAction(params) {
  return {
    type: UPDATE_CHANNEL_INFO,
    params,
  };
}
export function updateChannelInfoSuccessAction(data) {
  return {
    type: UPDATE_CHANNEL_INFO_SUCCESS,
    data,
  };
}
export function updateChannelInfoFailAction(error) {
  return {
    type: UPDATE_CHANNEL_INFO_FAIL,
    error,
  };
}

export function updateUserSocialsAction(params) {
  return {
    type: UPDATE_USER_SOCIALS,
    params,
  };
}
export function updateUserSocialsSuccessAction(data) {
  return {
    type: UPDATE_USER_SOCIALS_SUCCESS,
    data,
  };
}
export function updateUserSocialsFailAction(error) {
  return {
    type: UPDATE_USER_SOCIALS_FAIL,
    error,
  };
}

export function updateUserPasswordAction(params) {
  return {
    type: UPDATE_USER_PASSWORD,
    params,
  };
}
export function updateUserPasswordSuccessAction(data) {
  return {
    type: UPDATE_USER_PASSWORD_SUCCESS,
    data,
  };
}
export function updateUserPasswordFailAction(error) {
  return {
    type: UPDATE_USER_PASSWORD_FAIL,
    error,
  };
}

export function clearUpdateUserPasswordAction() {
  return {
    type: CLEAR_UPDATE_USER_PASSWORD,
  };
}

export function updateUserEmailOrMobileAction(params) {
  return {
    type: UPDATE_USER_EMAIL_OR_MOBILE,
    params,
  };
}
export function updateUserEmailOrMobileSuccessAction(data) {
  return {
    type: UPDATE_USER_EMAIL_OR_MOBILE_SUCCESS,
    data,
  };
}
export function updateUserEmailOrMobileFailAction(error) {
  return {
    type: UPDATE_USER_EMAIL_OR_MOBILE_FAIL,
    error,
  };
}

export function sendChangeEmailMobileConfirmCodeAction(params) {
  return {
    type: SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE,
    params,
  };
}
export function sendChangeEmailMobileConfirmCodeSuccessAction(data) {
  return {
    type: SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE_SUCCESS,
    data,
  };
}
export function sendChangeEmailMobileConfirmCodeFailAction(error) {
  return {
    type: SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE_FAIL,
    error,
  };
}

// کنسل کردن تغییر موبایل یا ایمیل و حذف داده های مربوط به آنها و کد فعالسازیش
export function cancelUpdateEmailMobile() {
  return {
    type: CANCEL_UPDATE_EMAIL_MOBILE,
  };
}

export function getCategorizedVideosAction() {
  return {
    type: GET_CATEGORIZED_VIDEOS,
  };
}
export function getCategorizedVideosSuccessAction(data) {
  return {
    type: GET_CATEGORIZED_VIDEOS_SUCCESS,
    data,
  };
}
export function getCategorizedVideosFailAction(error) {
  return {
    type: GET_CATEGORIZED_VIDEOS_FAIL,
    error,
  };
}

export function likeOrDislikeVideoAction(slug, like) {
  return {
    type: LIKE_OR_DISLIKE_VIDEO,
    slug,
    like,
  };
}
export function likeOrDislikeVideoSuccessAction(data) {
  return {
    type: LIKE_OR_DISLIKE_VIDEO_SUCCESS,
    data,
  };
}
export function likeOrDislikeVideoFailAction(error) {
  return {
    type: LIKE_OR_DISLIKE_VIDEO_FAIL,
    error,
  };
}

export function republishVideoAction(slug) {
  return {
    type: REPUBLISH_VIDEO,
    slug,
  };
}
export function republishVideoSuccessAction(data) {
  return {
    type: REPUBLISH_VIDEO_SUCCESS,
    data,
  };
}
export function republishVideoFailAction(error) {
  return {
    type: REPUBLISH_VIDEO_FAIL,
    error,
  };
}

export function searchVideosAction(params) {
  return {
    type: SEARCH_VIDEOS,
    params,
  };
}
export function searchVideosSuccessAction(data) {
  return {
    type: SEARCH_VIDEOS_SUCCESS,
    data,
  };
}
export function searchVideosFailAction(error) {
  return {
    type: SEARCH_VIDEOS_FAIL,
    error,
  };
}

export function clearSearchVideosFailAction() {
  return {
    type: CLEAR_SEARCH_VIDEOS_FAIL,
  };
}

export function getUsersAction(params) {
  return {
    type: GET_USERS,
    params,
  };
}
export function getUsersSuccessAction(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}
export function getUsersFailAction(error) {
  return {
    type: GET_USERS_FAIL,
    error,
  };
}

export function updateUsersAction(params) {
  return {
    type: UPDATE_USER,
    params,
  };
}
export function updateUsersSuccessAction(data) {
  return {
    type: UPDATE_USER_SUCCESS,
    data,
  };
}
export function updateUsersFailAction(error) {
  return {
    type: UPDATE_USER_FAIL,
    error,
  };
}

export function resetUserPasswordAction(params) {
  return {
    type: RESET_USER_PASSWORD,
    params,
  };
}
export function resetUserPasswordSuccessAction(data) {
  return {
    type: RESET_USER_PASSWORD_SUCCESS,
    data,
  };
}
export function resetUserPasswordFailAction(error) {
  return {
    type: RESET_USER_PASSWORD_FAIL,
    error,
  };
}

export function deleteUserAction(params) {
  return {
    type: DELETE_USER,
    params,
  };
}
export function deleteUserSuccessAction(data) {
  return {
    type: DELETE_USER_SUCCESS,
    data,
  };
}
export function deleteUserFailAction(error) {
  return {
    type: DELETE_USER_FAIL,
    error,
  };
}

export function clearDeleteUserDataAction() {
  return {
    type: CLEAR_ELETE_USER_DATA,
  };
}

export function getAllVideosToManageAction(params) {
  return {
    type: GET_ALL_VIDEOS_TO_MANAGE,
    params,
  };
}
export function getAllVideosToManageSuccessAction(data) {
  return {
    type: GET_ALL_VIDEOS_TO_MANAGE_SUCCESS,
    data,
  };
}
export function getAllVideosToManageFailAction(error) {
  return {
    type: GET_ALL_VIDEOS_TO_MANAGE_FAIL,
    error,
  };
}

export function videoChangeStateAction(params) {
  return {
    type: VIDEO_CHANGE_STATE,
    params,
  };
}
export function videoChangeStateSuccessAction(data) {
  return {
    type: VIDEO_CHANGE_STATE_SUCCESS,
    data,
  };
}
export function videoChangeStateFailAction(error) {
  return {
    type: VIDEO_CHANGE_STATE_FAIL,
    error,
  };
}

export function favoriteVideosAction() {
  return {
    type: GET_FAVORITE_VIDEOS,
  };
}
export function favoriteVideosSuccessAction(data) {
  return {
    type: GET_FAVORITE_VIDEOS_SUCCESS,
    data,
  };
}
export function favoriteVideosFailAction(error) {
  return {
    type: GET_FAVORITE_VIDEOS_FAIL,
    error,
  };
}

export function followingsVideosAction() {
  return {
    type: GET_FOLLOWINGS_VIDEOS,
  };
}
export function followingsVideosSuccessAction(data) {
  return {
    type: GET_FOLLOWINGS_VIDEOS_SUCCESS,
    data,
  };
}
export function followingsVideosFailAction(error) {
  return {
    type: GET_FOLLOWINGS_VIDEOS_FAIL,
    error,
  };
}

export function categoryVideosAction(params) {
  return {
    type: GET_CATEGORY_VIDEOS,
    params,
  };
}
export function categoryVideosSuccessAction(data) {
  return {
    type: GET_CATEGORY_VIDEOS_SUCCESS,
    data,
  };
}
export function categoryVideosFailAction(error) {
  return {
    type: GET_CATEGORY_VIDEOS_FAIL,
    error,
  };
}
