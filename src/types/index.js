// @flow
import type { AlarmsHistoryType } from './alarms';
import type { IntlType } from './intl';
import type { ServicesHistoryType } from './services';
import type { TruckType } from './trucks';

export type StateType = {
    alarms: AlarmsHistoryType,
    intl: IntlType,
    services: ServicesHistoryType,
    trucks: { [string]: TruckType }
};
