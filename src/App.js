  import React, { Component } from 'react';
  import logo from './logo.svg';
  import gissuesLogo from './new_gissues.png';
  import './App.css';
  import {
    Container,
    Menu,
    Input,
    Button,
    Select,
    Dropdown
  } from 'semantic-ui-react';

  class App extends Component {

    render() {
      const options = [
        { key: 'search_by_users', text: 'Search by Users', value: 'search_by_users' },
        { key: 'search_by_repositories', text: 'Search by Repositories', value: 'search_by_repositories' }
      ];
      return (
        <div className="App">
        <Menu stackable>
        <Menu.Item>

        <img class="ui mini image" style={{marginRight: "2.5em"}} src={gissuesLogo} />
        </Menu.Item>

        <Menu.Item
        name='features'
        >
        Features
        </Menu.Item>

        <Menu.Item
        name='testimonials'
        >
        Testimonials
        </Menu.Item>

        <Menu.Item
        name='sign-in'
        >
        Sign-in
        </Menu.Item>
        </Menu>
        <Container text>
        <header className="App-header">
        <img src={gissuesLogo} className="App-logo" alt="logo" />
        </header>
        <Input
            fluid
            action={<Dropdown button primary floating options={options} defaultValue='search_by_users' />}
            icon='search'
            iconPosition='left'
            placeholder='Search...'
          />
        </Container>
        </div>
      );
    }
  }

  export default App;
