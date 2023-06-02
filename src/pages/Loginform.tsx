import React, { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailPostAPI, SignUpAPI, loginAPI } from '../apis/auth';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { EmailCheck, SignupCheck } from '@src/states/atom';
const { VITE_APP_GOOGLE_OAUTH } = import.meta.env;

const Loginform = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useRecoilState<string>(EmailCheck);
  const [username, setUsername] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkId, setCheckId] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const [login, setLogin] = useState(false);
  const [signupcheck, setSignupcheck] = useRecoilState<boolean>(SignupCheck);
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
    await SignUpAPI(id, password, username, email, setSignupcheck);
    await EmailPostAPI(email);
    if (signupcheck) {
      navigate('/auth/email');
    }
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
      <div className='grid place-items-center'>
        <div>
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
          <div>
            <div className='font-bold font-sans text-xl mt-4 animate-pulse text-blue-500'>
              여러 짤들을 지금 만들어보세요!
            </div>
          </div>
          {login || signup ? (
            <div className='grid grid-rows-2 gap-4 mt-4'>
              <div className='grid place-items-center'>
                <input
                  type='text'
                  placeholder='ID'
                  className='input w-full max-w-sm outline font-sans  dark:focus:outline-blue-500'
                  value={id}
                  onChange={onChangeId}
                />
              </div>
              <div className='grid place-items-center'>
                <input
                  type='password'
                  placeholder='Password'
                  className='input w-full max-w-sm outline font-sans  dark:focus:outline-blue-500'
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
              {!signup ? (
                <div className='grid place-items-center'>
                  <div
                    className='btn btn-outline outline outline-black dark:outline-white dark:hover:bg-white  font-bold text-lg rounded-xl w-full max-w-sm mt-4 normal-case font-sans '
                    onClick={LoginFunc}
                  >
                    Login
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {signup ? (
            <div className='grid grid-rows-2 gap-5 mt-4'>
              <div className='grid place-items-center'>
                <input
                  type='text'
                  placeholder='Username'
                  className='input w-full max-w-sm outline font-sans dark:focus:outline-blue-500'
                  value={username}
                  onChange={onChangeUsername}
                />
              </div>
              <div className='grid place-items-center'>
                <input
                  type='text'
                  placeholder='Email'
                  className='input w-full max-w-sm outline font-sans  dark:focus:outline-blue-500'
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
            </div>
          ) : null}
          {login === false && !signup ? (
            <div className='mt-4 grid place-items-center'>
              <div
                className='btn btn-outline outline outline-black dark:outline-white dark:hover:bg-white font-bold text-lg rounded-xl w-full max-w-sm mt-4  normal-case font-sans'
                onClick={() => setLogin(true)}
              >
                Login
              </div>
            </div>
          ) : null}
          <div className='w-full divider content-center font-sans'>OR</div>
          <div className='grid place-items-center mt-4'>
            {!signup ? (
              <>
                <div
                  className='btn btn-outline outline outline-black dark:outline-white dark:hover:bg-white font-bold text-lg rounded-xl w-full max-w-sm  normal-case font-sans'
                  onClick={googlelogin}
                >
                  <img
                    src='/googlelogo.svg'
                    className='w-full h-6 inline-block object-contain'
                  />
                </div>
                <div
                  className='btn btn-outline outline outline-black dark:outline-white dark:hover:bg-white font-bold text-lg w-full rounded-xl max-w-sm mt-4  normal-case font-sans'
                  onClick={() => setSignup(true)}
                >
                  Sign Up
                </div>
              </>
            ) : null}
            {signup ? (
              <button
                className='btn btn-outline outline outline-black dark:outline-white dark:hover:bg-white font-bold text-lg rounded-xl w-full max-w-sm mt-4  normal-case font-sans'
                onClick={SignupFunc}
              >
                Sign Up
              </button>
            ) : null}
          </div>
        </div>
        <div className='mt-8 font-sans'>
          <p>구글 로그인 및 회원가입 시</p>
          <p>
            <a
              href='https://plip.kr/pcc/e4db04de-5766-4eb5-bab7-6d3dff53a6cb/consent/1.html'
              target='_blank'
              className='text-blue-500'
            >
              개인정보 수집 및 이용 동의서
            </a>{' '}
            및{' '}
            <a
              href='https://plip.kr/pcc/e4db04de-5766-4eb5-bab7-6d3dff53a6cb/privacy/1.html'
              target='_blank'
              className='text-blue-500'
            >
              개인정보 처리방침
            </a>
            에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </>
  );
};
export default Loginform;
