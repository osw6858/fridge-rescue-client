import { END_POINTS } from '../constants/api';
import type { Ingredient, StepImage } from '../pages/AddRecipe';
import { axiosDefault, axiosFormData } from './axiosInstance';

interface AddRecipeData {
  title: string;
  summary: string;
  recipeImage: File;
  steps: {
    description: string;
    tip: string;
  }[];
  ingredient: Ingredient[] | undefined;
  stepImage: StepImage[];
}

export const getNewRecipe = async () => {
  const response = await axiosDefault.get(END_POINTS.RECIPES, {
    params: { keyword: '당근', sortType: 'hot' },
  });
  return response.data;
};

export const getDetailRecipe = async (recipeId: string) => {
  const result = await axiosDefault.get(`${END_POINTS.RECIPES}/${recipeId}`);
  return result.data;
};

export const addNewRecipe = async (recipeData: AddRecipeData) => {
  const formData = new FormData();

  const requestData = {
    title: recipeData.title,
    summary: recipeData.summary,
    ingredients: recipeData.ingredient,
    steps: recipeData.steps,
  };

  console.log(requestData);

  const requestBlob = new Blob([JSON.stringify(requestData)], { type: 'application/json' });

  formData.append('request', requestBlob);

  recipeData.stepImage.forEach((item) => {
    formData.append(`stepImages`, item.image || new Blob());
  });

  formData.append('recipeImage', recipeData.recipeImage);

  const { data } = await axiosFormData.post(END_POINTS.RECIPES, formData);

  return data;
};
