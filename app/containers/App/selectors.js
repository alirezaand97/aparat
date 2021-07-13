import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectApp = state => state.app;

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export const makeSelectApp = () =>
  createSelector(
    selectApp,
    appState => appState,
  );

export const makeSelectError = () =>
  createSelector(
    selectApp,
    appState => appState && appState.error,
  );

export const makeSelectNotification = () =>
  createSelector(
    selectApp,
    appState => appState.notification,
  );

export const makeOpenDrawerSelector = () =>
  createSelector(
    selectApp,
    appState => appState && appState.drawerIsOpen,
  );

export const makeSelectUploadVideo = () =>
  createSelector(
    selectApp,
    appState => appState.fileUpload,
  );

export const makeSelectUploadBanner = () =>
  createSelector(
    selectApp,
    appState => appState.uploadBanner,
  );

export const makeSelectCreateVideo = () =>
  createSelector(
    selectApp,
    appState => appState.createVideo,
  );

export const makeSelectDeleteVideo = () =>
  createSelector(
    selectApp,
    appState => appState.deleteVideo,
  );

export const makeSelectGetVideo = () =>
  createSelector(
    selectApp,
    appState => appState.getVideo,
  );

export const makeSelectUpdateVideo = () =>
  createSelector(
    selectApp,
    appState => appState.updateVideo,
  );

export const makeSelectGetMyVideos = () =>
  createSelector(
    selectApp,
    appState => appState.getMyVideos,
  );

export const makeSelectVideoStatistic = () =>
  createSelector(
    selectApp,
    appState => appState.getStatistic,
  );

export const makeSelectTags = () =>
  createSelector(
    selectApp,
    appState => appState.tags,
  );

export const makeSelectAddTag = () =>
  createSelector(
    selectApp,
    appState => appState.addTag,
  );

export const makeSelectAparatCategories = () =>
  createSelector(
    selectApp,
    appState => appState.aparatCategories,
  );

export const makeSelectChannelCategories = () =>
  createSelector(
    selectApp,
    appState => appState.channelCategories,
  );

export const makeSelectAddChannelCategories = () =>
  createSelector(
    selectApp,
    appState => appState.addedChannelCategory,
  );

export const makeSelectEditChannelCategories = () =>
  createSelector(
    selectApp,
    appState => appState.editChannelCategory,
  );

export const makeSelectUserPlaylists = () =>
  createSelector(
    selectApp,
    appState => appState.userPlaylists,
  );

export const makeSelectAddPlaylist = () =>
  createSelector(
    selectApp,
    appState => appState.addUserPlaylist,
  );

export const makeSelectGetFollowList = () =>
  createSelector(
    selectApp,
    appState => appState.followList,
  );

// دریافت کامنت ها و تبدیل آنها کامنت طبقه ای
export const makeSelectGetComments = () =>
  createSelector(
    selectApp,
    appState => {
      if (appState.comments.data) {
        const data = appState.comments.data.reduce((carry, item) => {
          if (!item.parent_id) {
            return {
              ...carry,
              [item.id]: {
                ...item,
                children: [],
              },
            };
          }

          return {
            ...carry,
            [item.parent_id]: {
              ...carry[item.parent_id],
              children: [...carry[item.parent_id].children, item],
            },
          };
        }, {});

        return {
          ...appState.comments,
          data: Object.values(data),
        };
      }

      return appState.comments;
    },
  );

export const makeSelectPostedComment = () =>
  createSelector(
    selectApp,
    appState => appState.postComment,
  );

export const makeSelectGetChannelStatistics = () =>
  createSelector(
    selectApp,
    appState => appState.channelStatistics,
  );

export const makeSelectUserMe = () =>
  createSelector(
    selectApp,
    appState => appState.userMe,
  );

export const makeSelectGetChannelInfo = () =>
  createSelector(
    selectApp,
    appState => appState.ChannelInfo,
  );

export const makeSelectLogout = () =>
  createSelector(
    selectApp,
    appState => appState.logout,
  );

export const makeSelectUnRegisterUser = () =>
  createSelector(
    selectApp,
    appState => appState.unRegisterUser,
  );

export const makeSelectuploadChannelBanner = () =>
  createSelector(
    selectApp,
    appState => appState.uploadChannelBanner,
  );

export const makeSelectUpdateUserPassword = () =>
  createSelector(
    selectApp,
    appState => appState.updateUserPassword,
  );

export const makeSelectUpdateChannelInfo = () =>
  createSelector(
    selectApp,
    appState => appState.updateChannelInfo,
  );

export const makeSelectUpdateUserSocials = () =>
  createSelector(
    selectApp,
    appState => appState.updateUserSocials,
  );

export const makeSelectUpdateUserEmailOrMobile = () =>
  createSelector(
    selectApp,
    appState => appState.updateUserEmailOrPhone,
  );

export const makeSelectchangeEmailMobileConfirmCode = () =>
  createSelector(
    selectApp,
    appState => appState.changeEmailMobileConfirmCode,
  );

export const makeSelectCategorizedVideos = () =>
  createSelector(
    selectApp,
    appState => appState.categorizedVideos,
  );

export const makeSelectSearchVideos = () =>
  createSelector(
    selectApp,
    appState => appState.searchVideos,
  );

export const makeSelectGetUsers = () =>
  createSelector(
    selectApp,
    appState => appState.getUsers,
  );

export const makeSelectUpdateUser = () =>
  createSelector(
    selectApp,
    appState => appState.updateUser,
  );

export const makeSelectUserResetPassword = () =>
  createSelector(
    selectApp,
    appState => appState.userResetPassword,
  );

export const makeSelectDeleteUser = () =>
  createSelector(
    selectApp,
    appState => appState.deleteUser,
  );

export const makeSelectGetVideosToManage = () =>
  createSelector(
    selectApp,
    appState => appState.getAllVideosToManage,
  );

export const makeSelectVideoChangeState = () =>
  createSelector(
    selectApp,
    appState => appState.videoChangeState,
  );

export const makeSelectFavoriteVideos = () =>
  createSelector(
    selectApp,
    appState => appState.favoriteVideos,
  );

export const makeSelectFollowingsVideos = () =>
  createSelector(
    selectApp,
    appState => appState.followingsVideos,
  );

export const makeSelectCategoryVideos = () =>
  createSelector(
    selectApp,
    appState => appState.categoryVideos,
  );
