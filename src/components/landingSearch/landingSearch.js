import React from 'react';
import {Container} from 'semantic-ui-react';
import 'App.css';
import gissuesLogo from 'new_gissues.png';
import SearchBar from 'components/commons/searchBar/searchBar';
import PropTypes from 'proptypes';

const options = [
    {key: 'k-users', text: 'Search by Users', value: 'users'},
    {key: 'k-repositories', text: 'Search by Repositories', value: 'repositories'}
];

const LandingSearch = ({actions, error}) => {
    const {inputChange, dropdownChange, submit} = actions;
    return (<Container text>
        <header className="App App-header">
            <img src={gissuesLogo} className="App-logo" alt="logo"/>
        </header>
        <SearchBar
            error={error}
            inputChange={inputChange}
            dropdownChange={dropdownChange}
            onSubmit={submit}
            searchOptions={options}
        />
    </Container>)
};

LandingSearch.propTypes = {
    actions: PropTypes.object,
    error: PropTypes.bool
};

export default LandingSearch;
