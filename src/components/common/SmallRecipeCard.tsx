import { Chip, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { styled } from 'styled-components';
import { StyledLink } from '../layout/header/Header';

export interface CardProps {
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
}: CardProps) => {
  return (
    <StyledLink to="/">
      <StyledCard sx={{ maxWidth: 345, minHeight: 300, minWidth: 290 }}>
        <CardMedia sx={{ height: 190 }} image={imageURL} title="레시피 사진" />
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
      </StyledCard>
    </StyledLink>
  );
};

const StyledCard = styled(Card)`
  margin: 14px;

  .css-gavykb-MuiChip-root {
    margin-bottom: 10px;
  }

  .css-dnrpxu-MuiCardActions-root {
    flex-wrap: wrap;
  }
`;

export const RecipeTitle = styled.h5`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
`;

export const BriefExplanation = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  width: 100%;
  margin-top: 20px;
  line-height: 20px;
`;

export const MatchedFood = styled.p`
  color: ${(props) => props.theme.colors.black};
  font-weight: 600;
  font-size: 14px;
  margin: 10px 0 5px 10px;
`;

export const MatchedFoodList = styled.div`
  padding: 10px;
`;
