import { END_POINTS } from '../constants/api';
import type { FridgeIngredient, Ingredient, Suggest } from '../types/ingredientType';
import { axiosAuth, axiosDefault } from './axiosInstance';

interface IngredientData {
  name: string;
  expiredAt: string;
  memo: string;
}

interface IngridentUpdate {
  delete: number[];
  update: FridgeIngredient[];
}

export const getIngredient = async () => {
  const { data } = await axiosAuth.get<Ingredient>(END_POINTS.FRIDGE);
  return data;
};

export const getIngredientSuggest = async () => {
  const { data } = await axiosDefault.get<Suggest[]>(END_POINTS.SUGGEST);
  return data;
};

export const addIngredient = async (ingredient: IngredientData[]) => {
  const { data } = await axiosAuth.post(END_POINTS.INGREDIENT, ingredient);
  return data;
};

export const updateIngredient = async (update: IngridentUpdate) => {
  const { data } = await axiosAuth.patch(END_POINTS.INGREDIENT, update);
  return data;
};
