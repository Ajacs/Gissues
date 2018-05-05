import actionTypes from 'constants/actionTypes';
import { getUserData, listUserRepositories } from 'services/api';

const userDataRequest = () => ({
  type: actionTypes.USER_DATA_REQUEST
});

const userDataRequestSuccess = user => ({
    type: actionTypes.USER_DATA_REQUEST_SUCCESS,
    payload: {
        user: user
    }
});

const userDataRequestFailure = () => ({
    type: actionTypes.USER_DATA_REQUEST_FAILURE
});

const setUserName = username => ({
  type: actionTypes.USER_SET_USERNAME,
  payload: {
      username
  }
});

export const fetchUserData = ({username}) => (dispatch, getState) => {
    dispatch(userDataRequest());
    getUserData({username}).then(response => {
        if(response.status !== 200) {
            dispatch(userDataRequestFailure());
        } else {
            response.json().then( userData => {
                dispatch(userDataRequestSuccess(userData));
            })
        }
    })
};