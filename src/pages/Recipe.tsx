/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { BasicButton } from '../components/common/BasicButton';
import { useNavigate } from 'react-router';
import { RecommendedRecipe } from '../components/pages/recipe/RecommendedRecipe';
import { LatestRecipe } from '../components/pages/recipe/LatestRecipe';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKey';
import { getRecipesCount } from '../api/recipe';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from 'react';
import { RECIPE_CATEGORIES } from '../constants/menu';
import { PopularRecipe } from '../components/pages/recipe/PopularRecipe';

export const Recipe = () => {
  const navigation = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('최신 레시피');

  const handleRecipePost = () => {
    navigation('/add');
  };

  const { data: count } = useQuery({
    queryKey: [QUERY_KEY.RECIPES_COUNT],
    queryFn: getRecipesCount,
    select: (data) => data.data,
  });

  return (
    <RecipeContainer>
      <div className="header">
        <p>
          총 <span className="recipe-count">{Number(count).toLocaleString('ko-KR')}개</span>의
          맛있는 레시피가 있어요!
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
      <RecipeCategory>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup size="large" aria-label="large button group">
            {RECIPE_CATEGORIES.map((button) => (
              <Button
                key={button}
                onClick={() => setSelectedCategory(button)}
                className={selectedCategory === button ? 'is--active' : ''}
              >
                {button}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </RecipeCategory>

      <div>
        {selectedCategory === '최신 레시피' ? (
          <LatestRecipe />
        ) : selectedCategory === '인기 레시피' ? (
          <PopularRecipe />
        ) : selectedCategory === '추천 레시피' ? (
          <RecommendedRecipe />
        ) : (
          <LatestRecipe />
        )}
      </div>
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

const RecipeCategory = styled.div`
  padding: 24px 0 48px 0;

  .is--active {
    background-color: ${(props) => props.theme.colors.sky}40;
  }
`;
