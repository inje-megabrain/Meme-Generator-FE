import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const homebtn = () => {
    navigate('/');
  };
  
  return (
    <div>
      <div
        className='btn btn-ghost normal-case text-3xl font-bold'
        onClick={homebtn}
      >
        ME:ME
      </div>
      <div className='font-bold text-2xl'>Profile</div>
    </div>
  );
};
export default Profile;
