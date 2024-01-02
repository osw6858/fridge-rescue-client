import { Route, Routes } from 'react-router-dom';
import { Index } from '../pages/Index';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { MyPage } from '../pages/MyPage';
import { AddRecipe } from '../pages/AddRecipe';
import { Scrap } from '../pages/Scrap';
import { MyRefrigerator } from '../pages/MyRefrigerator';
import { ReviewPost } from '../pages/ReviewPost';
import { RecipeView } from '../pages/RecipeView';
import { Recipe } from '../pages/Recipe';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      {/** add/ => 화면 테스트용 임시 라우팅 */}
      <Route path="/add" element={<AddRecipe />} />
      <Route path="/refrigerator" element={<MyRefrigerator />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/scrap" element={<Scrap />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/:recipeId" element={<RecipeView />} />
      <Route path="/review-post" element={<ReviewPost />} />
    </Routes>
  );
};
