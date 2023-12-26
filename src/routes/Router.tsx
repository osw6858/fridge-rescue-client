import { Route, Routes } from 'react-router-dom';
import { Index } from '../components/layout/Index';
import { SignIn } from '../pages/SignIn';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};
