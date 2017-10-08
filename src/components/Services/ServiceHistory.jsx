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
import DownloadCsvLink from '../common/DownloadCsvLink';
import FormattedDatetime from '../common/FormattedDatetime';
import Page from '../App/Page';

import Service from './Service';
import css from './Services.css';
import ServiceTypeFilterDropdown from './ServiceTypeFilterDropdown';

class ServiceDataTable extends DataTable<ServiceType> {}

const i18nMessages = defineMessages({
    dangerBadge: {
        defaultMessage: 'Peligro',
        id: 'services.type.danger'
    },
    servicesFilename: {
        defaultMessage: 'services',
        id: 'services.download.filename'
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

type IntlPropType = {
    intl: IntlFormat
};

type ComponentPropsType = PropsType & ActionsType & IntlPropType;

class ServiceHistory extends React.PureComponent {
    props: ComponentPropsType

    componentDidMount() {
        this.props.fetchServices();
    }

    renderModal(service: ServiceType, onCloseModal: () => void) {
        return <Service {...service} onClose={onCloseModal} />;
    }

    render() {
        const { history, intl } = this.props;
        const { items } = history;

        const title: ReactNode = <FormattedMessage defaultMessage="Servicios" id="services.title" />;

        return (
            <Page title={title}>
                <FormattedMessage defaultMessage="Descargar" id="services.download">
                    {nodes => (
                        <DownloadCsvLink filename={intl.formatMessage(i18nMessages.servicesFilename)} items={items}>
                            {nodes}
                        </DownloadCsvLink>
                    )}
                </FormattedMessage>
                <ServiceDataTable
                    reactTableProps={{
                        className: classnames(dataTableStyles.table, css.history),
                        columns,
                        data: items,
                        defaultPageSize: config.dataChunks.pageSize,
                        filterable: true,
                        loading: history.loading
                    }}
                    renderModal={this.renderModal} />
            </Page>
        );
    }
}

export default injectIntl(ServiceHistory);
