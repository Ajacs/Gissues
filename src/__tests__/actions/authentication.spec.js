import { loginHandle, logoutHandle } from 'actions/authentication';
import actionTypes from 'constants/actionTypes';

describe('Authentication actions', () => {
    let dispatch;
    let getState;
    let history = {};
    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });
   it('manage the login', async () => {
       await loginHandle('asddfsdfw4frf3', history)(dispatch, getState);
       expect(dispatch).toBeCalledWith({type: actionTypes.USER_LOGIN_REQUEST});
   });

   it('manage the logout', () => {

   });
});