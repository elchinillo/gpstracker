// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';

import App from './components/App';
import { setupStore } from './store';

import './client.css'

const store = setupStore();

ReactDOM.render(
    <StoreProvider store={store}>
        <App />
    </StoreProvider>,
    document.getElementById('app-container')
);
