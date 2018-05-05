// @vendor
import React from 'react';
import ReactDOM  from 'react-dom';
import './index.css';
import App from 'App';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { appReducers } from 'reducers';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import ReduxThunk from 'redux-thunk';
// @ constants
import actionTypes from 'constants/actionTypes';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middlewares = [ReduxThunk, routerMiddleware(history)];

const enhancers = compose(
    applyMiddleware.apply(null, middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating

const appReducer = combineReducers({
    ...appReducers,
    router: routerReducer
});


// Reset to initial state on user logout
const rootReducer = (state, action) => {
    if(action.type === actionTypes.USER_LOGOUT_REQUEST_SUCCESS) {
        state = {}
    }
    return appReducer(state, action);
};


const store = createStore(rootReducer, enhancers);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
