import { styled } from 'styled-components';
import { IngredientSearchForm } from '../components/IngredientSearchForm';
import { BasicTitle } from '../components/common/BasicTitle';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';
import { IngredientList } from '../components/common/IngredientList';
import { useSelectItem } from '../hooks/useSelectItem';

export const MyRefrigerator = () => {
  const { selectedItem, setSelectedItem } = useSelectItem();

  // console.log(selectedItem);

  return (
    <>
      <BasicTitle title="나의 냉장고" />
      <Container>
        <RefrigeSection>
          <SectionName>냉장실</SectionName>
          <BasicButton type="button" $bgcolor={theme.colors.orange} $fontcolor={theme.colors.white}>
            삭제
          </BasicButton>
        </RefrigeSection>
        <IngredientSearchForm />
        <IngredientList
          titleList={['당근', '닭고기', '무', '로즈마리']}
          setSelectedIngredient={setSelectedItem}
          usedIngredient={selectedItem}
        />
      </Container>
      <Container>
        <RefrigeSection>
          <SectionName>냉동실</SectionName>
          <BasicButton type="button" $bgcolor={theme.colors.orange} $fontcolor={theme.colors.white}>
            삭제
          </BasicButton>
        </RefrigeSection>
        <IngredientSearchForm />
        <IngredientList
          titleList={['당근', '닭고기', '무', '로즈마리']}
          setSelectedIngredient={setSelectedItem}
          usedIngredient={selectedItem}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-bottom: 90px;
`;

const RefrigeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  & > button {
    width: 70px;
  }
`;

const SectionName = styled.h3`
  font-size: 20px;
`;
