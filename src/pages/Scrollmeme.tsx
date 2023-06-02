import React, { useEffect, useState } from 'react';
import { MemeDeleteAPI } from '../apis/server';
import { useRecoilState } from 'recoil';
import { InfinitiPage, MemeDataState } from '../states/atom';
import { MemeType } from '../types';
import { getCookie } from '@src/util/Cookie';
import { toast } from 'react-toastify';
import {
  AiOutlineClose,
  AiOutlineCloudDownload,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import Mememodal from '@src/components/Mememodal';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { API_URL } from '@src/constants/Constants';

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

  const myurl = 'https://meme.megabrain.kr'; // url 수정해야함

  const memeFetch = () => {
    axios
      .get(API_URL + '/meme', {
        params: {
          type: 'MEME',
          page: page,
          size: 9,
          sort_direction: 'desc',
        },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
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
  };
  useEffect(() => {
    if (inView) {
      memeFetch();
    }
  }, [inView]);

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
    return data;
  };
  const shareurl = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const files = new File([blob], 'meme.png', { type: 'image/png' });
    setFile(files);
  };
  const sharebtn = async () => {
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
      {memeList.length === 0 ? (
        <div className='grid place-items-center font-sans'>
          <h1>공사중입니다...</h1>
        </div>
      ) : (
        <>
          <div className='mt-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              {memeList.map((meme, index) => (
                <>
                  {meme.imageUrl !== '' ? (
                    <div key={index}>
                      {getCookie('access_token') ? (
                        <div className='grid grid-cols-3'>
                          {getCookie('username') === meme.userid ||
                          getCookie('username') === 'admin' ? (
                            <div>
                              <AiOutlineClose
                                className='btn btn-ghost font-bold text-xl'
                                onClick={() => {
                                  confirm(meme.name + '을 삭제하시겠습니까?') &&
                                    MemeDeleteAPI(meme.memeId);
                                }}
                              />
                            </div>
                          ) : null}
                          <button
                            id='kakao-share-btn'
                            onClick={sharebtn}
                            style={{
                              display: 'none',
                            }}
                          >
                            카카오톡 이미지 업로드 버튼
                          </button>
                          <div>
                            <AiOutlineShareAlt
                              className='btn btn-ghost font-bold text-xl'
                              onClick={() => {
                                const image =
                                  VITE_APP_IMAGE_URL + meme.imageUrl.toString();
                                shareurl(image);
                                sharebtn();
                              }}
                            />
                          </div>
                          <div>
                            <AiOutlineCloudDownload
                              className='btn btn-ghost font-bold text-xl'
                              onClick={() => {
                                const image =
                                  VITE_APP_IMAGE_URL + meme.imageUrl.toString();
                                converURLtoFile(image, meme.name + '.png');
                              }}
                            />
                          </div>
                        </div>
                      ) : null}
                      {!check ? (
                        <>
                          <label
                            htmlFor={modal}
                            onClick={() => {
                              setId(meme.memeId);
                              setModal('my-modal-1');
                            }}
                          ></label>
                        </>
                      ) : null}
                      <div
                        style={{
                          overflow: 'hidden',
                          cursor: 'pointer',
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
                            <div
                              className='absolute btn glass font-bold text-lg top-[20px] right-[70px] z-10'
                              onClick={() => {
                                toast.success('감사요 ㅅㄱ');
                                setModal('');
                                setCheck(true);
                              }}
                            >
                              🩷
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className='inline-block'>
                        <div className='font-bold text-xl text-start font-sans'>
                          <div>{meme.name} 짤</div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>
              ))}
              <div ref={ref}></div>
            </div>
          </div>
          <Mememodal modalnumber={modal} id={id} />
        </>
      )}
    </div>
  );
};
export default Scrollmeme;
