import styled from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { RecipeCard } from '../components/common/RecipeCard';

export const Scrap = () => {
  // TODO : 데이터 연동 후 map 돌리기
  return (
    <ScrapContainer>
      <BasicTitle title="레시피 스크랩" />
      <CardList>
        <RecipeCard
          recipeTitle="레시피 제목"
          briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
          imageURL="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42986.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=ais"
          matchedFoodList={['당근', '무']}
          size="small"
        />
        <RecipeCard
          recipeTitle="레시피 제목"
          briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
          imageURL="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42986.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=ais"
          matchedFoodList={['당근', '무']}
          size="small"
        />
        <RecipeCard
          recipeTitle="레시피 제목"
          briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
          imageURL="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42986.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=ais"
          matchedFoodList={['당근', '무']}
          size="small"
        />
        <RecipeCard
          recipeTitle="레시피 제목"
          briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
          imageURL="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42986.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=ais"
          matchedFoodList={['당근', '무']}
          size="small"
        />
      </CardList>
    </ScrapContainer>
  );
};

const ScrapContainer = styled.div``;
const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
