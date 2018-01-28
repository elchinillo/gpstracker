// @flow
import type {
    FetchServicesAction, ServicesHistoryType, ServiceType, SetServicesAction
} from '../types/services';

type ServiceReducerType = (state: ServicesHistoryType, action: SetServicesAction) => ServicesHistoryType;

const initialState = { items: [], loading: false };

type ServicesActionsType = FetchServicesAction | SetServicesAction;

const serviceReducer: ServiceReducerType = (state: ServicesHistoryType = initialState, action: ServicesActionsType) => {
    switch (action.type) {
        case 'FetchServicesAction':
            return { ...state, loading: true };

        case 'SetServicesAction':
            return { items: action.services, loading: false };

        default:
            return state;
    }
};

export default serviceReducer;
