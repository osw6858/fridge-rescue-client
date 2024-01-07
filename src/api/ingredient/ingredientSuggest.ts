import { END_POINTS } from '../../constants/api';
import type { Suggest } from '../../types/ingredientType';
import { axiosDefault } from '../axiosInstance';

export const getIngredientSuggest = async () => {
  try {
    const response = await axiosDefault.get<Suggest[]>(END_POINTS.SUGGEST);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
