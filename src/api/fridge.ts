import { END_POINTS } from '../constants/api';
import { Ingredient } from '../types/ingredientType';
import { axiosDefault } from './axiosInstance';

export const getIngredient = async () => {
  try {
    const response = await axiosDefault.get<Ingredient[]>(END_POINTS.INGREDIENT);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getIngredientSuggest = async () => {
  try {
    const response = await axiosDefault.get<Suggest[]>(END_POINTS.SUGGEST);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
