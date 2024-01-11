import { END_POINTS } from '../constants/api';
import { axiosDefault } from './axiosInstance';

interface SignUpProps {
  email: string;
  nickname: string;
  password: string;
}

export const fetchSignUp = async (params: SignUpProps) => {
  const { data } = await axiosDefault.post(END_POINTS.JOIN, params);
  return data;
};

export const emailAuth = async (code: string) => {
  const { data } = await axiosDefault.post(END_POINTS.CONFIRM, code);
  return data;
};
