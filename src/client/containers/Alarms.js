// @flow
import React from 'react';
import { connect } from 'react-redux';

import { fetchAlarms } from '../actions/alarms';
import AlarmHistory from '../components/Alarms/AlarmHistory';
import type { ActionsType, PropsType } from '../components/Alarms/AlarmHistory';
import type { StateType } from '../types/ecirgas';

const mapStateToProps: (StateType) => PropsType = (state: StateType) => ({
    history: state.alarms
});

const actionCreators: ActionsType = {
    fetchAlarms
};

export default connect(mapStateToProps, actionCreators)(AlarmHistory);
