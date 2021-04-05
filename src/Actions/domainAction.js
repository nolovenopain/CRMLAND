import getDomain from './../Api/getDomain';
import { INIT_DATA } from './type';

export function initData(data) {
    return { type: INIT_DATA, data };
}

export function getDomainThunk() {
    return dispatch => {
        dispatch(startFetchData());
        getDomain()
            .then(data => {
                dispatch(initData(data))
                // dispatch(fetchSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchError());
            });
    };
}


export const getDomainListThunk = id => async (getState, dispatch) => {
    try {
        dispatch(startFetchData());
        // const {token} = await callGetUserApi(id);
        const data = await getDomain();
        
        dispatch(fetchSuccess())
        // dispatch(initData(data))
    } catch (error) {
        console.log(error);
        dispatch(fetchError());
    }
}