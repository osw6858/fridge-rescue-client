import { useState, useEffect } from 'react';

interface IngredientProps {
  addItemList: string[];
  setAddItemList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const useIngredient = ({ addItemList, setAddItemList }: IngredientProps) => {
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
  };

  const handleItemList = () => {
    setAddItemList([...addItemList, ...selectedQuery]);
    setSelectedQuery([]);
  };

  return {
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
