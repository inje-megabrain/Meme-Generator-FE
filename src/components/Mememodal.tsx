import { MemeIdAPI } from '@src/apis/server';
import { MemeId, MemeIdDataState } from '@src/states/atom';
import { MemeOneType } from '@src/types';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Loading from './Loading';

interface props {
  modalnumber: string;
}
const { VITE_APP_IMAGE_URL } = import.meta.env;

const Mememodal = (props: props) => {
  const { modalnumber } = props;
  const [memeList, setMemeList] = useRecoilState<MemeOneType>(MemeIdDataState);
  const [id, setId] = useRecoilState<number>(MemeId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MemeIdAPI(id, setMemeList, setLoading);
  }, [id]);

  return !loading ? (
    <div>
      <input type='checkbox' id={modalnumber} className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <label
            htmlFor={modalnumber}
            className='btn btn-sm btn-circle absolute top-2 right-4 mt-2'
            onClick={() => {
              setMemeList({
                memeId: 0,
                imageUrl: '',
                username: '',
                name: '',
              });
            }}
          >
            X
          </label>
          <div className='grid place-content-center'>
            <div>
              {!loading ? (
                <img
                  src={VITE_APP_IMAGE_URL + memeList.imageUrl.toString()}
                  className='w-full h-full object-cover'
                />
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
export default Mememodal;
