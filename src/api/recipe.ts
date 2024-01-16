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

  formData.append('title', recipeData.title);
  formData.append('summary', recipeData.summary);
  formData.append(`recipeImage`, recipeData.recipeImage);

  formData.append(
    'steps',
    new Blob([JSON.stringify(recipeData.steps)], { type: 'application/json' })
  );

  formData.append(
    'ingredients',
    new Blob([JSON.stringify(recipeData.ingredient)], { type: 'application/json' })
  );

  recipeData.stepImage.forEach((item, index) => {
    if (item.image) {
      formData.append(`stepImages[${index}]`, item.image);
    }
  });

  const { data } = await axiosFormData.post(END_POINTS.RECIPES, formData);

  return data;
};
