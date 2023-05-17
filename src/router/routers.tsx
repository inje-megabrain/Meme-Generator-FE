import Template from '@src/pages/Templete';
import { Main } from '../pages';
import Loginform from '../pages/Loginform';
import MemeGenerator from '../pages/Memegenerator';
import Share from '@src/pages/Share';
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
];
export default Router;
