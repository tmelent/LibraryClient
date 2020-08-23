import { GET_BOOKS } from '../constants/ActionTypes';

export default function getBooks(books) {
    return {
        type: GET_BOOKS,
        books: books
    }
}

