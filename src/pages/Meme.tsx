import React, { useEffect, useState } from 'react';
import { MemeDeleteAPI, imageDownloadAPI } from '../apis/server';
import { useRecoilState } from 'recoil';
import { MemeDataState, MemePage } from '../states/atom';
import { MemeType } from '../types';
import { getCookie } from '@src/util/Cookie';
import { toast } from 'react-toastify';

const Meme = () => {
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [memeList, setMemeList] = useRecoilState<MemeType>(MemeDataState);
  const [page, setPage] = useState<number>(0);
  const [totalpage, setTotalpage] = useRecoilState<number>(MemePage);
  const [file, setFile] = useState<File>(new File([], ''));

  const prevpage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const nextpage = () => {
    setPage(page + 1);
  };
  const myurl = 'http://localhost:5174'; // url 수정해야함

  useEffect(() => {
    imageDownloadAPI(page, setMemeList, setTotalpage);
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
                <button
                  id='kakao-share-btn'
                  onClick={sharebtn}
                  style={{
                    display: 'none',
                  }}
                >
                  카카오톡 이미지 업로드 버튼
                </button>
                <div
                  className='btn btn-ghost font-bold'
                  onClick={() => {
                    const image = VITE_APP_IMAGE_URL + meme.imageUrl.toString();
                    shareurl(image);
                    sharebtn();
                  }}
                >
                  공유
                </div>
                <div
                  className='btn btn-ghost font-bold'
                  onClick={() => {
                    const image = VITE_APP_IMAGE_URL + meme.imageUrl.toString();
                    converURLtoFile(image, meme.name + '.png');
                  }}
                >
                  다운
                </div>
              </div>
              <img
                src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                className='w-[400px] h-[400px] object-cover'
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
