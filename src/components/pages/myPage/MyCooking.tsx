import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { MYCOOKING_CATEGORIES } from '../../../constants/menu';
import styled from 'styled-components';
import { MyRecipe } from './MyRecipe';
import { CompletedCooking } from './CompletedCooking';

export const MyCooking = () => {
  const [selectedCategory, setSelectedCategory] = useState('내가 등록한 레시피');

  return (
    <section>
      <MyCookingCategory>
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
          <ButtonGroup size="small" aria-label="small button group">
            {MYCOOKING_CATEGORIES.map((button) => (
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
      </MyCookingCategory>
      <div>{selectedCategory === '내가 등록한 레시피' ? <MyRecipe /> : <CompletedCooking />}</div>
    </section>
  );
};

const MyCookingCategory = styled.div`
  margin-bottom: 24px;
  .is--active {
    background-color: ${(props) => props.theme.colors.sky}40;
  }
`;
