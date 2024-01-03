import { Chip, InputAdornment, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { BasicButton } from './common/BasicButton';
import { theme } from '../styles/theme';
import { device } from '../styles/media';
import { useIngredient } from '../hooks/useIngredient';

interface SearchFormPorps {
  addItemList: string[];
  setAddItemList: React.Dispatch<React.SetStateAction<string[]>>;
  isRecipePageSearch: boolean;
}

export const IngredientSearchForm = ({
  addItemList,
  setAddItemList,
  isRecipePageSearch,
}: SearchFormPorps) => {
  const {
    query,
    visible,
    selectedQuery,
    handleSelect,
    handleDelete,
    addIngredient,
    handleItemList,
    setQuery,
  } = useIngredient({ addItemList, setAddItemList });

  return (
    <>
      <Form onSubmit={(e) => addIngredient(e, isRecipePageSearch)}>
        <SearchWrapper>
          <TextField
            value={query}
            placeholder="재료를 검색해 주세요."
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
            type="button"
            $bgcolor={theme.colors.orange}
            $fontcolor={theme.colors.white}
            onClick={handleItemList}
          >
            +
          </BasicButton>
        </SearchWrapper>
        {visible && (
          <SearchedList>
            {['당근', '딸기', '로즈마리'].map((e, i) => (
              <SearchedItem key={i} onClick={handleSelect}>
                <p>{e}</p>
              </SearchedItem>
            ))}
          </SearchedList>
        )}
      </Form>
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
