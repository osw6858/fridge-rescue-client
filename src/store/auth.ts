import { atom } from 'recoil';
import { ACCESS_TOKEN_KEY, USER_NICKNAME_KEY } from '../constants/api';

export const AuthStateAtom = atom({
  key: `AuthStateAtom`,
  default: !!sessionStorage.getItem(ACCESS_TOKEN_KEY),
});

export const NickNameAtom = atom({
  key: 'NickNameAtomick',
  default: sessionStorage.getItem(USER_NICKNAME_KEY) ?? '',
});
