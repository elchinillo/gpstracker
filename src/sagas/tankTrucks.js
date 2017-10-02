import { call, delay, takeEvery, throttle } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { updateTankTrucks } from '../actions/tankTrucks';
import { getTankTrucks } from '../api/tankTrucks';

let subscription = null;

function* subscribeWorker() {
    console.log('Subcribed');
    console.warn('Subscription implementation is missing!');
    const tankTrucks = yield getTankTrucks();
    yield put(updateTankTrucks(tankTrucks));
}

function* unsubscribeWorker() {
    console.log('Unsubcribed');
}

function* trucksSaga() {
    yield takeEvery('SubscribeToTankTrucksChannelAction', subscribeWorker);
    yield takeEvery('UnsubscribeFromTankTrucksChannelAction', unsubscribeWorker);
}

export default trucksSaga;
