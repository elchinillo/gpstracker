// @flow
import { combineReducers } from 'redux';

import alarmsReducer from './alarms';
import intlReducer from './intl';
import servicesReducer from './services';
import trucksReducer from './trucks';

export default combineReducers({
    alarms: alarmsReducer,
    intl: intlReducer,
    services: servicesReducer,
    trucks: trucksReducer
});
