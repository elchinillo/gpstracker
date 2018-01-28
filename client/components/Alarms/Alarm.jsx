// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { AlarmType } from '../../types/alarms';

import FormattedDatetime from '../common/FormattedDatetime';
import Modal from '../common/Modal';

type HandlersType = {
    onClose: () => void
}

type PropsType = AlarmType & HandlersType

class Alarm extends React.PureComponent {
    props: PropsType

    render() {
        const { createdAt, description, type } = this.props;

        const title = <FormattedDatetime value={createdAt} />;

        return (
            <Modal title={title} type={type} onClose={this.props.onClose}>
                <p>{description}</p>
            </Modal>
        );
    }
}

export default Alarm;
