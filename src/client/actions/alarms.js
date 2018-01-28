// @flow
import type { AlarmType, FetchAlarmsAction, SetAlarmsAction } from '../types/alarms';

type AlarmsType = Array<AlarmType>;

export const fetchAlarms: (void) => FetchAlarmsAction = () => ({
    type: 'FetchAlarmsAction'
});

export const setAlarms: (AlarmsType) => SetAlarmsAction = (alarms: AlarmsType) => ({
    alarms,
    type: 'SetAlarmsAction'
});
