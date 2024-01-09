import { END_POINTS } from '../../constants/api';
import { axiosDefault } from '../axiosInstance';

interface SignUpProps {
  name: string;
  email: string;
  nickname: string;
  password: string;
}

export const signUp = async (params: SignUpProps) => {
  const { data } = await axiosDefault.post(END_POINTS.JOIN, params);
  return data;
};
