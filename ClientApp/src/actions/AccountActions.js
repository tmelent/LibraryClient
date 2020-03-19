import { LOG_IN_ACCOUNT } from '../constants/ActionTypes';

export default function logInAccount(username, isLogged) {
    return {
        type: LOG_IN_ACCOUNT,
        username: username,
        isLogged: isLogged
    }
}

