import axios, { AxiosRequestConfig } from 'axios';
import { getCookie, removeCookie, setCookie } from '../util/Cookie';
import { API_URL } from '../constants/Constants';
import { toast } from 'react-toastify';

const jinInterceptor = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const refreshToken = getCookie('refresh_token');
const accessToken = getCookie('access_token');

jinInterceptor.interceptors.request.use(
  function (config) {
    if (refreshToken && accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
jinInterceptor.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log(error.response.status);
    if (error.response.status === 400) {
      throw error;
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await fetch(API_URL + '/refresh', {
        method: 'POST',
        body: refreshToken,
      });
      if (res.status === 200) {
        res.json().then((data) => {
          setCookie('access_token', data.accessToken, {
            path: '/',
          });
          setCookie('refresh_token', data.refreshToken, {
            path: '/',
          });
          console.log('Access Token Refreshed!');
          originalRequest.headers.Authorization = 'Bearer ' + accessToken;
          return jinInterceptor(originalRequest);
        });
      } else {
        removeCookie('access_token', { path: '/' });
        removeCookie('refresh_token', { path: '/' });
      }
    }
  }
);
export default jinInterceptor;
