import { Chip, Stack } from '@mui/material';
import { useState } from 'react';
import { styled } from 'styled-components';

interface IngredientListProps {
  titleList: string[];
  setSelectedIngredient: React.Dispatch<React.SetStateAction<string[]>>;
  usedIngredient: string[];
}

export const IngredientList = ({
  titleList,
  setSelectedIngredient,
  usedIngredient,
}: IngredientListProps) => {
  const [selected, setSelected] = useState(Array(titleList.length).fill(false));

  const handleClick = (index: number) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);

    if (newSelected[index]) {
      setSelectedIngredient([...usedIngredient, titleList[index]]);
    } else {
      setSelectedIngredient(usedIngredient.filter((ingredient) => ingredient !== titleList[index]));
    }
  };

  return (
    <ListWrapper>
      <Stack direction="row" spacing={1}>
        {titleList?.map((title, i) => (
          <Chip
            color={selected[i] ? 'warning' : 'default'}
            key={i}
            label={title}
            onClick={() => handleClick(i)}
          />
        ))}
      </Stack>
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  margin-top: 20px;
`;
