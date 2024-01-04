import { END_POINTS } from '../../constants/api';
import type { Recipe } from '../../types/recipeType';
import { axiosInstance } from '../axiosInstance';

export const getNewRecipe = async () => {
  try {
    const response = await axiosInstance.get<Recipe[]>(END_POINTS.RECIPES);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
