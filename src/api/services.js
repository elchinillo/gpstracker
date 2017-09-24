// @flow
import database from './common';

export function getServices(from: number = 0, to: number = 0): Promise<*> {
    const now = new Date().getTime();

    return database.child('/services')
        .orderByChild('datetime')
        .startAt(from)
        .endAt(to || now)
        .once('value').then(snapshot => snapshot.val())
        .then(services => Object.keys(services || {}).reverse().map(key => services[key]));
};
