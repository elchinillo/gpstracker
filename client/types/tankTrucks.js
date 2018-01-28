// @flow
type LocationType = {
    lat: number,
    lng: number
};

export type TankTruckType = {
    id: string,
    location: LocationType
};

// Actions

export type SubscribeToTankTrucksChannelAction = {
    type: 'SubscribeToTankTrucksChannelAction'
};

export type UpdateTankTrucksAction = {
    tankTrucks: { [string]: TankTruckType },
    type: 'UpdateTankTrucksAction'
};

export type UnsubscribeFromTankTrucksChannelAction = {
    type: 'UnsubscribeFromTankTrucksChannelAction'
};
