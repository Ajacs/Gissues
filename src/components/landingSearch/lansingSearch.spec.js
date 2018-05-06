import React from 'react';
import ReactDOM from 'react-dom';
import LandingSearch  from './landingSearch';
import jest from 'babel-jest';
import Immutable from 'immutable';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() });


describe('LandingSearch Component', () => {

    let wrapper;
    let options;

    beforeEach(() => {
        options = [
            {key: 'k-users', text: 'Search by Users', value: 'users'},
            {key: 'k-repositories', text: 'Search by Repositories', value: 'repositories'}
        ];
        const actions = {
            inputChange: () => {},
            dropdownChange: () => {},
            submit: () => {}
        };
        wrapper = Enzyme.mount(<LandingSearch actions={actions} error={false}/>);
    });


    it('renders MainView without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('requires actions prop', () => {
        expect(wrapper.props().actions).toBeDefined();
    });

    it('requires error prop', () => {
        expect(wrapper.props().error).toBeDefined();
    });

    it('contains a header', () => {
        const header = wrapper.find('header');
        expect(header.length).toEqual(1);
    });

    it('contains the searchBar component', () => {
        const searchBar = wrapper.find('SearchBar');
        expect(searchBar.length).toEqual(1);
    });

    it('pass error false to searchbar componentn', () => {
        const searchBar = wrapper.find('SearchBar');
        expect(searchBar.prop('error')).toEqual(false);
    });

    it('pass options to searchbar componentn', () => {
        const searchBar = wrapper.find('SearchBar');
        expect(searchBar.prop('searchOptions')).toEqual(options);
    });

});

