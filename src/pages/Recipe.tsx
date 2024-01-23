import styled from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { RecipeCard } from '../components/common/RecipeCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ACCESS_TOKEN_KEY } from '../constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFrigeKeyWordSearch } from '../api/search';
import { QUERY_KEY } from '../constants/queryKey';
import type { SearchKeyWord } from '../types/searchResultType';
import { device } from '../styles/media';

export const Recipe = () => {
  const isLogIn = !!sessionStorage.getItem(ACCESS_TOKEN_KEY);

  const navigation = useNavigate();
  const handleRecipePost = () => {
    navigation('/add');
  };

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
    <RecipeContainer>
      <div className="header">
        <p>
          총 <span className="recipe-count">13,435개</span>의 맛있는 레시피가 있어요!
        </p>
        <BasicButton
          type="submit"
          $bgcolor={theme.colors.orange}
          $fontcolor={theme.colors.white}
          $hoverbgcolor="#ff750c"
          onClick={handleRecipePost}
        >
          레시피 등록
        </BasicButton>
      </div>
      <BasicTitle title="최신 레시피" />
      <CardList>
        <RecipeCard
          recipeId={1}
          recipeTitle="레시피 제목"
          briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
          imageURL="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42986.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=ais"
          date="2020-04-14"
          reviewCount={10}
          auther="나에요"
          viewCount={117}
          size="small"
        />
        <RecipeCard
          recipeId={1}
          recipeTitle="레시피 제목"
          briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
          imageURL="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42986.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=ais"
          date="2020-04-14"
          reviewCount={10}
          auther="나에요"
          viewCount={117}
          size="small"
        />
        <RecipeCard
          recipeId={1}
          recipeTitle="레시피 제목"
          briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
          imageURL="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42986.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=ais"
          date="2020-04-14"
          reviewCount={10}
          auther="나에요"
          viewCount={117}
          size="small"
        />
        <RecipeCard
          recipeId={1}
          recipeTitle="레시피 제목"
          briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
          imageURL="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42986.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703376000&semt=ais"
          date="2020-04-14"
          reviewCount={10}
          auther="나에요"
          viewCount={117}
          size="small"
        />
      </CardList>
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
    </RecipeContainer>
  );
};

const RecipeContainer = styled.div`
  width: 100%;

  .header {
    width: 100%;
    margin-bottom: 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button {
      width: 30%;
    }

    .recipe-count {
      font-size: 20px;
      font-family: Pretendard-SemiBold;
      color: ${(props) => props.theme.colors.blue};
    }
  }
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 48px;
`;

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
