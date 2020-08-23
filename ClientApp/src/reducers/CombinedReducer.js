import { combineReducers } from 'redux'
import getBooksReducer from './ContentReducers';
import loginAccountReducer from './AccountReducers';

export default combineReducers({
    books: getBooksReducer,
    account: loginAccountReducer
})