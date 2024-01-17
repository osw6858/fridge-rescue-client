import { END_POINTS } from '../constants/api';
import type { Suggest } from '../types/ingredientType';
import { axiosAuth, axiosDefault } from './axiosInstance';

export const getIngredient = async () => {
  const response = await axiosAuth.get(END_POINTS.FRIDGE);
  return response.data;
};

export const getIngredientSuggest = async () => {
  try {
    const response = await axiosDefault.get<Suggest[]>(END_POINTS.SUGGEST);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
