import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../util/Cookie';

const Main = () => {
  const navigate = useNavigate();
  const cookie = getCookie('access_token');
  const homebtn = () => {
    window.location.reload();
  };
  const signbtn = () => {
    navigate('/login');
  };
  const logoutbtn = () => {
    removeCookie('access_token', { path: '/' });
    window.location.reload();
  };
  const templatebtn = () => {
    navigate('/template');
  };

  return (
    <>
      <div>
        <div>
          <div className='btn btn-ghost normal-case text-2xl' onClick={homebtn}>
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
                onClick={logoutbtn}
              >
                로그아웃
              </div>
            </div>
          )}
        </div>
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
      </div>
    </>
  );
};
export default Main;
