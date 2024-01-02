import styled from 'styled-components';
import { BasicTitle } from '../../common/BasicTitle';
import { RecipeReview } from './RecipeReview';

export const RecipeReviewList = () => {
  return (
    <RecipeReviewListContainer>
      <BasicTitle title="레시피 리뷰" />
      <div className="recipe-reviews">
        <RecipeReview />
        <RecipeReview />
        <RecipeReview />
        <RecipeReview />
      </div>
    </RecipeReviewListContainer>
  );
};

const RecipeReviewListContainer = styled.div`
  margin: 36px 0;

  .recipe-reviews {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;
