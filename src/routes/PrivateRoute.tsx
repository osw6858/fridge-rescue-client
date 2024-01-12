/* eslint-disable no-alert */
import { Navigate, Outlet } from 'react-router-dom';
import { ACCESS_TOKEN_KEY, USER_STATUS_KEY } from '../constants/api';

interface PrivateRouteProps {
  // eslint-disable-next-line react/no-unused-prop-types
  children?: React.ReactNode;
  authentication: boolean;
  allowGuest?: boolean;
}

export const PrivateRoute = ({ authentication, allowGuest }: PrivateRouteProps) => {
  const isAuthenticated = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const userStatus = sessionStorage.getItem(USER_STATUS_KEY);

  if (authentication) {
    if (isAuthenticated === null) {
      alert('로그인이 필요합니다.');
      return <Navigate to="/signin" />;
    }
    if (userStatus === 'GUEST' && !allowGuest) {
      alert('게스트 사용자는 냉장고를 만들 수 없습니다. 이메일 인증을 해주세요.');
      return <Navigate to="/mypage" />;
    }
    return <Outlet />;
  }

  return isAuthenticated === null ? <Outlet /> : <Navigate to="/" />;
};
