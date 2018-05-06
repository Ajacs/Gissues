import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedView = ({userLogged, path, component}) => {
    let route = (<Redirect to="/login"/>);
    if (userLogged) {
        route = (<Route path={path} component={component}/>)
    }
    return route;
};

export default ProtectedView;