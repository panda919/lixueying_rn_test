import { createSlice, createAction } from '@reduxjs/toolkit';
import Reactotron from 'reactotron-react-native';
import _ from 'lodash';

const initState = {
    users: [],
    init: 0,
};
const usersSlice = createSlice({
    name: 'users',
    initialState: initState,
    reducers: {
        addNewUsers(state, action) {
            const { payload: newUsers } = action;
            const oldState = state;
            state.users = _.concat(state.users, newUsers);
            if (__DEV__) {
                Reactotron.display({
                    name: 'Action',
                    value: { ...action, newState: state },
                    preview: action.type,
                    important: true,
                });
            }
        },
        resetUsers(state, action) {
            state.users = [];
        },
    },
});
export const reset = createAction('RESET');

export const { addNewUsers, resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
