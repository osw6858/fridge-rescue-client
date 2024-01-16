import { styled } from 'styled-components';
import { BasicButton } from '../components/common/BasicButton';
import { BasicTitle } from '../components/common/BasicTitle';
import { theme } from '../styles/theme';
import { useState, type ChangeEvent, useEffect } from 'react';
import { useSelectItem } from '../hooks/useSelectItem';
import { IngredientSearchForm } from '../components/pages/fridge/IngredientSearchForm';
import { FaPlus } from 'react-icons/fa6';
import { useMutation } from '@tanstack/react-query';
import { addNewRecipe } from '../api/recipe';
import { BasicInput } from '../components/common/BasicInput';
import { Controller, useForm } from 'react-hook-form';
import { RecipeStep } from '../components/pages/Recipe/RecipeStep';
import { UsedIngrident } from '../components/pages/Recipe/UsedIngrident';

interface StepImage {
  image: File | null;
}

interface InputData {
  [index: number | string]: {
    content: string;
    tip: string;
    title: string;
    summary: string;
  };
}

interface Ingredient {
  name: string;
  amount: string;
}

export const AddRecipe = () => {
  const { addItemList, setAddItemList } = useSelectItem();
  const [stepImage, setStepImage] = useState<StepImage[]>([{ image: null }]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [ingredient, setIngredient] = useState<Ingredient[]>();

  useEffect(() => {
    const uniqueAddItemList = Array.from(new Set(addItemList));

    const newIngredients = uniqueAddItemList
      .filter((name) => !ingredient?.some((item) => item.name === name))
      .map((name) => ({ name, amount: '' }));

    setIngredient((prev) => [...(prev || []), ...newIngredients]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addItemList]);

  const setIngridentAmount = (name: string, amount: string) => {
    const newIngrident = ingredient?.map((item) =>
      item.name === name ? { ...item, amount } : item
    );

    setIngredient(newIngrident);
  };

  const deleteIngredientByName = (name: string) => {
    const updatedIngredients = ingredient?.filter((item) => item.name !== name);
    setIngredient(updatedIngredients);

    const updatedAddItemList = addItemList?.filter((itemName) => itemName !== name);
    setAddItemList(updatedAddItemList);
  };

  const onThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const thumbnail = event.target.files && event.target.files[0];
      setThumbnail(thumbnail);
    }
  };

  const handleImageStep = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newImage = [...stepImage];
    const file = event.target.files && event.target.files[0];

    if (file) {
      newImage[index] = {
        image: file,
      };
      setStepImage(newImage);
    }
  };

  const deleteImageStep = (index: number) => {
    const newStep = [...stepImage];
    newStep[index] = {
      ...newStep[index],
      image: null,
    };
    setStepImage(newStep);
  };

  const addRecipeMutation = useMutation({
    mutationFn: addNewRecipe,
    onError: (error) => console.log(error),
  });

  const handleAddRecipe = async (data: InputData) => {
    if (thumbnail === null) {
      // eslint-disable-next-line no-alert
      alert('썸네일은 필수 입니다.');
      return;
    }

    const steps = stepImage.map((_, index) => {
      const { content } = data[index];
      const { tip } = data[index];

      return {
        description: content,
        tip,
      };
    });

    const formData = new FormData();

    formData.append(`title`, data.title.title);
    formData.append('summary', data.summary.summary);
    formData.append(`recipeImage`, thumbnail);

    formData.append('steps', new Blob([JSON.stringify(steps)], { type: 'application/json' }));

    formData.append(
      'ingredients',
      new Blob([JSON.stringify(ingredient)], { type: 'application/json' })
    );

    stepImage.forEach((item, index) => {
      if (item.image) {
        formData.append(`stepImages[${index}]`, item.image);
      }
    });

    addRecipeMutation.mutate(formData);
  };

  const handleDeleteStep = (index: number) => {
    setStepImage(stepImage.filter((_, idx) => idx !== index));
  };

  const { control, handleSubmit } = useForm();
  const onSubmit = handleAddRecipe;

  return (
    <>
      <TitleWrapper>
        <BasicTitle title="어떤 재료를 사용할까요?" />
      </TitleWrapper>
      <IngredientSearchForm addItemList={addItemList} setAddItemList={setAddItemList} />
      <UsedIngrident
        addItemList={ingredient}
        setAddItemList={setIngridentAmount}
        deletItem={deleteIngredientByName}
      />
      <WriteContainer onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title.title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <RecipeTitle id="title.title" placeholder="레시피 제목 입력" {...field} />
          )}
        />
        <Summary>
          <Controller
            name="summary.summary"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <BasicInput
                type="text"
                id="summary.summary"
                placeholder="레시피 요약 입력"
                {...field}
              ></BasicInput>
            )}
          />
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
        {stepImage.map((e, index) => (
          <RecipeStep
            image={e.image}
            index={index}
            control={control}
            deleteImageStep={deleteImageStep}
            handleDeleteStep={handleDeleteStep}
            handleImageStep={handleImageStep}
          />
        ))}
        <BasicButton
          type="button"
          $bgcolor={theme.colors.orange}
          $fontcolor={theme.colors.white}
          onClick={() => setStepImage([...stepImage, { image: null }])}
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
