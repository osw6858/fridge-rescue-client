import { useState, useEffect } from 'react';

export const useCardStyle = (size: string) => {
  const [cardSize, setCardSize] = useState({});
  const [imgSize, setImgSize] = useState({});
  const [display, setDisplay] = useState({ display: 'block' });

  useEffect(() => {
    if (size === 'large') {
      setCardSize({ maxWidth: 760, minHeight: 320 });
      setImgSize({ minWidth: 400, height: 350 });
      setDisplay({ display: 'flex' });
    } else {
      setCardSize({ maxWidth: 345, minHeight: 300, minWidth: 290 });
      setImgSize({ height: 190 });
    }
  }, [size]);

  return { cardSize, imgSize, display };
};
