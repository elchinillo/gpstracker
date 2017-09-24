// @flow
import type { UpdateTrucksAction, TruckType } from '../types/trucks';

type TrucksType = { [string]: TruckType };

const trucksReducer = (state: TrucksType = {}, action: UpdateTrucksAction): TrucksType => {
    switch (action.type) {
        case 'UpdateTrucksAction':
            return action.trucks;

        default:
            return state;
    }
};

export default trucksReducer;
