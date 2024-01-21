import styled from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKey';
import { getBookmarkedRecipe } from '../api/member';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Chip, Typography } from '@mui/material';

export const Scrap = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_BOOKMARKED_RECIPE],
    queryFn: getBookmarkedRecipe,
    select: (data) => data.data.content,
  });

  console.log(data);

  return (
    <ScrapContainer>
      <BasicTitle title="레시피 스크랩" />
      <CardList>
        {data?.map((recipe) => {
          return (
            <Card sx={{ maxWidth: '100%' }}>
              <CardHeader
                avatar={<Avatar aria-label="recipe">?</Avatar>}
                title={recipe.title}
                subheader="띠띠"
              />
              <CardMedia component="img" height="194" image={recipe.recipeImageUrl} alt="음식" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {recipe.summary}
                </Typography>
                <h5>필요한 재료</h5>
                <div className="chips">
                  <Chip label="양파" />
                  <Chip label="마늘" />
                  <Chip label="후추" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardList>
    </ScrapContainer>
  );
};

const ScrapContainer = styled.div``;
const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  h5 {
    margin: 12px 0 8px 0;
  }
`;
