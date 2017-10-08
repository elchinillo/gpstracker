// @flow
import classnames from 'classnames';
import React from 'react';
import type { Node as ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

import config from '../../config';

import type { AlarmsHistoryType, AlarmType, FetchAlarmsAction } from '../../types/alarms';

import DataTable from '../common/DataTable';
import dataTableStyles from '../common/DataTable/DataTable.css';
import DownloadCsvLink from '../common/DownloadCsvLink';
import FormattedDatetime from '../common/FormattedDatetime';
import Page from '../App/Page';

import Alarm from './Alarm';
import css from './Alarms.css';
import AlarmTypeFilterDropdown from './AlarmTypeFilterDropdown';

class AlarmDataTable extends DataTable<AlarmType> {}

const i18nMessages = defineMessages({
    dangerBadge: {
        defaultMessage: 'Peligro',
        id: 'alarms.type.danger'
    },
    alarmsFilename: {
        defaultMessage: 'alarms',
        id: 'alarms.download.filename'
    },
    infoBadge: {
        defaultMessage: 'Informativa',
        id: 'alarms.type.info'
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
        'badge-info': type === 'info',
        'badge-warning': type === 'warning'
    }
);

const columns = [
    {
        accessor: 'createdAt',
        Cell: ({ value }) => <FormattedDatetime value={value} />,
        className: `text-center ${dataTableStyles.datetimeCol}`,
        Filter: ({ filter = { value: null }, onChange }) => (
            <DatePicker
                onChange={onChange} isClearable={true} readOnly selected={filter.value} withPortal />
        ),
        filterMethod: ({ value }, row) => value===null || value.isSame(row.createdAt, 'day'),
        Header: <FormattedMessage defaultMessage="Fecha" id="alarms.date" />,
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
        Filter: ({ onChange }) => <AlarmTypeFilterDropdown onChange={onChange} />,
        Header: <FormattedMessage defaultMessage="Tipo" id="alarms.type" />,
        headerClassName: `text-center ${dataTableStyles.typeCol}`
    },
    {
        accessor: 'shortDescription',
        Header: <FormattedMessage defaultMessage="Descripción" id="alarms.shortDescription" />,
    }
];

export type PropsType = {
    history: AlarmsHistoryType
};

export type ActionsType = {
    fetchAlarms: (void) => {}
};

type IntlPropType = {
    intl: IntlFormat
};

type ComponentPropsType = PropsType & ActionsType & IntlPropType;

class AlarmHistory extends React.PureComponent {
    props: ComponentPropsType

    componentDidMount() {
        this.props.fetchAlarms();
    }

    renderModal(alarm: AlarmType, onCloseModal: () => void) {
        return <Alarm {...alarm} onClose={onCloseModal} />;
    }

    render() {
        const { history, intl } = this.props;
        const { items } = history;

        const title = <FormattedMessage defaultMessage="Alarmas" id="alarms.title" />;

        return (
            <Page title={title}>
                <FormattedMessage defaultMessage="Descargar" id="services.download">
                    {nodes => (
                        <DownloadCsvLink filename={intl.formatMessage(i18nMessages.alarmsFilename)} items={items}>
                            {nodes}
                        </DownloadCsvLink>
                    )}
                </FormattedMessage>
                <AlarmDataTable
                    reactTableProps={{
                        className: classnames(dataTableStyles.table, css.history),
                        columns,
                        data: items,
                        defaultPageSize: config.dataChunks.pageSize,
                        filterable: true
                    }}
                    renderModal={this.renderModal}
                 />
            </Page>
        );
    }
}

export default injectIntl(AlarmHistory);
