// @vendor
import React from 'react';
import {
    Redirect,
    Route,
    Switch
} from  'react-router-dom';
import PropTypes from 'proptypes';
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
                <Route exact path="/" render={() => <Redirect to="/login"/>}/>
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

Views.propTypes = {
    fetching: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    userLogged: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default Views;
