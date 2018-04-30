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
  import Views from 'views';

  class App extends Component {

    render() {
      return <Views />;
    }
  }

  export default App;
