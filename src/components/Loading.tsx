import Lottie from 'react-lottie';
import loading from '../assets/loading.json';

const Loading = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      width={200}
      height={200}
      isClickToPauseDisabled
    />
  );
};
export default Loading;
