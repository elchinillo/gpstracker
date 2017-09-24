// @flow
import React from 'react';
import type { Node as ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

type PropsType = {
    children: ReactNode,
    onClose?: (void) => void,
    title: ReactNode,
    type: 'danger' | 'warning'
}

class Modal extends React.PureComponent {
    modal: HTMLElement

    props: PropsType

    constructor(props: PropsType) {
        super(props);

        (this: any).onModalHidden = this.onModalHidden.bind(this);
    }

    componentDidMount() {
        window.$(this.modal).modal();

        window.$(this.modal).on('hidden.bs.modal', this.onModalHidden);
    }

    onModalHidden() {
        this.props.onClose && this.props.onClose();
    }

    render() {
        const { children, title, type } = this.props;

        return (
            <div className="modal" ref={e => this.modal = e}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className={`modal-header bg-${type}`}>
                            <h5 className="modal-title">
                                {title}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">
                                <FormattedMessage defaultMessage="Close" id="app.close" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
