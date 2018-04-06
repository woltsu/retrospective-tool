import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './uiReducer';
import notificationReducer from './notificationReducer';
import authReducer from './authReducer';
import persistState from 'redux-localstorage';

const customSlicer = () => {
  return (state) => ({ auth: { project: state.auth.project } });
};

const enhancer = compose(
  persistState('auth', { key: 'auth', slicer: customSlicer })
);

const combinedReducers = combineReducers({
  ui: uiReducer,
  notification: notificationReducer,
  auth: authReducer,
});

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk),
  enhancer
);

export default store;
