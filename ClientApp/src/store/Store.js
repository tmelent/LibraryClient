import { createStore } from 'redux';
import reducer from '../reducers/CombinedReducer';

const store = createStore(reducer);
export default store;