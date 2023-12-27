import { styled } from 'styled-components';
import { IngredientList } from '../components/common/IngredientList';
import { BasicButton } from '../components/common/BasicButton';
import { BasicTitle } from '../components/common/BasicTitle';
import { theme } from '../styles/theme';
import { IngredientSearchForm } from '../components/IngredientSearchForm';

export const AddRecipe = () => {
  return (
    <>
      <TitleWrapper>
        <BasicTitle title="어떤 재료를 사용할까요?" />
        <BasicButton type="button" $bgcolor={theme.colors.orange} $fontcolor={theme.colors.white}>
          삭제
        </BasicButton>
        <IngredientSearchForm />
      </TitleWrapper>

      <IngredientList titleList={['당근', '무', '오징어']} />
    </>
  );
};

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% 50px;
`;
