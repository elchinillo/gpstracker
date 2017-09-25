// @flow
import { connect } from 'react-redux';

import {
    subscribeToTankTrucksChannel, unsubscribeFromTankTrucksChannel
} from '../actions/tankTrucks';
import Tracker from '../components/Tracker';
import type { PropsType } from '../components/Tracker';
import type { StateType } from '../types/ecirgas';

const mapStateToProps = (state: StateType): PropsType => {
    return {
        trucks: state.tankTrucks
    }
};

const mapDispatchToProps = {
    subscribeToTankTrucksChannel,
    unsubscribeFromTankTrucksChannel
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
