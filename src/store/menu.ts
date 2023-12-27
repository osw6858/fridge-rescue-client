import { atom } from 'recoil';

export const currentCategoryAtom = atom({
  key: 'currentCategoryAtom',
  default: '/',
});
