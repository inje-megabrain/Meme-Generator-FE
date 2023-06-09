import { atom } from 'recoil';
import {
  ItemType,
  MemeOneType,
  MemeType,
  ProfileType,
  TotalLikeViewType,
} from '../types';

const MemeDataState = atom<MemeType>({
  key: 'MemeDataState',
  default: [
    {
      memeId: 0,
      name: '',
      imageUrl: '',
      username: '',
      userid: '',
      type: '',
      publicFlag: false,
      viewCount: 0,
      likeCount: 0,
      tags: '',
      isLiked: false,
    },
  ],
});
const MemePage = atom<number>({
  key: 'MemePage',
  default: 0,
});
const MemberMemePage = atom<number>({
  key: 'MemberMemePage',
  default: 0,
});
const PreviewDateState = atom<string>({
  key: 'PreviewDateState',
  default: '',
});
const MemeTypeDataState = atom<string>({
  key: 'MemeTypeDataState',
  default: '',
});
const ProfileDataState = atom<ProfileType>({
  key: 'ProfileDataState',
  default: {
    username: '',
    email: '',
    name: '',
  },
});
const MemberMemeDataState = atom<MemeType>({
  key: 'MemberMemeDataState',
  default: [
    {
      memeId: 0,
      name: '',
      imageUrl: '',
      username: '',
      userid: '',
      type: '',
      publicFlag: false,
      viewCount: 0,
      likeCount: 0,
      tags: '',
      isLiked: false,
    },
  ],
});
const TemplateDataState = atom<MemeType>({
  key: 'TemplateDataState',
  default: [
    {
      memeId: 0,
      name: '',
      userid: '',
      username: '',
      imageUrl: '',
      type: '',
      publicFlag: false,
      viewCount: 0,
      likeCount: 0,
      tags: '',
      isLiked: false,
    },
  ],
});
const templatePage = atom<number>({
  key: 'templatePage',
  default: 0,
});
const MemeIdDataState = atom<MemeOneType>({
  key: 'MemeIdDataState',
  default: {
    memeId: 0,
    name: '',
    imageUrl: '',
    username: '',
    tags: [''],
  },
});
const ItemDataState = atom<ItemType>({
  key: 'ItemDataState',
  default: [
    {
      ItemId: 0,
      name: '',
      imageUrl: '',
      category: '',
    },
  ],
});
const InfinitiPage = atom<number>({
  key: 'InfinitiPage',
  default: 0,
});
const SignupCheck = atom<boolean>({
  key: 'SignupChaeck',
  default: false,
});
const EmailCheck = atom<string>({
  key: 'EmailCheck',
  default: '',
});
const TotalLikeViewDatatState = atom<TotalLikeViewType>({
  key: 'TotalLikeView',
  default: {
    viewTotalCount: 0,
    likeTotalCount: 0,
  },
});
const MemeSearchDataState = atom<MemeType>({
  key: 'MemeSearchDataState',
  default: [
    {
      memeId: 0,
      name: '',
      imageUrl: '',
      username: '',
      userid: '',
      type: '',
      publicFlag: false,
      viewCount: 0,
      likeCount: 0,
      tags: '',
      isLiked: false,
    },
  ],
});
const MemeSearchTotalpage = atom<number>({
  key: 'MemeSearchTotalpage',
  default: 0,
});
const SearchData = atom<string>({
  key: 'SearchData',
  default: '',
});

export {
  MemeDataState,
  MemePage,
  PreviewDateState,
  MemeTypeDataState,
  ProfileDataState,
  MemberMemeDataState,
  MemberMemePage,
  TemplateDataState,
  templatePage,
  MemeIdDataState,
  ItemDataState,
  InfinitiPage,
  SignupCheck,
  EmailCheck,
  TotalLikeViewDatatState,
  MemeSearchDataState,
  MemeSearchTotalpage,
  SearchData,
};
