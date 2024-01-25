import { END_POINTS } from '../constants/api';
import { axiosAuth } from './axiosInstance';

export const notification = async () => {
  const { data } = await axiosAuth.get(`${END_POINTS.NOTIFICATION}?sort=createdAt,desc`);
  return data;
};
