import actionTypes from 'constants/actionTypes';


const setSearchValueData = searchValue => ({
    type: actionTypes.SEARCH_SET_VALUE,
    payload: {
        searchValue
    }
});

const searchByValue = searchBy => ({
    type: actionTypes.SEARCH_SET_BY,
    payload: {
        searchBy
    }
});


export const setSearchValue = searchValue => (dispatch) => {
    dispatch(setSearchValueData(searchValue));
};

export const setSearchBy = searchBy => dispatch => {
    dispatch(searchByValue(searchBy));
};