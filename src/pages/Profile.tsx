import { MemberSecessionAPI } from '@src/apis/auth';
import { MemberMemeAPI, ProfileAPI } from '@src/apis/server';
import {
  ProfileDataState,
  MemePage,
  MemberMemeDataState,
} from '@src/states/atom';
import { MemeType, ProfileType } from '@src/types';
import { getCookie } from '@src/util/Cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const { VITE_APP_IMAGE_URL } = import.meta.env;

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useRecoilState<ProfileType>(ProfileDataState);
  const [meme, setMeme] = useRecoilState<MemeType>(MemberMemeDataState);
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
    MemberMemeAPI(getCookie('username'), page, setMeme, setTotalpage);
  }, [page]);
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mr-2'>
          <div className='mockup-code h-[260px]'>
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
          <div className='mt-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
              {meme.map((meme, index) => {
                return (
                  <div key={index} className='h-[400px]'>
                    <div>
                      <div className='w-[310px] h-[310px] object-cover skew-y-12 shadow-xl bg-gray-400 blur-sm' />
                    </div>
                    <div className='-translate-y-[300px] -translate-x-[15px] sm:-translate-y-[300px] sm:-translate-x-[20px]'>
                      <img
                        src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                        className='w-[310px] h-[310px] object-cover skew-y-12 shadow-xl border-spacing-4 border-solid'
                      />
                    </div>
                  </div>
                );
              })}
            </div>
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
