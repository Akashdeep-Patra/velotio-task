import axios, { AxiosResponse } from 'axios';
import { User } from '../redux/users/User.type';
import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const notyf = new Notyf();
export const getUsers = async (
  queryString: string,
  page: number
): Promise<User[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      'https://api.github.com/search/users',
      {
        params: { q: `${queryString} in:user`, per_page: 10, page },
      }
    );

    return response.data.items;
  } catch (error) {
    console.log('message', error.message);
    notyf.error(error.message);
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

export const Toaster = (text: string, duration: number = 2000) => {
  notyf.success(text);
};

export default useDebounce;
