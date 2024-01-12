import { atom } from 'recoil';
import { ACCESS_TOKEN_KEY } from '../constants/api';

export const AuthStateAtom = atom({
  key: `AuthStateAtom`,
  default: !!sessionStorage.getItem(ACCESS_TOKEN_KEY),
});
