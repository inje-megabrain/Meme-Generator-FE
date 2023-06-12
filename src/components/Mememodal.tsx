import { MemeIdAPI } from '@src/apis/server';
import { MemeIdDataState } from '@src/states/atom';
import { MemeOneType } from '@src/types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Loading from './Loading';

interface props {
  modalnumber: string;
  id: number;
}
const { VITE_APP_IMAGE_URL } = import.meta.env;

const Mememodal = (props: props) => {
  const { modalnumber, id } = props;
  const [memeList, setMemeList] = useRecoilState<MemeOneType>(MemeIdDataState);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (id === 0) return;
    MemeIdAPI(id!, setMemeList, setLoading);
  }, [id]);

  return !loading ? (
    <div>
      <input type='checkbox' id={modalnumber} className='modal-toggle' />
      <label className='modal' htmlFor={modalnumber}>
        <label className='modal-box relative' htmlFor=''>
          <label
            htmlFor={modalnumber}
            className='btn btn-sm btn-circle absolute top-2 right-4 mt-2'
            onClick={() => {
              setMemeList({
                memeId: 0,
                name: '',
                imageUrl: '',
                username: '',
                tags: [],
              });
            }}
          >
            X
          </label>
          <div className='grid place-content-center'>
            <div>
              {!loading && memeList.imageUrl !== '' ? (
                <img
                  src={VITE_APP_IMAGE_URL + memeList.imageUrl.toString()}
                  className='w-full h-full object-cover'
                />
              ) : (
                <Loading />
              )}
            </div>
            <div className='font-bold text-xl mt-4'>
              {memeList.username} 제작자의 {'"'}
              {memeList.name}
              {'"'} 짤
            </div>
            <div className='grid grid-cols-3 md:grid-cols-5 mt-2'>
              {memeList.tags.map((tag, index) => {
                return (
                  <div
                    key={index}
                    className='text-center font-sans btn btn-ghost rounded-md text-lg'
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        </label>
      </label>
    </div>
  ) : null;
};
export default Mememodal;
