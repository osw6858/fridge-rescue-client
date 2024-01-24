import InfiniteScroll from 'react-infinite-scroll-component';
import { type SearchKeyWord } from '../../../types/searchResultType';
import { useNavigate } from 'react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/queryKey';
import { getFrigeKeyWordSearch } from '../../../api/search';
import { BasicButton } from '../../common/BasicButton';
import styled from 'styled-components';
import { device } from '../../../styles/media';
import { ACCESS_TOKEN_KEY } from '../../../constants/api';
import { RecipeCard } from '../../common/RecipeCard';
import { theme } from '../../../styles/theme';
import { BasicTitle } from '../../common/BasicTitle';

export const RecommendedRecipe = () => {
  const isLogIn = !!sessionStorage.getItem(ACCESS_TOKEN_KEY);

  const navigation = useNavigate();

  const frigeKeyWord = useInfiniteQuery({
    queryKey: [QUERY_KEY.FRIGE_SEARCH],
    queryFn: ({ pageParam = 1 }) => getFrigeKeyWordSearch(pageParam),
    getNextPageParam: (_, allPages) => allPages.length,
    initialPageParam: 0,
    enabled: isLogIn,
  });

  const fridgeContent = frigeKeyWord.data
    ? frigeKeyWord.data.pages.flatMap((page) => page.data.content)
    : [];

  const fridgeDataLength = fridgeContent.length;
  return (
    <>
      <BasicTitle title="당신을 위한 추천 레시피" />
      {isLogIn ? (
        <>
          {fridgeDataLength !== 0 ? (
            <Wrapper>
              <InfiniteScroll
                dataLength={fridgeDataLength}
                next={frigeKeyWord.fetchNextPage}
                hasMore={frigeKeyWord.hasNextPage || false}
                loader={null}
              >
                <FrigeSearch>
                  {fridgeContent.map((item: SearchKeyWord) => (
                    <RecipeCard
                      key={item.id}
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
                </FrigeSearch>
              </InfiniteScroll>
            </Wrapper>
          ) : (
            <Info>
              <p>재료를 먼저 등록해 주세요!</p>

              <BasicButton
                type="button"
                $bgcolor={theme.colors.orange}
                $fontcolor={theme.colors.white}
                onClick={() => navigation('/refrigerator')}
              >
                등록하러 가기
              </BasicButton>
            </Info>
          )}
        </>
      ) : (
        <Wrapper>
          <Info>
            <p>로그인 하면 나만의 재료로 만들 수 있는 레시피를 알 수 있어요!</p>
          </Info>
        </Wrapper>
      )}
    </>
  );
};

const FrigeSearch = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media ${device.mobile} {
    grid-template-columns: 1fr;
  }
`;

const Wrapper = styled.div`
  margin-top: 45px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 200px;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 20px;

  button {
    margin-top: 25px;
    max-width: 160px;
  }
`;
