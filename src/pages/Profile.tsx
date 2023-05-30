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
    confirm('정말로 탈퇴하시겠습니까?') &&
      MemberSecessionAPI(getCookie('username'));
  };

  return (
    <div>
      <div className='grid place-items-center'>
        <img
          src='/newlogo.png'
          className='w-40 h-24 inline-block object-fill'
          onClick={homebtn}
        />
        <div
          className='grid place-items-center font-bold text-3xl font-sans'
          onClick={homebtn}
        >
          Meme Generator
        </div>
      </div>
      <div className='font-bold text-3xl mt-2 font-sans'>Profile</div>
      <div className='mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>
          <div className='gird place-items-center'>
            <div className='text-2xl font-bold font-sans'>{profile.name}</div>
            <hr />
            <div className='grid grid-cols-3 mt-2'>
              <div>
                <div className='text-base font-sans'>내가 올린 짤</div>
                <div className='font-bold text-lg font-sans'>{meme.length}</div>
              </div>
              <div>
                <div className='text-base font-sans'>좋아요</div>
                <div className='font-bold text-lg font-sans'>?</div>
              </div>
              <div>
                <div className='text-base font-sans'>짤 조회수</div>
                <div className='font-bold text-lg font-sans'>?</div>
              </div>
            </div>
            <div
              className='btn btn-ghost font-bold text-sm mt-8 font-sans'
              onClick={secession}
            >
              회원탈퇴
            </div>
          </div>
          <div className='mt-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>
              {meme.map((meme, index) => {
                return (
                  <div key={index} className='h-[400px]'>
                    <div>
                      <AiOutlineClose
                        className='btn btn-ghost font-bold text-xl'
                        onClick={() => {
                          confirm(meme.name + '을 삭제하시겠습니까?') &&
                            MemeDeleteAPI(meme.memeId);
                        }}
                      />
                    </div>
                    <div>
                      <div className='w-[280px] h-[280px] object-cover skew-y-12 shadow-xl bg-gray-400 blur-sm' />
                    </div>
                    <div className='-translate-y-[300px] -translate-x-[15px] sm:-translate-y-[270px] sm:-translate-x-[20px]'>
                      {!loading && meme.imageUrl !== '' ? (
                        <img
                          src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                          className='w-[280px] h-[280px] object-cover skew-y-12 shadow-xl border-spacing-4 border-solid'
                          alt={meme.name}
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
                  <button
                    className='btn btn-ghost font-sans'
                    onClick={prevpage}
                  >
                    {'<<'}
                  </button>
                ) : null}
                <button className='btn btn-ghost font-sans'>
                  Page {page + 1}
                </button>
                {page < totalpage - 1 ? (
                  <button
                    className='btn btn-ghost font-sans'
                    onClick={nextpage}
                  >
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
