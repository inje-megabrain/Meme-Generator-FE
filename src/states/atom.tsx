import { atom } from 'recoil';
import { WantedType } from '../types';

const WantedDataState = atom<WantedType>({
  key: 'WantedDataState',
  default: [
    {
      name: '',
      prize: 0,
      description: '',
      imageUrl: '',
    },
  ],
});
const WantedPage = atom<number>({
  key: 'WantedPage',
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
export { WantedDataState, WantedPage, imageUploadState, PreviewDateState };
