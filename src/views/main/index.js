import React, {Component} from 'react';
import PropTypes from 'proptypes';
import LandingSearch from 'components/landingSearch/landingSearch';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {setUsername} from "actions/user";
import {setSearchValue, setSearchBy} from 'actions/search';

class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emptySearchInputError: false
        };
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onDropdownChange(event, data) {
        const {value} = data;
        this.props.setSearchBy(value);
    }

    onInputChange(event, data) {
        this.props.setSearchValue(data.value);
    }

    onSubmit(event) {
        const {immSearch} = this.props;
        event.preventDefault();
        if (immSearch.get('searchValue')) {
            const {immSearch, immUser} = this.props;
            const searchValue = immSearch.get('searchValue');
            const searchBy = immSearch.get('searchBy');

            const {currentSearch} = this.state;
            this.setState({emptySearchInputError: false});
            this.props.history.push(`/search?by=${searchBy}&val=${searchValue}`);
        } else {
            this.setState({emptySearchInputError: true});
        }
    }

    render() {
        const actions = {
            inputChange: this.onInputChange,
            dropdownChange: this.onDropdownChange,
            submit: this.onSubmit
        };
        return (
            <LandingSearch
                actions={actions}
                error={this.state.emptySearchInputError}
            />
        );
    }
}

MainView.propTypes = {
    setUsername: PropTypes.func,
    setSearchValue: PropTypes.func
};

export default withRouter(connect(
    state => ({
        immUser: state.user,
        immSearch: state.search
    }), {
        setSearchValue: setSearchValue,
        setSearchBy: setSearchBy
    }
)(MainView));
