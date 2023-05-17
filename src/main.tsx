import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/global.css';
import { RecoilRoot } from 'recoil';
import Konva from 'konva';

const { VITE_APP_KAKAO_KEY } = import.meta.env;
const kakaokey = VITE_APP_KAKAO_KEY;

let counter = setInterval(() => {
  if (window.Kakao) {
    window.Kakao.init(kakaokey);
    clearInterval(counter);
  }
}, 1000);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
