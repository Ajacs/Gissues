  import React, { Component } from 'react';
  import logo from './logo.svg';
  import './App.css';
  import Wizard from 'components/commons/wizard/wizard';
  import {
    Container,
    Menu,
    Input,
    Button,
    Select,
    Dropdown
  } from 'semantic-ui-react';
  import Navbar from 'components/navbar/navbar';
  import LandingSearch  from 'components/landingSearch/landingSearch';
  import gissuesLogo from 'new_gissues.png';

  class App extends Component {

    render() {
      const steps = [
        { key: 'shipping', icon: 'users', title: 'User', description: 'Select the user' },
        { key: 'billing', active: true, icon: 'github', title: 'Repository', description: 'Select the repository' },
        { key: 'confirm', disabled: true, icon: 'warning', title: 'Issue', description: 'Select or create issue' },
      ];
      return (
        <div>
          <Navbar />
          <LandingSearch />
          <Container>
            <Wizard steps={steps}>
              <p>Hola</p>
              <p>Hola</p>
              <p>Hola</p>
              <p>Hola</p>
              <p>Hola</p>
              <p>Hola</p>
            </Wizard>
          </Container>
        </div>
      );
    }
  }

  export default App;
