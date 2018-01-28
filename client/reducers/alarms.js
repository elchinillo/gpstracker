// @flow
import type { FetchAlarmsAction, AlarmsHistoryType, AlarmType, SetAlarmsAction } from '../types/alarms';

type AlarmsActions = FetchAlarmsAction | SetAlarmsAction;
type AlarmsReducerType = (AlarmsHistoryType, AlarmsActions) => AlarmsHistoryType;

const initialState = { items: [], loading: false };

const alarmsReducer: AlarmsReducerType = (state: AlarmsHistoryType = initialState, action: AlarmsActions) => {
    switch (action.type) {
        case 'FetchAlarmsAction':
            return { ...state, loading: true };

        case 'SetAlarmsAction':
            return { items: action.alarms, loading: false };

        default:
            return state;
    }
};

export default alarmsReducer;
