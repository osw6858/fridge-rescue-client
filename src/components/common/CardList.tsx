import { styled } from 'styled-components';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../../types/recipeType';

export const CardList = () => {
  const data = [
    {
      id: 1,
      title: '떡볶이',
      summary: '요약',
      recipeImageUrl:
        'https://blog.kakaocdn.net/dn/bBeQzv/btq4dw1SNcQ/7b9ROACX8r0oWRUckQKib0/img.png',
      reviewCount: 3,
      createdAt: '2020-09-21',
      member: {
        id: 1,
        nickName: '나에요',
      },
    },
    {
      id: 1,
      title: '피자',
      summary: '요약',
      recipeImageUrl: 'https://img.hankyung.com/photo/202108/99.26501439.1-1200x.jpg',
      reviewCount: 3,
      createdAt: '2020-09-21',
      member: {
        id: 1,
        nickName: '나에요',
      },
    },
    {
      id: 1,
      title: '마라탕',
      summary: '요약',
      recipeImageUrl:
        'https://d12zq4w4guyljn.cloudfront.net/750_750_20220702061143834_photo_4fceeae73135.jpg',
      reviewCount: 3,
      createdAt: '2020-09-21',
      member: {
        id: 1,
        nickName: '나에요',
      },
    },
  ];

  return (
    <Card>
      {data?.map((info: Recipe) => (
        <RecipeCard
          key={info.id}
          recipeTitle={info.title}
          briefExplanation={info.summary}
          imageURL={info.recipeImageUrl}
          matchedFoodList={['당근', '무']}
          size="small"
        />
      ))}
    </Card>
  );
};

const Card = styled.section`
  display: flex;
  overflow-x: scroll;
  overflow-y: clip;
  align-items: flex-start;
  margin-bottom: 80px;

  &::-webkit-scrollbar {
    height: 8px;
    background-color: ${(props) => props.theme.colors.lightGray};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.gray};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.darkGray};
  }
`;
