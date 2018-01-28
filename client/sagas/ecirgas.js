import { fork } from 'redux-saga/effects';

import alarmsSaga from './alarms';
import servicesSaga from './services';
import tankTrucksSaga from './tankTrucks';

function* ecirgasSaga() {
    yield fork(alarmsSaga);
    yield fork(servicesSaga);
    yield fork(tankTrucksSaga);
}

export default ecirgasSaga;
