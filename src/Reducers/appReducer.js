import { START_FETCH, FETCH_SUCCESS, FETCH_ERROR } from './../Actions/type';

const AppState = {
    loadData: false,
    loadError: false,
};

export default function (state = AppState, action) {
    switch (action.type) {
        case START_FETCH:
            return { loadError: false, loadData: true };
        case FETCH_SUCCESS:
            return { 
                loadError: false, 
                loadData: false,
            };
        case FETCH_ERROR:
            return { loadData: true, loadError: true };
        default:
            return state;
    }
}
