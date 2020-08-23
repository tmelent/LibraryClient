import { LOG_IN_ACCOUNT, LOG_OUT_ACCOUNT } from '../constants/ActionTypes'
export default function loginAccountReducer(state = { username: "", isLogged: false }, action) {
    switch (action.type) {
        case LOG_IN_ACCOUNT:
            return Object.assign({}, state,
                {
                    username: action.username,
                    isLogged: action.isLogged
                });
        case LOG_OUT_ACCOUNT:
            return Object.assign({}, state,
                {
                    username: action.username,
                    isLogged: action.isLogged
                })
        default:
            return state;
    }
}

