// @flow
import gql from 'graphql-tag';

import grapqhl from './graphql';

const getTankTrucks = (): Promise<*> => {
    const query = gql`query {
        viewer {
            allTankTrucks {
                edges {
                    node {
                        id
                        location {
                            lat
                            lng
                        }
                    }
                }
            }
        }
    }`;

    const response = grapqhl(query, { fetchPolicy: 'network-only' });

    return response
        .then(response => response.data.viewer.allTankTrucks.edges)
        .then(response => response.map(edge => edge.node));
};

type EmitterFn = (msg: mixed) => void;
type UnsubscribeFn = () => void;

export const subscribe = (emitter: EmitterFn): UnsubscribeFn => {
    const interval = setInterval(
        () => getTankTrucks().then(tankTrucks => emitter(tankTrucks)),
        1000
    );

    return () => {
        clearInterval(interval);
    };
};
