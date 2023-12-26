import { Chip, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { styled } from 'styled-components';

interface SmallCarState {
  recipeTitle: string;
  briefExplanation: string;
  imageURL: string;
  matchedFoodList: string[];
}

export const SmallRecipeCard = ({
  recipeTitle,
  briefExplanation,
  imageURL,
  matchedFoodList,
}: SmallCarState) => {
  return (
    <StyledCard sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 190 }} image={imageURL} title="레시피 사진" />
      <CardContent>
        <RecipeTitle> {recipeTitle}</RecipeTitle>
        <BriefExplanation>{briefExplanation}</BriefExplanation>
      </CardContent>
      <MatchedFoodList>
        <MatchedFood>일치하는 재료</MatchedFood>
        <CardActions>
          {matchedFoodList.map((food, index) => (
            <Chip key={index} label={food} />
          ))}
        </CardActions>
      </MatchedFoodList>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  min-height: 300px;
  min-width: 290px;
  margin: 14px;

  .css-gavykb-MuiChip-root {
    margin-bottom: 10px;
  }

  .css-dnrpxu-MuiCardActions-root {
    flex-wrap: wrap;
  }
`;

const RecipeTitle = styled.h5`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
`;

const BriefExplanation = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  width: 100%;
  margin-top: 20px;
  line-height: 20px;
`;

const MatchedFood = styled.p`
  color: ${(props) => props.theme.colors.black};
  font-weight: 600;
  font-size: 14px;
  margin: 10px 0 5px 10px;
`;

const MatchedFoodList = styled.div`
  padding: 10px;
`;
