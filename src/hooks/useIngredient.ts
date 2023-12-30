import { useState, useEffect } from 'react';

export const useIngredient = () => {
  const [addItemList, setAddItemList] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<string[]>([]);

  useEffect(() => {
    setVisible(query !== '');
  }, [query]);

  const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setSelectedQuery([...selectedQuery, target.innerText]);
    setQuery('');
    setVisible(false);
  };

  const handleDelete = (deleteIndex: number) => {
    setSelectedQuery(selectedQuery.filter((_, index) => index !== deleteIndex));
  };

  const addIngredient = (event: React.FormEvent, isRecipePageSearch: boolean) => {
    event.preventDefault();
    if (isRecipePageSearch) {
      if (query && !selectedQuery.includes(query)) {
        setSelectedQuery([...selectedQuery, query]);
      }
      setQuery('');
    }
    if (selectedQuery.length > 0) {
      // console.log('사용자 냉장고에 재료 추가');
    }
  };

  const handleItemList = () => {
    setAddItemList([...addItemList, ...selectedQuery]);
    setSelectedQuery([]);
  };

  return {
    addItemList,
    query,
    visible,
    selectedQuery,
    handleSelect,
    handleDelete,
    addIngredient,
    handleItemList,
    setQuery,
  };
};
