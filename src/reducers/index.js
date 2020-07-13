
import { combineReducers } from 'redux';


function user(state = null, action) {
    switch (action.type) {
        case 'SET_USER':
            return action.payload.user;
        default:
            return state;
    }
}

function company(state = null, action) {
    switch (action.type) {
        case 'SET_COMPANY':
            return action.payload.company;
        default:
            return state;
    }
}

function unit(state = null, action) {
    switch (action.type) {
        case 'SET_UNIT':
            return action.payload.unit;
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

// function companyId(state = null, action) {
//     switch (action.type) {
//         case 'SET_COMPANYID':
//             return action.payload.companyId;
//         default:
//             return state;
//     }
// }

export default combineReducers({
    user,
    company,
    unit
    //resourceType,
    // companyId
});
