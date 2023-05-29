import { useState } from 'react';
import { imageUploadApi } from '@src/apis/server';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MemeTypeDataState, PreviewDateState } from '@src/states/atom';
import { toast } from 'react-toastify';

const Upload = () => {
  const naviage = useNavigate();
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [previewimage, setPreviewimage] =
    useRecoilState<string>(PreviewDateState);
  const memetype = useRecoilValue<string>(MemeTypeDataState);
  const [name, setName] = useState<string>('meme');
  const [publicFlag, setPublicFlag] = useState<boolean>(false);

  const handleFileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageSrc(files[0]);
      setPreviewimage(URL.createObjectURL(files[0]));
    }
  };
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const uploadbtn = async () => {
    if (!imageSrc) {
      toast.error('이미지를 선택해주세요');
    } else {
      await imageUploadApi(imageSrc as File, name, memetype, publicFlag);
      naviage('/');
    }
  };
  const sharepage = () => {
    naviage('/share');
  };
  const homebtn = () => {
    naviage('/');
  };

  return (
    <div>
      <div>
        <img
          src='src/assets/memelogo.png'
          className='w-12 h-12 inline-block object-cover'
          onClick={homebtn}
        />
      </div>
      <div className='grid place-items-center'>
        <ul className='steps font-sans'>
          <li className='step step-primary'>Template</li>
          <li className='step step-primary'>Meme-Generator</li>
          <li className='step step-primary'>Save & Share</li>
          <li className='step step-primary'>Upload</li>
        </ul>
      </div>
      <div className='grid place-items-center'>
        <div
          className='btn btn-ghost font-bold text-2xl rounded-xl font-sans'
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
          className='input input-bordered max-w-xs font-sans'
          maxLength={8}
          onChange={nameChange}
        />
      </div>
      <div className='mt-2'>
        <input
          type='checkbox'
          className='toggle toggle-primary border border-solid'
          onChange={(e) => {
            setPublicFlag(e.target.checked);
          }}
        />
        <div className='font-bold text-xl font-sans'>
          {publicFlag === false ? <div>비공개</div> : <div>공개</div>}
        </div>
      </div>
      <div className='mt-4'>
        <button onClick={uploadbtn} className='btn btn-ghost text-lg font-sans'>
          업로드
        </button>
      </div>
      <div>
        {previewimage ? (
          <img
            src={previewimage}
            alt={name}
            className='mt-4 object-contain w-[310px] h-[310px] md:w-[500px] md:h-[500px]'
          />
        ) : null}
      </div>
    </div>
  );
};
export default Upload;
