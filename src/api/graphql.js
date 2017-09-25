import ApolloClient from 'apollo-client';
import { ApolloLink, HttpLink, WebSocketLink } from 'apollo-link';
import gql from 'graphql-tag';
import io from 'socket.io-client';

const scapholdUrl = 'us-west-2.api.scaphold.io/graphql/ecirgas';
const graphqlUrl = `https://${scapholdUrl}`;
const websocketUrl = `wss://${scapholdUrl}`;

const link = ApolloLink.split(
    op => op.query.definitions.some(definition => (definition.operation !== 'subscription')),
    // new RetryLink(),
    new HttpLink({
        uri: graphqlUrl
    }),
    new WebSocketLink({
        uri: websocketUrl,
        options: {
            reconnect: false,
            // connectionParams: {
            //     // Pass any arguments you want for initialization
            //     query: `apiKey=ecirgas&token=${token}`
            // },
            connectionCallback: error => console.error
        }
    })
);

// const link = new HttpLink({
//     uri: graphqlUrl
// });

// const link = new WebSocketLink({
//     uri: websocketUrl,
//     options: {
//         reconnect: false,
//         connectionParams: {
//             // query: `apiKey=ecirgas&token=${token}`
//             query: {
//                 apiKey: 'ecirgas'
//             }
//         },
//         connectionCallback: error => console.error
//     }
// });

// Finally, create your ApolloClient instance with the modified network interface
const apolloClient = new ApolloClient({
    networkInterface: link
});

// const subscription = `subscription {
//   subscribeToTankTruck(mutations: [updateTankTruck]) {
//     value {
//       id
//       location {
//         lat
//         lng
//       }
//     }
//   }
// }`;

// const login = gql`mutation {
//     loginUser(input: {username: "elchinillo", password: "passTest"}) {
//         token
//     }
// }`;

// apolloClient.mutate({ mutation: login })
//     .then(({ data }) => {
//         const { loginUser } = data;
//         const { token } = loginUser;
//
//         const socket = io.connect(
//             websocketUrl,
//             {
//                 query: {
//                 //     apiKey: 'ecirgas',
//                     token
//                 },
//                 reconnection: false,
//                 transports: ['websocket']
//             }
//         );
//
//         socket.on('connect', () => console.log('Connected!!'));
//         socket.on('connect_error', error => console.error);
//         socket.on('error', error => console.error);
//     });

const endpoint = query => apolloClient.query({ query });

export default endpoint;
