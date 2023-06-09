import React from 'react';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../constants/Constants';
import jwtDecode from 'jwt-decode';
import { TotalLikeViewType, decodedjwtType } from '../types';
import { getCookie, removeCookie, setCookie } from '../util/Cookie';
import jinInterceptor from './interceptor';
import { toast } from 'react-toastify';
import { SetterOrUpdater } from 'recoil';

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
      toast.error('회원이 아니십니다! 아이디 혹은 패스워드를 확인해주세요!!');
    });
};
const SignUpAPI = (
  id: string,
  password: string,
  name: string,
  email: string,
  setSignupcheck: React.Dispatch<React.SetStateAction<boolean>>
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
      if (response.status == 201) {
        setSignupcheck(true);
      }
    })
    .catch((error) => {
      toast.error(error.response.data);
      toast.error(error.response.data.detail);
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
    .catch((error) => {});
};
const NicknameChangeAPI = async (newName: string) => {
  await axios
    .put(API_URL + '/member/name', null, {
      params: {
        newName: newName,
      },
      headers: {
        ...headerConfig,
        Authorization: 'Bearer ' + getCookie('access_token'),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setCookie('status', '닉네임 변경 성공');
        window.location.href = '/profile';
      }
    })
    .catch((error) => {
      toast.error('닉네임 변경 실패');
    });
};
const EmailPostAPI = async (email: string) => {
  await axios
    .post(API_URL + '/auth/email', null, {
      params: {
        email: email,
      },
      headers: headerConfig,
    })
    .then((response) => {
      if (response.status === 200) {
        toast.success('이메일 전송 성공');
      }
    })
    .catch((error) => {
      toast.error('이메일 전송 실패');
    });
};
const LikeViewCountAPI = async (
  setTotal: SetterOrUpdater<TotalLikeViewType>
) => {
  await axios
    .get(API_URL + '/meme/counts', {
      headers: {
        ...headerConfig,
        Authorization: 'Bearer ' + getCookie('access_token'),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setTotal(response.data);
      }
    })
    .catch((error) => {
      if (error.response.data.code === '403') {
        removeCookie('access_token', { path: '/' });
        removeCookie('refresh_token', { path: '/' });
        removeCookie('username', { path: '/' });
        window.location.href = '/login';
      }
    });
};
const IDCheckAPI = async (id: string) => {
  await axios
    .get(API_URL + '/member/username', {
      params: {
        username: id,
      },
      headers: headerConfig,
    })
    .then((response) => {
      if (response.status === 200) {
        toast.success('사용 가능한 아이디입니다.');
      }
    })
    .catch((error) => {
      toast.error('이미 사용중인 아이디입니다.');
    });
};
const EmailCheckAPI = async (email: string) => {
  await axios
    .get(API_URL + '/member/email', {
      params: {
        email: email,
      },
      headers: headerConfig,
    })
    .then((response) => {
      if (response.status === 200) {
        toast.success('사용 가능한 이메일입니다.');
      }
    })
    .catch((error) => {
      toast.error('이미 사용중인 이메일입니다.');
    });
};

export {
  loginAPI,
  SignUpAPI,
  oauthLoginAPI,
  MemberSecessionAPI,
  NicknameChangeAPI,
  EmailPostAPI,
  LikeViewCountAPI,
  IDCheckAPI,
  EmailCheckAPI,
};
