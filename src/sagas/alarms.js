import { delay, throttle } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { setAlarms } from '../actions/alarms';
import { getAlarms } from '../api/alarms';

function* fetchAlarmsWorker({ from, to }) {
    const alarms = yield getAlarms(from, to);
    yield put(setAlarms(alarms));
}

function* alarmsSaga() {
    yield throttle(5000, 'FetchAlarmsAction', fetchAlarmsWorker);
}

export default alarmsSaga;
