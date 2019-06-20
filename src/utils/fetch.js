import axios from 'axios';

const config = {
  baseURL: '',
  transformRequest: [function (data) {
    return data;
  }],
  transformResponse: [function (data) {
    return data;
  }],
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 1000 * 10,
  withCredentials: false,
  responseType: 'json'
};

const http = axios.create(config);

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default {
  install (Vue) {
    Vue.prototype.$http = http;
  }
};
