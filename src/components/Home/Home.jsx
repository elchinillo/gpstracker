// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.css';

class Home extends React.PureComponent {
    render() {
        return (
            <section className={`row ${styles.dashboard}`}>
                <article className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <header>
                                <h4 className="card-title">Alarmas</h4>
                            </header>
                            <p className="card-text">
                                Informaci&oacute;n importante sobre alarmas
                            </p>
                        </div>
                        <div className="card-footer text-center">
                            <Link to="/alarms" className="btn btn-primary">
                                M&aacute;s informaci&oacute;n
                            </Link>
                        </div>
                    </div>
                </article>
                <article className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <header>
                                <h4 className="card-title">Servicios</h4>
                            </header>
                            <p className="card-text">
                                Informaci&oacute;n importante sobre servicios
                            </p>
                        </div>
                        <div className="card-footer text-center">
                            <Link to="/services" className="btn btn-primary">
                                M&aacute;s informaci&oacute;n
                            </Link>
                        </div>
                    </div>
                </article>
            </section>
        );
    }
}

export default Home;
