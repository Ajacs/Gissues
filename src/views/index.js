// @vendor
import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from  'react-router-dom';
// @views
import MainView from 'views/main';
import SearchView from 'views/search';

// @components
import Navbar from 'components/navbar/navbar';

const Views = () => (
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={MainView} />
      <Route path="/search" component={SearchView} />
    </div>
  </Router>
);

export default Views;
