// @flow
import classnames from 'classnames';
import React from 'react';
import type { Node as ReactNode } from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import ReactTable from 'react-table';

import config from '../../config';

import type { ServiceType, ServicesHistoryType } from '../../types/services';

import DataTable from '../common/DataTable';
import dataTableStyles from '../common/DataTable/DataTable.css';
import FormattedDatetime from '../common/FormattedDatetime';
import Page from '../App/Page';

import Service from './Service';

class ServiceDataTable extends DataTable<ServiceType> {}

const i18nMessages = defineMessages({
    dangerBadge: {
        defaultMessage: 'Peligro',
        id: 'services.type.danger'
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
        'badge-warning': type === 'warning'
    }
);

const columns = [
    {
        accessor: 'datetime',
        Cell: ({ value }) => <FormattedDatetime value={value} />,
        className: `text-center ${dataTableStyles.datetimeCol}`,
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
        Header: () => <FormattedMessage defaultMessage="Tipo" id="services.type" />,
        headerClassName: `text-center ${dataTableStyles.typeCol}`
    },
    {
        accessor: 'id',
        Header: () => <FormattedMessage defaultMessage="Número de servicio" id="services.id" />
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
                        loading: history.loading
                    }}
                    renderModal={(service, onCloseModal) => <Service {...service} onClose={onCloseModal} />} />
            </Page>
        );
    }
}

export default ServiceHistory;
