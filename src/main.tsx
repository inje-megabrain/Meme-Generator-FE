import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/global.css';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <footer className='relative bottom-0 footer footer-center p-4 text-base-content mt-10'>
      <div>
        <p>Copyright © 2023 - Megabrain Meme-Generator</p>
      </div>
    </footer>
  </RecoilRoot>
);
