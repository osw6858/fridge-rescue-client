import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import {
  ACCESS_TOKEN_KEY,
  END_POINTS,
  ROOT_URL,
  USER_NICKNAME_KEY,
  USER_STATUS_KEY,
} from '../constants/api';
import { axiosAuth, axiosFormData, axiosReissue } from './axiosInstance';
import { getRefreshToken } from '../utils/getRefreshToken';
import axios from 'axios';

let isRefreshing = false;

export const checkAndSetToken = (config: InternalAxiosRequestConfig) => {
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

  if (!error.response || !originalRequest) {
    throw new Error('에러가 발생했습니다.');
  }

  const contentType = originalRequest.headers['Content-Type'];

  if (error.response && error.response.status === 401 && !isRefreshing) {
    isRefreshing = true;

    try {
      const refreshToken = getRefreshToken('refreshToken');
      const response = await axiosReissue.post(
        END_POINTS.REISSUE,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      if (response.status === 200) {
        const { data } = response.data;

        originalRequest.headers.Authorization = `Bearer ${data}`;

        sessionStorage.setItem(ACCESS_TOKEN_KEY, data);

        document.cookie = `refreshToken=${refreshToken}; path=/; max-age=2592000; samesite=strict`;

        if (!contentType) {
          return axiosFormData(originalRequest);
        }

        return axiosAuth(originalRequest);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(USER_STATUS_KEY);
        sessionStorage.removeItem(USER_NICKNAME_KEY);

        document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        // eslint-disable-next-line no-alert
        alert('토큰이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = `${ROOT_URL}signin`;
      }

      return Promise.reject(error);
    }
  }

  if ((isRefreshing && error.response.status === 403) || error.response.status === 401) {
    // eslint-disable-next-line no-alert
    alert('인증에 문제가 발생했습니다.');
  }

  isRefreshing = false;

  return Promise.reject(error);
};
