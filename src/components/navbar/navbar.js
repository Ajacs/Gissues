// @ vendor
import React, {Component} from 'react';
import {
    Menu,
    Button
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import PropTypes from 'proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// @ actions
import { loginHandle, logoutHandle } from 'actions/authentication';
// @ resources
import gissuesLogo from 'new_gissues.png';



class Navbar extends Component {

    constructor(props) {
        super(props);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onLoginClick() {
        const {username, password} = this.state;
        const base64Hash = `Basic ${btoa(`${username}:${password}`)}`;
        this.props.loginHandle(base64Hash);
    }

    onLogoutClick() {
        this.props.logoutHandle(this.props.history);
    }

    onChange(event) {
        const {target: {name, value}} = event;
        this.setState({[name]: value});
    }

    render() {
        const { userLogged } = this.props;
        const loginButtonAction = userLogged ? this.onLogoutClick : this.onLoginClick;
        const loginButtonText = userLogged ? 'Logout' : 'Login';
        return (
            <section>
                <Menu stackable>
                    <Menu.Item
                        as={Link}
                        to="/main">
                        <img className="ui mini image" style={{marginRight: "2.5em"}} src={gissuesLogo}
                             alt="gissues_logo"/>
                    </Menu.Item>

                    <Menu.Item
                        as="a"
                        target="_blank"
                        href="https://github.com/Ajacs?tab=repositories"
                        name='github'>
                        Adderly Jáuregui Campos
                    </Menu.Item>

                    <Menu.Item
                        as="a"
                        target="_blank"
                        href="https://www.linkedin.com/in/adderly-j%C3%A1uregui-campos-44b32a52/"
                        name='linkedin'>
                        LinkedIn
                    </Menu.Item>

                    <Menu.Item
                        as="a"
                        target="_blank"
                        href="https://google.com"
                        name='google'>
                        ...Google?
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button primary onClick={loginButtonAction}>{loginButtonText}</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </section>
        )

    }
}

Navbar.propTypes = {
    loginHandle: PropTypes.func,
    logoutHandle: PropTypes.func,
    userLogged: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default withRouter(connect(
    state => ({
        immUser: state.user
    }), {
        loginHandle: loginHandle,
        logoutHandle: logoutHandle
    }
)(Navbar));