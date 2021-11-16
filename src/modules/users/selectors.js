import { createSelector } from '@reduxjs/toolkit';

export const users = (state) => state.users;
export const usersSelector = createSelector(users, (data) => data.users);
