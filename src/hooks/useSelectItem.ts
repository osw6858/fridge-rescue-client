import { useState } from 'react';

export const useSelectItem = () => {
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  return { selectedItem, setSelectedItem };
};
