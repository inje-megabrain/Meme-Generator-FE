import { useEffect, useState } from 'react';
import { imageUploadApi } from '@src/apis/server';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MemeTypeDataState, PreviewDateState } from '@src/states/atom';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';

const Upload = () => {
  const naviage = useNavigate();
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [previewimage, setPreviewimage] =
    useRecoilState<string>(PreviewDateState);
  const memetype = useRecoilValue<string>(MemeTypeDataState);
  const [name, setName] = useState<string>('meme');
  const [publicFlag, setPublicFlag] = useState<boolean>(false);
  const [tagstext, setTagstext] = useState<string>('');

  useEffect(() => {
    if (previewimage !== '') {
      const base64ToFile = (dataurl: string) => {
        let arr = dataurl.split(','),
          bstr = Buffer.from(arr[1], 'base64'),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr[n];
        }
        return new File([u8arr], name + '.jpg', { type: 'image/jpg' });
      };
      const file = base64ToFile(previewimage);
      setImageSrc(file);
    }
  }, [name]);

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const uploadbtn = async () => {
    if (!imageSrc) {
      toast.error('이미지를 선택해주세요');
    } else {
      await imageUploadApi(
        imageSrc as File,
        name,
        memetype,
        publicFlag,
        tagstext
      );
    }
  };
  const sharepage = () => {
    naviage('/share');
  };
  const homebtn = () => {
    naviage('/');
  };

  const TagtextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const regExp = /^#[a-zA-Z0-9가-힣]{1,20}( #[a-zA-Z0-9가-힣]{1,20})*$/;
    if (value.match(regExp)) {
      setTagstext(value.includes('#') ? value : '#' + value);
    }
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
          <li className='step step-primary'>Meme-Generator</li>
          <li className='step step-primary'>Save & Share</li>
          <li className='step step-primary'>Upload</li>
        </ul>
      </div>
      <div className='grid place-items-center'>
        <div
          className='btn btn-ghost font-bold text-xl rounded-xl font-sans'
          onClick={sharepage}
        >
          Previous
        </div>
      </div>
      <div className='grid place-items-center'>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-2'>
          <div>
            <input
              type='text'
              placeholder='업로드 이름(최대 8자)'
              className='input input-bordered max-w-xs font-sans'
              maxLength={8}
              onChange={nameChange}
            />
            <input
              type='text'
              className='input input-bordered max-w-xs font-sans mt-2'
              placeholder='#태그(최대 5개)'
              onChange={TagtextChange}
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
          <div>
            <button
              onClick={uploadbtn}
              className='btn btn-ghost text-lg font-sans'
            >
              업로드
            </button>
          </div>
        </div>
      </div>
      <div>
        {previewimage ? (
          <img
            src={previewimage}
            alt={name}
            className='mt-4 object-contain w-[310px] h-[310px] md:w-[400px] md:h-[400px]'
          />
        ) : null}
      </div>
      <div>{tagstext}</div>
    </div>
  );
};
export default Upload;
