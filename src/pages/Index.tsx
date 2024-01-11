import styled from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { Suspense } from 'react';
import { FallBack } from '../components/common/FallBack';
import { Carousel } from '../components/common/Carousel';
import { CardList } from '../components/common/CardList';

export const Index = () => {
  const testImage = [
    'https://blog.kakaocdn.net/dn/bBeQzv/btq4dw1SNcQ/7b9ROACX8r0oWRUckQKib0/img.png',
    'https://img.hankyung.com/photo/202108/99.26501439.1-1200x.jpg',
    'https://d12zq4w4guyljn.cloudfront.net/750_750_20220702061143834_photo_4fceeae73135.jpg',
  ];

  return (
    <>
      <IndexContainer>
        <Title>
          <BasicTitle title="최신 레시피" />
          <MoreButton>더보기</MoreButton>
        </Title>
        <Suspense fallback={<FallBack length={5} />}>
          <CardList />
        </Suspense>
        <Title>
          <BasicTitle title="인기 레시피" />
          <MoreButton>더보기</MoreButton>
        </Title>
        <Carousel carouselImageInfo={testImage} dotsState viewCount={1} />
      </IndexContainer>
    </>
  );
};

const IndexContainer = styled.div`
  height: 100%;
  margin: 0 auto;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  margin-right: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.darkGray};
`;
