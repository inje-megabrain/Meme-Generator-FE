import {
  MemeDeleteAPI,
  imageDownloadAPI,
  imageUploadApi,
} from '@src/apis/server';
import {
  PreviewDateState,
  TemplateDataState,
  templatePage,
} from '@src/states/atom';
import { MemeType } from '@src/types';
import { getCookie } from '@src/util/Cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Loading from '@src/components/Loading';

const { VITE_APP_IMAGE_URL } = import.meta.env;

const Template = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('meme');
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [templatelist, setTemplatelist] =
    useRecoilState<MemeType>(TemplateDataState);
  const [page, setPage] = useState<number>(0);
  const [totalpage, setTotalpage] = useRecoilState<number>(templatePage);
  const setPreviewimage = useSetRecoilState<string>(PreviewDateState);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageSrc(files[0]);
    }
  };
  const homebtn = () => {
    navigate('/');
  };
  const memebtn = () => {
    navigate('/generator');
  };
  const uploadbtn = async () => {
    await imageUploadApi(imageSrc as File, name, 'TEMPLATE', true, '');
    window.location.reload();
  };
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const prevpage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const nextpage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    imageDownloadAPI(
      page,
      setTemplatelist,
      setTotalpage,
      'TEMPLATE',
      'createdAt',
      setLoading
    );
  }, [page]);

  const converURLtoFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    const file = new File([data], 'meme.png', { type: 'image/png' });
    setPreviewimage(URL.createObjectURL(file));
    return URL.createObjectURL(file);
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
      <div className='grid place-items-center'>
        <ul className='steps font-sans text-lg'>
          <li className='step step-primary'>Template</li>
          <li className='step'>Meme-Generator</li>
          <li className='step'>Save & Share</li>
          <li className='step'>Upload</li>
        </ul>
      </div>
      {getCookie('username') === 'admin' ? (
        <div className='mb-4 grid place-items-center'>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <div>
              <input
                type='file'
                className='file-input file-input-ghost file-input-sm max-w-xs mb-2'
                onChange={handleFileOnChange}
                accept='image/jpg, image/jpeg,image/png'
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='업로드 할 파일명'
                className='input input-bordered max-w-xs font-sans'
                maxLength={8}
                onChange={nameChange}
              />
            </div>
            <div>
              <button
                onClick={uploadbtn}
                className='btn btn-ghost text-base font-bold font-sans'
              >
                업로드
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className='btn btn-ghost font-bold text-xl rounded-xl font-sans'
        onClick={memebtn}
      >
        NEXT
      </div>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          {templatelist.map((meme, index) => (
            <div key={index} className='mt-10'>
              <div>
                {getCookie('username') === 'admin' ? (
                  <div
                    className='btn btn-ghost font-bold'
                    onClick={() => {
                      MemeDeleteAPI(meme.memeId);
                    }}
                  >
                    X
                  </div>
                ) : null}
              </div>
              {!loading && meme.imageUrl !== '' ? (
                <div
                  className='btn btn-ghost w-[270px] h-[310px]'
                  onClick={() => {
                    converURLtoFile(
                      VITE_APP_IMAGE_URL + meme.imageUrl.toString()
                    );
                    navigate('/generator');
                  }}
                >
                  <div>
                    <img
                      src={VITE_APP_IMAGE_URL + meme.imageUrl.toString()}
                      className='w-[310px] h-[310px] object-cover'
                      alt={meme.name}
                    />
                  </div>

                  <div className='inline-block'>
                    <div className='font-bold text-xl text-start'>
                      <div className='font-sans'>템플릿 : {meme.name}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <Loading />
              )}
            </div>
          ))}
        </div>
        <div className='mt-10'>
          <div className='btn-group'>
            {page > 0 ? (
              <button
                className='btn btn-ghost font-sans text-base'
                onClick={prevpage}
              >
                {'<<'}
              </button>
            ) : null}
            <div className='font-sans text-base grid place-items-center'>
              Page {page + 1}
            </div>
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
    </div>
  );
};
export default Template;
