import postLogin from './../Api/postLogin';
import { USER_LOGIN } from './type';
import { startFetchData, fetchError, fetchSuccess } from './index';
import { Alert } from 'react-native';

export function setToken(token) {
    return { type: USER_LOGIN, token };
}

export function postLoginThunk(email, password) {
    return dispatch => {
        dispatch(startFetchData());
        postLogin(email, password)
            .then(response => {
                if (response.status) {
                    dispatch(setToken(response.data));
                } else {
                    Alert.alert('Thông báo', response.message);
                }
                dispatch(fetchSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchError());
            });
    };
}
