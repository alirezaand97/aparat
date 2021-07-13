import request from 'utils/request';

export function getCommentApi() {
  const config = {
    url: '/comment',
    method: 'get',
  };
  return request(config);
}
export function postCommentApi(data) {
  const config = {
    url: '/comment',
    method: 'post',
    data,
  };
  return request(config);
}

export function removeCommentApi(id) {
  const config = {
    url: `/comment/${id}`,
    method: 'delete',
  };
  return request(config);
}
export function changeStateCommentApi(id, state) {
  const config = {
    url: `/comment/${id}/state`,
    method: 'post',
    data: {
      state,
    },
  };
  return request(config);
}
