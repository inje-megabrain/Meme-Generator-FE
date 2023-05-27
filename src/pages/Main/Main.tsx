import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie, setCookie } from '../../util/Cookie';
import Meme from '../Meme';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '@src/constants/Constants';
import Errorpage from '../Errorpage';

const Main = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<string>('light');
  const [servercheck, setServercheck] = useState<boolean>(true);
  const status = getCookie('status');
  const cookie = getCookie('access_token');
  const homebtn = () => {
    window.location.reload();
  };
  const signbtn = () => {
    navigate('/login');
  };
  const logoutbtn = () => {
    removeCookie('access_token', { path: '/' });
    removeCookie('refresh_token', { path: '/' });
    removeCookie('username', { path: '/' });
    removeCookie('role', { path: '/' });
    setCookie('status', 'logout success');
    window.location.reload();
  };
  const templatebtn = () => {
    navigate('/template');
  };
  const profilebtn = () => {
    navigate('/profile');
  };
  if (status === 'login success') {
    toast.success('로그인 성공');
    removeCookie('status', { path: '/' });
  }
  if (status === 'logout success') {
    toast.success('로그아웃 성공');
    removeCookie('status', { path: '/' });
  }
  if (status === 'upload success') {
    toast.success('짤 업로드 성공');
    removeCookie('status', { path: '/' });
  }
  if (status === 'delete success') {
    toast.success('짤 삭제 성공');
    removeCookie('status', { path: '/' });
  }
  if (status === 'secession success') {
    toast.success('회원 탈퇴 성공');
    removeCookie('status', { path: '/' });
  }
  useEffect(() => {
    axios
      .get(API_URL + '/test/ping')
      .then((response) => {
        if (response.status !== 200) {
          toast.error('서버가 꺼져있습니다.');
        }
      })
      .catch((error) => {
        setServercheck(false);
        toast.error('서버가 꺼져있습니다.');
      });
  }, []);
  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);
  return (
    <>
      {servercheck ? (
        <div>
          <div>
            <div
              className='btn btn-ghost normal-case text-3xl'
              onClick={homebtn}
            >
              MEME
            </div>
            <div className='grid place-items-start'>
              <div className='grid grid-cols-2'>
                <div>
                  <input
                    type='checkbox'
                    className='toggle border border-solid'
                    checked={theme === 'dark'}
                    onChange={(e) => {
                      setTheme(e.target.checked ? 'dark' : 'light');
                    }}
                  />
                </div>
                {theme === 'dark' ? <div className='text-xl'>🌙</div> : null}
              </div>
            </div>
            {!cookie ? (
              <div className='text-right'>
                <div
                  className='btn btn-ghost normal-case text-base'
                  onClick={signbtn}
                >
                  로그인
                </div>
              </div>
            ) : (
              <div className='text-right'>
                <div
                  className='btn btn-ghost normal-case text-base'
                  onClick={profilebtn}
                >
                  내 정보
                </div>
                <div
                  className='btn btn-ghost normal-case text-base'
                  onClick={logoutbtn}
                >
                  로그아웃
                </div>
              </div>
            )}
          </div>
          {cookie ? (
            <div className='grid place-items-center'>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <button
                    className='btn btn-ghost text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500'
                    onClick={templatebtn}
                  >
                    짤 생성
                  </button>
                </div>
                <div className='text-left'>
                  <div
                    className='btn normal-case text-lg font-bold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500'
                    onClick={() => {
                      window.open(
                        'https://83fh02wrhoh.typeform.com/to/TsXOKfsj'
                      );
                    }}
                  >
                    피드백
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <Errorpage />
      )}
      {servercheck ? <Meme /> : null}
    </>
  );
};
export default Main;
