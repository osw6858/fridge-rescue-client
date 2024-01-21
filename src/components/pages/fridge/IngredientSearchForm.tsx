import { Chip, InputAdornment, TextField } from '@mui/material';
import { useState, type ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { BasicButton } from '../../common/BasicButton';
import { theme } from '../../../styles/theme';
import { device } from '../../../styles/media';
import { useDebounce } from '../../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/queryKey';
import { getSearchIngredient } from '../../../api/search';
import type { Suggest } from '../../../types/ingredientType';

interface SearchFormPorps {
  addItemList: string[];
  setAddItemList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const IngredientSearchForm = ({ addItemList, setAddItemList }: SearchFormPorps) => {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<string[]>([]);

  const debounceQuery = useDebounce(query, 1000);

  useEffect(() => {
    setVisible(debounceQuery !== '');
  }, [debounceQuery]);

  const { data, isRefetching } = useQuery({
    queryKey: [QUERY_KEY.SEARCH_INGREIDENT],
    queryFn: () => getSearchIngredient(debounceQuery),
    enabled: !!debounceQuery,
    staleTime: 0,
  });

  const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setSelectedQuery([...selectedQuery, target.innerText]);
    setQuery('');
    setVisible(false);
  };

  const handleDelete = (deleteIndex: number) => {
    setSelectedQuery(selectedQuery.filter((_, index) => index !== deleteIndex));
  };

  const addIngredient = (event: React.FormEvent) => {
    event.preventDefault();
    if (query && !selectedQuery.includes(query)) {
      setSelectedQuery([...selectedQuery, query]);
    }
    setQuery('');
  };

  const handleItemList = () => {
    setAddItemList([...addItemList, ...selectedQuery]);
    setSelectedQuery([]);
  };

  return (
    <>
      <Form onSubmit={(e) => addIngredient(e)}>
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
        {visible && !isRefetching && (
          <SearchedList>
            {data?.map((e: Suggest, index: number) => (
              <SearchedItem key={index} onClick={handleSelect}>
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

export const SearchedList = styled.ul`
  display: grid;
  position: absolute;
  width: 90%;
  max-height: 300px;
`;

export const SearchedItem = styled.li`
  z-index: 20;
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.grayishWhite};
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;
