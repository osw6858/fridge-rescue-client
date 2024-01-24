import styled from 'styled-components';
import type { FridgeIngredient, IngredientEditList } from '../../../types/ingredientType';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Checkbox,
  TextField,
} from '@mui/material';
import { FaArrowDown } from 'react-icons/fa';
import { useState } from 'react';
import { BasicButton } from '../../common/BasicButton';
import { theme } from '../../../styles/theme';

interface IngredientAccordionProps {
  ingredient: FridgeIngredient;
  setDeleteIdList?: React.Dispatch<React.SetStateAction<number[] | null>>;
  setEditList?: React.Dispatch<React.SetStateAction<IngredientEditList[] | null>>;
}

export const IngredientAccordion = ({
  ingredient,
  setDeleteIdList,
  setEditList,
}: IngredientAccordionProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [editedMemo, setEditedMemo] = useState(ingredient.memo);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsChecked((prev) => !prev);

    if (!setDeleteIdList) return;
    setDeleteIdList((prevList) => {
      if (!isChecked) {
        return [...(prevList || []), ingredient.id];
      }
      return prevList ? prevList.filter((id) => id !== ingredient.id) : prevList;
    });
  };

  const handleEditButtonClick = () => {
    if (!setEditList) return;

    setEditList((prevList) => {
      if (!prevList) return prevList;

      const hasMatchingItem = prevList.some(
        (item: IngredientEditList) => item.id === ingredient.id
      );

      const updatedList = prevList.map((item: IngredientEditList) => {
        if (item.id === ingredient.id) {
          return { ...item, memo: editedMemo };
        }
        return item;
      });

      if (!hasMatchingItem) {
        updatedList.push({ id: ingredient.id, memo: editedMemo });
      }

      return updatedList;
    });
  };

  return (
    <IngredientAccordionContainer>
      <Accordion>
        <AccordionSummary
          expandIcon={<FaArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          <Typography>
            <div className="ingredient-title">
              <span>{ingredient.name}</span>
              <span> 유통기한 : {ingredient.expiredAt} 까지</span>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="edit-section">
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={editedMemo}
              onChange={(e) => setEditedMemo(e.target.value)}
            />
            <BasicButton
              type="button"
              $bgcolor={theme.colors.sky}
              $fontcolor={theme.colors.white}
              $hoverbgcolor={theme.colors.blue}
              onClick={handleEditButtonClick}
            >
              수정
            </BasicButton>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </IngredientAccordionContainer>
  );
};

const IngredientAccordionContainer = styled.div`
  display: flex;
  justify-content: center;

  .MuiTypography-root {
    font-size: 14px;
  }
  .MuiPaper-root {
    width: 100%;
  }
  .edit-section {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    width: 100%;

    input {
      width: 100%;
      height: 10px;
    }
    button {
      width: 80px;
    }
  }
  .MuiAccordionSummary-content {
    display: flex;
    align-items: center;
  }

  .ingredient-title {
    display: flex;
    align-items: center;
    gap: 24px;

    & > span:first-child {
      font-family: Pretendard-ExtraBold;
      font-size: 18px;
    }
  }
`;
