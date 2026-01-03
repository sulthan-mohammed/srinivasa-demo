const createSagaMiddleware = require('redux-saga').default;
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import {rootSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(sagaMiddleware),
    devTools: __DEV__,
});

sagaMiddleware.run(rootSaga);

export default store;
