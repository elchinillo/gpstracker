// @flow
import React from 'react';
import { defineMessages } from 'react-intl';

import Dropdown from '../common/Dropdown';

type DropdownOptionLabelType = {
    label: {
        defaultMessage: ?string,
        id: string
    },
    value: string
};

type PropsType = {
    onChange: (string) => void
};

class AlarmTypeFilterDropdown extends React.PureComponent {
    static dropdownOptions: Array<DropdownOptionLabelType>

    props: PropsType

    render() {
        const { onChange } = this.props;

        return (
            <Dropdown onChange={onChange} options={AlarmTypeFilterDropdown.dropdownOptions} />
        );
    }
}

const dropdownOptions = defineMessages({
    ['']: {
        defaultMessage: '...',
        id: 'alarms.type.empty'
    },
    info: {
        defaultMessage: 'Informativa',
        id: 'alarms.type.info'
    },
    warning: {
        defaultMessage: 'Advertencia',
        id: 'alarms.type.warning'
    },
    danger: {
        defaultMessage: 'Peligro',
        id: 'alarms.type.danger'
    }
});

AlarmTypeFilterDropdown.dropdownOptions = Object.keys(dropdownOptions).map(
    key => ({ label: dropdownOptions[key], value: key })
);

export default AlarmTypeFilterDropdown;
