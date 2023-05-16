import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Main } from './pages';
import Loginform from './pages/Loginform';
import MemeGenerator from './pages/Memegenerator';

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
]);

const App = () => <RouterProvider router={router} />;

export default App;
