import axios, { AxiosResponse } from 'axios';
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

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    const mappedData = response.data.map((user: User) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));
    return mappedData;
  } catch (error) {
    console.log('message', error.message);
    notyf.error(error.message);
    return [];
  }
};

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    const mappedData = response.data.map((post: Post) => ({
      userId: post.userId,
      id: post.id,
      title: post.title,
      body: post.body,
    }));
    return mappedData;
  } catch (error) {
    console.log('message', error.message);
    notyf.error(error.message);
    return [];
  }
};

export const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      'https://jsonplaceholder.typicode.com/comments'
    );
    const mappedData = response.data.map((comment: Comment) => ({
      postId: comment.postId,
      id: comment.id,
      name: comment.name,
      body: comment.body,
    }));
    return mappedData;
  } catch (error) {
    console.log('message', error.message);
    notyf.error(error.message);
    return [];
  }
};

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    );
    const mappedData = response.data.map((todo: Todo) => ({
      userId: todo.userId,
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }));
    return mappedData;
  } catch (error) {
    console.log('message', error.message);
    notyf.error(error.message);
    return [];
  }
};

export default useDebounce;
