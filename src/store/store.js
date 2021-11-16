import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import Reactotron from './ReactotronConfig';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // timeout: 0,
    version: 1,
};

const sagaMiddleware = createSagaMiddleware();
const devMode = process.env.NODE_ENV === 'development';

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [
    ...getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
        immutableCheck: {
            warnAfter: 600,
        },
    }),
    sagaMiddleware,
    thunk,
];
/* if (devMode) {
    middleware.push(logger);
} */
const store = configureStore({
    reducer: persistedReducer,
    devTools: devMode,
    middleware,
    enhancers: [Reactotron.createEnhancer()],
});
sagaMiddleware.run(rootSaga);
const persister = persistStore(store);

export { store, persister };
