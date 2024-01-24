import styled from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { Suspense } from 'react';
import { CardList } from '../components/common/CardList';
import { FallBack } from '../components/common/FallBack';
import { Carousel } from '../components/common/Carousel';
import { QUERY_KEY } from '../constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import { getPopularRecipes } from '../api/recipe';
import { useNavigate } from 'react-router-dom';

export const Index = () => {
  const navigation = useNavigate();
  const { data: popularRecipeData } = useQuery({
    queryKey: [QUERY_KEY.GET_POPULAR_RECIPE],
    queryFn: () => getPopularRecipes(5),
    select: (data) => data.data.content,
  });

  const handleClick = (recipeId: number) => {
    navigation(`/recipe/${recipeId}`);
  };

  return (
    <>
      <IndexContainer>
        <Title>
          <BasicTitle title="최신 레시피" />
          <MoreButton>더보기</MoreButton>
        </Title>
        <Suspense fallback={<FallBack length={5} />}>
          <CardList />
        </Suspense>
        <Title>
          <BasicTitle title="인기 레시피" />
          <MoreButton>더보기</MoreButton>
        </Title>
        <Carousel
          carouselDataInfo={popularRecipeData}
          dotsState
          viewCount={1}
          handleClick={handleClick}
        />
      </IndexContainer>
    </>
  );
};

const IndexContainer = styled.div`
  height: 100%;
  margin: 0 auto;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  margin-right: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.darkGray};
`;
