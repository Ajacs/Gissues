  import React, { Component } from 'react';
  import { Segment, Menu, Modal, Header, Button, Icon, Form, Input } from 'semantic-ui-react';
  import { Link } from 'react-router-dom';
  import gissuesLogo from 'new_gissues.png';
  import { authenticate, deleteAuthorization } from 'services/api';
  import { Storage } from 'services/storage';
  import classNames from 'classnames';

  const options = [
    { key: 'search_by_users', text: 'Search by Users', value: 'search_by_users' },
    { key: 'search_by_repositories', text: 'Search by Repositories', value: 'search_by_repositories' }
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
      this.inLogoutClick = this.onLogoutClick.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    onLoginClick() {
      //call to the
      const { username, password } = this.state;
      const base64Hash = `Basic ${btoa(`${username}:${password}`)}`;
      authenticate(base64Hash).then( userData => {
        Storage.localStorage.set('hash', base64Hash);
        Storage.localStorage.set('token', userData.token);
        Storage.localStorage.set('authorizationId', userData.id);
        this.setState({
          loggedIn: true
        })
      });
    }

    onLogoutClick() {
      deleteAuthorization(Storage.localStorage.get('authorizationId')).then(() => {
        Storage.localStorage.remove('hash');
        Storage.localStorage.remove('authorizationId');
        Storage.localStorage.remove('token');
        this.setState({loggedIn: false});
      });
    }

    onChange(event) {
      const { target: { name, value } } = event;
      this.setState({[name]: value});
    }

    render() {
      const inlineStyle = {
        modal : {
          marginTop: '10% !important',
          marginLeft: 'auto',
          marginRight: 'auto'
        }
      };
      const { loggedIn } = this.state;
      const loginButtonAction = loggedIn ? this.onLogoutClick : this.onLoginClick;
      const loginButtonText = loggedIn ? 'Logout': 'Login';

      return  [
        (
          <section>
          <Menu stackable>
                <Menu.Item
                  as={Link}
                  to="/">
                  <img class="ui mini image" style={{marginRight: "2.5em"}} src={gissuesLogo} />
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
                    <Menu.Item style={{visibility: this.state.loggedIn ? 'hidden' : 'visible'}}>
                        <Form.Field inline>
                          <label>User</label>
                          <Input name="username" placeholder='User' onChange={this.onChange} />
                        </Form.Field>
                    </Menu.Item>
                    <Menu.Item style={{visibility: this.state.loggedIn ? 'hidden' : 'visible'}}>
                      <Form.Field inline>
                        <label>Password</label>
                        <Input name="password" placeholder='Password' type="password" onChange={this.onChange} />
                      </Form.Field>
                    </Menu.Item>
                    <Menu.Item>
                      <Button primary onClick={loginButtonAction}>{loginButtonText}</Button>
                    </Menu.Item>
                </Menu.Menu>
              </Menu>
          </section>
        ),(
          <Modal open={this.state.showModal} closeIcon style={inlineStyle.modal}>
  <Header icon='user' content='Login' />
  <Modal.Content>
    <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
  </Modal.Content>
  <Modal.Actions>
    <Button basic color='red' inverted>
      <Icon name='remove' /> No
    </Button>
    <Button color='green' inverted>
      <Icon name='checkmark' /> Yes
    </Button>
  </Modal.Actions>
</Modal>
        )
      ];
    }
  }



  export default Navbar;
