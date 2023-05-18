import { atom } from 'recoil';
import { MemeType } from '../types';

const MemeDataState = atom<MemeType>({
  key: 'MemeDataState',
  default: [
    {
      wantedId: 0,
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
const MemeID = atom<number>({
  key: 'MemeID',
  default: 0,
});
export { MemeDataState, MemePage, imageUploadState, PreviewDateState, MemeID };
