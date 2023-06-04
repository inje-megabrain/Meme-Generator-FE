import React, { useEffect, useState } from 'react';
import { MemeDeleteAPI, MemeLikeAPI } from '../apis/server';
import { useRecoilState } from 'recoil';
import { InfinitiPage, MemeDataState } from '../states/atom';
import { MemeType } from '../types';
import { getCookie } from '@src/util/Cookie';
import { toast } from 'react-toastify';
import {
  AiOutlineClose,
  AiOutlineCloudDownload,
  AiOutlineShareAlt,
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai';
import Mememodal from '@src/components/Mememodal';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { API_URL } from '@src/constants/Constants';
import { test } from 'node:test';

const Scrollmeme = () => {
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [memeList, setMemeList] = useRecoilState<MemeType>(MemeDataState);
  const [page, setPage] = useRecoilState<number>(InfinitiPage);
  const [ref, inView] = useInView();
  const [file, setFile] = useState<File>(new File([], ''));
  const [id, setId] = useState<number>(0);
  const [modal, setModal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ishover, setIshover] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [sorttype, setSorttype] = useState<string>('createdAt');
  const [test, setTest] = useState<string>('');

  const myurl = 'https://meme.megabrain.kr'; // url 수정해야함

  const memeFetch = async () => {
    if (test === 'test') {
      await axios
        .get(API_URL + '/meme', {
          params: {
            type: 'MEME',
            page: page,
            size: 18,
            sort_type: sorttype,
            sort_direction: 'desc',
          },
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + getCookie('access_token'),
          },
        })
        .then((response) => {
          setMemeList((memeList) => [...memeList, ...response.data.dtos]);
          setLoading && setLoading(false);
          setPage((page) => page + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setTest('test');
    memeFetch();
  }, [sorttype, inView]);

  // image url => file => image download
  const converURLtoFile = async (url: string, filename: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], filename, { type: 'image/png' });
    const data = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('짤 다운로드 성공');
    setCheck(false);
    return data;
  };
  const shareurl = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const files = new File([blob], 'meme.png', { type: 'image/png' });
    setFile(files);
  };
  const sharebtn = async () => {
    setCheck(false);
    setFile(new File([], ''));
    const shareurl = (
      await window.Kakao.Share.uploadImage({
        file: [file],
      })
    ).infos.original.url;
    window.Kakao.Share.createDefaultButton({
      container: '#kakao-share-btn',
      objectType: 'feed',
      content: {
        title: '짤 생성기',
        description: '모든 짤들을 생성해보세요!',
        imageUrl: shareurl,
        link: {
          mobileWebUrl: myurl,
          webUrl: myurl,
        },
      },
      buttons: [
        {
          title: '짤 생성기',
          link: {
            mobileWebUrl: myurl,
            webUrl: myurl,
          },
        },
      ],
    });
    (document.querySelector('#kakao-share-btn') as HTMLButtonElement).click();
  };

  return (
    <div>
      <div className='text-start'>
        <ul className='menu menu-vertical lg:menu-horizontal rounded-box font-sans text-lg'>
          <li>
            <div
              onClick={() => {
                setSorttype('createdAt');
                setMemeList([]);
                setPage(0);
              }}
            >
              최신순
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                setSorttype('likeCount');
                setMemeList([]);
                setPage(0);
              }}
            >
              좋아요순
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                setSorttype('viewCount');
                setMemeList([]);
                setPage(0);
              }}
            >
              조회순
            </div>
          </li>
        </ul>
      </div>
      {memeList.length === 0 ? (
        <div className='grid place-items-center font-sans'>
          <h1>공사중입니다...</h1>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {memeList.map((meme) => (
              <>
                {meme.imageUrl !== '' ? (
                  <div key={meme.memeId}>
                    <label
                      htmlFor='my-modal-1'
                      onClick={() => {
                        setId(meme.memeId);
                        setModal('my-modal-1');
                      }}
                    >
                      <div
                        style={{
                          overflow: 'hidden',
                        }}
                        className='relative z-10'
                        onMouseOver={() => {
                          setIshover(true);
                          setId(meme.memeId);
                          setModal('');
                        }}
                        onMouseOut={() => {
                          setIshover(false);
                          setId(0);
                        }}
                      >
                        {!loading ? (
                          <img // 이미지 크기 체크 console 범인
                            src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                            className='w-[300px] h-[300px] object-contain z-0 hover:scale-110 transition-transform duration-300 hover:opacity-70'
                            alt={meme.name}
                          />
                        ) : null}
                        {ishover && id === meme.memeId ? (
                          <div>
                            {getCookie('access_token') ? (
                              <div>
                                {getCookie('username') === meme.userid ||
                                getCookie('username') === 'admin' ? (
                                  <div>
                                    <AiOutlineClose
                                      className='absolute btn btn-md bg-slate-200 text-black opacity-80 hover:bg-white hover:opacity-100 top-[10px] left-[62px] z-10 font-bold text-base rounded-full'
                                      onClick={() => {
                                        confirm(
                                          meme.name + '을 삭제하시겠습니까?'
                                        ) && MemeDeleteAPI(meme.memeId);
                                      }}
                                    />
                                  </div>
                                ) : null}
                                <div>
                                  <AiOutlineCloudDownload
                                    className='absolute btn btn-md bg-slate-200 text-black opacity-80 hover:bg-white hover:opacity-100 font-bold text-lg top-[10px] right-[65px] z-10 rounded-full'
                                    onClick={() => {
                                      const image =
                                        VITE_APP_IMAGE_URL +
                                        meme.imageUrl.toString();
                                      converURLtoFile(
                                        image,
                                        meme.name + '.png'
                                      );
                                      setCheck(true);
                                    }}
                                  />
                                </div>
                                <button
                                  id='kakao-share-btn'
                                  onClick={sharebtn}
                                  style={{
                                    display: 'none',
                                  }}
                                >
                                  카카오톡 이미지 업로드 버튼
                                </button>
                                <AiOutlineShareAlt
                                  className='absolute btn btn-md bg-slate-200 text-black opacity-80 hover:bg-white hover:opacity-100 font-bold text-sm bottom-[12px] right-[65px] z-10 rounded-full'
                                  onClick={() => {
                                    const image =
                                      VITE_APP_IMAGE_URL +
                                      meme.imageUrl.toString();
                                    shareurl(image);
                                    sharebtn();
                                    setCheck(true);
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                      <div className='place-items-center'>
                        <div className='grid grid-cols-3 place-items-center z-10'>
                          <div className='grid grid-cols-2'>
                            <div
                              className='font-bold text-xl btn-xs w-[10px] grid place-items-center'
                              onClick={async () => {
                                if (!getCookie('access_token')) {
                                  toast.error('로그인이 필요합니다.');
                                }
                                setModal('');
                                setCheck(true);
                                await MemeLikeAPI(meme.memeId);
                              }}
                            >
                              {meme.isLiked == false ? (
                                <AiOutlineHeart />
                              ) : (
                                <AiFillHeart />
                              )}
                            </div>
                            <div className='grid place-items-center'>
                              {meme.likeCount}
                            </div>
                          </div>
                          <div className='font-bold text-xl font-sans'>
                            <div>{meme.name}</div>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                ) : null}
              </>
            ))}
            <div ref={ref}></div>
          </div>
          {!check ? <Mememodal modalnumber='my-modal-1' id={id} /> : null}
        </>
      )}
    </div>
  );
};
export default Scrollmeme;
