import {
  MemberMemeAPI,
  MemberSecessionAPI,
  ProfileAPI,
} from '@src/apis/server';
import { ProfileDataState, MemePage } from '@src/states/atom';
import { ProfileType } from '@src/types';
import { getCookie } from '@src/util/Cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useRecoilState<ProfileType>(ProfileDataState);
  const [totalpage, setTotalpage] = useRecoilState<number>(MemePage);
  const [page, setPage] = useState<number>(0);
  const homebtn = () => {
    navigate('/');
  };
  const prevpage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const nextpage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    ProfileAPI(getCookie('username'), setProfile);
  }, []);
  useEffect(() => {
    MemberMemeAPI(getCookie('username'), page);
  }, []);
  const secession = () => {
    MemberSecessionAPI(getCookie('username'));
  };

  return (
    <div>
      <div
        className='btn btn-ghost normal-case text-3xl font-bold'
        onClick={homebtn}
      >
        ME:ME
      </div>
      <div className='font-bold text-3xl mt-2'>Profile</div>
      <div className='mt-10'>
        <div className='grid grid-cols-2'>
          <div className='mockup-code'>
            <pre data-prefix='$' className='text-start'>
              <code className='text-xl'>Name : {profile.name}</code>
            </pre>
            <pre data-prefix='>' className='text-warning text-start'>
              <code className='text-xl'>ID : {profile.username}</code>
            </pre>
            <pre data-prefix='>' className='text-success text-start'>
              <code className='text-xl'>Email : {profile.email}</code>
            </pre>
            <div
              className='btn btn-ghost font-bold text-xl'
              onClick={secession}
            >
              회원탈퇴
            </div>
          </div>
          <div>
            <div></div>
            <div className='mt-2'>
              <div className='btn-group'>
                {page > 0 ? (
                  <button className='btn btn-ghost' onClick={prevpage}>
                    {'<<'}
                  </button>
                ) : null}
                <button className='btn btn-ghost'>Page {page + 1}</button>
                {page < totalpage - 1 ? (
                  <button className='btn btn-ghost' onClick={nextpage}>
                    {'>>'}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
