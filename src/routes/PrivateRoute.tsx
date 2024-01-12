/* eslint-disable no-alert */
import { Navigate, Outlet } from 'react-router-dom';
import { ACCESS_TOKEN_KEY } from '../constants/api';

interface PrivateRouteProps {
  // eslint-disable-next-line react/no-unused-prop-types
  children?: React.ReactNode;
  authentication: boolean;
}

export const PrivateRoute = ({ authentication }: PrivateRouteProps) => {
  const isAuthenticated = sessionStorage.getItem(ACCESS_TOKEN_KEY);

  if (authentication) {
    return isAuthenticated === null || isAuthenticated === 'false' ? (
      <>
        {alert('로그인이 필요합니다.')}
        <Navigate to="/signin" />
      </>
    ) : (
      <Outlet />
    );
  }

  return isAuthenticated === null || isAuthenticated === 'false' ? <Outlet /> : <Navigate to="/" />;
};
