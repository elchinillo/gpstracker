// @flow
export type AlarmType = {
    datetime: number,
    description: string,
    id: string,
    type: 'danger' | 'warning';
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
