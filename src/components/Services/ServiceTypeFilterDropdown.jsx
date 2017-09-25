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

class ServiceTypeFilterDropdown extends React.PureComponent {
    static dropdownOptions: Array<DropdownOptionLabelType>

    props: PropsType

    render() {
        const { onChange } = this.props;

        return (
            <Dropdown onChange={onChange} options={ServiceTypeFilterDropdown.dropdownOptions} />
        );
    }
}

const dropdownOptions = defineMessages({
    ['']: {
        defaultMessage: '...',
        id: 'services.type.empty'
    },
    info: {
        defaultMessage: 'Informativa',
        id: 'services.type.info'
    },
    warning: {
        defaultMessage: 'Advertencia',
        id: 'services.type.warning'
    },
    danger: {
        defaultMessage: 'Peligro',
        id: 'services.type.danger'
    }
});

ServiceTypeFilterDropdown.dropdownOptions = Object.keys(dropdownOptions).map(
    key => ({ label: dropdownOptions[key], value: key })
);

export default ServiceTypeFilterDropdown;
