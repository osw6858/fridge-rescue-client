import styled from 'styled-components';
import { SmallRecipeCard } from '../common/SmallRecipeCard';

export const Index = () => {
  return (
    <IndexContainer>
      <Title>
        {/** TODO: 이곳에 타이틀 컴포넌트 추가 */}타이틀<MoreButton>더보기</MoreButton>
      </Title>
      <SamllCardList>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <SmallRecipeCard
            key={index}
            recipeTitle="레시피 제목"
            briefExplanation="간단 설명 You can add ornaments to the beginning of the component."
            imageURL="/"
            matchedFoodList={['당근', '무']}
          />
        ))}
      </SamllCardList>
      <Title>
        {/** TODO: 이곳에 타이틀 컴포넌트 추가 */}케러셀 슬라이드<MoreButton>더보기</MoreButton>
      </Title>
      <Carousel>
        {/** TODO: 이곳에 Carousel 컴포넌트 추가 */}
        <ExampleCard></ExampleCard>
      </Carousel>
    </IndexContainer>
  );
};

const IndexContainer = styled.div`
  padding: 100px 0 100px 30px; // TODO: 추후 기본 padding값 맞춰 수정 예정
  height: 100%;
  margin: 0 auto;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 30px 0;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  margin-right: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.darkGray};
`;

const SamllCardList = styled.section`
  display: flex;
  overflow-x: scroll;
  overflow-y: clip;
  align-items: flex-start;
  margin-bottom: 80px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ExampleCard = styled.div`
  background-color: black;
  height: 300px;
  min-width: 220px;
  margin: 3px;
`;

const Carousel = styled.div`
  padding-right: 30px;
`;
