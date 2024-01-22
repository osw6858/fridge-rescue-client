import { END_POINTS } from '../constants/api';
import { axiosAuth, axiosDefault } from './axiosInstance';

export const getSearchIngredient = async (quert: string) => {
  const { data } = await axiosDefault.get(`${END_POINTS.SUGGEST}${quert}`);
  return data;
};

export const getIngredientKeyWordSearch = async (keyword: string, sortType: string) => {
  const { data } = await axiosDefault.get(
    `${END_POINTS.KEYWORD_SEARCH}${keyword}&sortType=${sortType}`
  );
  return data;
};

export const getFrigeKeyWordSearch = async () => {
  const { data } = await axiosAuth.get(END_POINTS.FRIGE_SEARCH);
  return data;
};
