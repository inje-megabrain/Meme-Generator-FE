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

const Search = () => {
  const navigate = useNavigate();
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [search, setSearch] = useRecoilState<MemeType>(MemeSearchDataState);
  const [page, setPage] = useState<number>(0);
  const [searchTotalpage, setSearchTotalpage] =
    useRecoilState<number>(MemeSearchTotalpage);
  const [searchdata, setSearchdata] = useRecoilState<string>(SearchData);

  const homebtn = () => {
    navigate('/');
  };

  if (searchdata !== '') {
    useEffect(() => {
      MemeSearchAPI(searchdata, page, setSearch, setSearchTotalpage);
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
      <div className='mt-4'>
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
                <div className='place-items-center'>
                  <div className='font-bold text-xl font-sans'>
                    <div>{meme.name}</div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};
export default Search;
