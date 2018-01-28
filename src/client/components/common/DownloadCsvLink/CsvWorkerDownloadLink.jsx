// @flow
import React from 'react';
import type { Node as ReactNode } from 'react';

import Link from '../Link';

import css from './DownloadLink.css';

const worker: Worker = new Worker('/assets/csv-worker.js');

type ItemsType = Array<{[string]: mixed}>;

type PropsType = {
    children: ReactNode,
    filename: string,
    items: ItemsType
};

type StateType = {
    url: ?string
};

class CsvWorkerDownloadLink extends React.PureComponent {
    props: PropsType

    state: StateType

    constructor(props: PropsType) {
        super(props);

        this.prepareFile = this.prepareFile.bind(this);
        this.onCsvReady = this.onCsvReady.bind(this);

        this.prepareFile(props.items);

        this.state = { url: null };
    }

    componentDidMount() {
        worker.addEventListener('message', this.onCsvReady);
    }

    componentWillReceiveProps(nextProps: PropsType) {
        if (this.props.items != nextProps.items) {
            this.prepareFile(nextProps.items);
        }
    }

    componentWillUnmount() {
        worker.removeEventListener('message', this.onCsvReady);
    }

    prepareFile: (items: ItemsType) => void
    prepareFile(items: ItemsType) {
        this.state && this.setState({ url: null });

        if (items.length > 0) {
            worker.postMessage(items);
        }
    }

    onCsvReady: (Event) => void
    onCsvReady(msg: { data: string }) {
        this.setState({ url: msg.data });
    }

    render() {
        const { children, filename } = this.props;
        const { url } = this.state;

        return (
            <Link className={css.download} download={filename} href={url} target={url ? '_blank' : '_self'}>
                <i className="fa fa-cloud-download" aria-hidden="true"></i> {children}
            </Link>
        );
    }
}

export default CsvWorkerDownloadLink;
