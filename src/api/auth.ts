import { END_POINTS } from '../constants/api';
import { axiosDefault } from './axiosInstance';

interface SignUpProps {
  email: string;
  nickname: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}

export const fetchSignUp = async (params: SignUpProps) => {
  const { data } = await axiosDefault.post(END_POINTS.JOIN, params);
  return data;
};

export const fetchSignIn = async (params: SignInProps) => {
  const { data, headers } = await axiosDefault.post(END_POINTS.LOGIN, params);

  const token = headers['access-token'];
  const refreshToken = headers['refresh-token'];

  return { data, token, refreshToken };
};

export const emailAuth = async (code: string) => {
  const { data } = await axiosDefault.post(END_POINTS.CONFIRM, code);
  return data;
};
