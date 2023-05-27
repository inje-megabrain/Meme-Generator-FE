import React, { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpAPI, loginAPI } from '../apis/auth';
import { toast } from 'react-toastify';
const { VITE_APP_GOOGLE_OAUTH } = import.meta.env;

const Loginform = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkId, setCheckId] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const homebtn = () => {
    navigate('/');
  };
  const googlelogin = () => {
    location.href = VITE_APP_GOOGLE_OAUTH;
  };
  const LoginFunc = async (e: any) => {
    e.preventDefault();
    if (!id) {
      return toast.error('아이디를 입력해주세요');
    } else if (!password) {
      return toast.error('비밀번호를 입력해주세요');
    }
    await loginAPI(id, password);
  };
  const SignupFunc = async (e: any) => {
    e.preventDefault();
    if (!id || !checkId) {
      return toast.error(
        '아이디는 4자 이상 20자 이하의 영어 또는 숫자로 입력해주세요'
      );
    } else if (!password || !checkPassword) {
      return toast.error(
        '비밀번호는 영문, 숫자 조합으로 8~25자리로 입력해주세요.'
      );
    } else if (!email || !checkEmail) {
      return toast.error('이메일 형식이 틀렸습니다.');
    } else if (!username || !checkUsername) {
      return toast.error(
        '이름은 2자 이상 10자 이하의 한글 또는 영어로 입력해주세요'
      );
    }
    await SignUpAPI(id, password, username, email);
  };
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
      if (!passwordRegex.test(passwordCurrent)) {
        setCheckPassword(false);
      } else {
        setCheckPassword(true);
      }
    },
    []
  );
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);
      if (!emailRegex.test(emailCurrent)) {
        setCheckEmail(false);
      } else {
        setCheckEmail(true);
      }
    },
    []
  );
  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const idRegex = /^[a-zA-Z0-9]{4,20}$/;
    const idCurrent = e.target.value;
    setId(idCurrent);
    if (!idRegex.test(idCurrent)) {
      setCheckId(false);
    } else {
      setCheckId(true);
    }
  }, []);

  const onChangeUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const usernameRegex = /^[가-힣a-zA-Z]{2,10}$/;
      const usernameCurrent = e.target.value;
      setUsername(usernameCurrent);
      if (!usernameRegex.test(usernameCurrent)) {
        setCheckUsername(false);
      } else {
        setCheckUsername(true);
      }
    },
    []
  );
  return (
    <>
      <div>
      <div>
        <img
          src='src/assets/memelogo.png'
          className='w-12 h-12 inline-block object-cover'
          onClick={homebtn}
        />
      </div>
        <div>
          <h1>User Login</h1>
        </div>
        <div className='grid grid-rows-2 gap-5 mt-4'>
          <div className='grid place-items-center'>
            <input
              type='text'
              placeholder='ID'
              className='input w-full max-w-xs outline'
              value={id}
              onChange={onChangeId}
            />
          </div>
          <div className='grid place-items-center'>
            <input
              type='password'
              placeholder='Password'
              className='input w-full max-w-xs outline'
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </div>
        {signup ? (
          <div className='grid grid-rows-2 gap-5 mt-4'>
            <div className='grid place-items-center'>
              <input
                type='text'
                placeholder='Username'
                className='input w-full max-w-xs outline'
                value={username}
                onChange={onChangeUsername}
              />
            </div>
            <div className='grid place-items-center'>
              <input
                type='text'
                placeholder='Email'
                className='input w-full max-w-xs outline'
                value={email}
                onChange={onChangeEmail}
              />
            </div>
          </div>
        ) : null}
        {!signup ? (
          <div className='mt-4'>
            <button
              className='btn btn-outline btn-sm outline outline-black font-bold text-sm'
              onClick={() => setSignup(true)}
            >
              회원가입
            </button>
          </div>
        ) : null}
        <div className='grid place-items-center mt-4'>
          {!signup ? (
            <>
              <button
                className='btn btn-outline outline outline-black font-bold text-2xl rounded-xl w-full max-w-xs'
                onClick={googlelogin}
              >
                Google
              </button>
              <button
                className='btn btn-outline outline outline-black font-bold text-2xl rounded-xl w-full max-w-xs mt-4'
                onClick={LoginFunc}
              >
                Login
              </button>
            </>
          ) : null}
          {signup ? (
            <button
              className='btn btn-outline outline outline-black font-bold text-2xl rounded-xl w-full max-w-xs mt-4'
              onClick={SignupFunc}
            >
              Sign Up
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default Loginform;
