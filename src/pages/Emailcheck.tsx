import { EmailPostAPI } from '@src/apis/auth';
import EmailLoading from '@src/components/EmailLoading';
import { API_URL } from '@src/constants/Constants';
import { EmailCheck } from '@src/states/atom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

const Emailcheck = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const [check, setCheck] = useState<boolean>(true);
  const [email, setEmail] = useRecoilState<string>(EmailCheck);

  const navigate = useNavigate();
  const homebtn = () => {
    navigate('/');
  };
  useEffect(() => {
    axios
      .get(API_URL + `/auth/email?code=${code}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate('/login');
        }
      })
      .catch((error) => {
        setCheck(false);
        toast.error('이메일 인증 실패');
      });
  }, []);

  const ReEmail = () => {
    EmailPostAPI(email);
  };

  return (
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
      <div>
        <h1>이메일 인증 확인중...</h1>
      </div>
      <EmailLoading />
      {!check ? (
        <div
          className='btn btn-ghost mt-4 font-sans font-bold text-xl'
          onClick={ReEmail}
        >
          재전송
        </div>
      ) : null}
    </div>
  );
};
export default Emailcheck;
