import React from 'react';
import PropTypes from 'proptypes';
import { Dropdown, Input } from 'semantic-ui-react';

const SearchBar = ({searchOptions, defaultSearch}) => (
  <Input
      fluid
      action={<Dropdown button primary floating options={searchOptions} defaultValue={defaultSearch} />}
      icon='search'
      iconPosition='left'
      placeholder='Search...'
    />
);

SearchBar.propTypes = {
  searchOptions: PropTypes.array,
  defaultSearch: PropTypes.string
};

SearchBar.defaultProps = {
  defaultSearch: 'search_by_users'
}

export default SearchBar;
