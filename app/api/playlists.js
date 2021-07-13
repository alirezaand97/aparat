import request from 'utils/request';

export function getPlaylists() {
  const config = {
    url: '/playlist/my',
    method: 'get',
  };
  return request(config);
}

export function addPlaylist(playlist) {
  const config = {
    url: '/playlist',
    method: 'post',
    data: {
      title: playlist,
    },
  };
  return request(config);
}
