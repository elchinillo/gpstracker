// @flow
import type { ServiceType, FetchServicesAction, SetServicesAction } from '../types/services';

type ServicesType = Array<ServiceType>;

export const fetchServices: (void) => FetchServicesAction = () => ({
    type: 'FetchServicesAction'
});

export const setServices: (ServicesType) => SetServicesAction = (services: ServicesType) => ({
    services,
    type: 'SetServicesAction'
});
