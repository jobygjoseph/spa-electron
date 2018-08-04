// @flow
import { combineReducers } from 'redux';
import types from './types';
import environments from './environments';
import document from './document';
import brands from './brands';

const rootReducer = combineReducers({
  types,
  environments,
  document,
  brands,
});

export default rootReducer;
