import request from 'utils/request';
export function LoginApi({ username, password }) {
  const config = {
    method: 'post',
    url: '/login',
    data: {
      username,
      password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'AVpByhiwyLIyrshc1MgWhkXmkArIhlCYt1opVFrW',
    },
  };
  return request(config);
}

export function registerApi(params) {
  const config = {
    method: 'post',
    url: '/register',
    data: params,
  };

  return request(config);
}

export function verificationUserApi(params) {
  const config = {
    method: 'post',
    url: '/register-verify',
    data: params,
  };

  return request(config);
}
