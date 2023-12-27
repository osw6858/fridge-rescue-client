import { Chip, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { styled } from 'styled-components';
import {
  MatchedFood,
  type CardProps,
  MatchedFoodList,
  BriefExplanation,
  RecipeTitle,
} from './SmallRecipeCard';
import { StyledLink } from '../header/Header';

export const LargeRecipeCard = ({
  recipeTitle,
  briefExplanation,
  imageURL,
  matchedFoodList,
}: CardProps) => {
  return (
    <StyledLink to="/">
      <StyledCard sx={{ maxWidth: 760, minHeight: 320 }}>
        <CardMedia sx={{ minWidth: 300 }} image={imageURL} title="레시피 사진" />
        <div>
          <CardContent>
            <RecipeTitle> {recipeTitle}</RecipeTitle>
            <BriefExplanation>{briefExplanation}</BriefExplanation>
          </CardContent>
          <MatchedFoodList>
            <MatchedFood>일치하는 재료</MatchedFood>
            <CardActions>
              {matchedFoodList.length !== 0 ? (
                // TODO: key수정하기
                matchedFoodList.map((food, index) => <Chip key={index} label={food} />)
              ) : (
                <p>일치하는 재료가 없습니다.</p>
              )}
            </CardActions>
          </MatchedFoodList>
        </div>
      </StyledCard>
    </StyledLink>
  );
};

const StyledCard = styled(Card)`
  display: flex;
  min-height: 300px;

  .css-gavykb-MuiChip-root {
    margin-bottom: 10px;
  }

  .css-dnrpxu-MuiCardActions-root {
    flex-wrap: wrap;
  }
`;
