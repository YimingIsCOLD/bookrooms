import { useCallback, useState } from 'react';

function useSelected<T>(initialState: T) {
  const [value, setValue] = useState<T>(initialState);

  const is = useCallback((selected: T) => value === selected, [value]);
  const set = useCallback((selected: T) => setValue(selected), []);

  return { value, is, set };
}

export default useSelected;
