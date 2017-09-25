// @flow
import gql from 'graphql-tag';

import grapqhl from './graphql';

export const getServices = (): Promise<*> => {
    const query = gql`query {
        viewer {
            allServices {
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
        .then(response => response.data.viewer.allServices.edges)
        .then(response => response.map(edge => edge.node));
};
