// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { ServiceType } from '../../types/services';

import FormattedDatetime from '../common/FormattedDatetime';
import Modal from '../common/Modal';

type HandlersType = {
    onClose: () => void
}

type PropsType = ServiceType & HandlersType

class Service extends React.PureComponent {
    props: PropsType

    render() {
        const { datetime, notes, type } = this.props;

        const title = <FormattedDatetime value={datetime} />;

        return (
            <Modal title={title} type={type} onClose={this.props.onClose}>
                <p>{notes}</p>
            </Modal>
        );
    }
}

export default Service;
