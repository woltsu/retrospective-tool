import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// IMPORT ALL REDUCERS HERE

const combinedReducers = combineReducers({
  // INSERT REDUCERS HERE:
  // reducerName: reducer
});

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk)
);

export default store;
