import { styled } from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchAtom } from '../store/search';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKey';
import { getIngredientKeyWordSearch } from '../api/search';
import { RecipeCard } from '../components/common/RecipeCard';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import { BasicTitle } from '../components/common/BasicTitle';
import InfiniteScroll from 'react-infinite-scroll-component';
import { device } from '../styles/media';

export const SearchResult = () => {
  const [visible, setVisible] = useState(false);

  const navigation = useNavigate();
  const searchQuery = useRecoilValue(SearchAtom);
  const setSearchQuery = useSetRecoilState(SearchAtom);
  const debounceQuery = useDebounce(searchQuery, 500);

  const ingridentKeyWord = useInfiniteQuery({
    queryKey: [QUERY_KEY.INGREDIENT_SEARCH, debounceQuery],
    queryFn: ({ pageParam = 1 }) => getIngredientKeyWordSearch(debounceQuery, 'DESC', pageParam),
    getNextPageParam: (_, allPages) => allPages.length,
    initialPageParam: 0,
    enabled: !!debounceQuery,
    staleTime: 1000 * 10,
  });

  useEffect(() => {
    setVisible(debounceQuery !== '');
  }, [debounceQuery]);

  const handleGoIndex = () => {
    setSearchQuery('');
    navigation('/');
  };

  const ingredientContent = ingridentKeyWord.data
    ? ingridentKeyWord.data.pages.flatMap((page) => page.data.content)
    : [];

  const ingredientDataLength = ingredientContent.length;

  return (
    <Container>
      <FaArrowLeft onClick={handleGoIndex} />
      <BasicTitle title="키워드로 검색된 레시피" />
      {visible && !ingridentKeyWord.isRefetching ? (
        <>
          {ingredientDataLength !== 0 ? (
            <ScrollableDiv>
              <InfiniteScroll
                dataLength={ingredientDataLength}
                next={ingridentKeyWord.fetchNextPage}
                hasMore={ingridentKeyWord.hasNextPage || false}
                loader={null}
              >
                <IngredientKeyWord>
                  {ingredientContent.map((item) => (
                    <RecipeCard
                      recipeId={item.id}
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
              </InfiniteScroll>
            </ScrollableDiv>
          ) : (
            <ResultMsg>
              <p>검색하신 결과가 없습니다.</p>
            </ResultMsg>
          )}
        </>
      ) : (
        <ResultMsg>
          <p>검색하시면 결과를 보여줄게요!</p>
        </ResultMsg>
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

const ScrollableDiv = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

const IngredientKeyWord = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
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

  @media ${device.mobile} {
    grid-template-columns: 1fr;
  }
`;

const ResultMsg = styled.div`
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.darkGray};
`;
