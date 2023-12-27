import Carousel from 'react-material-ui-carousel';
import { LargeRecipeCard } from './LargeRecipeCard';

// 임시 타입 지정
interface RecipeProps {
  popularRecipeList: number[];
}

export const CarouselSlider = ({ popularRecipeList }: RecipeProps) => {
  return (
    <Carousel>
      {popularRecipeList.map((_, index) => (
        <LargeRecipeCard
          key={index}
          recipeTitle="111"
          briefExplanation="111"
          imageURL="111"
          matchedFoodList={['ekdrms']}
        />
      ))}
    </Carousel>
  );
};
