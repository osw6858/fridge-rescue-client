import { END_POINTS } from '../constants/api';
import { axiosDefault, axiosFormData } from './axiosInstance';

export const getNewRecipe = async () => {
  try {
    const response = await axiosDefault.get(END_POINTS.RECIPES, {
      params: { keyword: '당근', sortType: 'hot' },
    });
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getDetailRecipe = async (recipeId: string) => {
  try {
    const result = await axiosDefault.get(`${END_POINTS.RECIPES}/${recipeId}`);
    return result.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const addNewRecipe = async (formData: FormData) => {
  const { data } = await axiosFormData.post(END_POINTS.RECIPES, formData);
  return data;
};
