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
import { Suspense, useEffect } from 'react';
import { FallBack } from '../components/common/FallBack';
import { ReviewEdit } from '../pages/ReviewEdit';
import { SearchResult } from '../pages/SearchResult';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { ACCESS_TOKEN_KEY, END_POINTS } from '../constants/api';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKey';
import { useRecoilValue } from 'recoil';
import { AuthStateAtom } from '../store/auth';

export const Router = () => {
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const isLogin = useRecoilValue(AuthStateAtom);
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const queryClient = useQueryClient();

  // const { data } = useQuery({
  //   queryKey: [QUERY_KEY.NOTIFICATION],
  //   queryFn: notification,
  //   select: (data) => data.data.content,
  //   staleTime: 1000,
  //   enabled: isLogin,
  // });

  // const lastNoticId = data && data[data.length - 1].id;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isLogin) {
      // console.log('SSE작동 시작!');
      let eventSource: EventSourcePolyfill;
      const fetchSse = async () => {
        try {
          eventSource = new EventSource(`api/${END_POINTS.SUBSCRIBE}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              // 'Last-Event-ID': lastNoticId,
            },
            withCredentials: true,
          });

          /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
          eventSource.onmessage = async (event) => {
            const res = await event.data;
            console.log(res);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.NOTIFICATION] });
          };

          /* EVENTSOURCE ONERROR ------------------------------------------------------ */
          eventSource.onerror = async () => {};
        } catch (error) {
          console.log(error);
        }
      };
      fetchSse();
      return () => eventSource.close();
    }
  }, [isLogin]);

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
