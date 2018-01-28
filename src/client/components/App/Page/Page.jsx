// @flow
import classnames from 'classnames';
import React from 'react';
import type { Node as ReactNode } from 'react';

import styles from './Page.css';

type PropsType = {
    children: ReactNode,
    className?: string,
    title: ReactNode
};

class Page extends React.PureComponent {
    props: PropsType

    render() {
        const { children, className = null, title, ...props } = this.props;

        return (
            <section className={classnames(styles.page, className)} {...props}>
                <h2>{title}</h2>
                {children}
            </section>
        );
    }
}

export default Page;
