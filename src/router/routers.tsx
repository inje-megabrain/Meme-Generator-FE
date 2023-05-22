import Template from '@src/pages/Templete';
import { Main } from '../pages';
import Loginform from '../pages/Loginform';
import MemeGenerator from '../pages/Memegenerator';
import GoogleLogin from '@src/components/GoogleLogin';
import Share from '@src/pages/Share';
import Upload from '@src/pages/Upload';
import Profile from '@src/pages/Profile';
import Errorpage from '@src/pages/Errorpage';
const Router = [
  {
    title: 'Home',
    url: '/',
    component: <Main />,
  },
  {
    title: 'LoginForm',
    url: '/login',
    component: <Loginform />,
  },
  {
    title: 'GoogleLogin',
    url: '/googlelogin',
    component: <GoogleLogin />,
  },
  {
    title: 'Meme Generator',
    url: '/generator',
    component: <MemeGenerator />,
  },
  {
    title: 'Meme Templalte',
    url: '/template',
    component: <Template />,
  },
  {
    title: 'Share & Save',
    url: '/share',
    component: <Share />,
  },
  {
    title: 'Upload',
    url: '/upload',
    component: <Upload />,
  },
  {
    title: 'Profile',
    url: '/profile',
    component: <Profile />,
  },
  {
    title: 'Errorpage',
    url: '/errorpage',
    component: <Errorpage />,
  },
];
export default Router;
