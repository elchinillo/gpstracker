// @flow
import type { AlarmsHistoryType } from './alarms';
import type { IntlType } from './intl';
import type { ServicesHistoryType } from './services';
import type { TankTruckType } from './tankTrucks';

export type StateType = {
    alarms: AlarmsHistoryType,
    intl: IntlType,
    services: ServicesHistoryType,
    tankTrucks: { [string]: TankTruckType }
};
