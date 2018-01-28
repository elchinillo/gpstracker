// @flow
import React from 'react';
import type { Node as ReactNode } from 'react';

import css from './Link.css';

type PropsType = {
    children: ReactNode
};

class Link extends React.PureComponent {
    props: PropsType

    render() {
        const { children, ...props } = this.props;

        return (
            <a className={css.link} {...props}>
                {children}
            </a>
        );
    }
}

export default Link;
