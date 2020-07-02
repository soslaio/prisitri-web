
import { combineReducers } from 'redux';


function user(state = null, action) {
    switch (action.type) {
        case 'SET_USER':
            return action.payload.user;
        default:
            return state;
    }
}

// function resourceType(state = null, action) {
//     switch (action.type) {
//         case 'SET_RESOURCETYPE':
//             return action.payload.resourceType;
//         default:
//             return state;
//     }
// }

function companyId(state = null, action) {
    switch (action.type) {
        case 'SET_COMPANYID':
            return action.payload.companyId;
        default:
            return state;
    }
}

export default combineReducers({
    user,
    //resourceType,
    companyId
});
