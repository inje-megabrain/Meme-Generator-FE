import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie, setCookie } from '../../util/Cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '@src/constants/Constants';
import Errorpage from '../Errorpage';
import Scrollmeme from '../Scrollmeme';

const Main = () => {
  const navigate = useNavigate();
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

  return (
    <>
      {servercheck ? (
        <div>
          <div>
            <div className='grid place-items-center'>
              <img
                src='/newlogo.png'
                className='w-40 h-[94px] inline-block object-fill'
                onClick={homebtn}
              />
              <div
                className='grid place-items-center font-bold text-3xl font-sans'
                onClick={homebtn}
              >
                Meme Generator
              </div>
            </div>
            {!cookie ? (
              <div className='text-end'>
                <div
                  className='btn btn-ghost normal-case text-lg font-sans'
                  onClick={signbtn}
                >
                  로그인
                </div>
              </div>
            ) : (
              <div className='text-right'>
                <div
                  className='btn btn-ghost normal-case text-lg font-sans'
                  onClick={profilebtn}
                >
                  내 정보
                </div>
                <div
                  className='btn btn-ghost normal-case text-lg font-sans'
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
                    className='btn btn-ghost text-lg font-bold font-sans'
                    onClick={templatebtn}
                  >
                    짤 생성
                  </button>
                </div>
                <div className='text-left'>
                  <div
                    className='btn normal-case text-lg font-bold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 font-sans'
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
      {servercheck ? <Scrollmeme /> : null}
    </>
  );
};
export default Main;
