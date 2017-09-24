// @flow
import { connect } from 'react-redux';

import { subscribeToTrucksNotifications, unsubscribeFromTrucksNotifications } from '../actions/trucks';
import Tracker from '../components/Tracker';
import type { PropsType } from '../components/Tracker';
import type { StateType } from '../types';

const mapStateToProps = (state: StateType): PropsType => {
    return {
        trucks: state.trucks
    }
};

const mapDispatchToProps = {
    subscribeToTrucksNotifications,
    unsubscribeFromTrucksNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
