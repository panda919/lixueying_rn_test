import { combineReducers } from '@reduxjs/toolkit';

import usersReducer from '@src/modules/users/slice';
import featuresReducer from '@src/modules/features/slice';

/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const rootReducer = combineReducers({
  users: usersReducer,
  features: featuresReducer,
});

export default rootReducer;
