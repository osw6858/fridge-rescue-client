import { useState, useEffect } from 'react';

export const useIngredient = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  useEffect(() => {
    setVisible(query !== '');
  }, [query]);

  const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setSelectedItem([...selectedItem, target.innerText]);
    setQuery('');
    setVisible(false);
  };

  const handleDelete = (deleteIndex: number) => {
    setSelectedItem(selectedItem.filter((_, index) => index !== deleteIndex));
  };

  const addIngredient = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return { query, setQuery, visible, selectedItem, handleSelect, handleDelete, addIngredient };
};
