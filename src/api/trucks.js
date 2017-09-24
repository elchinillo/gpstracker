import database from './common';
import type { TruckType } from '../types/trucks';

const truckUpdateHandler = (handler, snapshot) => {
    handler(snapshot.val());
};

let currentHandler = null;

export function subscribe(handler: { [string]: TruckType } => void): void {
    currentHandler = truckUpdateHandler.bind(null, handler);
    database.child('/trucks').on('child_changed', currentHandler);
};

export function unsubscribe(): void {
    database.child('/trucks').off('child_changed', currentHandler);
    currentHandler = null;
};
