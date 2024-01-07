import { useQuery } from '@tanstack/react-query';
import { getIngredient } from '../api/ingredient/getIngredient';
import { QUERY_KEY } from '../constants/queryKey';
import styled from 'styled-components';
import { useState } from 'react';
import type { Ingredient } from '../types/ingredientType';

interface UpdatedItem {
  [key: number]: Ingredient;
}

export const MyIngredientList = () => {
  const { data } = useQuery<Ingredient[]>({
    queryKey: [QUERY_KEY.ADD_INGREDIENT],
    queryFn: getIngredient,
  });
  const [edit, setEdit] = useState<boolean>(false);
  const [deletedItems, setDeletedItems] = useState<number[]>([]);
  const [updatedItems, setUpdatedItems] = useState<UpdatedItem>({});

  const handleCheckboxChange = (id: number): void => {
    setDeletedItems((prevDeletedItems) =>
      prevDeletedItems.includes(id)
        ? prevDeletedItems.filter((itemId) => itemId !== id)
        : [...prevDeletedItems, id]
    );

    setUpdatedItems((prevUpdatedItems) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = prevUpdatedItems;
      return rest;
    });
  };

  const handleUpdate = (id: number, field: 'expiredAt' | 'memo', value: string): void => {
    if (!deletedItems.includes(id)) {
      setUpdatedItems((prevItems) => {
        const currentItem = data?.find((item) => item.id === id) ?? prevItems[id];
        return {
          ...prevItems,
          [id]: {
            ...currentItem,
            [field]: value,
          },
        };
      });
    }
  };

  const saveChanges = (): void => {
    const updatedItemsArray = Object.values(updatedItems).map((item) => ({
      id: item.id,
      name: item.name,
      expiredAt: item.expiredAt,
      memo: item.memo,
    }));

    console.log({
      deletedItems,
      updatedItems: updatedItemsArray,
    });

    // 이후 서버로 전송 로직

    // 상태 초기화
    setEdit(false);
    setDeletedItems([]);
    setUpdatedItems({});
  };

  return (
    <Container>
      <TitleWrapper>
        <p>재료 목록</p>
        {edit ? (
          <button type="button" onClick={saveChanges}>
            저장
          </button>
        ) : (
          <button type="button" onClick={() => setEdit(true)}>
            수정
          </button>
        )}
      </TitleWrapper>

      {data?.map((item) => (
        <ItemWrapper key={item.id}>
          <div>
            <p>{item.name}</p>
            {edit && (
              <input
                type="checkbox"
                checked={deletedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
            )}
          </div>
          {edit ? (
            <div>
              <input
                type="date"
                defaultValue={item.expiredAt}
                onChange={(e) => handleUpdate(item.id, 'expiredAt', e.target.value)}
              />
              <input
                type="text"
                defaultValue={item.memo}
                onChange={(e) => handleUpdate(item.id, 'memo', e.target.value)}
              />
            </div>
          ) : (
            <div>
              <p>{item.expiredAt}</p>
              <p>{item.memo}</p>
            </div>
          )}
        </ItemWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 60px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 20px 0;
  & > p {
    font-size: 20px;
    font-weight: 600;
  }
`;

const ItemWrapper = styled.div`
  margin: 10px 0 10px 0;
  padding: 14px;
`;
