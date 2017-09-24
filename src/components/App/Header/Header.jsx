// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, NavLink } from 'react-router-dom';

import styles from './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <span className="navbar-brand-logo">E</span>cirgas
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <NavLink className="nav-item nav-link" to="/alarms">
                            <FormattedMessage defaultMessage="Alarmas" id="alarms.title"/>
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/tracker">
                            <FormattedMessage defaultMessage="GPS" id="tracker.title" />
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/services">
                            <FormattedMessage defaultMessage="Servicios" id="services.title" />
                        </NavLink>
                    </div>
                    <div className="navbar-text">
                        @elchinillo
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
            </header>
        );
    }
}

export default Header;
