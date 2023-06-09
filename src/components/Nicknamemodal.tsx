import { NicknameChangeAPI } from '@src/apis/auth';
import { useState } from 'react';

interface NickmemodalProps {
  modalnumber: string;
}

const Nickmemodal = (props: NickmemodalProps) => {
  const { modalnumber } = props;
  const [name, setName] = useState<string>('');
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const changeName = async () => {
    await NicknameChangeAPI(name);
  };

  return (
    <div>
      <input type='checkbox' id={modalnumber} className='modal-toggle' />
      <label className='modal' htmlFor={modalnumber}>
        <label className='modal-box relative' htmlFor=''>
          <label
            htmlFor={modalnumber}
            className='btn btn-sm btn-circle absolute top-2 right-4 mt-2'
          >
            X
          </label>
          <div className='grid place-items-center'>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <input
                  type='text'
                  placeholder='닉네임'
                  className='input input-bordered max-w-xs font-sans'
                  onChange={nameChange}
                />
              </div>
              <div
                className='btn btn-ghost font-sans text-lg'
                onClick={changeName}
              >
                변경하기
              </div>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};
export default Nickmemodal;
