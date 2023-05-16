import { Main } from '../pages';
import Loginform from '../pages/Loginform';
import MemeGenerator from '../pages/Memegenerator';
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
];
export default Router;
