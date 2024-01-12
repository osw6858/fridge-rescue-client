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
import { PrivateRoute } from './PrivateRoute';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/recipe/:recipeId" element={<RecipeView />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route element={<PrivateRoute authentication={false} />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route element={<PrivateRoute authentication allowGuest />}>
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/scrap" element={<Scrap />} />
        <Route path="/review-post" element={<ReviewPost />} />
      </Route>
      <Route element={<PrivateRoute authentication />}>
        <Route path="/refrigerator" element={<MyRefrigerator />} />
      </Route>
    </Routes>
  );
};
