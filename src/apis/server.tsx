import axios from 'axios';
import { API_URL } from '../constants/Constants';
import { MemeType } from '../types';
import { SetterOrUpdater } from 'recoil';
import { getCookie, setCookie } from '../util/Cookie';
import jinInterceptor from './interceptor';
import { toast } from 'react-toastify';

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const imageUploadApi = async (image: File, name: string) => {
  const formData = new FormData();
  formData.append('image', image); // {contentType: 'multipart/form-data'}
  const obj = { name: name };
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
      //console.log(response);
      if (response.status === 201) {
        setCookie('status', 'upload success');
        window.location.href = '/';
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error('업로드 실패');
    });
};
export const imageDownloadAPI = async (
  page: number,
  setWantedList: SetterOrUpdater<MemeType>,
  setTotalpage: SetterOrUpdater<number>
) => {
  await axios
    .get(API_URL + '/meme', {
      params: {
        page: page,
        size: 6,
        sort_direction: 'desc',
      },
      headers: headerConfig,
    })
    .then((response) => {
      //console.log(response.data.dtos);
      setWantedList(response.data.dtos);
      setTotalpage(response.data.pageInfo.totalPages);
    })
    .catch((error) => {
      console.log(error);
    });
};
