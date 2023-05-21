import { atom } from 'recoil';
import { MemeType, ProfileType } from '../types';

const MemeDataState = atom<MemeType>({
  key: 'MemeDataState',
  default: [
    {
      memeId: 0,
      name: '',
      imageUrl: '',
      username: '',
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
const imageUploadState = atom<File>({
  key: 'imageUploadState',
  default: new File([], ''),
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
    },
  ],
});

export {
  MemeDataState,
  MemePage,
  imageUploadState,
  PreviewDateState,
  MemeTypeDataState,
  ProfileDataState,
  MemberMemeDataState,
  MemberMemePage,
};
