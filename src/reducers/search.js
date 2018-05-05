import Immutable from 'immutable';
import actionTypes from 'constants/actionTypes';

const initialState = Immutable.fromJS({
    currentStep: 1,
    searchBy: 'users',
    searchValue: ''
});

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_SET_VALUE:
            const {searchValue} = action.payload;
            return state.merge({
                searchValue
            });
        case actionTypes.SEARCH_SET_BY:
            const {searchBy} = action.payload;
            return state.merge({
                searchBy
            });


        default:
            return state
    }
};

export default searchReducer;