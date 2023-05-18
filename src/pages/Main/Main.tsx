import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie, setCookie } from '../../util/Cookie';
import Meme from '../Meme';
import { toast } from 'react-toastify';

const Main = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <div>
        <div>
          <div className='btn btn-ghost normal-case text-3xl' onClick={homebtn}>
            ME:ME
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
            <div>
              <button
                className='btn btn-ghost text-base font-bold'
                onClick={templatebtn}
              >
                짤 생성
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <Meme />
    </>
  );
};
export default Main;
