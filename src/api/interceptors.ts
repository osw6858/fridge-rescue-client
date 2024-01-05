import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY, END_POINTS } from '../constants/api';
import { axiosInstance } from './axiosInstance';
import type { Token } from '../types/tokenType';

export const checkAndSetToken = (config: InternalAxiosRequestConfig) => {
  if (!config.headers || !config.headers.Authorization) return config;

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!accessToken) {
    throw new Error('토큰이 유효하지 않습니다.');
  }

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

export const handleTokenError = async (error: AxiosError) => {
  const originalRequest = error.config;

  if (!error.response || !originalRequest) throw new Error('에러가 발생했습니다.');

  if (error.response && error.response.status === 401) {
    try {
      const response = await axiosInstance.post<Token>(END_POINTS.TOKEN);

      if (response.status === 200) {
        const { accessToken } = response.data;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

        return axiosInstance(originalRequest);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  throw new Error(`${error}`);
};
