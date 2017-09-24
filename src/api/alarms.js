// @flow
import database from './common';

export function getAlarms(from: number = 0, to: number = 0): Promise<*> {
    const now = new Date().getTime();

    return database.child('/alarms')
        .orderByChild('datetime')
        .startAt(from)
        .endAt(to || now)
        .once('value').then(snapshot => snapshot.val())
        .then(alarms => Object.keys(alarms || {}).map(key => alarms[key]).reverse());
};
