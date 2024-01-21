import { END_POINTS } from '../constants/api';
import { axiosAuth } from './axiosInstance';

export const makeReport = async (recipeId: string, reason: string) => {
  const result = await axiosAuth.post(`${END_POINTS.REPORTS}`, {
    recipeId,
    reason,
  });
  return result.data;
};
