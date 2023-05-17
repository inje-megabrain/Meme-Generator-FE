import { useRecoilState } from 'recoil';
import { PreviewDateState } from '@src/states/atom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
        <div className='grid grid-cols-2'>
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
