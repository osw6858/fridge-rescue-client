import axios from 'axios';
import { BASE_URL } from '../constants/api';
import { checkAndSetToken, handleTokenError } from './interceptors';

// 인증이 필요한 페이지에서 토큰검사 후 데이터를 패칭할때 사용할 인스턴스
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 요청 타임아웃(옵션)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 인증이 필요하지 않은 페이지에서 데이터를 패칭할때 사용할 인스턴스
export const axiosDefault = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: API에러시 함수 작성하여 두번째 인자로 넣기
axiosAuth.interceptors.request.use(checkAndSetToken, (error) => Promise.reject(error));

axiosAuth.interceptors.response.use((response) => response, handleTokenError);
