import Lottie from 'react-lottie';
import erroranimation from '../../assets/404.json';

const Errorpage = () => {
  return (
    <div className='grid items-center'>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: erroranimation,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        width={400}
        height={400}
        isClickToPauseDisabled
      />
    </div>
  );
};
export default Errorpage;
