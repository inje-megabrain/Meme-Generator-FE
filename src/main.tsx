import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/global.css';
import { RecoilRoot, useRecoilState } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { darkModeState } from './states/atom';

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
    <ToastContainer />
    <App />
    <footer className='footer footer-center bottom-0 p-4 text-base-content mt-10'>
      <p>Copyright © 2023 - Megabrain Meme-Generator</p>
    </footer>
  </RecoilRoot>
);
