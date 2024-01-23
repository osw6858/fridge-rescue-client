import { styled } from 'styled-components';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../../types/recipeType';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/queryKey';
import { getLatestRecipes } from '../../api/recipe';

export const CardList = () => {
  const { data: latestRecipeData } = useQuery({
    queryKey: [QUERY_KEY.GET_LATEST_RECIPE],
    queryFn: () => getLatestRecipes(6),
    select: (data) => data.data.content,
  });

  return (
    <Card>
      {latestRecipeData?.map((info: Recipe) => (
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
    </Card>
  );
};

const Card = styled.section`
  display: flex;
  overflow-x: scroll;
  overflow-y: clip;
  align-items: flex-start;
  margin-bottom: 80px;

  &::-webkit-scrollbar {
    height: 8px;
    background-color: ${(props) => props.theme.colors.lightGray};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.gray};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.darkGray};
  }
`;
