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
  const setUsersState = (users: NormalizedObjects<NormalizedUserObject>) => {
    dispatch(setUsers(users));
  };
  const setPostsState = (posts: NormalizedObjects<NormalizedPostObject>) => {
    dispatch(setPosts(posts));
  };
  const setCommentsState = (comments: NormalizedObjects<Comment>) => {
    dispatch(setComments(comments));
  };
  const setTodosState = (todos: NormalizedObjects<Todo>) => {
    dispatch(setTodos(todos));
  };

  //function for normalizing the related data into a singular schema
  function normalizeData(
    users: User[],
    comments: Comment[],
    posts: Post[],
    todos: Todo[]
  ): [
    NormalizedObjects<NormalizedUserObject>,
    NormalizedObjects<NormalizedPostObject>,
    NormalizedObjects<Comment>,
    NormalizedObjects<Todo>
  ] {
    const normalizedUsers: NormalizedObjects<NormalizedUserObject> = {
      byId: {},
      allIds: [],
    };

    const normalizedPosts: NormalizedObjects<NormalizedPostObject> = {
      byId: {},
      allIds: [],
    };

    const normalizedComments: NormalizedObjects<Comment> = {
      byId: {},
      allIds: [],
    };

    const normalizedTodos: NormalizedObjects<Todo> = {
      byId: {},
      allIds: [],
    };
    users.forEach((item: User) => {
      normalizedUsers.byId[item.id] = {
        ...item,
        posts: posts
          .filter((post) => post.userId === item.id)
          .map((post) => post.id),
        todos: todos
          .filter((todo) => todo.userId === item.id)
          .map((todo) => todo.id),
      };
      normalizedUsers.allIds.push(item.id);
    });

    posts.forEach((post) => {
      normalizedPosts.byId[post.id] = {
        ...post,
        comments: comments
          .filter((comment) => comment.postId === post.id)
          .map((comment) => comment.id),
      };
      normalizedPosts.allIds.push(post.id);
    });

    comments.forEach((comment) => {
      normalizedComments.byId[comment.id] = comment;
      normalizedComments.allIds.push(comment.id);
    });

    todos.forEach((todo) => {
      normalizedTodos.byId[todo.id] = todo;
      normalizedTodos.allIds.push(todo.id);
    });
    return [
      normalizedUsers,
      normalizedPosts,
      normalizedComments,
      normalizedTodos,
    ];
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
        const [
          normalizedUsers,
          normalizedPosts,
          normalizedComments,
          normalizedTodos,
        ] = normalizeData(users, comments, posts, todos);
        setUsersState(normalizedUsers);
        setPostsState(normalizedPosts);
        setCommentsState(normalizedComments);
        setTodosState(normalizedTodos);
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
