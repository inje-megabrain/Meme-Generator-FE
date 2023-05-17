import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Main } from './pages';
import Loginform from './pages/Loginform';
import MemeGenerator from './pages/Memegenerator';
import Template from './pages/Templete';
import Share from './pages/Share';

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
]);

const App = () => <RouterProvider router={router} />;

export default App;
