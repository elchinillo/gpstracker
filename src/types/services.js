// @flow
export type ServiceType = {
    datetime: number,
    id: string,
    notes: string,
    type: 'danger' | 'warning'
};

export type ServicesHistoryType = {
    items: Array<ServiceType>,
    loading: boolean
};

export type FetchServicesAction = {
    type: 'FetchServicesAction'
};

export type SetServicesAction = {
    services: Array<ServiceType>,
    type: 'SetServicesAction'
};
