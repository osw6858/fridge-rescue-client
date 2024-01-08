import styled from 'styled-components';
import { CarouselSlider } from '../components/common/CarouselSlider';
import { BasicTitle } from '../components/common/BasicTitle';
import { Suspense } from 'react';
import { CardList } from '../components/CardList';
import { FallBack } from '../components/common/FallBack';

export const Index = () => {
  return (
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
      <CarouselSlider popularRecipeList={[1, 2, 3]} />
    </IndexContainer>
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
