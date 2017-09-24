// @flow
import type { IntlType, SetIntlAction } from '../types/intl';

const initialState: IntlType = {
    locale: 'en'
};

type IntlReducerType = (IntlType, SetIntlAction) => IntlType;

const intlReducer: IntlReducerType = (state: IntlType = initialState, action: SetIntlAction) => {
    switch (action.type) {
        case 'SetIntlAction':
            return action.intl;

        default:
            return state;
    }
}

export default intlReducer;
