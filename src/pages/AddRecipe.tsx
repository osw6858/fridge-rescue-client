import { styled } from 'styled-components';
import { BasicButton } from '../components/common/BasicButton';
import { BasicTitle } from '../components/common/BasicTitle';
import { theme } from '../styles/theme';
import { useState, type ChangeEvent } from 'react';
import { useSelectItem } from '../hooks/useSelectItem';
import { IngredientSearchForm } from '../components/pages/fridge/IngredientSearchForm';
import { IngredientList } from '../components/common/IngredientList';
import { RecipeStep } from '../components/pages/Recipe/RecipeStep';

interface Step {
  image: File | null;
  content: string;
}

export const AddRecipe = () => {
  const { selectedItem, setSelectedItem, addItemList, setAddItemList } = useSelectItem();
  const [step, setStep] = useState<Step[]>([{ image: null, content: '' }]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

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

  const onThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const thumbnail = event.target.files && event.target.files[0];
      setThumbnail(thumbnail);
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
    const target = e.target as typeof e.target & {
      title: { value: string };
    };
    const title = target.title.value;

    const formData = new FormData();

    selectedItem.forEach((ingredient, index) => {
      formData.append(`usedIngredient[${index}]`, ingredient);
    });

    formData.append(`recipeTitle`, title);

    // TODO: 예외처리 보강
    if (thumbnail) {
      formData.append(`recipeImage`, thumbnail);
    } else {
      console.error('썸네일을 등록해 주세요!');
      return;
    }

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
        <Thumbnail>
          <ImageContainer>
            {thumbnail ? <ImagePreview src={URL.createObjectURL(thumbnail)} /> : <Placeholder />}
          </ImageContainer>
          <InputContainer>
            <Input type="file" accept="image/*" id="thumbnail" onChange={onThumbnailChange} />
            {thumbnail ? (
              <BasicButton
                type="button"
                $bgcolor={theme.colors.orange}
                $fontcolor={theme.colors.white}
                onClick={() => setThumbnail(null)}
              >
                썸네일 삭제
              </BasicButton>
            ) : (
              <InputLabel htmlFor="thumbnail">썸네일 업로드</InputLabel>
            )}
          </InputContainer>
        </Thumbnail>
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

const Thumbnail = styled.div`
  margin: 10px 0 40px 0;
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

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.gray};
`;

const Input = styled.input`
  display: none;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.orange};
  color: white;
  cursor: pointer;
  margin-right: 5px;
`;
