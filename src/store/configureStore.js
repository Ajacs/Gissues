import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import ReduxThink from 'redux-thunk';
import { history, appReducer} from 'reducers';


export const store = createStore(reducers);
