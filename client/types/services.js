// @flow
export type ServiceType = {
    createdAt: number,
    id: string,
    description: string,
    type: 'danger' | 'info' | 'warning'
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
