import { atom } from 'recoil';
import { MemeType } from '../types';

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

export {
  MemeDataState,
  MemePage,
  imageUploadState,
  PreviewDateState,
  MemeTypeDataState,
};
