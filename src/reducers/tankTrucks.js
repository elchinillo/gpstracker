// @flow
import type { UpdateTankTrucksAction, TankTruckType } from '../types/tankTrucks';

type TankTrucksType = { [string]: TankTruckType };

const tankTrucksReducer = (state: TankTrucksType = {}, action: UpdateTankTrucksAction): TankTrucksType => {
    switch (action.type) {
        case 'UpdateTankTrucksAction':
            return action.tankTrucks;

        default:
            return state;
    }
};

export default tankTrucksReducer;
