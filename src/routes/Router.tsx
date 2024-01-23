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
import { EditIngredient } from '../pages/EditIngredient';
import { UpdateRecipe } from '../pages/UpdateRecipe';
import { Suspense } from 'react';
import { FallBack } from '../components/common/FallBack';
import { ReviewEdit } from '../pages/ReviewEdit';
import { SearchResult } from '../pages/SearchResult';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/recipe/:recipeId" element={<RecipeView />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/search" element={<SearchResult />} />
      <Route element={<PrivateRoute authentication={false} />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route element={<PrivateRoute authentication allowGuest />}>
        <Route path="/mypage" element={<MyPage />} />
      </Route>
      <Route element={<PrivateRoute authentication />}>
        <Route path="/scrap" element={<Scrap />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route
          path="/recipe/update/:recipeId"
          element={
            <Suspense fallback={<FallBack length={3}></FallBack>}>
              <UpdateRecipe />{' '}
            </Suspense>
          }
        />
        <Route path="/refrigerator" element={<MyRefrigerator />} />
        <Route path="/review/ingredient" element={<EditIngredient />} />
        <Route path="/review/post" element={<ReviewPost />} />
        <Route path="/review/edit" element={<ReviewEdit />} />
      </Route>
    </Routes>
  );
};
