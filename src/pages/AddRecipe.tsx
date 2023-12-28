import { styled } from 'styled-components';
import { IngredientList } from '../components/common/IngredientList';
import { BasicButton } from '../components/common/BasicButton';
import { BasicTitle } from '../components/common/BasicTitle';
import { theme } from '../styles/theme';
import { IngredientSearchForm } from '../components/IngredientSearchForm';
import { RecipeStep } from '../components/RecipeStep';
import { useState, type ChangeEvent } from 'react';

interface Step {
  image: File | null;
  content: string;
}

export const AddRecipe = () => {
  const [step, setStep] = useState<Step[]>([{ image: null, content: '' }]);
  // console.log(step);

  const handleImageStep = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newImage = [...step];
    const file = event.target.files && event.target.files[0];

    if (file) {
      newImage[index] = {
        image: file,
        content: newImage[index].content,
      };
      setStep(newImage);
    }
  };

  const handleContentStep = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newContent = [...step];
    newContent[index] = {
      image: newContent[index].image,
      content: event.target.value,
    };
    setStep(newContent);
  };

  const deleteStep = (index: number) => {
    setStep(step.filter((_, idx) => idx !== index));
  };

  const addStep = () => {
    setStep([...step, { image: null, content: '' }]);
  };

  const deleteImageStep = (index: number) => {
    const newStep = [...step];
    newStep[index] = {
      ...newStep[index],
      image: null,
    };
    setStep(newStep);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    step.forEach((item, index) => {
      if (item.image) {
        formData.append(`step[${index}][image]`, item.image);
      }
      formData.append(`step[${index}][content]`, item.content);
    });

    // 이후 axios를 사용
  };

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
      <WriteContainer onSubmit={(e) => handleSubmit(e)}>
        <RecipeTitle placeholder="레시피 제목 입력" />
        {step.map((e, i) => (
          <RecipeStep
            key={i}
            index={i}
            image={e.image}
            deleteStep={deleteStep}
            deleteImageStep={deleteImageStep}
            handleImageStep={handleImageStep}
            handleContentStep={handleContentStep}
          />
        ))}
        <BasicButton
          type="button"
          $bgcolor={theme.colors.orange}
          $fontcolor={theme.colors.white}
          onClick={addStep}
        >
          +
        </BasicButton>
        <ButtonWrapper>
          <BasicButton type="submit" $bgcolor={theme.colors.orange} $fontcolor={theme.colors.white}>
            완료
          </BasicButton>
          <BasicButton type="button" $bgcolor={theme.colors.orange} $fontcolor={theme.colors.white}>
            돌아가기
          </BasicButton>
        </ButtonWrapper>
      </WriteContainer>
    </>
  );
};

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
`;

const WriteContainer = styled.form`
  display: grid;
  grid-template-columns: 100%;
  margin-top: 50px;
`;

const RecipeTitle = styled.input`
  height: 50px;
  border: none;
  font-size: 24px;
  padding-left: 10px;
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  gap: 4px;
  margin-top: 40px;
  justify-content: end;
`;
