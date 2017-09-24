// @flow
import React from 'react';
import { connect } from 'react-redux';

import { fetchServices } from '../actions/services';
import ServiceHistory from '../components/Services/ServiceHistory';
import type { ActionsType, PropsType } from '../components/Services/ServiceHistory';
import type { StateType } from '../types';

const mapStateToProps: (StateType) => PropsType = (state: StateType) => ({
    history: state.services
});

const actionCreators: ActionsType = {
    fetchServices
};

export default connect(mapStateToProps, actionCreators)(ServiceHistory);
