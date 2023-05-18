import React, { useEffect, useState } from 'react';
import { MemeDeleteAPI, imageDownloadAPI } from '../apis/server';
import { useRecoilState } from 'recoil';
import { MemeDataState, MemePage } from '../states/atom';
import { MemeType } from '../types';
import { getCookie } from '@src/util/Cookie';

const Meme = () => {
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [memeList, setMemeList] = useRecoilState<MemeType>(MemeDataState);
  const [page, setPage] = useState<number>(0);
  const [totalpage, setTotalpage] = useRecoilState<number>(MemePage);

  const prevpage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const nextpage = () => {
    setPage(page + 1);
  };
  const myurl = 'https://localhost:5174'; // url 수정해야함

  useEffect(() => {
    imageDownloadAPI(page, setMemeList, setTotalpage);
  }, [page]);

  return (
    <div>
      <div className='mt-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {memeList.map((meme, index) => (
            <div key={index}>
              <div className='grid grid-cols-3'>
                {getCookie('username') === meme.username ||
                getCookie('username') === 'admin' ? (
                  <div
                    className='btn btn-ghost font-bold'
                    onClick={() => {
                      MemeDeleteAPI(meme.memeId);
                    }}
                  >
                    X
                  </div>
                ) : null}
                <div
                  className='btn btn-ghost font-bold'
                  onClick={() => {
                    const image = VITE_APP_IMAGE_URL + meme.imageUrl.toString();
                    window.Kakao.Share.createDefaultButton({
                      container: '#kakao-share-btn',
                      objectType: 'feed',
                      content: {
                        title: '짤 생성기',
                        description: '모든 짤들을 생성해보세요!',
                        imageUrl: image,
                        link: {
                          webUrl: myurl,
                        },
                      },
                      buttons: [
                        {
                          title: '짤 생성기',
                          link: {
                            webUrl: myurl,
                          },
                        },
                      ],
                    });
                  }}
                >
                  공유
                </div>
                <div
                  className='btn btn-ghost font-bold'
                  onClick={() => {
                    const image = VITE_APP_IMAGE_URL + meme.imageUrl.toString();
                    const link = document.createElement('a');
                    link.download = meme.name + '.png';
                    document.body.appendChild(link);
                    link.href = image;
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  다운
                </div>
              </div>
              <img
                src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                className='w-[355px] h-[267px] object-fit'
              />
              <div className='inline-block'>
                <div className='font-bold text-xl text-start'>
                  <div>사진명 : {meme.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-2'>
          <div className='btn-group'>
            {page > 0 ? (
              <button className='btn btn-ghost' onClick={prevpage}>
                {'<<'}
              </button>
            ) : null}
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
