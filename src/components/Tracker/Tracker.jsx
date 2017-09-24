// @flow
import './LeafletFix';
import { map, marker, tileLayer } from 'leaflet';
import type { Marker as MarkerType } from 'leaflet/src/layer/marker/index';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { TruckType } from '../../types/trucks';

import Page from '../App/Page';

import styles from './Tracker.css';

type TrucksObjectType = { [string]: TruckType };

export type PropsType = {
    trucks: TrucksObjectType
};

export type ActionsType = {
    subscribeToTrucksNotifications: (void) => void,
    unsubscribeFromTrucksNotifications: (void) => void
};

type ComponentProps = ActionsType & PropsType;

class Tracker extends React.PureComponent {
    map: mixed

    mapRef: HTMLElement

    props: ComponentProps

    trucks: { [string]: MarkerType }

    constructor(props: ComponentProps) {
        super(props);

        this.trucks = {};
    }

    componentDidMount() {
        this.map = map(this.mapRef);
        this.map.setView([20.5205, -100.8093], 14);

        tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
        ).addTo(this.map);

        this.props.subscribeToTrucksNotifications();
    }

    componentWillReceiveProps(nextProps: PropsType) {
        const { trucks } = nextProps;

        this.drawTrucks(trucks);
    }

    componentWillUnmount() {
        this.props.unsubscribeFromTrucksNotifications();
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const title = <FormattedMessage defaultMessage="Tracker" id="gps.tracker.title" />;

        return (
            <Page title={title}>
                <div className={styles.tracker} ref={e => (this.mapRef = e)}>
                    {/* Leaflet map */}
                </div>
            </Page>
        );
    }

    drawTrucks(trucks: TrucksObjectType) {
        Object.keys(trucks).forEach((truckId) => {
            const truck = trucks[truckId];

            const { lat, lng } = truck.location;

            const location = [lat, lng];

            if (truck.uuid in this.trucks) {
                this.trucks[truck.uuid].setLatLng(location);
            } else {
                this.trucks[truck.uuid] = marker(location).addTo(this.map);
            }
        });
    }
}

export default Tracker;
