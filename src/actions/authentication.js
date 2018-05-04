import actionTypes from 'constants/actionTypes';
import { authenticate, deleteAuthorization } from 'services/api';
import { Storage } from 'services/storage';

const loginSuccess = ({avatar_url, name}) => ({
    type: actionTypes.USER_LOGIN_REQUEST_SUCCESS,
    payload: {
        name,
        avatar_url
    }
});

const loginFailure = errorMessage => ({
    type: actionTypes.USER_LOGIN_REQUEST_FAILURE,
    payload: {
        errorMessage
    }
});

const loginRequest = () => ({
    type: actionTypes.USER_LOGIN_REQUEST
});

const logoutSuccess = () => ({
    type: actionTypes.USER_LOGOUT_REQUEST_SUCCESS
});

const logoutFailure = () => ({
    type: actionTypes.USER_LOGOUT_REQUEST_FAILURE
});

const logoutRequest = () => ({
    type: actionTypes.USER_LOGOUT_REQUEST
});


export const loginHandle = (hash, history) => (dispatch) => {
    dispatch(loginRequest());
    authenticate(hash)
        .then( (response) => {
            if(response.status !== 201) { //Unauthorized
                dispatch(loginFailure("FAIL"));
            } else {
                response.json().then( data => {
                    Storage.localStorage.set('authorizationId', data.id);
                    Storage.localStorage.set('token', data.token);
                    Storage.localStorage.set('hash', hash);
                    dispatch(loginSuccess(data));
                    history.push('/main');
                });
            }
        })
        .catch(error => dispatch(loginFailure(error)))
};

export const logoutHandle = history => (dispatch, getState) => {
    dispatch(logoutRequest());
    deleteAuthorization(Storage.localStorage.get('authorizationId'))
        .then(response => {
            if(response.status !== 204) {
                dispatch(logoutFailure());
            } else {
                dispatch(logoutSuccess());
                Storage.localStorage.remove('authorizationId');
                Storage.localStorage.remove('token');
                Storage.localStorage.remove('hash');
                history.push('/login')
            }
        })
};