import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import userReducer from './users/reducer';
import postsReducer from './posts/reducer';
import commentsReducer from './comments/reducer';
import todosReducer from './todos/reducer';
import { UserActions } from './users/actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
const middleware: any[] = [thunk as ThunkMiddleware<AppState, UserActions>];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}
export const rootReducer = combineReducers({
  users: userReducer,
  posts: postsReducer,
  comments: commentsReducer,
  todos: todosReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
