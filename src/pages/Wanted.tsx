import React, { useEffect, useState } from 'react';
import { imageDownloadAPI } from '../apis/server';
import { useRecoilState } from 'recoil';
import { WantedDataState, WantedPage } from '../states/atom';
import { WantedType } from '../types';

const Wanted = () => {
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [wantedList, setWantedList] =
    useRecoilState<WantedType>(WantedDataState);
  const [page, setPage] = useState<number>(0);
  const [totalpage, setTotalpage] = useRecoilState<number>(WantedPage);
  const prevpage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const nextpage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    imageDownloadAPI(page, setWantedList, setTotalpage);
  }, [page]);
  return (
    <div>
      <div className='mt-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {wantedList.map((wanted, index) => (
            <div key={index}>
              <div className='relative inline-block'>
                <img src='public/wanted.png' />
                <div className='absolute left-[46px] top-[140px]'>
                  <div className='inline-block'>
                    <img
                      src={VITE_APP_IMAGE_URL + wanted.imageUrl.toString()}
                      className='w-[355px] h-[267px] object-fit'
                    />
                  </div>
                </div>
                <div className='absolute left-[52px] bottom-[115px]'>
                  <div className='inline-block'>
                    <div className='font-bold text-xl text-start'>
                      <div>수배명 : {wanted.name}</div>
                    </div>
                    <div className='font-bold text-base text-start'>
                      <div>특이사항 : {wanted.description}</div>
                    </div>
                  </div>
                </div>
                <div className='absolute left-[86px] bottom-[69px]'>
                  <div className='inline-block'>
                    <div className='font-bold text-xl'>
                      {wanted.prize
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      Cherry
                    </div>
                  </div>
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
export default Wanted;
