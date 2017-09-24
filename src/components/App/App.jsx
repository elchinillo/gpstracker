// @flow
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Alarms from '../../containers/Alarms';
import Services from '../../containers/Services';
import Tracker from '../../containers/Tracker';

import Home from '../Home';

import Header from './Header';

class App extends React.Component {
    render() {
        return (
            <IntlProvider locale="en">
                <Router>
                    <section>
                        <Header />
                        <main>
                            <Route exact path="/" component={Home}/>
                            <Route path="/tracker" component={Tracker}/>
                            <Route path="/alarms" component={Alarms}/>
                            <Route path="/services" component={Services}/>
                        </main>
                    </section>
                </Router>
            </IntlProvider>
        );
    }
}

export default App;
