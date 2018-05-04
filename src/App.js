// @vendor
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// @components
import Views from 'views';
import { loginHandle, logoutHandle } from 'actions/authentication';
import { Storage } from 'services/storage';
// @resources
import './App.css';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }


    handleOnSubmit(event) {
        event.preventDefault();
        const {username, password} = this.state;
        const base64Hash = `Basic ${btoa(`${username}:${password}`)}`;
        this.props.loginHandle(base64Hash, this.props.history);
    }

    handleOnChange(event) {
        const { target: { name, value }} = event;
        this.setState({ [name]: value});
    }

    render() {
        const { immUser } = this.props;
        const userLoggedIn = Storage.localStorage.get('authorizationId') || immUser.get('loggedIn');
        const fetching = immUser.get('fetching');
        console.log(`userLoggedIn: ${userLoggedIn}`);
        return (
            <Views
                fetching={fetching}
                onChange={this.handleOnChange}
                onSubmit={this.handleOnSubmit}
                userLogged={userLoggedIn}
            />
        )
    }
}



export default withRouter(connect(
    state => ({
        immUser: state.user
    }), {
        loginHandle: loginHandle
    }
)(App));

