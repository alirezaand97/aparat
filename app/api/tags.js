import request from 'utils/request';

export function getTagsApi() {
  const config = {
    url: '/tag',
    method: 'get',
  };
  return request(config);
}

export function addNewTag(tag) {
  const config = {
    url: '/tag',
    method: 'post',
    data: { title: tag },
  };
  return request(config);
}
