import { Chip, InputAdornment, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { BasicButton } from './common/BasicButton';
import { IngredientList } from './common/IngredientList';
import { theme } from '../styles/theme';
import { device } from '../styles/media';
import { useIngredient } from '../hooks/useIngredient';

interface SearchFormPorps {
  selectedItem: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string[]>>;
  isRecipePageSearch: boolean;
}

export const IngredientSearchForm = ({
  selectedItem,
  setSelectedItem,
  isRecipePageSearch,
}: SearchFormPorps) => {
  const {
    addItemList,
    query,
    visible,
    selectedQuery,
    handleSelect,
    handleDelete,
    addIngredient,
    handleItemList,
    setQuery,
  } = useIngredient();

  return (
    <>
      <Form onSubmit={(e) => addIngredient(e, isRecipePageSearch)}>
        <SearchWrapper>
          <TextField
            value={query}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {selectedQuery.map((item, index) => (
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
          <BasicButton
            type={isRecipePageSearch ? 'button' : 'submit'}
            $bgcolor={theme.colors.orange}
            $fontcolor={theme.colors.white}
            onClick={isRecipePageSearch ? handleItemList : undefined}
          >
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
      <IngredientList
        setSelectedIngredient={setSelectedItem}
        usedIngredient={selectedItem}
        titleList={['원래 냉장고 재료']}
      />
      {isRecipePageSearch && (
        <IngredientList
          setSelectedIngredient={setSelectedItem}
          usedIngredient={selectedItem}
          titleList={addItemList}
        />
      )}
    </>
  );
};

const Form = styled.form`
  position: relative;
`;

const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% auto;
  gap: 15px;
  margin-top: 15px;

  @media ${device.mobile} {
    grid-template-columns: 75% auto;
  }
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
