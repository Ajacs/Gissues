import actionTypes from 'constants/actionTypes';
import {getUserData, listUserRepositories, listRepositories} from 'services/api';
import {SEARCH_BY} from 'constants/searchTypes';


const repositoriesRequest = () => ({
    type: actionTypes.REPOSITORIES_REQUEST
});

const repositoriesRequestSuccess = repositories => ({
    type: actionTypes.REPOSITORIES_REQUEST_SUCCESS,
    payload: {
        repositories
    }
});

const repositoriesRequestFailure = () => ({
    type: actionTypes.REPOSITORIES_REQUEST_FAILURE,
});

const setRepositorySelected = repositoryId => ({
    type: actionTypes.REPOSITORIES_OBJECT_SELECTED,
    payload: {
        repositoryId
    }
});

export const fetchRepositories = (requestData) => (dispatch) => {
    const {searchBy, searchValue} = requestData;
    dispatch(repositoriesRequest());
    let fetchFunction = listUserRepositories({username: searchValue});
    if (searchBy === SEARCH_BY.REPOSITORIES) {
        fetchFunction = listRepositories({repository: searchValue});
    }
    fetchFunction.then(response => {
        if (response.status !== 200) {
            dispatch(repositoriesRequestFailure());
        } else {
            response.json().then(repositories => {
                dispatch(repositoriesRequestSuccess(repositories));
                dispatch(setRepositorySelected(0));
            });
        }

    })
};

export const selectRepository = repositoryId => dispatch => {
    dispatch(setRepositorySelected(repositoryId));
};