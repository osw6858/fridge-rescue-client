import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { addNewRecipe } from '../api/recipe'; // addNewRecipe API 호출 함수를 임포트해야 합니다.
import type { Ingredient } from '../pages/AddRecipe';
import { useMutation } from '@tanstack/react-query';
import { useSelectItem } from './useSelectItem';

interface StepImg {
  image: File | null;
}

export function useRecipe() {
  const [stepImage, setStepImage] = useState<StepImg[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [ingredient, setIngredient] = useState<Ingredient[]>();
  const { addItemList, setAddItemList } = useSelectItem(); // addItemList state가 누락되어 있어 추가하였습니다.

  useEffect(() => {
    const uniqueAddItemList = Array.from(new Set(addItemList));
    const newIngredients = uniqueAddItemList
      .filter((name) => !ingredient?.some((item) => item.name === name))
      .map((name) => ({ name, amount: '' }));

    setIngredient((prev) => [...(prev || []), ...newIngredients]);
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

  const onThumbnailRemove = () => {
    setThumbnail(null);
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

  const handleDeleteStep = (index: number) => {
    setStepImage(stepImage.filter((_, idx) => idx !== index));
  };

  return {
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
    setIngredient,
    setAddItemList,
    setStepImage,
  };
}
