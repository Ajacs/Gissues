import actionTypes from 'constants/actionTypes';
import {
    createIssue,
    listRepositories,
    listRepositoryIssues,
    listUserRepositories
} from 'services/api';
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

const setIssueSelected = issueId => ({
    type: actionTypes.REPOSITORIES_ISSUE_SELECTED,
    payload: {
        issueId
    }
});

const repositoryIssuesRequest = () => ({
    type: actionTypes.REPOSITORIES_ISSUES_REQUEST
});

const repositoryIssuesRequestSuccess = issues => ({
    type: actionTypes.REPOSITORIES_ISSUES_REQUEST_SUCCESS,
    payload: {
        issues
    }
});

const repositoryIssuesRequestFailure = () => ({
    type: actionTypes.REPOSITORIES_ISSUES_REQUEST_FAILURE
});


const repositoryIssueCreateRequest = () => ({
    type: actionTypes.REPOSITORIES_ISSUES_CREATE_REQUEST
});

const repositoryIssueCreateRequestSuccess = () => ({
    type: actionTypes.REPOSITORIES_ISSUES_CREATE_REQUEST_SUCCESS
});

const repositoryIssueCreateRequestFailure = () => ({
    type: actionTypes.REPOSITORIES_ISSUES_CREATE_REQUEST_FAILURE
});

const setShowRepositoryCreateView = show => ({
    type: actionTypes.REPOSITORIES_SHOW_CREATE_VIEW,
    payload: {
        show
    }
});

export const fetchRepositories = (requestData) => (dispatch) => {
    const {searchBy, searchValue} = requestData;
    dispatch(repositoriesRequest());
    let fetchFunction;
    const searchByRepositories = searchBy === SEARCH_BY.REPOSITORIES;
    if (searchByRepositories) {
        fetchFunction = listRepositories({repository: searchValue});
    } else {
        fetchFunction = listUserRepositories({username: searchValue});
    }
    fetchFunction.then(response => {
        if (response.status !== 200) {
            dispatch(repositoriesRequestFailure());
        } else {
            response.json().then(repositories => {
                let repos = repositories;
                if (searchByRepositories) {
                    repos = repositories.items;
                }
                dispatch(repositoriesRequestSuccess(repos));
                dispatch(setRepositorySelected(0));
            });
        }

    })
};

export const selectRepository = repositoryId => dispatch => {
    dispatch(setRepositorySelected(repositoryId));
};

export const selectIssue = issueId => dispatch => {
    dispatch(setIssueSelected(issueId));
};

export const fetchRepositoryIssues = () => (dispatch, getState) => {
    const repoName = getState().repository.getIn(['selectedRepository', 'name']);
    const repoOwner = getState().repository.get('repositoryOwner');
    dispatch(repositoryIssuesRequest());
    listRepositoryIssues({user: repoOwner, repository: repoName}).then(
        response => {
            if (response.status !== 200) {
                dispatch(repositoryIssuesRequestFailure());
            } else {
                response.json().then(issues => {
                    dispatch(repositoryIssuesRequestSuccess(issues));
                    dispatch(selectIssue(0));
                })
            }
        }
    )
};

export const createRepositoryIssue = issueData => (dispatch, getState) => {
    dispatch(repositoryIssueCreateRequest());
    const {title, body} = issueData;
    const user = getState().repository.get('repositoryOwner');
    const repository = getState().repository.getIn(['selectedRepository', 'name']);
    createIssue({title, body, user, repository}).then(
        response => {
            if (response.status !== 201) {
                dispatch(repositoryIssueCreateRequestFailure());
            } else {
                dispatch(repositoryIssueCreateRequestSuccess());
                setTimeout(() => {
                    dispatch(setShowRepositoryCreateView(false));
                    dispatch(fetchRepositoryIssues());
                }, 3000);
            }
        }
    )
};

export const showCreateRepositoryView = () => dispatch => {
    dispatch(setShowRepositoryCreateView(true));
};