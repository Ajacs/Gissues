import React from 'react';
import { Container, Dropdown, Input } from 'semantic-ui-react';
import 'App.css';
import gissuesLogo from 'new_gissues.png';
import SearchBar from 'components/commons/searchBar/searchBar';
const options = [
  { key: 'search_by_users', text: 'Search by Users', value: 'search_by_users' },
  { key: 'search_by_repositories', text: 'Search by Repositories', value: 'search_by_repositories' }
];

const LandingSearch = () =>
(
  <Container text>
    <header className="App App-header">
    <img src={gissuesLogo} className="App-logo" alt="logo" />
    </header>
    <SearchBar searchOptions={options} />
  </Container>
)

export default LandingSearch;
