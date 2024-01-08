import { useState } from 'react';

export const useSelectItem = () => {
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [addItemList, setAddItemList] = useState<string[]>([]);

  return { selectedItem, setSelectedItem, addItemList, setAddItemList };
};
