import { MemberSecessionAPI } from '@src/apis/auth';
import { MemberMemeAPI, MemeDeleteAPI, ProfileAPI } from '@src/apis/server';
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
import { AiOutlineClose } from 'react-icons/ai';
import Loading from '@src/components/Loading';

const { VITE_APP_IMAGE_URL } = import.meta.env;

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useRecoilState<ProfileType>(ProfileDataState);
  const [meme, setMeme] = useRecoilState<MemeType>(MemberMemeDataState);
  const [totalpage, setTotalpage] = useRecoilState<number>(MemePage);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
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
    MemberMemeAPI(
      getCookie('username'),
      page,
      setMeme,
      setTotalpage,
      setLoading
    );
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='gird place-items-center'>
            <div className='text-xl font-bold'>{profile.name}</div>
            <hr />
            <div className='grid grid-cols-3 mt-2'>
              <div>
                <div className='text-base'>내가 올린 짤</div>
                <div className='font-bold text-lg'>{meme.length}</div>
              </div>
              <div>
                <div className='text-base'>좋아요</div>
                <div className='font-bold text-lg'>?</div>
              </div>
              <div>
                <div className='text-base'>짤 조회수</div>
                <div className='font-bold text-lg'>?</div>
              </div>
            </div>
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
                      <AiOutlineClose
                        className='btn btn-ghost font-bold text-xl'
                        onClick={() => {
                          MemeDeleteAPI(meme.memeId);
                        }}
                      />
                    </div>
                    <div>
                      <div className='w-[310px] h-[310px] object-cover skew-y-12 shadow-xl bg-gray-400 blur-sm' />
                    </div>
                    <div className='-translate-y-[300px] -translate-x-[15px] sm:-translate-y-[300px] sm:-translate-x-[20px]'>
                      {!loading && meme.imageUrl !== '' ? (
                        <img
                          src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                          className='w-[310px] h-[310px] object-cover skew-y-12 shadow-xl border-spacing-4 border-solid'
                        />
                      ) : (
                        <Loading />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='mt-8'>
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
