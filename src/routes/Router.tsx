import { Route, Routes } from 'react-router-dom';
import { Index } from '../pages/Index';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { MyPage } from '../pages/MyPage';
import { Scrap } from '../pages/Scrap';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/scrap" element={<Scrap />} />
    </Routes>
  );
};
