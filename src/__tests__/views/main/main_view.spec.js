import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from '../../../views/main';
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
        wrapper = Enzyme.shallow(<MainView />);
    });


    it('renders MainView without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
        console.log(wrapper);
        ReactDOM.unmountComponentAtNode(div);
    });

});

