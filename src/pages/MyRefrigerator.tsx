import { styled } from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { useSelectItem } from '../hooks/useSelectItem';
import { IngredientSearchForm } from '../components/IngredientSearchForm';
import { IngredientInfo } from '../components/IngredientInfo';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { useEffect, useState } from 'react';

interface Ingredient {
  name: string;
  expiredAt: string;
  memo: string;
}

export const MyRefrigerator = () => {
  const { addItemList, setAddItemList } = useSelectItem();
  const [ingredientDetails, setIngredientDetails] = useState<Ingredient[]>(
    addItemList.map((name) => ({ name, expiredAt: '', memo: '' }))
  );
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    setIngredientDetails(addItemList.map((name) => ({ name, expiredAt: '', memo: '' })));
    setIsSave(false);
  }, [addItemList]);

  const updateIngredientDetails = (index: number, expiredAt: string, memo: string) => {
    const newDetails = [...ingredientDetails];
    newDetails[index] = { ...newDetails[index], expiredAt, memo };
    setIngredientDetails(newDetails);
  };

  const handleSave = async () => {
    const hasEmptyExpiredAt = ingredientDetails.some((item) => item.expiredAt === '');

    if (hasEmptyExpiredAt) {
      // alert('모든 재료의 유통기한을 입력해주세요.');
      return;
    }
    setIsSave(!isSave);
    console.log(ingredientDetails);
  };

  // const removeIngredient = (index: number) => {
  //   setAddItemList(addItemList.filter((_, i) => i !== index));
  //   setIngredientDetails(ingredientDetails.filter((_, i) => i !== index));
  // };

  return (
    <>
      <BasicTitle title="나의 냉장고" />
      <Container>
        <RefrigeSection></RefrigeSection>
        <IngredientSearchForm
          isRecipePageSearch={false}
          addItemList={addItemList}
          setAddItemList={setAddItemList}
        />
        {ingredientDetails.map((ingredient, index) => (
          <IngredientInfo
            key={index}
            name={ingredient.name}
            expiredAt={ingredient.expiredAt}
            memo={ingredient.memo}
            updateIngredientDetails={updateIngredientDetails}
            index={index}
            isSave={isSave}
          />
        ))}
        {isSave ? (
          <BasicButton
            type="button"
            $bgcolor={theme.colors.orange}
            $fontcolor={theme.colors.white}
            onClick={handleSave}
          >
            수정
          </BasicButton>
        ) : (
          <BasicButton
            type="button"
            $bgcolor={theme.colors.orange}
            $fontcolor={theme.colors.white}
            onClick={handleSave}
          >
            저장
          </BasicButton>
        )}
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

const RefrigeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > button {
    width: 70px;
  }

  & > svg {
    width: 25px;
    height: 25px;
    margin-right: 13px;
    fill: ${(props) => props.theme.colors.darkGray};
  }
`;
