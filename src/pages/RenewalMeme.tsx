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

const RenewalMeme = () => {
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [memeList, setMemeList] = useRecoilState<MemeType>(MemeDataState);
  const [page, setPage] = useState<number>(0);
  const [totalpage, setTotalpage] = useRecoilState<number>(MemePage);
  const [imagepage, setImagepage] = useState<number>(0);

  const prevpage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const nextpage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    imageDownloadAPI(0, setMemeList, setTotalpage, 'MEME');
    console.log(memeList);
  }, []);

  return (
    <div>
      <div className='grid grid-cols-3'>
        {memeList.map((meme, index) => (
          <div key={index}>
            <div className=''>
              <img
                src={VITE_APP_IMAGE_URL + meme.imageUrl}
                className='w-[300px] h-[300px] object-contain rounded-box'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RenewalMeme;
