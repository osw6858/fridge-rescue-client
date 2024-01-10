import { styled } from 'styled-components';

export const CardList = () => {
  // const { data } = useSuspenseQuery({ queryKey: [QUERY_KEY.NEW_RECIPE], queryFn: getNewRecipe });
  // console.log(data);

  return (
    <Card>
      {/* {data?.map((info: Recipe) => (
        <RecipeCard
          key={info.id}
          recipeTitle={info.title}
          briefExplanation={info.summary}
          imageURL={info.recipeImageUrl}
          matchedFoodList={['당근', '무']}
          size="small"
        />
      ))} */}
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
