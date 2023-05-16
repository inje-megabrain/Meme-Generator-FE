import axios from 'axios';
import { API_URL } from '../constants/Constants';
import { WantedType } from '../types';
import { SetterOrUpdater } from 'recoil';

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const imageUploadApi = async (
  image: File,
  name: string,
  detail: string,
  money: number
) => {
  const formData = new FormData();
  formData.append('image', image); // {contentType: 'multipart/form-data'}
  const obj = { description: detail, name: name, prize: money };
  formData.append(
    'dto',
    new Blob([JSON.stringify(obj)], { type: 'application/json' })
  ); // {contentType: 'application/json'}
  await axios
    .post(API_URL + '/wanted', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      transformRequest: (data) => {
        return data;
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const imageDownloadAPI = async (
  page: number,
  setWantedList: SetterOrUpdater<WantedType>,
  setTotalpage: SetterOrUpdater<number>
) => {
  await axios
    .get(API_URL + '/wanted', {
      params: {
        page: page,
        size: 9,
        sort_direction: 'desc',
      },
      headers: headerConfig,
    })
    .then((response) => {
      console.log(response.data.dtos);
      setWantedList(response.data.dtos);
      setTotalpage(response.data.pageInfo.totalPages);
    })
    .catch((error) => {
      console.log(error);
    });
};
