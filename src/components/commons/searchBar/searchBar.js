import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form, Input, Message } from 'semantic-ui-react';

const SearchBar = ({
  searchOptions,
  defaultSearch,
  dropdownChange,
  inputChange,
  onSubmit,
  error
}) => {

  const errorMessage = () => error ? (
    <Message
      error
      visible
      header='Value required'
      content='We can only search with a defined string.'/>
  ) : '';

  return (
    <Form onSubmit={onSubmit}>
      <Input
          fluid={true}
          action={
            <Dropdown
              button
              primary
              floating
              options={searchOptions}
              defaultValue={defaultSearch}
              onChange={dropdownChange}
            />
            }
          icon='search'
          iconPosition='left'
          placeholder='Search...'
          onChange={inputChange}
        />
        {errorMessage()}
    </Form>
  );
}

SearchBar.propTypes = {
  searchOptions: PropTypes.array,
  defaultSearch: PropTypes.string,
  dropdownChange: PropTypes.function,
  inputChange: PropTypes.function,
  onSubmit: PropTypes.function,
  error: PropTypes.boolean
};

SearchBar.defaultProps = {
  defaultSearch: 'users'
}

export default SearchBar;
