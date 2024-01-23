import styled from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKey';
import { getBookmarkedRecipe } from '../api/member';
import { RecipeCard } from '../components/common/RecipeCard';
import { type Recipe } from '../types/recipeType';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Scrap = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_BOOKMARKED_RECIPE],
    queryFn: ({ pageParam }) => getBookmarkedRecipe(pageParam),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => {
      return allPages.length;
    },
  });

  return (
    <ScrapContainer>
      <BasicTitle title="레시피 스크랩" />

      <InfiniteScroll
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={null}
        dataLength={data ? data.pages.flatMap((page) => page.data.content).length : 0}
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
    </ScrapContainer>
  );
};

const ScrapContainer = styled.div``;
const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  h5 {
    margin: 12px 0 8px 0;
  }
`;
