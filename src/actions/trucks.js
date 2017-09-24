// @flow
import type {
    TruckType, SubscribeToTrucksNotificationsAction, UnsubscribeFromTrucksNotificationsAction,
    UpdateTrucksAction
} from '../types/trucks';

type TrucksType = { [string]: TruckType };

export const subscribeToTrucksNotifications = (): SubscribeToTrucksNotificationsAction => ({
    type: 'SubscribeToTrucksNotificationsAction'
});

export const unsubscribeFromTrucksNotifications = (): UnsubscribeFromTrucksNotificationsAction => ({
    type: 'UnsubscribeFromTrucksNotificationsAction'
});

export const updateTrucks = (trucks: TrucksType): UpdateTrucksAction => ({
    trucks,
    type: 'UpdateTrucksAction'
});
