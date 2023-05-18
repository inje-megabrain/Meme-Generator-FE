import { ProfileAPI } from '@src/apis/server';
import { ProfileDataState } from '@src/states/atom';
import { ProfileType } from '@src/types';
import { getCookie } from '@src/util/Cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useRecoilState<ProfileType>(ProfileDataState);
  const homebtn = () => {
    navigate('/');
  };
  useEffect(() => {
    ProfileAPI(getCookie('username'), setProfile);
  }, []);

  return (
    <div>
      <div
        className='btn btn-ghost normal-case text-3xl font-bold'
        onClick={homebtn}
      >
        ME:ME
      </div>
      <div className='font-bold text-2xl'>Profile</div>
      <div>
        <div className='font-bold text-2xl'>이름</div>
        <div className='font-bold text-2xl'>{profile.name}</div>
        <div className='font-bold text-2xl'>아이디</div>
        <div className='font-bold text-2xl'>{profile.username}</div>
        <div className='font-bold text-2xl'>이메일</div>
        <div className='font-bold text-2xl'>{profile.email}</div>
      </div>
    </div>
  );
};
export default Profile;
