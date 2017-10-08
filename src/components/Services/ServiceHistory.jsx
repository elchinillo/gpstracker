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
import Link from '../common/Link';
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
    constructor(props: ComponentPropsType) {
        super(props);

        this.download = this.download.bind(this);
    }

    props: ComponentPropsType

    componentDidMount() {
        this.props.fetchServices();
    }

    download: () => void
    download() {
        const { history, intl } = this.props;
        const { items } = history;

        const csvBlobBuilder = [];

        let headers = null;
        items.forEach((item) => {
            if (headers === null) {
                headers = Object.keys(item);
                csvBlobBuilder.push(`${headers.join(',')}\n`);
            }

            csvBlobBuilder.push(`${headers.map(key => `"${item[key]}"`).join(',')}\n`);
        });

        const csvBlob = new Blob(csvBlobBuilder, { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(csvBlob);
        link.setAttribute('download', `${intl.formatMessage(i18nMessages.servicesFilename)}.csv`);
        link.click();
    }

    renderModal(service: ServiceType, onCloseModal: () => void) {
        return <Service {...service} onClose={onCloseModal} />;
    }

    render() {
        const { history } = this.props;

        const title: ReactNode = <FormattedMessage defaultMessage="Servicios" id="services.title" />;

        return (
            <Page title={title}>
                <FormattedMessage defaultMessage="Descargar" id="services.download">
                    {nodes => (
                        <Link className={css.download} href="#download-services" onClick={this.download}>
                            <i className="fa fa-cloud-download" aria-hidden="true"></i> {nodes}
                        </Link>
                    )}
                </FormattedMessage>
                <ServiceDataTable
                    reactTableProps={{
                        className: classnames(dataTableStyles.table, css.history),
                        columns,
                        data: history.items,
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
