import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './uiReducer';
import notificationReducer from './notificationReducer';

const combinedReducers = combineReducers({
  ui: uiReducer,
  notification: notificationReducer
});

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk)
);

export default store;
