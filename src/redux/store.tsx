import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import userReducer from './users/reducer';
import { UserActionTypes } from './users/User.type';
import logger from 'redux-logger';
const middleware: any[] = [thunk as ThunkMiddleware<AppState, UserActionTypes>];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}
export const rootReducer = combineReducers({
  users: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(...middleware));
