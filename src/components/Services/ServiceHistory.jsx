// @flow
import classnames from 'classnames';
import React from 'react';
import type { Node as ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import ReactTable from 'react-table';

import config from '../../config';

import type { ServiceType, ServicesHistoryType } from '../../types/services';

import DataTable from '../common/DataTable';
import dataTableStyles from '../common/DataTable/DataTable.css';
import FormattedDatetime from '../common/FormattedDatetime';
import Page from '../App/Page';

import Service from './Service';
import ServiceTypeFilterDropdown from './ServiceTypeFilterDropdown';

class ServiceDataTable extends DataTable<ServiceType> {}

const i18nMessages = defineMessages({
    dangerBadge: {
        defaultMessage: 'Peligro',
        id: 'services.type.danger'
    },
    infoBadge: {
        defaultMessage: 'Informativo',
        id: 'services.type.info'
    },
    warningBadge: {
        defaultMessage: 'Advertencia',
        id: 'services.type.warning'
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
        Header: () => <FormattedMessage defaultMessage="Fecha" id="services.date" />,
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
        Filter: ({ onChange }) => <ServiceTypeFilterDropdown onChange={onChange} />,
        Header: () => <FormattedMessage defaultMessage="Tipo" id="services.type" />,
        headerClassName: `text-center ${dataTableStyles.typeCol}`
    },
    {
        accessor: 'shortDescription',
        Header: () => <FormattedMessage defaultMessage="Descripción" id="services.shortDescription" />
    }
];

export type PropsType = {
    history: ServicesHistoryType
};

export type ActionsType = {
    fetchServices: (void) => {}
};

type ComponentPropsType = PropsType & ActionsType;

class ServiceHistory extends React.PureComponent {
    props: ComponentPropsType

    componentDidMount() {
        this.props.fetchServices();
    }

    render() {
        const { history } = this.props;

        const title: ReactNode = <FormattedMessage defaultMessage="Servicios" id="services.title" />;

        return (
            <Page className={dataTableStyles.table} title={title}>
                <ServiceDataTable
                    reactTableProps={{
                        className: dataTableStyles.table,
                        columns,
                        data: history.items,
                        defaultPageSize: config.dataChunks.pageSize,
                        filterable: true,
                        loading: history.loading
                    }}
                    renderModal={(service, onCloseModal) => <Service {...service} onClose={onCloseModal} />} />
            </Page>
        );
    }
}

export default ServiceHistory;
