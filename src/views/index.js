// @vendor
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from  'react-router-dom';
// @views
import MainView from 'views/main';
import SearchView from 'views/search';
import LoginView from 'views/login';
import ProtectedView from 'views/protectedView/protectedView';

// @components
import Navbar from 'components/navbar/navbar';
const Views = ({userLogged, onSubmit, onChange, fetching}) => {
    const menu = userLogged ? (<Navbar userLogged={userLogged} />) : null;
    return (
        <div>
            {menu}
            <Switch>
                <Route exact path="/login" render={() => (
                    <LoginView
                        onChange={onChange}
                        onSubmit={onSubmit}
                        userLogged={userLogged}
                        fetching={fetching}
                    />)}
                />
                <ProtectedView path="/search" userLogged={userLogged} component={SearchView} />
                <ProtectedView path="/main" userLogged={userLogged} component={MainView}/>
            </Switch>
        </div>
    );
};

export default Views;
