import { USER_LOGIN } from './../Actions/type';

const defaultState = {
    token: null,
    data: null
};

export default function (state = defaultState, action) {
    
    switch (action.type) {
        case USER_LOGIN:
            return { 
                ...state,
                token: action.token
            };
        default:
            return state;
    }
}