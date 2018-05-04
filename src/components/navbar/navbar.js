import React, {Component} from 'react';
import {
    Menu,
    Modal,
    Header,
    Button,
    Icon,
    Form,
    Input
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import gissuesLogo from 'new_gissues.png';
import { authenticate, deleteAuthorization } from 'services/api';
import { Storage } from 'services/storage';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// @ actions
import { loginHandle, logoutHandle } from 'actions/authentication';
import PropTypes from 'proptypes';

const options = [
    {key: 'search_by_users', text: 'Search by Users', value: 'search_by_users'},
    {key: 'search_by_repositories', text: 'Search by Repositories', value: 'search_by_repositories'}
];

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        };
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
        const inlineStyle = {
            modal: {
                marginTop: '10% !important',
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        };
        const { userLogged } = this.props;
        const loginButtonAction = userLogged ? this.onLogoutClick : this.onLoginClick;
        const loginButtonText = userLogged ? 'Logout' : 'Login';
        console.log(this.props);
        return [
            (
                <section>
                    <Menu stackable>
                        <Menu.Item
                            as={Link}
                            to="/">
                            <img class="ui mini image" style={{marginRight: "2.5em"}} src={gissuesLogo}/>
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
            ), (
                <Modal open={this.state.showModal} closeIcon style={inlineStyle.modal}>
                    <Header icon='user' content='Login'/>
                    <Modal.Content>
                        <p>Your inbox is getting full, would you like us to enable automatic archiving of old
                            messages?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' inverted>
                            <Icon name='remove'/> No
                        </Button>
                        <Button color='green' inverted>
                            <Icon name='checkmark'/> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            )
        ];
    }
}

Navbar.propTypes = {
    loginHandle: PropTypes.function,
    logoutHandle: PropTypes.function,
    userLogged: PropTypes.bool
};

export default withRouter(connect(
    state => ({
        immUser: state.user
    }), {
        loginHandle: loginHandle,
        logoutHandle: logoutHandle
    }
)(Navbar));
