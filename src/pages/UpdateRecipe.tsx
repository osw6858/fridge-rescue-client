/* eslint-disable no-console */
import { BasicTitle } from '../components/common/BasicTitle';
import { UsedIngrident } from '../components/pages/Recipe/UsedIngrident';
import { IngredientSearchForm } from '../components/pages/fridge/IngredientSearchForm';
import type { Ingredient, InputData } from './AddRecipe';
import {
  DeleteWrapper,
  ImageContainer,
  ImagePreview,
  Input,
  InputContainer,
  Placeholder,
  PlusIcon,
  RecipeTitle,
  Summary,
  Thumbnail,
  TitleWrapper,
  WriteContainer,
} from './AddRecipe';
import { useRecipe } from '../hooks/useRecipe';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKey';
import { getDetailRecipe } from '../api/recipe';
import { BasicInput } from '../components/common/BasicInput';
import { BasicButton } from '../components/common/BasicButton';
import { theme } from '../styles/theme';

export const UpdateRecipe = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { recipeId } = useParams();
  const id = recipeId?.replace(':', '') as string;
  const [change, setChange] = useState(false);
  const {
    stepImage,
    thumbnail,
    ingredient,
    addItemList,
    setIngridentAmount,
    deleteIngredientByName,
    onThumbnailChange,
    onThumbnailRemove,
    handleImageStep,
    deleteImageStep,
    addRecipeMutation,
    handleDeleteStep,
    setAddItemList,
    setStepImage,
    setIngredient,
  } = useRecipe();

  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEY.UPDATE_RECIPE],
    queryFn: () => getDetailRecipe(id),
    select: (data) => data.data,
  });

  console.log(data);

  useEffect(() => {
    setAddItemList(data.recipeIngredients.map((item: Ingredient) => item.name));
    setIngredient(data.recipeIngredients);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateRecipe = (inputData: InputData) => {
    console.log(inputData);
  };

  const { control, handleSubmit } = useForm();
  const onSubmit = handleUpdateRecipe;

  return (
    <>
      <TitleWrapper>
        <BasicTitle title="어떤 재료로 수정할까요?" />
      </TitleWrapper>
      <IngredientSearchForm addItemList={addItemList} setAddItemList={setAddItemList} />
      <UsedIngrident
        addItemList={ingredient}
        setAddItemList={setIngridentAmount}
        deleteItem={deleteIngredientByName}
      />
      <WriteContainer onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title.title"
          control={control}
          defaultValue={data.title}
          render={({ field }) => (
            <RecipeTitle id="title.title" placeholder="레시피 제목 입력" {...field} />
          )}
        />
        <Summary>
          <Controller
            name="summary.summary"
            control={control}
            defaultValue={data.summary}
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
          <DeleteWrapper>
            <BasicButton
              type="button"
              $bgcolor={theme.colors.grayishWhite}
              $fontcolor={theme.colors.black}
              onClick={() => (!change ? setChange(true) : onThumbnailRemove)}
            >
              썸네일 삭제
            </BasicButton>
          </DeleteWrapper>

          {!change ? (
            <ImageContainer>
              {thumbnail ? (
                <ImagePreview src={URL.createObjectURL(thumbnail)} />
              ) : (
                <ImagePreview src={data.recipeImageUrl} />
              )}
            </ImageContainer>
          ) : (
            <>
              <ImageContainer>
                <Placeholder htmlFor="thumbnail">
                  <p>레시피의 썸네일을 등록하세요!</p>
                  <PlusIcon />
                </Placeholder>
              </ImageContainer>
              <InputContainer>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  id="thumbnail"
                  onChange={(e) => {
                    setChange(false);
                    onThumbnailChange(e);
                  }}
                />
              </InputContainer>
            </>
          )}
        </Thumbnail>
      </WriteContainer>
    </>
  );
};
