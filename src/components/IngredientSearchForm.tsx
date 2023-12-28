import { Chip, InputAdornment, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { BasicButton } from './common/BasicButton';
import { theme } from '../styles/theme';
import { useIngredient } from '../hooks/useIngredient';

export const IngredientSearchForm = () => {
  const { query, setQuery, visible, selectedItem, handleSelect, handleDelete, addIngredient } =
    useIngredient();

  return (
    <Form onSubmit={addIngredient}>
      <SearchWrapper>
        <TextField
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {selectedItem.map((item, index) => (
                  <Chip
                    style={{ marginRight: '4px' }}
                    key={index}
                    label={item}
                    onDelete={() => handleDelete(index)}
                  />
                ))}
              </InputAdornment>
            ),
          }}
        />
        <BasicButton type="submit" $bgcolor={theme.colors.orange} $fontcolor={theme.colors.white}>
          +
        </BasicButton>
      </SearchWrapper>
      {visible && (
        <SearchedList>
          {new Array(5).fill(1).map((_, i) => (
            <SearchedItem key={i} onClick={handleSelect}>
              <p>당근</p>
            </SearchedItem>
          ))}
        </SearchedList>
      )}
    </Form>
  );
};

const Form = styled.form`
  position: relative;
`;

const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  gap: 15px;
  margin-top: 40px;
`;

const SearchedList = styled.ul`
  display: grid;
  position: absolute;
  width: 90%;
  height: 300px;
`;

const SearchedItem = styled.li`
  z-index: 20;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.grayishWhite};
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;
