import React, { useEffect, useState } from 'react';
import { MemeDeleteAPI, imageDownloadAPI } from '../apis/server';
import { useRecoilState } from 'recoil';
import { MemeDataState, MemePage } from '../states/atom';
import { MemeType } from '../types';
import { getCookie } from '@src/util/Cookie';
import { toast } from 'react-toastify';
import {
  AiOutlineClose,
  AiOutlineCloudDownload,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import Mememodal from '@src/components/Mememodal';
import Loading from '@src/components/Loading';

const Meme = () => {
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [memeList, setMemeList] = useRecoilState<MemeType>(MemeDataState);
  const [page, setPage] = useState<number>(0);
  const [totalpage, setTotalpage] = useRecoilState<number>(MemePage);
  const [file, setFile] = useState<File>(new File([], ''));
  const [id, setId] = useState<number>(0);
  const [modal, setModal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const prevpage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const nextpage = () => {
    setPage(page + 1);
  };
  const myurl = 'https://meme.megabrain.kr'; // url 수정해야함

  useEffect(() => {
    imageDownloadAPI(page, setMemeList, setTotalpage, 'MEME', setLoading);
  }, [page]);

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
                <div key={index}>
                  {getCookie('access_token') ? (
                    <div className='grid grid-cols-3'>
                      {getCookie('username') === meme.username ||
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
                  <label
                    htmlFor={modal}
                    onClick={() => {
                      setId(meme.memeId);
                      setModal('my-modal-1');
                    }}
                  >
                    {!loading && meme.imageUrl !== '' ? (
                      <div
                        style={{
                          overflow: 'hidden',
                        }}
                      >
                        <img // 이미지 크기 체크 console 범인
                          src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                          className='w-full h-[300px] object-contain hover:scale-110 transition-transform ease-in-out duration-300'
                          alt={meme.name}
                        />
                      </div>
                    ) : (
                      <Loading />
                    )}
                  </label>
                  <div className='inline-block'>
                    <div className='font-bold text-xl text-start font-sans'>
                      <div>{meme.name} 짤</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className='place-items-center'>
                        <div className='grid grid-cols-3 place-items-center z-10'>
                          <div className='grid grid-cols-2'>
                            <div
                              className='font-bold text-xl btn-xs w-[10px] grid place-items-center'
                              onClick={async () => {
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
                          {webview && getCookie('access_token') ? (
                            <div>
                              <div
                                onClick={() => {
                                  setModal('');
                                  setCheck(true);
                                  setMobiletool(true);
                                  setMobileimage(
                                    VITE_APP_IMAGE_URL +
                                      meme.imageUrl.toString()
                                  );
                                  setMobileimagename(meme.name);
                                  setMobileusername(meme.userid);
                                  setMobileid(meme.memeId);
                                }}
                              >
                                ...
                              </div>
                              {mobiletool ? (
                                <div className='btm-nav z-10'>
                                  <button
                                    className='text-lg font-sans bg-white'
                                    onClick={() => {
                                      setMobiletool(false);
                                      setMobileimage('');
                                      setMobileimagename('');
                                      setMobileusername('');
                                      setMobileid(0);
                                    }}
                                  >
                                    닫기
                                  </button>
                                  <button
                                    className='bg-white'
                                    onClick={() => {
                                      shareurl(mobileimage);
                                      sharebtn();
                                    }}
                                  >
                                    <button
                                      id='kakao-share-btn'
                                      onClick={sharebtn}
                                      style={{
                                        display: 'none',
                                      }}
                                    >
                                      카카오톡 이미지 업로드 버튼
                                    </button>
                                    <AiOutlineShareAlt className='btn btn-ghost font-bold text-xl' />
                                  </button>
                                  <button
                                    className='bg-white'
                                    onClick={() => {
                                      converURLtoFile(
                                        mobileimage,
                                        mobileimagename + '.png'
                                      );
                                    }}
                                  >
                                    <AiOutlineCloudDownload className='btn btn-ghost font-bold text-xl' />
                                  </button>
                                  {(getCookie('access_token') &&
                                    getCookie('username') === mobileusername) ||
                                  (getCookie('access_token') &&
                                    getCookie('username') === 'admin') ? (
                                    <button
                                      className='bg-white'
                                      onClick={() => {
                                        confirm(
                                          mobileimagename +
                                            '을 삭제하시겠습니까?'
                                        ) && MemeDeleteAPI(mobileid);
                                      }}
                                    >
                                      <div className='font-bold font-sans text-lg'>
                                        삭제
                                      </div>
                                    </button>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      </div> */}
            <div className='mt-2'>
              <div className='btn-group'>
                {page > 0 ? (
                  <button
                    className='btn btn-ghost font-sans text-base'
                    onClick={prevpage}
                  >
                    {'<<'}
                  </button>
                ) : null}
                <div className='font-sans text-base'>Page {page + 1}</div>
                {page < totalpage - 1 ? (
                  <button
                    className='btn btn-ghost font-sans text-base'
                    onClick={nextpage}
                  >
                    {'>>'}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <Mememodal modalnumber='my-modal-1' id={id} />
        </>
      )}
    </div>
  );
};
export default Meme;
