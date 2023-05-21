import axios from 'axios';
import { API_URL } from '../constants/Constants';
import { MemeType, ProfileType } from '../types';
import { SetterOrUpdater } from 'recoil';
import { getCookie, setCookie } from '../util/Cookie';
import jinInterceptor from './interceptor';
import { toast } from 'react-toastify';

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const imageUploadApi = async (
  image: File,
  name: string,
  type: string
) => {
  const formData = new FormData();
  formData.append('image', image); // {contentType: 'multipart/form-data'}
  const obj = { name: name, type: type };
  formData.append(
    'dto',
    new Blob([JSON.stringify(obj)], { type: 'application/json' })
  ); // {contentType: 'application/json'}
  await jinInterceptor
    .post(API_URL + '/meme', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + getCookie('access_token'),
      },
      transformRequest: (data) => {
        return data;
      },
    })
    .then((response) => {
      if (type === 'MEME' && response.status === 201) {
        setCookie('status', 'upload success');
        window.location.href = '/';
      }
    })
    .catch((error) => {
      toast.error('업로드 실패');
    });
};
export const imageDownloadAPI = async (
  page: number,
  setWantedList: SetterOrUpdater<MemeType>,
  setTotalpage: SetterOrUpdater<number>,
  type: string
) => {
  await axios
    .get(API_URL + '/meme', {
      params: {
        type: type,
        page: page,
        size: 6,
        sort_direction: 'desc',
      },
      headers: headerConfig,
    })
    .then((response) => {
      setWantedList(response.data.dtos);
      setTotalpage(response.data.pageInfo.totalPages);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const MemeDeleteAPI = async (memeid: number) => {
  await jinInterceptor
    .delete(API_URL + `/meme/${memeid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + getCookie('access_token'),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = '/';
        setCookie('status', 'delete success');
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error('삭제 권한이없습니다.');
    });
};
export const ProfileAPI = async (
  username: string,
  setProfile: SetterOrUpdater<ProfileType>
) => {
  await jinInterceptor
    .get(API_URL + `/member/${username}`, {
      headers: headerConfig,
    })
    .then((response) => {
      if (response.status === 200) {
        setProfile(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const MemberMemeAPI = async (
  username: string,
  page: number,
  setMeme: SetterOrUpdater<MemeType>,
  setTotalpage: SetterOrUpdater<number>
) => {
  await jinInterceptor
    .get(API_URL + `/meme/member/${username}`, {
      params: {
        page: 0,
        size: 6,
        sort_direction: 'desc',
      },
      headers: headerConfig,
    })
    .then((response) => {
      setMeme(response.data.dtos);
      setTotalpage(response.data.pageInfo.totalPages);
    })
    .catch((error) => {
      console.log(error);
    });
};
