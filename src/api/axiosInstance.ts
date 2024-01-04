import axios from 'axios';
import { BASE_URL } from '../constants/api';

// 사진 보낼때는 header부분 변경 필요 / 옵션 변경은 자유롭게!
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 요청 타임아웃(옵션)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
