import { styled } from 'styled-components';
import { BasicTitle } from '../components/common/BasicTitle';
import { HiTrash } from 'react-icons/hi';
import { useSelectItem } from '../hooks/useSelectItem';
import { IngredientSearchForm } from '../components/IngredientSearchForm';

export const MyRefrigerator = () => {
  const { selectedItem, setSelectedItem } = useSelectItem();
  // console.log(selectedItem);

  return (
    <>
      <BasicTitle title="나의 냉장고" />
      <Container>
        <RefrigeSection>
          <SectionName>냉장실</SectionName>
          <HiTrash />
        </RefrigeSection>
        <IngredientSearchForm
          isRecipePageSearch={false}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Container>
      <Container>
        <RefrigeSection>
          <SectionName>냉동실</SectionName>
          <HiTrash />
        </RefrigeSection>
        <IngredientSearchForm
          isRecipePageSearch={false}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-bottom: 50px;
  padding: 45px 20px 45px 20px;
  border-radius: 15px;
  background-color: #f8f8f8;
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

const SectionName = styled.h3`
  font-size: 20px;
`;
