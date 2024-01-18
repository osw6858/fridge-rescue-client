import { END_POINTS } from '../constants/api';
import { axiosAuth, axiosDefault } from './axiosInstance';

interface SignUpProps {
  email: string;
  nickname: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface AuthCode {
  code: string;
  email?: string;
}

export const fetchSignUp = async (params: SignUpProps) => {
  const { data } = await axiosDefault.post(END_POINTS.JOIN, params);
  return data;
};

export const fetchSignIn = async (params: SignInProps) => {
  const { data, headers } = await axiosDefault.post(END_POINTS.LOGIN, params);

  const { token } = data;
  const refreshToken = headers['refresh-token'];

  return { data, token, refreshToken };
};

export const emailAuth = async (code: AuthCode) => {
  const { data } = await axiosDefault.post(END_POINTS.CONFIRM, code);
  return data;
};

export const emailAuthInMyPage = async (code: AuthCode) => {
  const { data } = await axiosAuth.post(END_POINTS.CONFIRM, code);
  return data;
};

export const fetchSocialSignIn = async (provider: string) => {
  const { data } = await axiosDefault.get(`${END_POINTS.OAUTH}${provider}`);
  return data;
};
