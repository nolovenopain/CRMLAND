export * from './domainAction';
export * from './userAction';

import { START_FETCH, FETCH_SUCCESS, FETCH_ERROR, INIT_DATA } from './type';

export const startFetchData = () => ({ type: START_FETCH });
export const fetchSuccess = () => ({ type: FETCH_SUCCESS });
export const fetchError = () => ({ type: FETCH_ERROR });