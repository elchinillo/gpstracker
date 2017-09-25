// @flow
import { combineReducers } from 'redux';

import type { StateType } from '../types/ecirgas';

import alarmsReducer from './alarms';
import intlReducer from './intl';
import servicesReducer from './services';
import tankTrucksReducer from './tankTrucks';

export default combineReducers({
    alarms: alarmsReducer,
    intl: intlReducer,
    services: servicesReducer,
    tankTrucks: tankTrucksReducer
});
