import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/global.css';
import { RecoilRoot } from 'recoil';
import Konva from 'konva';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
