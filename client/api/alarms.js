// @flow
import gql from 'graphql-tag';

import grapqhl from './graphql';

export const getAlarms = (): Promise<*> => {
    const query = gql`query {
        viewer {
            allAlarms {
                edges {
                    node {
                        createdAt
                        description
                        id
                        shortDescription
                        type
                    }
                }
            }
        }
    }`;

    const response = grapqhl(query);

    return response
        .then(response => response.data.viewer.allAlarms.edges)
        .then(response => response.map(edge => edge.node));
};
