import React from 'react';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../constants/Constants';
import jwtDecode from 'jwt-decode';
import { decodedjwtType } from '../types';
import { setCookie } from '../util/Cookie';
import jinInterceptor from './interceptor';
import { toast } from 'react-toastify';

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
const oauthLoginAPI = (code: string) => {
  if (window == undefined) return;

  fetch(API_URL + '/refresh', {
    method: 'POST',
    body: code,
  })
    .then((response) => {
      response.json().then((data) => {
        const decodeToken: decodedjwtType = jwtDecode(data.accessToken);
        setCookie('name', decodeToken.sub, {
          path: '/',
        });
        setCookie('access_token', data.accessToken, {
          path: '/',
        });
        setCookie('refresh_token', data.refreshToken, {
          path: '/',
        });
        setCookie('role', decodeToken.auth, {
          path: '/',
        });
        if (data.accessToken) {
          window.location.href = '/';
          setCookie('status', 'login success');
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const loginAPI = (id: string, password: string) => {
  jinInterceptor
    .post(
      API_URL + '/login',
      { username: id, password: password },
      {
        headers: headerConfig,
      }
    )
    .then((response) => {
      const decodeToken: decodedjwtType = jwtDecode(response.data.accessToken);
      setCookie('name', decodeToken.sub, {
        path: '/',
      });
      setCookie('access_token', response.data.accessToken, {
        path: '/',
      });
      setCookie('refresh_token', response.data.refreshToken, {
        path: '/',
      });
      setCookie('role', decodeToken.auth, {
        path: '/',
      });
      if (response.data.accessToken) {
        window.location.href = '/';
        setCookie('status', 'login success');
      }
    });
};
const SignUpAPI = (
  id: string,
  password: string,
  name: string,
  email: string
) => {
  jinInterceptor
    .post(
      API_URL + '/member',
      { username: id, password: password, name: name, email: email },
      {
        headers: headerConfig,
      }
    )
    .then((response) => {
      if (response.status == 201) toast.success('회원가입 성공');
      window.location.href = '/login';
    })
    .catch((error) => {
      console.log(error);
    });
};

export { loginAPI, SignUpAPI, oauthLoginAPI };
