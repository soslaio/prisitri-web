
import { combineReducers } from 'redux';

function user(state = null, action) {
    switch (action.type) {
        case 'SET_USER':
            return action.payload.user;
        default:
            return state;
    }
}

export default combineReducers({
    user
});
