import request from 'utils/request';
export function uploadVideoApi(file, onUploadProgress) {
  // دریافت فایل از FormData و ارسال ان به سرور

  const data = new FormData();
  data.append('video', file);
  const config = {
    method: 'post',
    url: '/video/upload',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  };
  return request(config);
}

export function createVideoApi(data) {
  console.log(data);
  const config = {
    method: 'post',
    url: '/video',
    data,
  };

  return request(config);
}

export function uploadBannerApi(file) {
  const data = new FormData();
  data.append('banner', file);
  const config = {
    method: 'post',
    url: '/video/upload-banner',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  };

  return request(config);
}

export function getMyVideosApi(data) {
  const config = {
    method: 'get',
    url: '/video',
    data,
  };

  return request(config);
}

export function deleteVideoApi(slug) {
  const config = {
    method: 'delete',
    url: `/video/${slug}`,
  };

  return request(config);
}

export function getVideoApi(slug) {
  const config = {
    method: 'get',
    url: `/video/${slug}/view`,
  };

  return request(config);
}

export function updateVideoApi(slug, data) {
  console.log(data, slug, 'بنررررررر');

  const config = {
    method: 'put',
    url: `/video/${slug}/update`,
    data,
  };

  return request(config);
}

export function getStatisticApi(slug, data) {
  const config = {
    url: `/video/${slug}/statistics`,
    method: 'get',
    params: {
      last_n_days: data,
    },
  };
  return request(config);
}

export function getCategorizedVideosApi() {
  const config = {
    url: 'video/categorized-videos',
    method: 'get',
  };
  return request(config);
}

export function likeOrDislikeVideoApi(slug, like) {
  console.log(slug, like);
  const config = {
    url: `video/${slug}/${like ? 'dislike' : 'like'}`,
    method: 'post',
  };
  return request(config);
}

export function republishVideoApi(slug) {
  const config = {
    url: `video/${slug}/republish`,
    method: 'post',
  };
  return request(config);
}

// سرچ ویدیو بر اساس تگ یا کلمه سرچ
export function searchVideoApi(params) {
  const parameter = Object.keys(params)
    .filter(key => params[key] !== null)
    .map(k => `${k}=${params[k]}`);
  const config = {
    url: `video/search?${parameter[0]}`,
    method: 'get',
  };
  return request(config);
}

// دریافت ویدیو ها برای مدیریتشان
export function getVideosToManageApi(params) {
  const config = {
    url: `/video/all-to-manage?page=${params.page ? params.page : 1}&per_page=${
      params.perPage ? params.perPage : 10
    }`,
    method: 'get',
  };

  return request(config);
}

export function videoChangeStateApi(params) {
  const { state } = params;
  const config = {
    url: `video/${params.slug}/state`,
    method: 'put',
    data: { state },
  };
  return request(config);
}

export function favoriteVideosApi() {
  const config = {
    url: `video/favorite-videos`,
    method: 'get',
  };
  return request(config);
}

export function followingVideosApi() {
  const config = {
    url: `video/followings-videos`,
    method: 'get',
  };
  return request(config);
}

export function categoryVideosApi(params) {
  const config = {
    url: `category/${params}/videos`,
    method: 'get',
  };
  return request(config);
}
