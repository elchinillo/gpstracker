// @flow
import gql from 'graphql-tag';

import grapqhl from './graphql';

export const getTankTrucks = (): Promise<*> => {
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

    const response = grapqhl(query);

    return response
        .then(response => response.data.viewer.allTankTrucks.edges)
        .then(response => response.map(edge => edge.node));
};
