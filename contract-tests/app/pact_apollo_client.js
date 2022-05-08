const { ApolloClient } = require('apollo-boost');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { createHttpLink } = require('apollo-link-http');

module.exports = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    fetch: require('node-fetch'),
    uri: 'http://localhost:1234/graphql',
  }),
});
