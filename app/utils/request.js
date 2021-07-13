import axios from 'axios';
import { getAuth } from 'utils/auth';

const request = axios.create({
  baseURL: 'http://aparat.test/api',
  headers: {
    Accept: 'application/json',
  },
  timeout: 15000,
});

request.interceptors.request.use(
  function(config) {
    try {
      const auth = getAuth();
      if (auth && config.url !== '/login') {
        config.headers.Authorization = `${auth.token_type} ${
          auth.access_token
        }`;
      }
    } catch (error) {
      // nothing
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

export default request;
