import styled from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { RecipeCard } from '../components/common/RecipeCard';

export const Recipe = () => {
  const navigation = useNavigate();
  const handleRecipePost = () => {
    navigation('/add');
  };
  return (
    <RecipeContainer>
      <div className="header">
        <p>
          총 <span className="recipe-count">13,435개</span>의 맛있는 레시피가 있어요!
        </p>
        <BasicButton
          type="submit"
          $bgcolor={theme.colors.orange}
          $fontcolor={theme.colors.white}
          $hoverbgcolor="#ff750c"
          onClick={handleRecipePost}
        >
          레시피 등록
        </BasicButton>
      </div>
      <BasicTitle title="최신 레시피" />
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
      <BasicTitle title="당신을 위한 추천 레시피" />
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
    </RecipeContainer>
  );
};

const RecipeContainer = styled.div`
  width: 100%;

  .header {
    width: 100%;
    margin-bottom: 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button {
      width: 30%;
    }

    .recipe-count {
      font-size: 20px;
      font-family: Pretendard-SemiBold;
      color: ${(props) => props.theme.colors.blue};
    }
  }
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 48px;
`;
