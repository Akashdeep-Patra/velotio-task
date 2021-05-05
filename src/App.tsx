import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useDispatch } from 'react-redux';
import { setUsers } from './redux/users/actions';
import { setPosts } from './redux/posts/actions';
import { setComments } from './redux/comments/actions';
import { setTodos } from './redux/todos/actions';
import { fetchUsers, fetchPosts, fetchComments, fetchTodos } from './utils';

const App = () => {
  const dispatch = useDispatch();
  const setUsersState = (users: NormalizedObjects<User>) => {
    dispatch(setUsers(users));
  };
  const setPostsState = (posts: NormalizedObjects<Post>) => {
    dispatch(setPosts(posts));
  };
  const setCommentsState = (comments: NormalizedObjects<Comment>) => {
    dispatch(setComments(comments));
  };
  const setTodosState = (todos: NormalizedObjects<Todo>) => {
    dispatch(setTodos(todos));
  };
  function normalizeData<T extends DataWithId>(
    data: T[]
  ): NormalizedObjects<T> {
    const normalizedData: NormalizedObjects<T> = {
      byId: {},
      allIds: [],
    };
    data.forEach((item: T) => {
      normalizedData.byId[item.id] = item;
      normalizedData.allIds.push(item.id);
    });
    return normalizedData;
  }

  useEffect(() => {
    (async () => {
      try {
        const [users, posts, comments, todos]: [
          User[],
          Post[],
          Comment[],
          Todo[]
        ] = await Promise.all([
          fetchUsers(),
          fetchPosts(),
          fetchComments(),
          fetchTodos(),
        ]);

        setUsersState(normalizeData(users));
        setPostsState(normalizeData(posts));
        setCommentsState(normalizeData(comments));
        setTodosState(normalizeData(todos));
      } catch (error) {
        console.log(error.message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
};

export default App;
