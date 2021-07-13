import { to_valid_mobile } from 'utils/helpers';
import request from 'utils/request';

export function getFollowingsListApi() {
  const config = {
    url: '/user/followings',
    method: 'get',
  };
  return request(config);
}

export function getFollowersListApi() {
  const config = {
    url: '/user/followers',
    method: 'get',
  };

  return request(config);
}

export function unFollowChannelApi(name) {
  const config = {
    url: `user/${name}/unfollow`,
    method: 'post',
  };

  return request(config);
}

export function followChannelApi(name) {
  const config = {
    url: `user/${name}/follow`,
    method: 'post',
  };

  return request(config);
}

export function getUserMeApi() {
  const config = {
    url: 'user/me',
    method: 'get',
  };

  return request(config);
}

export function logoutApi() {
  const config = {
    url: '/logout',
    method: 'post',
  };
  return request(config);
}

export function unRegisterUserApi() {
  const config = {
    url: '/user/unregister',
    method: 'delete',
  };

  return request(config);
}

export function updateUserPasswordApi(data) {
  const config = {
    url: '/change-password',
    method: 'post',
    data,
  };

  return request(config);
}

export function updateUserEmailOrPhoneApi(data) {
  console.log(data);

  const config = {
    url: '/change-email',
    method: 'post',
    data,
  };

  return request(config);
}

// ارسال کد فعالسازی دریافت شده به سرور
export function sendUpdateEmailConfirmCodeApi(data) {
  const config = {
    url: '/change-email-submit',
    method: 'post',
    data,
  };

  return request(config);
}

export function getUsersApi(params) {
  const config = {
    url: `/user/all?page=${params.page ? params.page : 1}&per_page=${
      params.perPage ? params.perPage : 10
    }`,
    method: 'get',
  };

  return request(config);
}

export function updateUserApi(params) {
  if (params.mobile) {
    params = { ...params, mobile: to_valid_mobile(params.mobile) };
  }
  const config = {
    url: `/user/update/${params.id}`,
    method: 'put',
    data: params,
  };
  return request(config);
}

export function resetUserPasswordApi(params) {
  console.log(params);
  const config = {
    url: `/user/${params}/reset-password`,
    method: 'put',
  };
  return request(config);
}

export function deleteUserApi(params) {
  const config = {
    url: `/user/${params}/delete`,
    method: 'delete',
  };
  return request(config);
}
