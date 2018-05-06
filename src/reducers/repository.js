import Immutable from 'immutable';
import actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
    repositories: [],
    selectedRepository: {},
    selectedRepositoryIssues: [],
    selectedIssue: {},
    fetching: false,
    error: false,
    repositoryOwner: '',
    showCreationView: false,
    success: false
});


const getRepositoryOwner = url => {
    return url.split('/').reverse()[1];
};

const repositoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.REPOSITORIES_REQUEST:
            return state.merge({
                fetching: true
            });

        case actionTypes.REPOSITORIES_REQUEST_SUCCESS:
            return state.merge({
                fetching: false,
                error: false,
                repositories: action.payload.repositories,
            });

        case actionTypes.REPOSITORIES_REQUEST_FAILURE:
            return state.merge({
                error: true,
                fetching: false
            });

        case actionTypes.REPOSITORIES_ISSUES_REQUEST:
            return state.merge({
                fetching: true
            });

        case actionTypes.REPOSITORIES_ISSUES_REQUEST_SUCCESS:
            return state.merge({
                fetching: false,
                error: false,
                selectedRepositoryIssues: action.payload.issues,
            });

        case actionTypes.REPOSITORIES_ISSUES_REQUEST_FAILURE:
            return state.merge({
                error: true,
                fetching: false
            });

        case actionTypes.REPOSITORIES_OBJECT_SELECTED:
            const selectedRepository = state.getIn(['repositories', action.payload.repositoryId]);
            const repositoryOwner = getRepositoryOwner(selectedRepository.get('url'));
            return state.merge({
                selectedRepository,
                repositoryOwner
            });

        case actionTypes.REPOSITORIES_ISSUE_SELECTED:
            return state.merge({
                selectedIssue: state.getIn(['selectedRepositoryIssues', action.payload.issueId])
            });

        case actionTypes.REPOSITORIES_ISSUES_CREATE_REQUEST:
            return state.merge({
                fetching: true
            });

        case actionTypes.REPOSITORIES_ISSUES_CREATE_REQUEST_SUCCESS:
            return state.merge({
                fetching: false,
                error: false,
                success: true
            });

        case actionTypes.REPOSITORIES_ISSUES_CREATE_REQUEST_FAILURE:

            return state.merge({
                fetching: false,
                error: true,
                success: false,
                showCreationView: true
            });

        case actionTypes.REPOSITORIES_SHOW_CREATE_VIEW:
            return state.merge({
                showCreationView: action.payload.show
            });

        default:
            return state;
    }
};

export default repositoryReducer;

