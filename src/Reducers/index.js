import { combineReducers } from 'redux';
import appReducer from './appReducer';
import domainReducer from './domainReducer';
import userReducer from './userReducer';

export default combineReducers({
    app: appReducer,
    domain: domainReducer,
    user: userReducer,
});