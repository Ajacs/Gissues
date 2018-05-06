import React from 'react';
import SearchBar from './searchBar';
import Enzyme from 'enzyme';
import sinon from 'sinon';

describe('SearchBar Component', () => {
    let wrapper;
    let dropdownChange;
    let inputChange;
    let onSubmit;

    beforeEach(() => {
        const searchOptions = [
            {key: 'k-users', text: 'Search by Users', value: 'users'},
            {key: 'k-repositories', text: 'Search by Repositories', value: 'repositories'}
        ];
        const defaultSearch = 'users';
        dropdownChange = () => {};
        inputChange = jest.fn();
        onSubmit = jest.fn();
        const error = false;
        wrapper = Enzyme.mount(<SearchBar
            searchOptions={searchOptions}
            defaultSearch={defaultSearch}
            dropdownChange={dropdownChange}
            inputChange={inputChange}
            onSubmit={onSubmit}
            error={error}
        />);
    });

    it('requires the prop searchOptions', () => {
        expect(wrapper.props().searchOptions).toBeDefined();
    });

    it('requires the prop defaultSearch', () => {
       expect(wrapper.props().defaultSearch).toBeDefined();
    });

    it('requires the prop dropdownChange', () => {
       expect(wrapper.props().dropdownChange).toBeDefined();
    });

    it('required the prop inputChange', () => {
       expect(wrapper.props().inputChange).toBeDefined();
    });

    it('requires the prop onSubmit', () => {
        expect(wrapper.props().onSubmit).toBeDefined();
    });

    it('requires the prop error', () => {
       expect(wrapper.props().error).toBeDefined();
    });

    it('react to change event of the input', () => {
        const input = wrapper.find('input#searchBarInput').first();
        input.simulate('change', {
            target: {
                value: 'Adderly Jauregui'
            }
        });
        expect(inputChange).toBeCalled();
    });

    it('submit the form', () => {
        const form = wrapper.find('Form').first();
        form.simulate('submit');
        expect(onSubmit).toBeCalled();
    })


});