import { Route, Routes } from 'react-router-dom';
import { Index } from '../components/layout/Index';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
    </Routes>
  );
};
