import styled from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKey';
import { getIngredient } from '../api/fridge';
import type { FridgeIngredient, IngredientEditList } from '../types/ingredientType';
import { IngredientAccordion } from '../components/pages/fridge/IngredientAccordion';
import { cookingComplete } from '../api/cook';

export const EditIngredient = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const recipeId: number = parseInt(location.state.recipeId, 10);

  const [cookingCompletion, setCookingCompletion] = useState(false);
  const [deleteIdList, setDeleteIdList] = useState<number[] | null>([]);
  const [editList, setEditList] = useState<IngredientEditList[] | null>([]);
  const [cookId, setCookId] = useState();

  const onAgree = () => {
    navigation('/review/post', {
      state: {
        cookId,
        recipeId,
      },
    });
  };

  const onCancel = () => {
    navigation(`/recipe/${recipeId}`);
  };

  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_INGREDIENT],
    queryFn: getIngredient,
    select: (data) => {
      return data.data.fridgeIngredientInfoList;
    },
  });

  const mutation = useMutation({
    mutationFn: cookingComplete,
    onSuccess: (data) => setCookId(data.data.id),
  });
  const handleIngredientEdit = () => {
    mutation.mutate({ recipeId, deleteIdList, editList });
    setCookingCompletion(true);
  };

  return (
    <>
      <BasicTitle title="삭제할 재료를 선택하세요!" />
      <EditIngredientContainer>
        <div className="ingredient-list">
          {data?.map((ingredient: FridgeIngredient) => {
            return (
              <IngredientAccordion
                key={ingredient.name}
                ingredient={ingredient}
                setDeleteIdList={setDeleteIdList}
                setEditList={setEditList}
              />
            );
          })}
        </div>

        <div className="buttons">
          <BasicButton
            type="button"
            $bgcolor={theme.colors.white}
            $fontcolor={theme.colors.black}
            $bordercolor={theme.colors.gray}
            $hoverbgcolor={theme.colors.lightGray}
            onClick={() => navigation(-1)}
          >
            돌아가기
          </BasicButton>
          <BasicButton
            type="button"
            $bgcolor={theme.colors.orange}
            $fontcolor={theme.colors.white}
            onClick={() => handleIngredientEdit()}
          >
            냉장고 업데이트
          </BasicButton>
        </div>
      </EditIngredientContainer>
      <ConfirmModal
        title="재료를 수정했어요!"
        description="레시피 후기를 남길까요? 취소 시 해당 레시피로 이동합니다."
        isOpen={cookingCompletion}
        handleOpen={setCookingCompletion}
        onAgree={onAgree}
        onCancel={onCancel}
      />
    </>
  );
};

const EditIngredientContainer = styled.div`
  width: 100%;
  margin: 36px 0;

  .ingredient-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .buttons {
    padding: 36px 0;
    display: flex;
    gap: 12px;
  }
`;
