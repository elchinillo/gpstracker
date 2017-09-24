import { call, delay, takeEvery, throttle } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { updateTrucks } from '../actions/trucks';
import { subscribe, unsubscribe } from '../api/trucks';

let subscription = null;

function* subscribeWorker() {
    if (subscription) {
        return;
    }

    subscription = {
        resolve: null
    };

    const handler = (truck) => {
        if (subscription && subscription.resolve) {
            subscription.resolve(truck);
        }
    };

    subscribe(handler);

    let truck = null;
    do {
        truck = yield new Promise(resolve => (subscription.resolve = resolve));

        if (truck) {
            yield put(updateTrucks({ [truck.uuid]: truck }));
        }
    } while(truck);
}

function* unsubscribeWorker() {
    if (!subscription) {
        return;
    }

    unsubscribe();

    subscription.resolve(null);
    subscription = null;
}

function* trucksSaga() {
    yield takeEvery('SubscribeToTrucksNotificationsAction', subscribeWorker);
    yield takeEvery('UnsubscribeFromTrucksNotificationsAction', unsubscribeWorker);
}

export default trucksSaga;
