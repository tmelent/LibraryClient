import { createStore } from 'redux';
import loginAccountReducer from '../reducers/AccountReducers';

const store = createStore(loginAccountReducer);
export default store;