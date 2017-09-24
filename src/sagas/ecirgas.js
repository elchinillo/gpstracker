import { fork } from 'redux-saga/effects';

import alarmsSaga from './alarms';
import servicesSaga from './services';
import trucksSaga from './trucks';

function* ecirgasSaga() {
    yield fork(alarmsSaga);
    yield fork(servicesSaga);
    yield fork(trucksSaga);
}

export default ecirgasSaga;
