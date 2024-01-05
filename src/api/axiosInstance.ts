import axios from 'axios';
import { BASE_URL } from '../constants/api';
import { checkAndSetToken, handleTokenError } from './interceptors';

// 사진 보낼때는 header부분 변경 필요 / 옵션 변경은 자유롭게!
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 요청 타임아웃(옵션)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// TODO: API에러시 함수 작성하여 두번째 인자로 넣기
axiosInstance.interceptors.request.use(checkAndSetToken, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use((response) => response, handleTokenError);
