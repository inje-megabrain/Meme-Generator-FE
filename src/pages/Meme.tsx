import React, { useEffect, useState } from 'react';
import { MemeDeleteAPI, imageDownloadAPI } from '../apis/server';
import { useRecoilState } from 'recoil';
import { MemeDataState, MemeID, MemePage } from '../states/atom';
import { MemeType } from '../types';

const Meme = () => {
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [memeList, setMemeList] = useRecoilState<MemeType>(MemeDataState);
  const [page, setPage] = useState<number>(0);
  const [totalpage, setTotalpage] = useRecoilState<number>(MemePage);
  const [id, setId] = useRecoilState<number>(MemeID);
  const MemeId = useRecoilState<number>(MemeID);
  const prevpage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const nextpage = () => {
    setPage(page + 1);
  };

  const deletebtn = () => {
    MemeDeleteAPI(MemeId[0]);
  };

  useEffect(() => {
    imageDownloadAPI(page, setMemeList, setTotalpage);
  }, [page]);
  return (
    <div>
      <div className='mt-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {memeList.map((meme, index) => (
            <div key={index}>
              <img
                src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                className='w-[355px] h-[267px] object-fit'
              />
              <div className='inline-block'>
                <div className='font-bold text-xl text-start'>
                  <div>사진명 : {meme.name}</div>
                </div>
                <div
                  className='btn btn-ghost font-bold'
                  onClick={() => {
                    setId(meme.wantedId);
                    deletebtn();
                  }}
                >
                  X
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-2'>
          <div className='btn-group'>
            <button className='btn btn-ghost' onClick={prevpage}>
              {'<<'}
            </button>
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
  );
};
export default Meme;
