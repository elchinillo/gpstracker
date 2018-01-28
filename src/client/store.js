import { applyMiddleware, createStore } from 'redux';
import type { MiddlewareAPI, Store } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import ecirgasReducer from './reducers/ecirgas';
import ecirgasSaga from './sagas/ecirgas';

const initialState = {
    intl: {
        locale: 'en'
    }
};

export const setupStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];

    if (process.env.NODE_ENV != 'production') {
        middlewares.push(logger);
    }

    const store = createStore(ecirgasReducer, initialState, applyMiddleware(...middlewares));

    sagaMiddleware.run(ecirgasSaga);

    return store;
};

export default setupStore;
