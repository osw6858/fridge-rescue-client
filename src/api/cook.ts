import { END_POINTS } from '../constants/api';
import { axiosAuth } from './axiosInstance';
import type { IngredientEditList } from '../types/ingredientType';

export interface CookingCompleteParams {
  recipeId: number;
  deleteIdList: number[] | null;
  editList: IngredientEditList[] | null;
}

export const cookingComplete = async ({
  recipeId,
  deleteIdList,
  editList,
}: CookingCompleteParams) => {
  const response = await axiosAuth.post(END_POINTS.COOKS, {
    recipeId,
    delete: deleteIdList,
    update: editList,
  });
  return response.data;
};
