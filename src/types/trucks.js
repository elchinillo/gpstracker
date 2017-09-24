// @flow
type LocationType = {
    lat: number,
    lng: number
};

export type TruckType = {
    uuid: string,
    location: LocationType
};

// Actions

export type SubscribeToTrucksNotificationsAction = {
    type: 'SubscribeToTrucksNotificationsAction'
};

export type UpdateTrucksAction = {
    trucks: { [string]: TruckType },
    type: 'UpdateTrucksAction'
};

export type UnsubscribeFromTrucksNotificationsAction = {
    type: 'UnsubscribeFromTrucksNotificationsAction'
};
