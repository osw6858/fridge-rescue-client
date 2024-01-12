import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY, END_POINTS, ROOT_URL } from '../constants/api';
import { axiosAuth } from './axiosInstance';
import type { Token } from '../types/tokenType';
import { getRefreshToken } from '../utils/getRefreshToken';

export const checkAndSetToken = (config: InternalAxiosRequestConfig) => {
  if (!config.headers || config.headers.Authorization) return config;

  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  if (!accessToken) {
    window.location.href = ROOT_URL;
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
      const refreshToken = getRefreshToken('refreshToken');
      const response = await axiosAuth.post<Token>(END_POINTS.TOKEN, refreshToken);

      if (response.status === 200) {
        const { accessToken } = response.data;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

        return axiosAuth(originalRequest);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  throw new Error(`${error}`);
};
