import { useNavigate } from 'react-router-dom';

const Template = () => {
  const navigate = useNavigate();
  const homebtn = () => {
    navigate('/');
  };
  const memebtn = () => {
    navigate('/generator');
  };
  return (
    <div>
      <div
        className='btn btn-ghost normal-case text-3xl font-bold'
        onClick={homebtn}
      >
        ME:ME
      </div>
      <div className='grid place-items-center'>
        <div>
          <ul className='steps'>
            <li className='step step-primary'>Template</li>
            <li className='step'>Meme-Generator</li>
            <li className='step'>Save & Share</li>
          </ul>
        </div>
      </div>
      <div
        className='btn btn-ghost font-bold text-2xl rounded-xl'
        onClick={memebtn}
      >
        NEXT
      </div>
    </div>
  );
};
export default Template;
