import Lottie from 'react-lottie';
import emailloading from '../assets/email.json';

const EmailLoading = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: emailloading,
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
export default EmailLoading;
