import { atom } from 'recoil';

export const SearchAtom = atom({
  key: 'searchQuery',
  default: '',
});
