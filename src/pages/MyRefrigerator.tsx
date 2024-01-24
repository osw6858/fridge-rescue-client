import { styled } from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { useSelectItem } from '../hooks/useSelectItem';
import { IngredientSearchForm } from '../components/pages/fridge/IngredientSearchForm';
import { AddIngredientInfo } from '../components/pages/fridge/AddIngredientInfo';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { MyIngredientList } from '../components/pages/fridge/MyIngredientList';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addIngredient } from '../api/fridge';
import { QUERY_KEY } from '../constants/queryKey';
import type { AxiosError } from 'axios';
import { Suspense } from 'react';
import { FallBack } from '../components/common/FallBack';

interface IngredientInputData {
  [index: string]: {
    expiredAt: string;
    memo: string;
  };
}

interface ErrorType {
  data: {
    expiredAt: string;
  };
  message: string;
}

export const MyRefrigerator = () => {
  const { addItemList, setAddItemList } = useSelectItem();
  const { control, handleSubmit, unregister } = useForm();

  const queryClient = useQueryClient();

  const addIngridentMutation = useMutation({
    mutationFn: addIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FRIGE_SEARCH] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FRIGE_INGREDIENT] });
    },
    onError: (error: AxiosError) => {
      const { data } = error.response?.data as ErrorType;
      // eslint-disable-next-line no-alert
      alert(data.expiredAt);
    },
  });

  const deleteAddedIngredient = (index: number, name: string) => {
    unregister(name);
    const newDetailList = addItemList.filter((_, idx) => index !== idx);
    setAddItemList(newDetailList);
  };

  const handleSave = (inputData: IngredientInputData) => {
    const finalData = Object.entries(inputData).map(([name, details]) => ({
      name,
      ...details,
    }));

    addItemList.map((item) => unregister(item));
    setAddItemList([]);
    addIngridentMutation.mutate(finalData);
  };

  const onSubmit = handleSave;

  return (
    <>
      <BasicTitle title="나의 냉장고" />
      <Container>
        <IngredientSearchForm addItemList={addItemList} setAddItemList={setAddItemList} />
        <AddForm onSubmit={handleSubmit(onSubmit)}>
          <AddIngredientInfo
            control={control}
            ingredientDetails={addItemList}
            deleteAddedIngredient={deleteAddedIngredient}
          />
          {addItemList.length > 0 && (
            <BasicButton
              type="submit"
              $bgcolor={theme.colors.orange}
              $fontcolor={theme.colors.white}
            >
              재료 추가
            </BasicButton>
          )}
        </AddForm>
        <Suspense
          fallback={
            <FallbackWrapper>
              <FallBack length={3} />
            </FallbackWrapper>
          }
        >
          <MyIngredientList />
        </Suspense>
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

const AddForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 5px;

  & > button {
    margin-top: 20px;
  }
`;

const FallbackWrapper = styled.div`
  margin-top: 40px;
`;
