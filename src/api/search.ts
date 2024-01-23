import { END_POINTS } from '../constants/api';
import { axiosAuth, axiosDefault } from './axiosInstance';

export const getSearchIngredient = async (quert: string) => {
  const { data } = await axiosDefault.get(`${END_POINTS.SUGGEST}${quert}`);
  return data;
};

export const getIngredientKeyWordSearch = async (
  keyword: string,
  sortType: string,
  page: number
) => {
  const { data } = await axiosDefault.get(
    `${END_POINTS.KEYWORD_SEARCH}${keyword}&sortType=${sortType}&page=${page}`
  );
  return data;
};

export const getFrigeKeyWordSearch = async (page: number) => {
  const { data } = await axiosAuth.get(`${END_POINTS.FRIGE_SEARCH}?page=${page}`);
  return data;
};
