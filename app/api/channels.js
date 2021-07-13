import request from 'utils/request';

export function getChannelStatisticsApi(params) {
  const config = {
    url: 'channel/statistics',
    method: 'get',
    params: {
      last_n_days: params,
    },
  };
  return request(config);
}

export function getChannelInfoApi(name) {
  const config = {
    url: `channel/${name}/info`,
    method: 'get',
  };
  return request(config);
}

export function uploadChannelBannerApi(banner) {
  const data = new FormData();
  data.append('banner', banner);
  const config = {
    url: 'channel',
    method: 'post',
    data,
  };
  return request(config);
}

export function updateChannelInfoApi(params) {
  const config = {
    url: 'channel',
    method: 'put',
    data: params,
  };
  return request(config);
}

export function updateUserSocialsApi(params) {
  const config = {
    url: 'channel/socials',
    method: 'post',
    data: params,
  };
  return request(config);
}
