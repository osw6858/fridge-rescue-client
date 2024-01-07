import { styled } from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { useSelectItem } from '../hooks/useSelectItem';
import { IngredientSearchForm } from '../components/IngredientSearchForm';
import { AddIngredientInfo } from '../components/AddIngredientInfo';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Ingredient } from '../types/ingredientType';
import { getIngredient } from '../api/ingredient/getIngredient';
import { QUERY_KEY } from '../constants/queryKey';

export const MyRefrigerator = () => {
  const { addItemList, setAddItemList } = useSelectItem();
  const [ingredientDetails, setIngredientDetails] = useState<Ingredient[]>(
    addItemList.map((name) => ({ name, expiredAt: '', memo: '' }))
  );

  useEffect(() => {
    const newItems = addItemList.filter(
      (item) => !ingredientDetails.some((detail) => detail.name === item)
    );

    const newDetails = newItems.map((name) => ({ name, expiredAt: '', memo: '' }));

    setIngredientDetails((prevDetails) => [...prevDetails, ...newDetails]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addItemList]);

  const handleIngredientDetails = (index: number, expiredAt: string, memo: string) => {
    const newDetails = [...ingredientDetails];
    newDetails[index] = { ...newDetails[index], expiredAt, memo };
    setIngredientDetails(newDetails);
  };

  const handleSave = async () => {
    console.log(ingredientDetails);
    setIngredientDetails([]);
  };

  const { data } = useQuery({ queryKey: [QUERY_KEY.ADD_INGREDIENT], queryFn: getIngredient });

  return (
    <>
      <BasicTitle title="나의 냉장고" />
      <Container>
        <IngredientSearchForm addItemList={addItemList} setAddItemList={setAddItemList} />
        <Wrapper>
          {ingredientDetails.map((ingredient, index) => (
            <AddIngredientInfo
              key={index}
              name={ingredient.name}
              expiredAt={ingredient.expiredAt}
              memo={ingredient.memo}
              handleIngredientDetails={handleIngredientDetails}
              index={index}
            />
          ))}
        </Wrapper>

        <BasicButton
          type="button"
          $bgcolor={theme.colors.orange}
          $fontcolor={theme.colors.white}
          onClick={handleSave}
        >
          저장
        </BasicButton>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-bottom: 50px;
  padding: 45px 20px 45px 20px;
  border-radius: 15px;

  & > button {
    margin-top: 30px;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 5px;
`;
