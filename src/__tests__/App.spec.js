import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../App';
import jest from 'babel-jest';
import Immutable from 'immutable';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() });


describe('App Component', () => {

    let wrapper;

    beforeEach(() => {
        const mockedImmUser = Immutable.fromJS({
            usserLogged: false
        });
        wrapper = Enzyme.shallow(<MemoryRouter><App immUser={mockedImmUser} /></MemoryRouter>);
    });


    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});

