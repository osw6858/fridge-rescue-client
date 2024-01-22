import { styled } from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchAtom } from '../store/search';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKey';
import { getIngredientKeyWordSearch, getFrigeKeyWordSearch } from '../api/search';
import { ACCESS_TOKEN_KEY } from '../constants/api';
import { RecipeCard } from '../components/common/RecipeCard';
import type { SearchKeyWord } from '../types/searchResultType';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import { BasicTitle } from '../components/common/BasicTitle';

interface IsLogInProps {
  $isLogIn: boolean;
}

export const SearchResult = () => {
  const [visible, setVisible] = useState(false);

  const navigation = useNavigate();
  const searchQuery = useRecoilValue(SearchAtom);
  const setSearchQuery = useSetRecoilState(SearchAtom);
  const isLogIn = !!sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const debounceQuery = useDebounce(searchQuery, 500);

  const ingridentKeyWord = useQuery({
    queryKey: [QUERY_KEY.INGREDIENT_SEARCH, debounceQuery],
    queryFn: () => getIngredientKeyWordSearch(debounceQuery, 'DESC'),
    select: (data) => data.data.content,
    enabled: !!debounceQuery,
  });

  const frigeKeyWord = useQuery({
    queryKey: [QUERY_KEY.FRIGE_SEARCH],
    queryFn: getFrigeKeyWordSearch,
    select: (data) => data.data.content,
    enabled: isLogIn,
  });

  useEffect(() => {
    setVisible(debounceQuery !== '');
  }, [debounceQuery]);

  const handleGoIndex = () => {
    setSearchQuery('');
    navigation('/');
  };

  return (
    <Container>
      <FaArrowLeft onClick={handleGoIndex} />
      <BasicTitle title="키워드로 검색된 레시피" />
      {visible && !ingridentKeyWord.isRefetching ? (
        <>
          {ingridentKeyWord.data?.length !== 0 ? (
            <IngredientKeyWord $isLogIn={isLogIn}>
              {ingridentKeyWord.data?.map((item: SearchKeyWord) => (
                <RecipeCard
                  recipeTitle={item.title}
                  briefExplanation={item.summary}
                  imageURL={item.imageUrl}
                  date={item.createdAt}
                  reviewCount={item.reviewCount}
                  auther={item.author.nickname}
                  viewCount={item.viewCount}
                  size="small"
                ></RecipeCard>
              ))}
            </IngredientKeyWord>
          ) : (
            <ResultMsg>
              <p>검색하신 결과가 없습니다.</p>
            </ResultMsg>
          )}
        </>
      ) : (
        <ResultMsg>
          <p>검색하시면 결과를 보여드릴게요!</p>
        </ResultMsg>
      )}
      {isLogIn && (
        <Wrapper>
          <BasicTitle title="나의 재료로 만들 수 있는 레시피" />
          <IngredientKeyWord $isLogIn={isLogIn}>
            {frigeKeyWord.data?.map((item: SearchKeyWord) => (
              <RecipeCard
                recipeTitle={item.title}
                briefExplanation={item.summary}
                imageURL={item.imageUrl}
                date={item.createdAt}
                reviewCount={item.reviewCount}
                auther={item.author.nickname}
                viewCount={item.viewCount}
                size="small"
              ></RecipeCard>
            ))}
          </IngredientKeyWord>
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  svg {
    cursor: pointer;
    margin-bottom: 15px;
  }
`;

const Wrapper = styled.div`
  margin-top: 45px;
`;

const IngredientKeyWord = styled.div<IsLogInProps>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-height: ${(props) => (props.$isLogIn ? '600px' : '100%')};
  overflow-y: ${(props) => (props.$isLogIn ? 'scroll' : '100%')};
  margin-top: 20px;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: ${(props) => props.theme.colors.lightGray};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.gray};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.darkGray};
  }
`;

const ResultMsg = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.darkGray};
`;
