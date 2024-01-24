import styled from 'styled-components';
import { BasicTitle } from '../../common/BasicTitle';
import { RecipeCard } from '../../common/RecipeCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/queryKey';
import { getLatestRecipes } from '../../../api/recipe';
import InfiniteScroll from 'react-infinite-scroll-component';
import { type Recipe } from '../../../types/recipeType';

export const LatestRecipe = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_LATEST_RECIPE_INFINITE],
    queryFn: ({ pageParam }) => getLatestRecipes(6, pageParam),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => {
      return allPages.length;
    },
  });

  return (
    <>
      <BasicTitle title="최신 레시피" />
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={null}
        dataLength={data ? data.pages?.flatMap((page) => page.data.content).length : 0}
      >
        <CardList>
          {data?.pages
            .flatMap((page) => page.data.content)
            .map((info: Recipe) => (
              <RecipeCard
                recipeId={info.id}
                key={info.id}
                recipeTitle={info.title}
                briefExplanation={info.summary}
                imageURL={info.imageUrl}
                date={info.createdAt}
                reviewCount={info.reviewCount}
                auther={info.author.nickname}
                viewCount={info.viewCount}
                size="small"
              />
            ))}
        </CardList>
      </InfiniteScroll>
    </>
  );
};

const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 48px;
`;
