import { END_POINTS } from '../constants/api';
import { axiosDefault } from './axiosInstance';

export const getReviews = async (recipeId: string, page: number) => {
  const result = await axiosDefault.get(`/${END_POINTS.RECIPES}/${recipeId}/reviews?page=${page}`);
  return result.data;
};
