import { GET_BOOKS } from '../constants/ActionTypes';

export default function getBooksReducer(state = { books: [] }, action) {
    switch (action.type) {
        case GET_BOOKS:
            return Object.assign({}, state,
                {
                    books: action.books
                });
        default:
            return state;
    }
}

