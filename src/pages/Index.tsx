import styled from 'styled-components';
import { SmallRecipeCard } from '../components/common/SmallRecipeCard';
import { CarouselSlider } from '../components/common/CarouselSlider';

export const Index = () => {
  return (
    <IndexContainer>
      <Title>
        {/** TODO: 이곳에 타이틀 컴포넌트 추가 */}타이틀<MoreButton>더보기</MoreButton>
      </Title>
      <SamllCardList>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <SmallRecipeCard
            key={index}
            recipeTitle="레시피 제목"
            briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
            imageURL="/"
            matchedFoodList={['당근', '무']}
          />
        ))}
      </SamllCardList>
      <Title>
        {/** TODO: 이곳에 타이틀 컴포넌트 추가 */}케러셀 슬라이드<MoreButton>더보기</MoreButton>
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
  margin: 10px 0 30px 0;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  margin-right: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.darkGray};
`;

const SamllCardList = styled.section`
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
