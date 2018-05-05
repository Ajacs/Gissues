import Immutable from 'immutable';
import actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
    repositories: [],
    selectedRepository: {},
    fetching: false,
    error: false
});


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

        case actionTypes.REPOSITORIES_OBJECT_SELECTED:
            return state.merge({
                selectedRepository: state.getIn(['repositories', action.payload.repositoryId])
            });

        default:
            return state;
    }
};

export default repositoryReducer;

