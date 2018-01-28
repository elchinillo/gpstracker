// @flow
import classnames from 'classnames';
import React from 'react';
import type { Node as ReactNode } from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import ReactTable from 'react-table';

import config from '../../../config';

import dataTableStyles from './DataTable.css';

type PropsType = {
    reactTableProps: Object,
    renderModal: (Object, (void) => void) => ReactNode
};

type StateType = {
    currentElement: ?ReactNode
};

class DataTable<T: Object> extends React.PureComponent {
    props: PropsType

    state: StateType

    constructor(props: PropsType) {
        super(props);

        this.state = { currentElement: null };

        (this: any).getRowProps = this.getRowProps.bind(this);
        (this: any).onCloseModal = this.onCloseModal.bind(this);
    }

    getRowProps(state: mixed, rowInfo: { original: T }, column: mixed) {
        if (!rowInfo) return {};

        return {
            onDoubleClick: this.openModal.bind(this, rowInfo.original)
        };
    }

    openModal(item: T) {
        this.setState({
            currentElement: this.props.renderModal(item, this.onCloseModal)
        });
    }

    onCloseModal() {
        this.setState({
            currentElement: null
        });
    }

    render() {
        const { reactTableProps } = this.props;
        const { currentElement } = this.state;

        return (
            <div className={dataTableStyles.table}>
                <ReactTable
                    {...reactTableProps}
                    getTrProps={this.getRowProps} />
                {currentElement}
            </div>
        );
    }
}

export default DataTable;
