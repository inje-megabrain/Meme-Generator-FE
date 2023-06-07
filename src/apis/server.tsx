import axios from 'axios';
import { API_URL } from '../constants/Constants';
import { ItemType, MemeOneType, MemeType, ProfileType } from '../types';
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
  type: string,
  publicFlag: boolean
) => {
  const formData = new FormData();
  formData.append('image', image); // {contentType: 'multipart/form-data'}
  const obj = { name: name, type: type, publicFlag: publicFlag };
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
  setMemeList: SetterOrUpdater<MemeType>,
  setTotalpage: SetterOrUpdater<number>,
  type: string,
  sort_type: string,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log(type);
  await axios
    .get(API_URL + '/meme', {
      params: {
        type: type,
        page: page,
        size: 9,
        sort_direction: 'desc',
        sort_type: sort_type,
      },
      headers: headerConfig,
    })
    .then((response) => {
      setLoading && setLoading(false);
      setMemeList(response.data.dtos);
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
  setTotalpage: SetterOrUpdater<number>,
  setTotalElements: SetterOrUpdater<number>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await jinInterceptor
    .get(API_URL + `/meme/member/${username}`, {
      params: {
        page: page,
        size: 4,
        sort_direction: 'desc',
      },
      headers: headerConfig,
    })
    .then((response) => {
      setLoading && setLoading(false);
      setMeme(response.data.dtos);
      setTotalpage(response.data.pageInfo.totalPages);
      setTotalElements(response.data.pageInfo.totalElements);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const ServerCheckAPI = async () => {
  await axios
    .get(API_URL + '/test/ping')
    .then((response) => {
      if (response.status === 200) {
        console.log('서버 연결 성공');
      }
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      toast.error('서버 연결 실패');
    });
};
export const MemeIdAPI = async (
  memeid: number,
  setMeme: SetterOrUpdater<MemeOneType>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await jinInterceptor
    .get(API_URL + `/meme/${memeid}`, {
      headers: headerConfig,
    })
    .then((response) => {
      if (response.status === 200) {
        setLoading && setLoading(false);
        setMeme(response.data);
      }
    })
    .finally(() => {
      setLoading && setLoading(false);
    });
};
export const ItemsUploadAPI = async (
  image: File,
  category: string,
  name: string
) => {
  console.log(image, category, name);
  const formData = new FormData();
  formData.append('image', image); // {contentType: 'multipart/form-data'}
  const obj = { category: category, name: name };
  formData.append(
    'dto',
    new Blob([JSON.stringify(obj)], { type: 'application/json' })
  ); // {contentType: 'application/json'}
  await jinInterceptor
    .post(API_URL + '/items', formData, {
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
      if (response.status === 201) {
        toast.success('업로드 성공');
      }
    })
    .catch((error) => {
      toast.error('업로드 실패');
    });
};
export const ItemsDownloadAPI = async (
  category: string,
  setItems: SetterOrUpdater<ItemType>
) => {
  await axios
    .get(API_URL + '/items', {
      params: {
        category: category,
        page: 0,
        size: 6,
        sort_direction: 'desc',
      },
      headers: headerConfig,
    })
    .then((response) => {
      setItems(response.data.items);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const MemePublicAPI = async (memeid: number, publicFlag: boolean) => {
  await jinInterceptor
    .put(API_URL + `/meme/${memeid}/public`, null, {
      params: { flag: publicFlag, memeId: memeid },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + getCookie('access_token'),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    })
    .catch((error) => {
      toast.error('공개 실패');
    });
};
export const MemeLikeAPI = async (memeid: number) => {
  await jinInterceptor
    .post(API_URL + `/meme/${memeid}/like`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + getCookie('access_token'),
      },
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        window.location.reload();
      }
      if (response.status === 204) {
        window.location.reload();
      }
    })
    .catch((error) => {});
};
export const MemeSearchAPI = async (
  keyword: string,
  page: number,
  setMeme: SetterOrUpdater<MemeType>,
  setTotalpage: SetterOrUpdater<number>,
  setTotalElements: SetterOrUpdater<number>
) => {
  await jinInterceptor
    .get(API_URL + `/meme/search`, {
      params: {
        keyword: keyword,
        page: page,
        size: 6,
        sort_direction: 'desc',
      },
      headers: headerConfig,
    })
    .then((response) => {
      if (response.status === 200) {
        setMeme(response.data.dtos);
        setTotalpage(response.data.pageInfo.totalPages);
        setTotalElements(response.data.pageInfo.totalElements);
        if (response.data.pageInfo.totalElements === 0) {
          toast.error('검색 결과가 없습니다.');
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
