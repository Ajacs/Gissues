import Immutable from 'immutable';
import actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
    error: false,
    errorMessage: '',
    fetching: false,
    loggedIn: false,
    user: {}
});

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_REQUEST:
            return state.merge({
                fetching: true
            });
        case actionTypes.USER_LOGIN_REQUEST_SUCCESS:
            return state.merge({
                fetching: false,
                loggedIn: true,
                error: false
            });
        case actionTypes.USER_LOGIN_REQUEST_FAILURE:
            const {errorMessage} = action.payload;
            return state.merge({
                fetching: false,
                loggedIn: false,
                error: true,
                errorMessage
            });

        case actionTypes.USER_LOGOUT_REQUEST:
            return state.merge({
                fetching: true
            });
        case actionTypes.USER_LOGOUT_REQUEST_SUCCESS:
            return state.merge({
                fetching: false,
                loggedIn: false,
                error: false
            });
        case actionTypes.USER_LOGOUT_REQUEST_FAILURE:
            return state.merge({
                fetching: false,
                loggedIn: true,
                error: true,
                errorMessage
            });

        case actionTypes.USER_SET_USERNAME:
            const {username} = action.payload;
            return state.merge({
                username
            });
        case actionTypes.USER_DATA_REQUEST:
            return state.merge({
                fetchin: true
            });
        case actionTypes.USER_DATA_REQUEST_SUCCESS:
            return state.merge({
                user: action.payload.user,
                fetching: false,
                error: false
            });
        case actionTypes.USER_DATA_REQUEST_FAILURE:
            return state.merge({
                fetching: false,
                error: true
            });

        default:
            return state
    }
};

export default userReducer;
