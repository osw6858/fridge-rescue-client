import Carousel from 'react-material-ui-carousel';
import { RecipeCard } from './RecipeCard';
import { styled } from 'styled-components';

// 임시 타입 지정
interface RecipeProps {
  popularRecipeList: number[];
}

export const CarouselSlider = ({ popularRecipeList }: RecipeProps) => {
  return (
    <Carousel>
      {popularRecipeList.map((_, index) => (
        <div key={index}>
          <Lank>{index + 1}위</Lank>
          <RecipeCard
            key={index}
            recipeTitle="111"
            briefExplanation="111"
            imageURL="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42986.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=ais"
            matchedFoodList={['ekdrms']}
            size="large"
          />
        </div>
      ))}
    </Carousel>
  );
};

const Lank = styled.p`
  font-weight: 600;
  font-size: 25px;
  margin: 0 0 20px 5px;
  text-align: center;
`;
