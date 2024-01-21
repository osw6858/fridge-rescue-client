import { END_POINTS } from '../constants/api';
import { axiosDefault } from './axiosInstance';

export const getSearchIngredient = async (quert: string) => {
  const { data } = await axiosDefault.get(`${END_POINTS.SUGGEST}${quert}`);
  return data;
};
