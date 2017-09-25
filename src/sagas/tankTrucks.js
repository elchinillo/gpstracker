import { call, delay, takeEvery, throttle } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { updateTankTrucks } from '../actions/tankTrucks';
// import { subscribe, unsubscribe } from '../api/tankTrucks';

let subscription = null;

function* subscribeWorker() {
    console.log('Subcribed');
}

function* unsubscribeWorker() {
    console.log('Unsubcribed');
}

function* trucksSaga() {
    yield takeEvery('SubscribeToTankTrucksChannelAction', subscribeWorker);
    yield takeEvery('UnsubscribeFromTankTrucksChannelAction', unsubscribeWorker);
}

export default trucksSaga;
