import { MemeIdAPI } from '@src/apis/server';
import { MemeId, MemeIdDataState } from '@src/states/atom';
import { MemeOneType } from '@src/types';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface props {
  modalnumber: string;
}
const { VITE_APP_IMAGE_URL } = import.meta.env;

const Mememodal = (props: props) => {
  const { modalnumber } = props;
  const [memeList, setMemeList] = useRecoilState<MemeOneType>(MemeIdDataState);
  const [id, setId] = useRecoilState<number>(MemeId);

  useEffect(() => {
    MemeIdAPI(id, setMemeList);
  }, []);

  return (
    <div>
      <input type='checkbox' id={modalnumber} className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <label
            htmlFor={modalnumber}
            className='btn btn-sm btn-circle absolute top-2 right-2 mt-2'
          >
            X
          </label>
          <div className='grid place-content-center'>
            <div>
              <img
                src={VITE_APP_IMAGE_URL + memeList.imageUrl.toString()}
                className='w-full h-full object-cover'
              />
            </div>
            {/* <div className='font-bold text-2xl'>{memeList.name} 짤</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mememodal;
