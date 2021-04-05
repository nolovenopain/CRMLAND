
const defaultState = {
    data: []
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case 'GET_DOMAINS':
            return { 
                ...state,
                loaded: true,
                data: action.data
            };
        default:
            return state;
    }
}