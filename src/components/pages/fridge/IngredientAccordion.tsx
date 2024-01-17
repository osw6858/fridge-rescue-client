import styled from 'styled-components';
import type { Ingredient, IngredientEditList } from '../../../types/ingredientType';
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
  ingredient: Ingredient;
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
          <Typography>{ingredient.name}</Typography>
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

  .MuiPaper-root {
    height: fit-content;
  }

  .MuiTypography-root {
    font-size: 14px;
  }

  .edit-section {
    display: flex;
    gap: 12px;

    input {
      height: 10px;
    }
    button {
      width: 50px;
    }
  }
  .MuiAccordionSummary-content {
    display: flex;
    align-items: center;
  }
`;
