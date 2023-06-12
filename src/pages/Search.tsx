import { MemeSearchAPI, MemeDeleteAPI } from '@src/apis/server';
import Mememodal from '@src/components/Mememodal';
import {
  MemeSearchDataState,
  MemeSearchTotalpage,
  SearchData,
} from '@src/states/atom';
import { MemeType } from '@src/types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  AiOutlineClose,
  AiOutlineCloudDownload,
  AiOutlineShareAlt,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineSearch,
} from 'react-icons/ai';
import { toast } from 'react-toastify';
import { getCookie } from '@src/util/Cookie';

const Search = () => {
  const navigate = useNavigate();
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [search, setSearch] = useRecoilState<MemeType>(MemeSearchDataState);
  const [page, setPage] = useState<number>(0);
  const [searchTotalpage, setSearchTotalpage] =
    useRecoilState<number>(MemeSearchTotalpage);
  const [searchdata, setSearchdata] = useRecoilState<string>(SearchData);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [check, setCheck] = useState<boolean>(false);
  const [file, setFile] = useState<File>(new File([], ''));
  const [id, setId] = useState<number>(0);
  const [modal, setModal] = useState<string>('');
  const [hoverid, setHoverid] = useState<number>(0);
  const [ishover, setIshover] = useState<boolean>(false);
  const [research, setResearch] = useState<string>('');

  const homebtn = () => {
    navigate('/');
  };

  if (searchdata !== '') {
    useLayoutEffect(() => {
      MemeSearchAPI(
        searchdata,
        page,
        setSearch,
        setSearchTotalpage,
        setTotalElements
      );
    }, [searchdata]);
  }
  const myurl = 'https://meme.megabrain.kr';
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
      <div className='mt-2'>
        <div className='grid grid-cols-1 place-items-center'>
          <input
            type='text'
            placeholder={'🔍' + '  Search'}
            className='input input-bordered w-full max-w-xs'
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setSearchdata(e.currentTarget.value);
                navigate('/search');
              }
            }}
          />
        </div>
      </div>
      {search.length > 0 ? (
        <div className='grid place-items-center'>
          <div className='grid grid-cols-8 items-center'>
            <AiOutlineSearch />
            <div className='text-xl font-sans mt-2 col-span-7'>
              총{totalElements}건의 검색결과가 있습니다.
            </div>
          </div>
        </div>
      ) : null}
      {search.length === 0 ? (
        <div className='grid place-items-center'>
          <div className='grid grid-cols-8 items-center'>
            <AiOutlineSearch />
            <div className='text-xl font-sans mt-2 col-span-7'>
              검색결과가 없습니다.
            </div>
          </div>
        </div>
      ) : null}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-4'>
        {search.map((meme) => (
          <>
            {meme.imageUrl !== '' ? (
              <div key={meme.memeId}>
                <label
                  htmlFor={modal}
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
                    onClick={() => {
                      setId(meme.memeId);
                    }}
                    onMouseOver={() => {
                      setIshover(true);
                      setHoverid(meme.memeId);
                      setModal('');
                    }}
                    onMouseOut={() => {
                      setId(0);
                      setIshover(false);
                    }}
                  >
                    <img // 이미지 크기 체크 console 범인
                      src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                      className='w-[300px] h-[300px] object-contain z-0 hover:scale-110 transition-transform duration-300 hover:opacity-70'
                      alt={meme.name}
                    />

                    {ishover && hoverid === meme.memeId ? (
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
                                  converURLtoFile(image, meme.name + '.png');
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
                                  VITE_APP_IMAGE_URL + meme.imageUrl.toString();
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
                  <div className='place-items-center mt-2'>
                    <div className='grid grid-cols-3 place-items-center'>
                      <div className='grid grid-cols-2'>
                        <div className='font-bold text-xl font-sans'>
                          <div className='grid place-items-center'>
                            {meme.isLiked == false ? (
                              <AiOutlineHeart />
                            ) : (
                              <AiFillHeart />
                            )}
                          </div>
                        </div>
                        <div className='grid place-items-center'>
                          {meme.likeCount}
                        </div>
                      </div>
                      <div>{meme.name}</div>
                      <div className='grid grid-cols-2'>
                        <AiOutlineEye />
                        <div>{meme.viewCount}</div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            ) : null}
          </>
        ))}
      </div>
      <div className='mt-4'>
        <div className='btn-group'>
          {page > 0 ? (
            <button
              className='btn btn-ghost font-sans text-base'
              onClick={() => {
                setPage(page - 1);
              }}
            >
              {'<<'}
            </button>
          ) : null}
          <div className='font-sans text-base grid place-items-center'>
            Page {page + 1}
          </div>
          {page < searchTotalpage - 1 ? (
            <button
              className='btn btn-ghost font-sans text-base'
              onClick={() => {
                setPage(page + 1);
              }}
            >
              {'>>'}
            </button>
          ) : null}
        </div>
      </div>
      {!check ? <Mememodal modalnumber='my-modal-1' id={id} /> : null}
    </div>
  );
};
export default Search;
