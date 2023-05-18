import { useState } from 'react';
import { imageUploadApi } from '@src/apis/server';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '@src/util/Cookie';
import { useRecoilState } from 'recoil';
import { MemeTypeDataState } from '@src/states/atom';

const Upload = () => {
  const naviage = useNavigate();
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [memetype, setMemetype] = useRecoilState<string>(MemeTypeDataState);
  const [name, setName] = useState<string>('meme');

  const handleFileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageSrc(files[0]);
    }
  };
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const uploadbtn = async () => {
    await imageUploadApi(imageSrc as File, name, memetype);
  };
  const sharepage = () => {
    naviage('/share');
  };

  return (
    <div>
      <div className='grid place-items-center'>
        <ul className='steps'>
          <li className='step step-primary'>Template</li>
          <li className='step step-primary'>Meme-Generator</li>
          <li className='step step-primary'>Save & Share</li>
          <li className='step step-primary'>Upload</li>
        </ul>
      </div>
      <div className='grid place-items-center'>
        <div
          className='btn btn-ghost font-bold text-2xl rounded-xl'
          onClick={sharepage}
        >
          Previous
        </div>
      </div>
      <div>
        <input
          type='file'
          className='file-input file-input-ghost file-input-sm max-w-xs mb-2'
          onChange={handleFileOnChange}
          accept='image/jpg, image/jpeg,image/png'
        />
        <input
          type='text'
          placeholder='업로드 할 이름'
          className='input input-bordered max-w-xs'
          maxLength={8}
          onChange={nameChange}
        />
      </div>
      <button onClick={uploadbtn} className='btn btn-ghost text-base font-bold'>
        업로드
      </button>
    </div>
  );
};
export default Upload;
