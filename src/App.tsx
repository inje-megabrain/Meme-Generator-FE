import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Main } from './pages';
import Loginform from './pages/Loginform';
import MemeGenerator from './pages/Memegenerator';
import Template from './pages/Templete';
import Share from './pages/Share';
import GoogleLogin from './components/GoogleLogin';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import Errorpage from './pages/Errorpage';
import Emailcheck from './pages/Emailcheck';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <Loginform />,
  },
  {
    path: '/oauth2/redirect',
    element: <GoogleLogin />,
  },
  {
    path: '/generator',
    element: <MemeGenerator />,
  },
  {
    path: '/template',
    element: <Template />,
  },
  {
    path: '/share',
    element: <Share />,
  },
  {
    path: '/upload',
    element: <Upload />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '*',
    element: <Errorpage />,
  },
  {
    path: '/auth/email',
    element: <Emailcheck />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
