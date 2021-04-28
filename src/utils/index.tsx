import axios, { AxiosResponse } from 'axios';

import { useState, useEffect } from 'react';
export const getUsers = async (
  queryString: string,
  page: number
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      'https://api.github.com/search/users',
      {
        params: { q: `${queryString} in:user`, per_page: 10, page },
      }
    );
    return response.data.items;
  } catch (error) {
    return [];
  }
};

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
