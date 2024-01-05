import { END_POINTS } from '../../constants/api';
import type { Recipe } from '../../types/recipeType';
import { axiosDefault } from '../axiosInstance';

export const getNewRecipe = async () => {
  try {
    const response = await axiosDefault.get<Recipe[]>(END_POINTS.RECIPES);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
