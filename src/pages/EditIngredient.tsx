import styled from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { IngredientList } from '../components/common/IngredientList';
import { useSelectItem } from '../hooks/useSelectItem';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useState } from 'react';

export const EditIngredient = () => {
  const navigation = useNavigate();
  const [cookingCompletion, setCookingCompletion] = useState(false);
  const { selectedItem, setSelectedItem } = useSelectItem();

  const onAgree = () => {
    navigation('/review/post');
  };
  const onCancel = () => {
    navigation('/recipe/1');
  };

  return (
    <>
      <BasicTitle title="어떤 재료를 사용했나요?" />
      <EditIngredientContainer>
        <div className="ingredient-list">
          <IngredientList
            setSelectedIngredient={setSelectedItem}
            usedIngredient={selectedItem}
            titleList={[
              '김치',
              '오이',
              '당근',
              '부침가루',
              '만두',
              '동그랑땡',
              '김치',
              '오이',
              '당근',
              '부침가루',
              '만두',
              '동그랑땡',
              '만두',
              '동그랑땡',
              '김치',
              '오이',
              '당근',
              '부침가루',
              '만두',
              '동그랑땡',
              '당근',
              '부침가루',
              '만두',
              '동그랑땡',
              '김치',
              '오이',
              '당근',
              '부침가루',
              '만두',
              '동그랑땡',
              '만두',
              '동그랑땡',
              '김치',
              '오이',
              '당근',
              '부침가루',
              '만두',
              '동그랑땡',
            ]}
          />
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
            onClick={() => setCookingCompletion(true)}
          >
            재료 삭제
          </BasicButton>
        </div>
      </EditIngredientContainer>
      <ConfirmModal
        title="재료를 삭제했어요!"
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
  display: grid;
  justify-content: center;

  .ingredient-list {
    display: inline-block;
  }

  .buttons {
    padding: 36px 0;
    display: flex;
    gap: 12px;
  }
`;
