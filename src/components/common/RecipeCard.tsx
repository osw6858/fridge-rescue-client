import { Card, CardContent, CardMedia } from '@mui/material';
import { styled } from 'styled-components';
import { useCardStyle } from '../../hooks/useCardStyle';
import { device } from '../../styles/media';
import { Link } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import { GoDotFill } from 'react-icons/go';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface CardProps {
  recipeId: number;
  recipeTitle: string;
  briefExplanation: string;
  imageURL: string;
  date: string;
  reviewCount: number;
  auther: string;
  viewCount: number;
  size: 'large' | 'small';
}

interface State {
  $display: {
    display: string;
  };
}

export const RecipeCard = ({
  recipeId,
  recipeTitle,
  briefExplanation,
  imageURL,
  size,
  date,
  reviewCount,
  auther,
  viewCount,
}: CardProps) => {
  const { cardSize, imgSize, display } = useCardStyle(size);

  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  const now = dayjs();

  return (
    <StyledCard sx={cardSize}>
      <Link to={`/recipe/${recipeId}`}>
        <Container $display={display}>
          <CardMedia sx={imgSize} image={imageURL} title="레시피 사진" />
          <div>
            <CardContent>
              <RecipeTitle> {recipeTitle}</RecipeTitle>
              <BriefExplanation>{briefExplanation}</BriefExplanation>
            </CardContent>
            <RecipeInfo>
              <DateInfo>
                <span>{dayjs(date).from(now)}</span>
                {reviewCount > 0 && (
                  <>
                    <GoDotFill />
                    <span>{reviewCount}개의 리뷰</span>
                  </>
                )}
              </DateInfo>
              <User>
                <p>by. {auther}</p>
                <div>
                  <p>{viewCount}</p>
                  <GrView />
                </div>
              </User>
            </RecipeInfo>
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

const RecipeInfo = styled.div`
  padding: 10px;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${(props) => props.theme.colors.darkGray};
  span:nth-child(2) {
    margin-left: 10px;
  }

  svg {
    width: 5px;
    height: 5px;
    margin: 0 5px 0 5px;
  }
`;

const User = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.lightGray};
  margin-top: 10px;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  div {
    display: flex;
    align-items: center;
    svg {
      margin-left: 6px;
    }
  }
`;
