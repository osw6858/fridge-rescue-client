import { Chip, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { styled } from 'styled-components';
import { useCardStyle } from '../../hooks/useCardStyle';
import { device } from '../../styles/media';
import { Link } from 'react-router-dom';

interface CardProps {
  recipeTitle: string;
  briefExplanation: string;
  imageURL: string;
  matchedFoodList: string[];
  size: 'large' | 'small';
}

interface State {
  $display: {
    display: string;
  };
}

export const RecipeCard = ({
  recipeTitle,
  briefExplanation,
  imageURL,
  matchedFoodList,
  size,
}: CardProps) => {
  const { cardSize, imgSize, display } = useCardStyle(size);

  return (
    <StyledCard sx={cardSize}>
      <Link to="/recipe/1">
        <Container $display={display}>
          <CardMedia sx={imgSize} image={imageURL} title="레시피 사진" />
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
        </Container>
      </Link>
    </StyledCard>
  );
};

const Container = styled.div<State>`
  display: ${(props) => props.$display.display};

  @media ${device.mobile} {
    display: block;
  }
`;

const StyledCard = styled(Card)`
  min-height: 300px;
  margin: 5px;

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
