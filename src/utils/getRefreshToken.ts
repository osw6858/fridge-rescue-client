export const getRefreshToken = (name: string) => {
  const cookies = document.cookie.split('; ');
  const refreshTokenCookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  if (refreshTokenCookie) {
    const refreshToken = refreshTokenCookie.split('=')[1];
    return refreshToken;
  }
  return null;
};
