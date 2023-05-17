import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/global.css';
import { RecoilRoot } from 'recoil';
import Konva from 'konva';

const { VITE_APP_KAKAO_KEY } = import.meta.env;
const kakaokey = VITE_APP_KAKAO_KEY;

window.Kakao.init(kakaokey);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
