import { styled } from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchAtom } from '../store/search';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKey';
import { getIngredientKeyWordSearch, getFrigeKeyWordSearch } from '../api/search';
import { ACCESS_TOKEN_KEY } from '../constants/api';
import { RecipeCard } from '../components/common/RecipeCard';
import type { SearchKeyWord } from '../types/searchResultType';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import { BasicTitle } from '../components/common/BasicTitle';
import InfiniteScroll from 'react-infinite-scroll-component';
import { device } from '../styles/media';

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

  const ingridentKeyWord = useInfiniteQuery({
    queryKey: [QUERY_KEY.INGREDIENT_SEARCH, debounceQuery],
    queryFn: ({ pageParam = 1 }) => getIngredientKeyWordSearch(debounceQuery, 'DESC', pageParam),
    getNextPageParam: (_, allPages) => allPages.length,
    initialPageParam: 0,
    enabled: !!debounceQuery,
  });

  const frigeKeyWord = useInfiniteQuery({
    queryKey: [QUERY_KEY.FRIGE_SEARCH],
    queryFn: ({ pageParam = 1 }) => getFrigeKeyWordSearch(pageParam),
    getNextPageParam: (_, allPages) => allPages.length,
    initialPageParam: 0,
    enabled: isLogIn,
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

  const dataLength = ingredientContent.length;

  return (
    <Container>
      <FaArrowLeft onClick={handleGoIndex} />
      <BasicTitle title="키워드로 검색된 레시피" />
      {visible && !ingridentKeyWord.isRefetching ? (
        <>
          {ingridentKeyWord.data?.pages.flatMap((page) => page.data.content).length !== 0 ? (
            <ScrollableDiv id="scrollableDiv" style={{ overflow: 'auto', maxHeight: '600px' }}>
              <InfiniteScroll
                dataLength={dataLength}
                next={ingridentKeyWord.fetchNextPage}
                hasMore={ingridentKeyWord.hasNextPage || false}
                loader={null}
                scrollableTarget="scrollableDiv"
              >
                <IngredientKeyWord>
                  {ingridentKeyWord.data?.pages
                    .flatMap((page) => page.data.content)
                    .map((item) => (
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
          <p>검색하시면 결과를 보여드릴게요!</p>
        </ResultMsg>
      )}
      <Divider />
      {isLogIn ? (
        <Wrapper>
          <BasicTitle title="나의 재료로 만들 수 있는 레시피" />
          <InfiniteScroll
            dataLength={dataLength}
            next={frigeKeyWord.fetchNextPage}
            hasMore={frigeKeyWord.hasNextPage || false}
            loader={null}
          >
            <FrigeSearch>
              {frigeKeyWord.data?.pages
                .flatMap((page) => page.data.content)
                .map((item: SearchKeyWord) => (
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
            </FrigeSearch>
          </InfiniteScroll>
        </Wrapper>
      ) : (
        <Wrapper>
          <BasicTitle title="나의 재료로 만들 수 있는 레시피" />
          <Info>
            <p>로그인 하면 나만의 재료로 만들 수 있는 레시피를 알 수 있어요!</p>
          </Info>
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

const Divider = styled.div`
  margin: 70px 0 40px 0;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.gray};
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
  max-height: 600px;
  min-height: 600px;
  overflow: auto;
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

const FrigeSearch = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

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

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${(props) => props.theme.colors.darkGray};
`;
