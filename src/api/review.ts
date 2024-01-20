import { END_POINTS } from '../constants/api';
import { axiosAuth, axiosDefault } from './axiosInstance';

export const getReviews = async (recipeId: string, page: number) => {
  const result = await axiosDefault.get(`/${END_POINTS.RECIPES}/${recipeId}/reviews?page=${page}`);
  return result.data;
};

export const reviewPost = async (
  recipeId: number,
  cookId: number,
  title: string,
  image: File | null,
  contents: string
) => {
  const imageFormData = new FormData();
  if (image) {
    imageFormData.append('image', image);
  }

  const jsonDataBlob = new Blob([JSON.stringify({ recipeId, cookId, title, contents })], {
    type: 'application/json',
  });

  const jsonFormData = new FormData();
  jsonFormData.append('request', jsonDataBlob);

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of jsonFormData.entries()) {
    imageFormData.append(key, value);
  }

  const result = await axiosAuth.post(`/${END_POINTS.REVIEWS}`, imageFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data;
};

export const reviewDelete = async (reviewId: number) => {
  const result = await axiosAuth.delete(`/${END_POINTS.REVIEWS}/${reviewId}`);
  return result.data;
};

export const getDetailReview = async (reviewId: number) => {
  const result = await axiosAuth.get(`/${END_POINTS.REVIEWS}/${reviewId}`);
  return result.data;
};
