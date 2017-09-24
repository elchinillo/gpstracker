// @flow
import classnames from 'classnames';
import React from 'react';
import type { Node as ReactNode } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import config from '../../config';

import type { AlarmsHistoryType, AlarmType, FetchAlarmsAction } from '../../types/alarms';

import DataTable from '../common/DataTable';
import dataTableStyles from '../common/DataTable/DataTable.css';
import FormattedDatetime from '../common/FormattedDatetime';
import Page from '../App/Page';

import Alarm from './Alarm';

class AlarmDataTable extends DataTable<AlarmType> {}

const i18nMessages = defineMessages({
    dangerBadge: {
        defaultMessage: 'Peligro',
        id: 'alarms.type.danger'
    },
    warningBadge: {
        defaultMessage: 'Advertencia',
        id: 'alarms.type.warning'
    }
});

const badgeClassnames = (type: string) => classnames(
    'badge',
    {
        'badge-danger': type === 'danger',
        'badge-warning': type === 'warning'
    }
);

const columns = [
    {
        accessor: 'datetime',
        Cell: ({ value }) => <FormattedDatetime value={value} />,
        className: `text-center ${dataTableStyles.datetimeCol}`,
        Header: () => <FormattedMessage defaultMessage="Fecha" id="alarms.date" />,
        headerClassName: `text-center ${dataTableStyles.datetimeCol}`
    },
    {
        accessor: 'type',
        Cell: ({ value }) => (
            <span className={badgeClassnames(value)}>
                <FormattedMessage {...i18nMessages[`${value}Badge`]} />
            </span>
        ),
        className: `text-center ${dataTableStyles.typeCol}`,
        Header: () => <FormattedMessage defaultMessage="Tipo" id="alarms.type" />,
        headerClassName: `text-center ${dataTableStyles.typeCol}`
    },
    {
        accessor: 'id',
        Header: 'Numero'
    }
];

export type PropsType = {
    history: AlarmsHistoryType
};

export type ActionsType = {
    fetchAlarms: (void) => {}
};

type ComponentPropsType = PropsType & ActionsType;

class AlarmHistory extends React.PureComponent {
    props: ComponentPropsType

    componentDidMount() {
        this.props.fetchAlarms();
    }

    render() {
        const { history } = this.props;

        const title = <FormattedMessage defaultMessage="Alarmas" id="alarms.title" />;

        return (
            <Page title={title}>
                <AlarmDataTable
                    reactTableProps={{
                        className: dataTableStyles.table,
                        columns,
                        data: history.items,
                        defaultPageSize: config.dataChunks.pageSize
                    }}
                    renderModal={(alarm, onCloseModal) => <Alarm {...alarm} onClose={onCloseModal} />}
                 />
            </Page>
        );
    }
}

export default AlarmHistory;
