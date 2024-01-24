import styled from 'styled-components';
import { BasicTitle } from '../../common/BasicTitle';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getReviews } from '../../../api/review';
import { QUERY_KEY } from '../../../constants/queryKey';
import { useLocation } from 'react-router-dom';
import type { Review } from '../../../types/reviewType';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RecipeReview } from './RecipeReview';

export const RecipeReviewList = () => {
  const { pathname } = useLocation();
  const recipeId = pathname.split('/').pop() || '';

  const { data, isSuccess, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_REVIEW, recipeId],
    queryFn: ({ pageParam }) => getReviews(recipeId, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => {
      return allPages.length;
    },
  });

  if (isSuccess) refetch();

  return (
    <RecipeReviewListContainer>
      <BasicTitle title="레시피 리뷰" />
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={null}
        dataLength={data ? data.pages.flatMap((page) => page.data.content).length : 0}
      >
        <div className="recipe-reviews">
          {data?.pages
            .flatMap((page) => page.data.content)
            .map((review: Review, idx: number) => <RecipeReview reviewData={review} key={idx} />)}
        </div>
      </InfiniteScroll>
    </RecipeReviewListContainer>
  );
};

const RecipeReviewListContainer = styled.div`
  margin: 36px 0;

  .recipe-reviews {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;
