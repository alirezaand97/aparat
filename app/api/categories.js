import request from 'utils/request';

export function getCategories() {
  const config = {
    url: '/category/aparat',
    method: 'get',
  };
  return request(config);
}

export function getChannelCategories() {
  const config = {
    url: '/category/my',
    method: 'get',
  };
  return request(config);
}

export function addChannelCategory(category) {
  const config = {
    url: '/category',
    method: 'post',
    data: {
      title: category,
    },
  };
  return request(config);
}

export function editChannelCategoryApi(id, category) {
  const config = {
    url: `/category/edit/${id}`,
    method: 'put',
    data: { title: category, banner_id: null },
  };
  return request(config);
}
