import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value.toLowerCase());

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value.toLowerCase());
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};
