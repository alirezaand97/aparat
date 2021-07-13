import { takeLatest, call, put, select, fork, take } from 'redux-saga/effects';

import {
  uploadVideoApi,
  createVideoApi,
  uploadBannerApi,
  getMyVideosApi,
  deleteVideoApi,
  getVideoApi,
  updateVideoApi,
  getStatisticApi,
  getCategorizedVideosApi,
  likeOrDislikeVideoApi,
  republishVideoApi,
  searchVideoApi,
  getVideosToManageApi,
  videoChangeStateApi, favoriteVideosApi, followingVideosApi, categoryVideosApi

} from 'api/videos';
import { getTagsApi, addNewTag } from 'api/tags';
import {
  getTagsFailAction,
  getTagsSuccessAction,
  getAparatCategoriesSuccessAction,
  getAparatCategoriesFailAction,
  getChannelCategoriesSuccessAction,
  getChannelCategoriesFailAction,
  addChannelCategoriesSuccessAction,
  addChannelCategoriesFailAction,
  addTagsSuccessAction,
  addTagsFailAction,
  getPlaylistsAction,
  getPlaylistsSuccessAction,
  getPlaylistsFailAction,
  addPlaylistSuccessAction,
  uploadVideoProgressAction,
  uploadVideoSuccessAction,
  uploadVideoFailAction,
  createVideoSuccessAction,
  createVideoFailAction,
  uploadBannerSuccessAction,
  uploadBannerFailAction,
  getMyVideosSuccessAction,
  getMyVideosFailAction,
  deleteVideoSuccessAction,
  deleteVideoFailAction,
  getVideoSuccessAction,
  getVideoFailAction,
  updateVideoSuccessAction,
  updateVideoFailAction,
  getStatisticSuccessAction,
  getStatisticFailAction,
  getFollowListSuccessAction,
  getFollowListFailAction,
  unfollowChannelSuccessAction,
  unfollowChannelFailAction,
  followChannelSuccessAction,
  followChannelFailAction,
  getCommentsSuccessAction,
  getCommentsFailAction,
  postCommentSuccessAction,
  postCommentFailAction,
  notificationShowAction,
  removeCommentSuccessAction,
  removeCommentFailAction,
  changeStateCommentSuccessAction,
  changeStateCommentFailAction,
  getChannelStatisticsSuccessAction,
  getChannelStatisticsFailAction,
  getUserMeSuccessAction,
  getUserMeFailAction,
  getChannelInfoSuccessAction,
  getChannelInfoFailAction,
  logoutSuccessAction,
  logoutFailAction,
  unRegisterUserFailAction,
  editChannelCategoriesSuccessAction,
  editChannelCategoriesFailAction,
  uploadChannelBannerSuccessAction,
  uploadChannelBannerFailAction,
  updateChannelInfoSuccessAction,
  updateChannelInfoFailAction,
  updateUserSocialsSuccessAction,
  updateUserSocialsFailAction,
  updateUserPasswordSuccessAction,
  updateUserPasswordFailAction,
  updateUserEmailOrMobileAction,
  updateUserEmailOrMobileFailAction,
  updateUserEmailOrMobileSuccessAction,
  sendChangeEmailMobileConfirmCodeSuccessAction,
  getCategorizedVideosFailAction,
  getCategorizedVideosSuccessAction,
  likeOrDislikeVideoSuccessAction,
  likeOrDislikeVideoFailAction,
  republishVideoSuccessAction,
  republishVideoFailAction,
  searchVideosSuccessAction,
  searchVideosFailAction,
  getUsersSuccessAction,
  getUsersFailAction,
  updateUsersSuccessAction,
  updateUsersFailAction,
  resetUserPasswordSuccessAction,
  resetUserPasswordFailAction,
  deleteUserSuccessAction,
  deleteUserFailAction,
  getAllVideosToManageSuccessAction,
  getAllVideosToManageFailAction, videoChangeStateSuccessAction, videoChangeStateFailAction, favoriteVideosAction, favoriteVideosSuccessAction, favoriteVideosFailAction, followingsVideosSuccessAction, followingsVideosFailAction, categoryVideosSuccessAction, categoryVideosFailAction
} from './actions';
import {
  FOLLOWER_TYPE,

  FOLLOWING_TYPE
} from 'utils/constants';
import { makeSelectTags, makeSelectChannelCategories, makeSelectUserPlaylists } from './selectors';
import { getCategories, getChannelCategories, addChannelCategory, editChannelCategoryApi } from 'api/categories';
import { getPlaylists, addPlaylist } from 'api/playlists';
import { eventChannel } from 'redux-saga';
import { getFollowingsListApi, getFollowersListApi, unFollowChannelApi, followChannelApi, getUserMeApi, logoutApi, unRegisterUserApi, updateUserPasswordApi, updateUserEmailOrPhoneApi, sendUpdateEmailConfirmCodeApi, getUsersApi, updateUserApi, deleteUserApi, resetUserPasswordApi } from 'api/users';
import { getCommentApi, postCommentApi, removeCommentApi, changeStateCommentApi } from 'api/comments';
import { getChannelStatisticsApi, getChannelInfoApi, uploadChannelBannerApi, updateChannelInfoApi, updateUserSocialsApi } from 'api/channels';
import { setAuth, getAuth } from 'utils/auth';
import { push } from 'connected-react-router';
import {
  GET_TAGS,
  ADD_TAGS,
  GET_APARAT_CATEGORIES,
  GET_CHANNEL_CATEGORIES,
  ADD_CHANNEL_CATEGORIES,
  GET_PLAYLISTS,
  ADD_PLAYLIST,
  UPLOAD_VIDEO,
  CREATE_VIDEO,
  UPLOAD_BANNER,
  GET_MY_VIDEOS,
  DELETE_VIDEO,
  UPDATE_VIDEO,
  GET_VIDEO,
  GET_STATISTIC,
  GET_FOLLOW_LIST,
  UNFOLLOW_CHANNEL,
  FOLLOW_CHANNEL,
  GET_COMMENTS,
  POST_COMMENT,
  REMOVE_COMMENT,
  CHANGE_STATE_COMMENT,
  GET_CHANNEL_STATISTICS,
  GET_USER_ME,
  GET_CHANNEL_INFO,
  LOGOUT,
  UNREGISTER_USER,
  EDIT_CHANNEL_CATEGORIES,
  Upload_CHANNEL_BANNER,
  UPDATE_CHANNEL_INFO,
  UPDATE_USER_SOCIALS,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_EMAIL_OR_MOBILE,
  SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE,
  GET_CATEGORIZED_VIDEOS,
  LIKE_OR_DISLIKE_VIDEO,
  REPUBLISH_VIDEO,
  SEARCH_VIDEOS,
  GET_USERS,
  UPDATE_USER,
  RESET_USER_PASSWORD,
  DELETE_USER,
  GET_ALL_VIDEOS_TO_MANAGE,
  VIDEO_CHANGE_STATE,
  GET_FAVORITE_VIDEOS,
  GET_FOLLOWINGS_VIDEOS,
  GET_CATEGORY_VIDEOS
} from './constants';
import { ROUTE_LOGIN, ROUTE_NOT_FOUND } from './routes';

// نمایش درصد آپلود ویدیو
const identity = a => a;

const createAsyncUpload = video => {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => { };
  });

  const promise = uploadVideoApi(video, function promiseFunction(e) {
    emit((e.loaded * 100) / e.total);
  })
    .then(response => emit({ state: 'ok', response }))
    .catch(error => emit({ state: 'nok', error }));

  return [promise, chan];
};

function* watchOnProgress(chan) {
  while (true) {
    const data = yield take(chan);
    if (typeof data === 'number') {
      yield put(uploadVideoProgressAction(data));
    } else if (data.state === 'ok') {
      yield put(uploadVideoSuccessAction(data.response.data));
    } else {
      yield put(uploadVideoFailAction(data.error.response));
    }
  }
}

function* uploadVideoToServer({ video }) {
  try {
    const [promise, chan] = createAsyncUpload(video);
    yield fork(watchOnProgress, chan);
    yield call(identity(promise));
  } catch (error) {
    yield put(uploadVideoFailAction(error.response))
  }
}

function* uploadBannerToServer({ banner }) {
  try {
    const response = yield call(uploadBannerApi, banner);
    yield put(uploadBannerSuccessAction(response.data));
  } catch (error) {
    yield put(uploadBannerFailAction(error));
  }
}

function* createVideo({ params }) {
  try {
    const response = yield call(createVideoApi, params);
    yield put(createVideoSuccessAction(response.data));
  } catch (error) {
    yield put(createVideoFailAction(error));
  }
}
function* getMyVideosFromServer({ params }) {
  try {
    const response = yield call(getMyVideosApi, params);
    yield put(getMyVideosSuccessAction(response.data));
  } catch (error) {
    yield put(getMyVideosFailAction(error));
  }
}

function* deleteVideoFromServer({ slug }) {
  try {
    yield call(deleteVideoApi, slug);
    yield put(deleteVideoSuccessAction());
    yield put(notificationShowAction('ویدیو با موفقیت حذف شد',
      'success'));
  } catch (error) {
    yield put(deleteVideoFailAction(error));
    yield put(notificationShowAction('در حذف ویدیو خطایی رخ داده است',
      'error'));
  }
}


function* getVideoFromServer({ slug }) {
  try {
    const response = yield call(getVideoApi, slug);
    yield put(getVideoSuccessAction(response.data));
  } catch (error) {
    yield put(getVideoFailAction(error));
    yield put(notificationShowAction(
      'در دریافت ویدیو خطایی رخ داده است',
      'error',
    ));
  }
}

function* updateVideoInServer({ slug, params }) {
  try {
    const response = yield call(updateVideoApi, slug, params);
    yield put(updateVideoSuccessAction(response.data));
  } catch (error) {
    yield put(updateVideoFailAction(error));
  }
}

function* getStatisticFromServer({ slug, params }) {
  try {
    const response = yield call(getStatisticApi, slug, params);
    yield put(getStatisticSuccessAction(response.data));
  } catch (error) {
    yield put(getStatisticFailAction(error));
  }
}

function* getTagsFromServer() {
  try {
    const response = yield call(getTagsApi);
    yield put(getTagsSuccessAction(response.data));
  } catch (error) {
    yield put(getTagsFailAction(error));
  }
}

function* addTagToServer({ tag }) {
  try {
    if (tag) {
      const response = yield call(addNewTag, tag);
      yield put(addTagsSuccessAction(response.data));
      // با ایجاد یک مورد جدید باید مورد را به حافظه اضافه کنیم تا همزمان نمایش داده شود
      const { data } = yield select(makeSelectTags()); // دریافت تگ های پیشین
      data.push(response.data);
      yield put(getTagsSuccessAction(data));
    }
  } catch (error) {
    yield put(addTagsFailAction(error));
  }
}

function* getCategoriesFromServer() {
  try {
    const response = yield call(getCategories);
    yield put(getAparatCategoriesSuccessAction(response.data));
  } catch (error) {
    yield put(getAparatCategoriesFailAction(error));
  }
}

function* getChannelCategoriesFromServer() {
  try {
    const response = yield call(getChannelCategories);
    yield put(getChannelCategoriesSuccessAction(response.data));
  } catch (error) {
    yield put(getChannelCategoriesFailAction(error));
  }
}

function* addChannelCategoryToServer({ category }) {
  try {
    if (category) {
      const response = yield call(addChannelCategory, category);
      yield put(addChannelCategoriesSuccessAction(response.data));
      const { data } = yield select(makeSelectChannelCategories());
      yield put(getChannelCategoriesSuccessAction(data));
      yield put(notificationShowAction(
        'دسته بندی جدید افزوده شد',
        'success',
      ));
    }
  } catch (error) {
    yield put(addChannelCategoriesFailAction(error));
    yield put(notificationShowAction(
      'در افزودن دسته بندی خطایی رخ داده است یا دسته بندی تکراری است',
      'error',
    ));
  }
}

function* editChannelCategoryToServer({ id, category }) {
  try {
    if (category) {
      const response = yield call(editChannelCategoryApi, id, category);
      yield put(editChannelCategoriesSuccessAction(response.data));
      yield put(notificationShowAction(
        'دسته بندی با موفقیت آپدیت شد ',
        'success',
      ));
    }
  } catch (error) {
    yield put(editChannelCategoriesFailAction(error));
    yield put(notificationShowAction(
      'در آپدیت دسته بندی خطایی رخ داده است یا دسته بندی تکراری است',
      'error',
    ));
  }
}

function* getPlaylistsFromServer() {
  try {
    const response = yield call(getPlaylists);
    yield put(getPlaylistsSuccessAction(response.data));
  } catch (error) {
    yield put(getPlaylistsFailAction(error));
  }
}

function* addPlaylistToServer({ playlist }) {
  try {
    if (playlist) {
      const response = yield call(addPlaylist, playlist);
      yield put(addPlaylistSuccessAction(response.data));
      const { data } = yield select(makeSelectUserPlaylists());
      data.push(response.data);
      yield put(getPlaylistsSuccessAction(data));
    }
  } catch (error) {
    yield put(getPlaylistsFailAction(error));
  }
}

function* getFollowListFromServer() {
  try {
    // فالور ها و فالویینگ ها را می خواهیم همزمان دریافت و در یک بخش از حافظه به صورت مشترک ذخیره کنیم
    const { data: followings } = yield call(getFollowingsListApi);
    const { data: followers } = yield call(getFollowersListApi);
    const followList = [
      ...followings.map(item => ({
        ...item,
        type: FOLLOWING_TYPE
      })),
      ...followers.map(item => ({
        ...item,
        type: FOLLOWER_TYPE,
        followed: followings.filter(currecnt => currecnt.id === item.id).length > 0 // کاربری که مارو فالو کرده را فالو کرده ایم یا خیر
      })),
    ];

    yield put(getFollowListSuccessAction(followList));
  }
  catch (error) {
    yield put(getFollowListFailAction(error));
  }


}

function* unfollowChannelInServer({ name }) {
  try {
    yield call(unFollowChannelApi, name);
    yield put(unfollowChannelSuccessAction());

    yield put(notificationShowAction(
      'کانال با موفقیت آنفالو شد',
      'success'));
  }
  catch (error) {
    yield put(unfollowChannelFailAction(error));
    yield put(notificationShowAction(
      'خطایی رخ داده مجددا تلاش کنید',
      'error'));
  }
}

function* followChannelInServer({ name }) {
  try {
    yield call(followChannelApi, name);
    yield put(followChannelSuccessAction());
    yield put(notificationShowAction(
      'کانال با موفقیت دنبال شد',
      'success'));
  }
  catch (error) {
    yield put(followChannelFailAction(error));
    yield put(notificationShowAction(
      'خطایی رخ داده مجددا تلاش کنید',
      'error'));
  }
}

function* getCommentFromServer() {
  try {
    const response = yield call(getCommentApi)
    yield put(getCommentsSuccessAction(response.data));
  }
  catch (error) {
    yield put(getCommentsFailAction(error));
    yield put(notificationShowAction(
      'در دریافت دیدگاه ها خطایی رخ داده است',
      'error',
      { text: 'دیدگاه ها', url: '/comments' }
    ));
  }
}

function* postCommentToServer({ params }) {
  try {
    const response = yield call(postCommentApi, params);
    yield put(postCommentSuccessAction(response.data));
    yield getCommentFromServer(); // در زمان ایجاد کامنت جدید کامنت هارا دوباره بگیریم
    yield put(notificationShowAction(
      'دیدگاه شما با موفقیت ثبت شد و پس از تایید نمایش داده می شود',
      'success'
    ));
  }
  catch (error) {
    yield put(postCommentFailAction(error));
    yield put(notificationShowAction(
      'در ثبت دیدگاه خطایی رخ داده است. مجددا تلاش کنید',
      'error',
      { text: 'دیدگاه ها', url: '/comments' }
    ));
  }
}

function* removeCommentFromServer({ id }) {
  try {
    yield call(removeCommentApi, id);
    yield put(removeCommentSuccessAction());
    yield put(notificationShowAction(
      'دیدگاه موردنظر با موفقیت حذف شد',
      'success'
    ));
  }
  catch (error) {
    yield put(removeCommentFailAction(error));
    yield put(notificationShowAction(
      'دیدگاه مورد نظر حذف نشد. مجددا تلاش کنید',
      'error',
      { text: 'دیدگاه ها', url: '/comments' }
    ));
  }
}

function* changeStateCommentInServer({ id, state }) {
  try {
    yield call(changeStateCommentApi, id, state);
    yield put(changeStateCommentSuccessAction());
    yield put(notificationShowAction(
      'وضعیت دیدگاه با موفقیت تغییر یافت',
      'success'
    ));
  }
  catch (error) {
    yield put(changeStateCommentFailAction(error));
    yield put(notificationShowAction(
      'در تغییر وضعیت دیدگاه خطایی رخ داده است مجددا تلاش کنید',
      'error',
      { text: 'دیدگاه ها', url: '/comments' }
    ));
  }
}

function* getChannelStatisticsFromServer({ params }) {
  try {
    const response = yield call(getChannelStatisticsApi, params);
    yield put(getChannelStatisticsSuccessAction(response.data));
  } catch (error) {
    yield put(getChannelStatisticsFailAction(error));
    yield put(notificationShowAction('خطایی رخ رخ داده است مجددا تلاش کنید',
      'error'));
  }
}

export function* getUserMeFromServer() {
  try {
    const response = yield call(getUserMeApi);
    yield put(getUserMeSuccessAction(response.data));
  } catch (error) {
    yield put(getUserMeFailAction(error));
    yield put(notificationShowAction('در دریافت اطلاعات شما خطایی رخ داده است مجددا تلاش کنید',
      'error',
      { text: 'صفحه ورود', url: '/login' }));
  }
}

export function* getChannelInfoFromServer({ name }) {
  try {
    const response = yield call(getChannelInfoApi, name);
    yield put(getChannelInfoSuccessAction(response.data));
  } catch (error) {
    yield put(getChannelInfoFailAction(error));
    yield put(notificationShowAction('دریافت اطلاعات  خطایی رخ داده است مجددا تلاش کنید',
      'error'));
  }
}

export function* logoutFromServer() {
  try {
    yield call(logoutApi);
    setAuth(); // حذف توکن از لوکال استورج
    yield put(push(ROUTE_LOGIN)); // ری دایرکت به صفحه لاگین
    yield put(logoutSuccessAction());
  } catch (error) {
    yield put(logoutFailAction(error));
    yield put(notificationShowAction('در خروج شما خطایی رخ داده است. مجددا تلاش کنید',
      'error'));
  }
}


export function* unregisterUserFromServer() {
  try {
    yield call(unRegisterUserApi);
    setAuth();
    yield put(push(ROUTE_LOGIN));
    yield put(logoutSuccessAction()); // عملیات خروج موفق را اجرا کن. پاک کردن داده ها
  } catch (error) {
    yield put(unRegisterUserFailAction(error));
    yield put(notificationShowAction('در لغو عضویت شما خطایی رخ داده است مجددا تلاش کنید',
      'error'));
  }
}

function* uploadChannelBannerToServer({ banner }) {
  try {
    const response = yield call(uploadChannelBannerApi, banner);
    yield put(uploadChannelBannerSuccessAction(response.data));
    // اطلاعات کاربر در لوکال ثبت شده از پیش. باید اطلاعات بنرش تغییر کند
    const userData = getAuth();
    userData.me.channel.banner = response.data.banner;
    setAuth(userData);

    yield put(notificationShowAction('تصویر پروفایل با موفقیت بارگذاری شد',
      'success'));

  } catch (error) {
    yield put(uploadChannelBannerFailAction(error));
    yield put(notificationShowAction('در بارگذاری پروفایل خطایی رخ داده است. مجددا تلاش کنید',
      'error'));
  }
}


function* updateChannelInfToServer({ params }) {
  try {
    const response = yield call(updateChannelInfoApi, params);
    yield put(updateChannelInfoSuccessAction(response.data));
    const authData = getAuth();
    authData.me.website = params.website;
    authData.me.channel.name = params.name;
    authData.me.channel.info = params.info;
    setAuth(authData);

    yield put(notificationShowAction('اطلاعات کانال با موفقیت به روز رسانی شد',
      'success'));
  } catch (error) {
    yield put(updateChannelInfoFailAction(error));
    yield put(notificationShowAction('در به روز رسانی اطلاعات کانال خطایی رخ داده است. مجددا تلاش کنید',
      'error'));
  }
}


function* updateUserSocialToServer({ params }) {
  try {
    const response = yield call(updateUserSocialsApi, params);
    yield put(updateUserSocialsSuccessAction(response.data));
    const authData = getAuth();
    authData.me.channel.socials = params;
    setAuth(authData);

    yield put(notificationShowAction('آدرس شبکه های اجتماعی شما با موفقیت به روز رسانی شد',
      'success'));

  } catch (error) {
    yield put(updateUserSocialsFailAction(error));
    yield put(notificationShowAction('در به روز رسانی آدرس شبکه های اجتماعی شما خطایی رخ داده است. مجددا تلاش کنید',
      'error'));
  }
}

function* updateUserPasswordToServer({ params }) {
  try {
    const response = yield call(updateUserPasswordApi, params);
    yield put(updateUserPasswordSuccessAction(response.data));
    yield put(notificationShowAction('گذرواژه شما  شما با موفقیت به روز رسانی شد',
      'success'));

  } catch (error) {
    yield put(updateUserPasswordFailAction(error));
    yield put(notificationShowAction('در به روز رسانی گذرواژه شما خطایی رخ داده است. مجددا تلاش کنید',
      'error'));
  }
}

function* updateUserEmailOrMobileToServer({ params }) {
  try {
    const response = yield call(updateUserEmailOrPhoneApi, params);
    yield put(updateUserEmailOrMobileSuccessAction(response.data));
    yield put(notificationShowAction('یک کد اعتبارسنجی برای شما ارسال شد',
      'success'));
  } catch (error) {
    yield put(updateUserEmailOrMobileFailAction(error));
    yield put(notificationShowAction('در به روز رسانی اطلاعات شما خطایی رخ داده است. مجددا تلاش کنید',
      'error'));
  }
}

function* sendChangeEmailMobileConfirmCodeToServer({ params }) {
  try {
    const response = yield call(sendUpdateEmailConfirmCodeApi, params);
    yield put(sendChangeEmailMobileConfirmCodeSuccessAction(response.data));
    const authData = getAuth();
    authData.me = { ...authData.me, ...response.data };
    setAuth(authData);
    yield put(notificationShowAction('اطلاعات شما با موفقیت تغییر یافت',
      'success'));
  } catch (error) {
    yield put(sendChangeEmailMobileConfirmCodeSuccessAction(error));
    yield put(notificationShowAction('در به روز رسانی اطلاعات شما خطایی رخ داده است. مجددا تلاش کنید',
      'error'));
  }
}


function* getCategorizedVideoFromServer() {
  try {
    const response = yield call(getCategorizedVideosApi);
    yield put(getCategorizedVideosSuccessAction(response.data));
  } catch (error) {
    yield put(getCategorizedVideosFailAction(error));
    yield put(notificationShowAction('در دریافت ویدیو ها خطایی رخ داده است. مجددا تلاش کنید',
      'error'));
  }
}

function* likeOrDislikeVideoInServer({ slug, like }) {
  try {
    const response = yield call(likeOrDislikeVideoApi, slug, like);
    yield put(likeOrDislikeVideoSuccessAction(response.data));
    yield put(notificationShowAction(
      like ? 'ویدیو با موفقیت لفو پسند شد' : 'ویدیو با موفقیت پسندیده شد',
      'success'));

  } catch (error) {
    yield put(likeOrDislikeVideoFailAction(error));
    yield put(notificationShowAction('در پسند ویدیو خطایی رخ داده است',
      'error'));
  }
}

function* republishVideoInServer({ slug }) {
  try {
    const response = yield call(republishVideoApi, slug);
    yield put(republishVideoSuccessAction(response.data));
    yield put(notificationShowAction('ویدیو با موفقیت بازنشر شد',
      'success'));

  } catch (error) {
    yield put(republishVideoFailAction(error));
    yield put(notificationShowAction('در بازنشر ویدیو خطایی رخ داده است',
      'error'));
  }
}


function* searchVideosInServer({ params }) {
  try {
    const response = yield call(searchVideoApi, params);
    yield put(searchVideosSuccessAction(response.data));

  } catch (error) {
    yield put(searchVideosFailAction(error.response.status));
  }
}

function* getUsersFromServer({ params }) {
  try {
    const response = yield call(getUsersApi, params);
    yield put(getUsersSuccessAction(response.data));
  } catch (error) {
    yield put(getUsersFailAction(error.response.status));
  }
}

function* updateUserInServer({ params }) {
  try {
    const response = yield call(updateUserApi, params);
    yield put(updateUsersSuccessAction(response.data));
    yield put(notificationShowAction('اطلاعات کاربر با موفقیت بروز رسانی شد',
      'success'));

  } catch (error) {
    yield put(updateUsersFailAction(error));
    const errorMessage = error.response.status === 422 ? 'اطلاعات وارد شده صحیح نمی باشند یا تکراری هستند' : 'خطایی رخ داده است. مجددا تلاش کنید';
    yield put(notificationShowAction(errorMessage,
      'error'));
  }
}

function* resetUserPasswordrInServer({ params }) {
  try {
    const response = yield call(resetUserPasswordApi, params);
    yield put(resetUserPasswordSuccessAction(response.data));
    yield put(notificationShowAction('گذرواژه کاربر با موفقیت بازنشانی شد',
      'success'));

  } catch (error) {
    yield put(resetUserPasswordFailAction(error));
    yield put(notificationShowAction('در بازنشانی گذرواژه کاربر خطایی رخ داده است',
      'error'));
  }
}


function* deleteUserInServer({ params }) {
  try {
    const response = yield call(deleteUserApi, params);
    yield put(deleteUserSuccessAction(response.data));
    yield put(notificationShowAction('کاربر با موفقیت حذف شد',
      'success'));
  } catch (error) {
    yield put(deleteUserFailAction(error));
    yield put(notificationShowAction('در حذف کاربر خطایی رخ داده است',
      'error'));
  }
}

function* getAllVideosToManageFromServer({ params }) {
  try {
    const response = yield call(getVideosToManageApi, params);
    yield put(getAllVideosToManageSuccessAction(response.data));
  } catch (error) {
    yield put(getAllVideosToManageFailAction(error));
    yield put(notificationShowAction('در دریافت ویدیو ها خطایی رخ داده است',
      'error'));
  }
}

function* videoChangeStateInServer({ params }) {
  try {
    const response = yield call(videoChangeStateApi, params);
    yield put(videoChangeStateSuccessAction(response.data));
    yield put(notificationShowAction('ویدیو با موفقیت تغییر وضعیت یافت',
      'success'));
  } catch (error) {
    yield put(videoChangeStateFailAction(error));
    yield put(notificationShowAction('در تغییر وضعیت ویدیو خطایی رخ داده است',
      'error'));
  }
}

function* getFavoritesVideosFromServer() {
  try {
    const response = yield call(favoriteVideosApi);
    yield put(favoriteVideosSuccessAction(response.data));
  } catch (error) {
    yield put(favoriteVideosFailAction(error));
    yield put(notificationShowAction(' در دریافت ویدیوهای پسندیده شده خطایی رخ داده است مجددا تلاش کنید ',
      'error'));
  }
}


function* getFollowingsVideosFromServer() {
  try {
    const response = yield call(followingVideosApi);
    yield put(followingsVideosSuccessAction(response.data));
  } catch (error) {
    yield put(followingsVideosFailAction(error));
    yield put(notificationShowAction('دردریافت ویدیوهای دنبال شدگان شما خطایی رخ داده است',
      'error'));
  }
}


function* getCategoryVideosFromServer({ params }) {
  try {
    const response = yield call(categoryVideosApi, params);
    yield put(categoryVideosSuccessAction(response.data));

  } catch (error) {
    yield put(categoryVideosFailAction(error));
    yield put(notificationShowAction('در دریافت ویدیوها خطایی رخ داده است',
      'error'));
  }
}


export default function* defaultSaga() {
  // به constant ها گوش کن و جنریتور فانکشن معادل را اجرا کن
  yield takeLatest(UPLOAD_VIDEO, uploadVideoToServer);
  yield takeLatest(UPLOAD_BANNER, uploadBannerToServer);
  yield takeLatest(CREATE_VIDEO, createVideo);
  yield takeLatest(GET_MY_VIDEOS, getMyVideosFromServer);
  yield takeLatest(DELETE_VIDEO, deleteVideoFromServer);
  yield takeLatest(GET_VIDEO, getVideoFromServer);
  yield takeLatest(UPDATE_VIDEO, updateVideoInServer);
  yield takeLatest(GET_STATISTIC, getStatisticFromServer);

  yield takeLatest(GET_TAGS, getTagsFromServer);
  yield takeLatest(ADD_TAGS, addTagToServer);

  yield takeLatest(GET_APARAT_CATEGORIES, getCategoriesFromServer);
  yield takeLatest(GET_CHANNEL_CATEGORIES, getChannelCategoriesFromServer);
  yield takeLatest(ADD_CHANNEL_CATEGORIES, addChannelCategoryToServer);
  yield takeLatest(EDIT_CHANNEL_CATEGORIES, editChannelCategoryToServer);

  yield takeLatest(GET_PLAYLISTS, getPlaylistsFromServer);
  yield takeLatest(ADD_PLAYLIST, addPlaylistToServer);

  yield takeLatest(GET_FOLLOW_LIST, getFollowListFromServer);
  yield takeLatest(UNFOLLOW_CHANNEL, unfollowChannelInServer);
  yield takeLatest(FOLLOW_CHANNEL, followChannelInServer);

  yield takeLatest(GET_COMMENTS, getCommentFromServer);
  yield takeLatest(POST_COMMENT, postCommentToServer);
  yield takeLatest(REMOVE_COMMENT, removeCommentFromServer);
  yield takeLatest(CHANGE_STATE_COMMENT, changeStateCommentInServer);
  yield takeLatest(GET_CHANNEL_STATISTICS, getChannelStatisticsFromServer);
  yield takeLatest(GET_USER_ME, getUserMeFromServer);
  yield takeLatest(GET_CHANNEL_INFO, getChannelInfoFromServer);

  yield takeLatest(LOGOUT, logoutFromServer);
  yield takeLatest(UNREGISTER_USER, unregisterUserFromServer);

  yield takeLatest(Upload_CHANNEL_BANNER, uploadChannelBannerToServer);
  yield takeLatest(UPDATE_CHANNEL_INFO, updateChannelInfToServer);
  yield takeLatest(UPDATE_USER_SOCIALS, updateUserSocialToServer);
  yield takeLatest(UPDATE_USER_PASSWORD, updateUserPasswordToServer);
  yield takeLatest(UPDATE_USER_EMAIL_OR_MOBILE, updateUserEmailOrMobileToServer);
  yield takeLatest(SEND_CHANGE_EMAIL_MOBILE_CONFIRM_CODE, sendChangeEmailMobileConfirmCodeToServer);


  yield takeLatest(GET_CATEGORIZED_VIDEOS, getCategorizedVideoFromServer);
  yield takeLatest(LIKE_OR_DISLIKE_VIDEO, likeOrDislikeVideoInServer);
  yield takeLatest(REPUBLISH_VIDEO, republishVideoInServer);
  yield takeLatest(SEARCH_VIDEOS, searchVideosInServer);
  yield takeLatest(GET_USERS, getUsersFromServer);
  yield takeLatest(UPDATE_USER, updateUserInServer);
  yield takeLatest(RESET_USER_PASSWORD, resetUserPasswordrInServer);
  yield takeLatest(DELETE_USER, deleteUserInServer);
  yield takeLatest(GET_ALL_VIDEOS_TO_MANAGE, getAllVideosToManageFromServer);
  yield takeLatest(VIDEO_CHANGE_STATE, videoChangeStateInServer);

  yield takeLatest(GET_FAVORITE_VIDEOS, getFavoritesVideosFromServer);
  yield takeLatest(GET_FOLLOWINGS_VIDEOS, getFollowingsVideosFromServer);
  yield takeLatest(GET_CATEGORY_VIDEOS, getCategoryVideosFromServer);
}
