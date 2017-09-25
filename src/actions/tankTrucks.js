// @flow
import type {
    TankTruckType, SubscribeToTankTrucksChannelAction, UnsubscribeFromTankTrucksChannelAction,
    UpdateTankTrucksAction
} from '../types/tankTrucks';

type TankTrucksType = { [string]: TankTruckType };

export const subscribeToTankTrucksChannel = (): SubscribeToTankTrucksChannelAction => ({
    type: 'SubscribeToTankTrucksChannelAction'
});

export const unsubscribeFromTankTrucksChannel = (): UnsubscribeFromTankTrucksChannelAction => ({
    type: 'UnsubscribeFromTankTrucksChannelAction'
});

export const updateTankTrucks = (tankTrucks: TankTrucksType): UpdateTankTrucksAction => ({
    tankTrucks,
    type: 'UpdateTankTrucksAction'
});
