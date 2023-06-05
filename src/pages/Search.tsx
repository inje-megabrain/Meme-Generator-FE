import { MemeSearchAPI } from '@src/apis/server';
import {
  MemeSearchDataState,
  MemeSearchTotalpage,
  SearchData,
} from '@src/states/atom';
import { MemeType } from '@src/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineSearch,
} from 'react-icons/ai';

const Search = () => {
  const navigate = useNavigate();
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [search, setSearch] = useRecoilState<MemeType>(MemeSearchDataState);
  const [page, setPage] = useState<number>(0);
  const [searchTotalpage, setSearchTotalpage] =
    useRecoilState<number>(MemeSearchTotalpage);
  const [searchdata, setSearchdata] = useRecoilState<string>(SearchData);
  const [totalElements, setTotalElements] = useState<number>(0);

  const homebtn = () => {
    navigate('/');
  };

  if (searchdata !== '') {
    useEffect(() => {
      MemeSearchAPI(
        searchdata,
        page,
        setSearch,
        setSearchTotalpage,
        setTotalElements
      );
    }, [searchdata]);
  }

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
      <div className='w-[110px] grid place-items-center'>
        <div className='text-xl font-sans mt-2 grid grid-cols-2 items-center'>
          <AiOutlineSearch />
          <div>{totalElements}건</div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-4'>
        {search.map((meme) => (
          <>
            {meme.imageUrl !== '' ? (
              <div key={meme.memeId}>
                <div
                  style={{
                    overflow: 'hidden',
                  }}
                  className='relative z-10'
                >
                  <img // 이미지 크기 체크 console 범인
                    src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                    className='w-[300px] h-[300px] object-contain z-0 hover:scale-110 transition-transform duration-300 hover:opacity-70'
                    alt={meme.name}
                  />
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
    </div>
  );
};
export default Search;
