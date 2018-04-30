import React, { Component } from 'react';
import LandingSearch from 'components/landingSearch/landingSearch';


class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: 'users',
      searchValue: '',
      emptySearchInputError: false
    }
    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDropdownChange(event, data) {
    const { value } = data;
    this.setState({currentSearch: value});
  }

  onInputChange(event, data) {
    this.setState({searchValue: data.value});
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.searchValue) {
      const { currentSearch, searchValue } = this.state;
      this.setState({ emptySearchInputError: false});
      this.props.history.push(`/search?by=${currentSearch}&val=${searchValue}`);
    } else {
      this.setState({ emptySearchInputError: true});
    }
  }

  render() {
    const actions = {
      inputChange: this.onInputChange,
      dropdownChange: this.onDropdownChange,
      submit: this.onSubmit
    }
    return (
      <LandingSearch
        actions={actions}
        error={this.state.emptySearchInputError}
      />
    );
  }
}

export default MainView;
