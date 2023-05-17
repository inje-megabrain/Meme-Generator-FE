import { useRecoilState } from 'recoil';
import { PreviewDateState } from '@src/states/atom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Buffer } from 'buffer';

const Share = () => {
  const navigate = useNavigate();
  const [previewimage, setPreviewimage] =
    useRecoilState<string>(PreviewDateState);
  const [name, setName] = useState<string>('meme');
  const homebtn = () => {
    navigate('/');
  };
  const savebtn = () => {
    const link = document.createElement('a');
    link.download = name + '.png';
    link.href = previewimage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setName('');
    setPreviewimage('');
    navigate('/');
  };
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const base64ToFile = (dataurl: string, filename: string) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)![1],
      bstr = Buffer.from(arr[1], 'base64'),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr[n];
    }
    return new File([u8arr], filename, { type: mime });
  };
  const file = base64ToFile(previewimage, name);
  const myurl = 'https://localhost:5174'; // url
  const sharebtn = async () => {
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
      callback() {
        navigate('/');
      },
    });
    (document.querySelector('#kakao-share-btn') as HTMLButtonElement).click();
  };

  return (
    <div>
      <div
        className='btn btn-ghost normal-case text-3xl font-bold place-items-center'
        onClick={homebtn}
      >
        ME:ME
      </div>
      <div className='grid place-items-center'>
        <ul className='steps'>
          <li className='step step-primary'>Template</li>
          <li className='step step-primary'>Meme-Generator</li>
          <li className='step step-primary'>Save & Share</li>
        </ul>
      </div>
      <div className='mb-4 grid place-items-center'>
        <div className='grid grid-cols-3'>
          <div>
            <input
              type='text'
              placeholder='저장 할 파일명'
              className='input input-bordered max-w-xs'
              maxLength={8}
              onChange={nameChange}
            />
          </div>
          <div>
            <button
              onClick={savebtn}
              className='btn btn-ghost text-base font-bold'
            >
              저장
            </button>
          </div>
          <div>
            <button
              id='kakao-share-btn'
              onClick={sharebtn}
              style={{
                display: 'none',
              }}
            >
              카카오톡 이미지 업로드 버튼
            </button>
            <button
              onClick={sharebtn}
              className='btn btn-ghost text-base font-bold'
            >
              공유
            </button>
          </div>
        </div>
      </div>
      <div className='grid place-items-center'>
        <div>
          <img src={previewimage} alt='' />
        </div>
      </div>
    </div>
  );
};
export default Share;