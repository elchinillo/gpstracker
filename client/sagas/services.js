import { delay, throttle } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { setServices } from '../actions/services';
import { getServices } from '../api/services';

function* fetchServicesWorker({ from, to }) {
    const services = yield getServices(from, to);
    yield put(setServices(services));
}

function* servicesSaga() {
    yield throttle(5000, 'FetchServicesAction', fetchServicesWorker);
}

export default servicesSaga;
