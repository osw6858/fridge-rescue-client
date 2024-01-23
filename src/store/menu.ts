import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const currentCategoryAtom = atom({
  key: 'currentCategoryAtom',
  default: '/',
  effects_UNSTABLE: [persistAtom],
});
