import { eventChannel, takeEvery } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { updateTankTrucks } from '../actions/tankTrucks';
import { subscribe } from '../api/tankTrucks';

let channel = null;

function* subscribeWorker() {
    if (channel) {
        yield call(channel.close);
    }

    channel = yield call(() => eventChannel(subscribe));

    try {
        while (true) {
            let tankTrucks = yield take(channel);

            yield put(updateTankTrucks(tankTrucks));
        }
    } finally {
        // We are done
    }
}

function* unsubscribeWorker() {
    yield call(channel.close);
}

function* trucksSaga() {
    yield takeEvery('SubscribeToTankTrucksChannelAction', subscribeWorker);
    yield takeEvery('UnsubscribeFromTankTrucksChannelAction', unsubscribeWorker);
}

export default trucksSaga;
