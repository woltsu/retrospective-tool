import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './uiReducer';
import notificationReducer from './notificationReducer';
import projectReducer from './projectReducer';
import persistState from 'redux-localstorage';

const customSlicer = () => {
  return (state) => ({ project: { name: state.project.name, token: state.project.token }});
};

const enhancer = compose(
  persistState('project', { key: 'project', slicer: customSlicer })
);

const combinedReducers = combineReducers({
  ui: uiReducer,
  notification: notificationReducer,
  project: projectReducer,
});

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk),
  enhancer
);

export default store;
