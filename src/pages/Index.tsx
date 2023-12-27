import styled from 'styled-components';
import { CarouselSlider } from '../components/common/CarouselSlider';
import { LargeRecipeCard } from '../components/common/RecipeCard';

export const Index = () => {
  return (
    <IndexContainer>
      <Title>
        {/** TODO: 이곳에 타이틀 컴포넌트 추가 */}타이틀<MoreButton>더보기</MoreButton>
      </Title>
      <CardList>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <LargeRecipeCard
            key={index}
            recipeTitle="레시피 제목"
            briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
            imageURL="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42986.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=ais"
            matchedFoodList={['당근', '무']}
            size="small"
          />
        ))}
      </CardList>
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

const CardList = styled.section`
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
