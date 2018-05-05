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

const repositoriesRequest = username => ({
   type: actionTypes.USER_REPOSITORIES_REQUEST
});

const repositoriesRequestSuccess = repositories => ({
    type: actionTypes.USER_REPOSITORIES_REQUEST_SUCCES,
    payload: {
        repositories
    }
});

const repositoriesRequestFailure = error => ({
   type: actionTypes.USER_REPOSITORIES_REQUEST_FAILURE,
   payload: {
       error
   }
});


export const fetchUserData = ({username}) => (dispatch, getState) => {
    dispatch(userDataRequest());
    getUserData({username}).then(response => {
        if(response.status !== 200) {
            dispatch(repositoriesRequestFailure())
        } else {
            response.json().then( userData => {
                dispatch(userDataRequestSuccess(userData));
            })
        }
    })
};

export const fetchUserRepositories = username => (dispatch, getState) => {
    dispatch(repositoriesRequest());
    listUserRepositories({username}).then( response => {
        //@TODO: console.log(response);
    })
};

/*
export const setUsername = username => (dispatch) => {
    dispatch(setUserName(username));
};*/
