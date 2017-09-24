// @flow
type LocaleType = 'en' | 'es';

export type IntlType = {
    locale: LocaleType
};

export type SetIntlAction = {
    intl: {
        locale: LocaleType
    },
    type: 'SetIntlAction'
};
