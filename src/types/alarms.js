// @flow
export type AlarmType = {
    createdAt: number,
    description: string,
    id: string,
    shortDescription: string,
    type: 'danger' | 'info' | 'warning';
};

export type AlarmsHistoryType = {
    items: Array<AlarmType>,
    loading: boolean
};

export type FetchAlarmsAction = {
    type: 'FetchAlarmsAction'
};

export type SetAlarmsAction = {
    alarms: Array<AlarmType>,
    type: 'SetAlarmsAction'
};
