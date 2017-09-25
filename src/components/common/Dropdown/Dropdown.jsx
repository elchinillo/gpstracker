// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';

type DefaultPropsType = {
    value: ''
};

type DropdownOptionType = {
    label: {
        defaultMessage: ?string,
        id: string
    },
    value: string
}

type PropsType = {
    onChange: (string) => void,
    options: Array<DropdownOptionType>,
    value: string
};

type StateType = {
    value: string
};

class Dropdown extends React.PureComponent {
    static defaultProps: DefaultPropsType

    state: StateType

    constructor(props: PropsType) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = { value: '' };
    }

    onChange: (e: { currentTarget: { value: string } }) => void
    onChange({ currentTarget }: { currentTarget: { value: string } }) {
        const { onChange } = this.props;
        const { value } = currentTarget;

        onChange(value);

        this.setState({ value });
    }

    render() {
        const { onChange, options } = this.props;
        const { value } = this.state;

        const dropdownOptions = options.map(({ label, value}) => (
            <FormattedMessage key={value} {...label}>
                {nodes => <option value={value}>{nodes}</option>}
            </FormattedMessage>
        ));

        return (
            <select value={value} onChange={this.onChange}>
                {dropdownOptions}
            </select>
        )
    }
}

Dropdown.defaultProps = {
    value: ''
};

export default Dropdown;
