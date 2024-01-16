import { styled } from 'styled-components';
import { BasicButton } from '../components/common/BasicButton';
import { BasicTitle } from '../components/common/BasicTitle';
import { theme } from '../styles/theme';
import { useState, type ChangeEvent } from 'react';
import { useSelectItem } from '../hooks/useSelectItem';
import { IngredientSearchForm } from '../components/pages/fridge/IngredientSearchForm';
import { IngredientList } from '../components/common/IngredientList';
import { RecipeStep } from '../components/pages/Recipe/RecipeStep';
import { FaPlus } from 'react-icons/fa6';
import { useMutation } from '@tanstack/react-query';
import { addNewRecipe } from '../api/recipe';
import { BasicInput } from '../components/common/BasicInput';

interface Step {
  image: File | null;
  content: string;
  tip: string;
}

export const AddRecipe = () => {
  const { selectedItem, setSelectedItem, addItemList, setAddItemList } = useSelectItem();
  const [step, setStep] = useState<Step[]>([{ image: null, content: '', tip: '' }]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const onThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const thumbnail = event.target.files && event.target.files[0];
      setThumbnail(thumbnail);
    }
  };

  const handleImageStep = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newImage = [...step];
    const file = event.target.files && event.target.files[0];

    if (file) {
      newImage[index] = {
        image: file,
        content: newImage[index].content,
        tip: newImage[index].tip,
      };
      setStep(newImage);
    }
  };

  const handleContentStep = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newContent = [...step];
    newContent[index] = {
      image: newContent[index].image,
      content: event.target.value,
      tip: newContent[index].tip,
    };
    setStep(newContent);
  };

  const handleTipStep = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newTip = [...step];

    newTip[index] = {
      image: newTip[index].image,
      tip: event.target.value,
      content: newTip[index].content,
    };
    setStep(newTip);
  };

  const deleteImageStep = (index: number) => {
    const newStep = [...step];
    newStep[index] = {
      ...newStep[index],
      image: null,
    };
    setStep(newStep);
  };

  const addRecipeMutation = useMutation({
    mutationFn: addNewRecipe,
    onError: (error) => console.log(error),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (thumbnail === null) {
      // eslint-disable-next-line no-alert
      alert('대표 이미지는 필수 입니다.');
      return;
    }

    console.log(step);

    const target = e.target as typeof e.target & {
      title: { value: string };
      summary: { value: string };
    };
    const title = target.title.value;

    const summary = target.summary.value;

    console.log(step);

    const formData = new FormData();

    selectedItem.forEach((ingredient, index) => {
      formData.append(`name[${index + 1}]`, ingredient);
    });

    formData.append(`title`, title);
    formData.append('summary', summary);
    formData.append(`recipeImage`, thumbnail);

    step.forEach((item, index) => {
      if (item.image) {
        formData.append(`stepImages[${index + 1}]`, item.image);
      }
      formData.append(`recipe[${index + 1}]`, item.content);
      formData.append(`steptip[${index + 1}]`, item.tip);
    });

    addRecipeMutation.mutate(formData);
  };

  const handleDeleteStep = (index: number) => {
    setStep(step.filter((_, idx) => idx !== index));
  };
  return (
    <>
      <TitleWrapper>
        <BasicTitle title="어떤 재료를 사용할까요?" />
      </TitleWrapper>
      <IngredientSearchForm addItemList={addItemList} setAddItemList={setAddItemList} />

      <IngredientList
        setSelectedIngredient={setSelectedItem}
        usedIngredient={selectedItem}
        titleList={['원래 냉장고 재료']}
      />
      <IngredientList
        setSelectedIngredient={setSelectedItem}
        usedIngredient={selectedItem}
        titleList={addItemList}
      />
      <WriteContainer onSubmit={(e) => handleSubmit(e)}>
        <RecipeTitle placeholder="레시피 제목 입력" name="title" />
        <Summary>
          <BasicInput type="text" id="summary" placeholder="레시피 요약 입력"></BasicInput>
        </Summary>
        <Thumbnail>
          {thumbnail && (
            <DeleteWrapper>
              <BasicButton
                type="button"
                $bgcolor={theme.colors.grayishWhite}
                $fontcolor={theme.colors.black}
                onClick={() => setThumbnail(null)}
              >
                썸네일 삭제
              </BasicButton>
            </DeleteWrapper>
          )}
          <ImageContainer>
            {thumbnail ? (
              <ImagePreview src={URL.createObjectURL(thumbnail)} />
            ) : (
              <Placeholder htmlFor="thumbnail">
                <p>레시피의 썸네일을 등록하세요!</p>
                <PlusIcon />
              </Placeholder>
            )}
          </ImageContainer>
          <InputContainer>
            <Input type="file" accept="image/*" id="thumbnail" onChange={onThumbnailChange} />
          </InputContainer>
        </Thumbnail>
        {step.map((e, index) => (
          <RecipeStep
            key={index}
            index={index}
            image={e.image}
            content={e.content}
            tip={e.tip}
            deleteStep={handleDeleteStep}
            deleteImageStep={deleteImageStep}
            handleImageStep={handleImageStep}
            handleContentStep={handleContentStep}
            handleTipStep={handleTipStep}
          />
        ))}
        <BasicButton
          type="button"
          $bgcolor={theme.colors.orange}
          $fontcolor={theme.colors.white}
          onClick={() => setStep([...step, { image: null, content: '', tip: '' }])}
        >
          +
        </BasicButton>
        <ButtonWrapper>
          <BasicButton type="button" $bgcolor={theme.colors.orange} $fontcolor={theme.colors.white}>
            돌아가기
          </BasicButton>
          <BasicButton type="submit" $bgcolor={theme.colors.orange} $fontcolor={theme.colors.white}>
            완료
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

const Summary = styled.div`
  label {
  }

  & > input {
    border: none;
    width: 100%;
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 50px;

  button:nth-child(1) {
    margin-right: 10px;
  }
`;

const Thumbnail = styled.div`
  margin: 10px 0 5px 0;

  button {
    max-width: 90px;
    padding: 3px 3px 3px 3px;
    margin-bottom: 10px;
  }
`;

const DeleteWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Placeholder = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 3px dashed ${(props) => props.theme.colors.blue}90;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.blue};
  cursor: pointer;

  P {
    margin-bottom: 17px;
  }
`;

const Input = styled.input`
  display: none;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const PlusIcon = styled(FaPlus)`
  font-size: 24px;
  margin-bottom: 4px;
`;
