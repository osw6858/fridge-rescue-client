import { Chip, Stack } from '@mui/material';
import { useState } from 'react';
import { styled } from 'styled-components';

interface IngredientListProps {
  titleList?: string[];
}

export const IngredientList = ({ titleList }: IngredientListProps) => {
  // 추후 재료의 길이만큼 뱃지 배열 설정
  const [selected, setSelected] = useState(Array(4).fill(false));

  const handleClick = (index: number) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
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
