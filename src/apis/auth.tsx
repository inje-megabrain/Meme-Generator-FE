import React from 'react';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../constants/Constants';
import jwtDecode from 'jwt-decode';
import { decodedjwtType } from '../types';
import { getCookie, removeCookie, setCookie } from '../util/Cookie';
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
        setCookie('username', decodeToken.sub, {
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
  axios
    .post(
      API_URL + '/login',
      { username: id, password: password },
      {
        headers: headerConfig,
      }
    )
    .then((response) => {
      const decodeToken: decodedjwtType = jwtDecode(response.data.accessToken);
      setCookie('username', decodeToken.sub, {
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
    })
    .catch((error) => {
      if (error.response.data === '자격 증명에 실패하였습니다.') {
        toast.error('회원이 아니십니다! 아이디 혹은 패스워드를 확인해주세요!!');
      }
    });
};
const SignUpAPI = (
  id: string,
  password: string,
  name: string,
  email: string
) => {
  axios
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
      if (error.response.data === '이미 존재하는 회원입니다.') {
        toast.error('이미 존재하는 회원입니다.');
      }
    });
};
const MemberSecessionAPI = async (username: string) => {
  await jinInterceptor
    .delete(API_URL + `/member/${username}`, {
      params: {
        username: username,
      },
      headers: {
        ...headerConfig,
        Authorization: 'Bearer ' + getCookie('access_token'),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setCookie('status', 'secession success');
        removeCookie('access_token', { path: '/' });
        removeCookie('refresh_token', { path: '/' });
        removeCookie('username', { path: '/' });
        removeCookie('role', { path: '/' });
        window.location.href = '/';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export { loginAPI, SignUpAPI, oauthLoginAPI, MemberSecessionAPI };
