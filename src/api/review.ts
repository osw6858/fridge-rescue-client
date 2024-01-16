import { axiosDefault } from './axiosInstance';

export const getReviews = async (recipeId: string, page: number) => {
  const result = await axiosDefault.get(`/recipes/${recipeId}/reviews?page=${page}`);
  return result.data;
};
