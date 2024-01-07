import { styled } from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { useSelectItem } from '../hooks/useSelectItem';
import { IngredientSearchForm } from '../components/IngredientSearchForm';
import { AddIngredientInfo } from '../components/AddIngredientInfo';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { useEffect, useState } from 'react';
import type { Ingredient } from '../types/ingredientType';
import { MyIngredientList } from '../components/MyIngredientList';

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

  const deleteAddedIngredient = (index: number) => {
    const newDetailList = ingredientDetails.filter((_, idx) => index !== idx);
    const newItemList = addItemList.filter((_, idx) => index !== idx);
    setIngredientDetails(newDetailList);
    setAddItemList(newItemList);
  };

  const handleSave = async () => {
    console.log('저장될 리스트', ingredientDetails);

    // TODO: 여기에 서버에 보내는 로직을 추가
    setIngredientDetails([]);
    setAddItemList([]);
  };

  return (
    <>
      <BasicTitle title="나의 냉장고" />
      <Container>
        <IngredientSearchForm addItemList={addItemList} setAddItemList={setAddItemList} />
        <Wrapper>
          <AddIngredientInfo
            ingredientDetails={ingredientDetails}
            handleIngredientDetails={handleIngredientDetails}
            deleteAddedIngredient={deleteAddedIngredient}
          />

          {ingredientDetails.length > 0 && (
            <BasicButton
              type="button"
              $bgcolor={theme.colors.orange}
              $fontcolor={theme.colors.white}
              onClick={handleSave}
            >
              재료 추가
            </BasicButton>
          )}
        </Wrapper>
        <MyIngredientList />
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

  & > button {
    margin-top: 20px;
  }
`;
