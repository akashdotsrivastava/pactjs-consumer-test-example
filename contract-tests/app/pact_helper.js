const path = require('path');
const { gql } = require('apollo-boost');
const { GraphQLInteraction } = require('@pact-foundation/pact');
const pactApolloClient = require('./pact_apollo_client');

/**
 * Sets up pact options needed for first arg for jest-pact's pactWith()
 *
 * @param {string} consumer - name of consumer
 * @param {string} provider - name of provider
 * @return {Object}
 */
exports.pactConfiguration = ({ consumer, provider }) => ({
  port: 1234,
  log: path.resolve(process.cwd(), 'log', 'pact.log'),
  dir: path.resolve(process.cwd(), 'contract-tests', 'pacts'),
  consumer,
  provider,
  logLevel: 'info', // change to 'DEBUG' for debugging purposes
  cors: true,
  spec: 2,
});

/**
 * Uses mock ApolloClient to mock GraphQL query calls
 *
 * @param {string} queryString - string representation of GraphQL query
 * @param {Object} variables
 * @return {Object} response data from mock service
 */
exports.queryGraphQL = async ({ queryString, variables }) => {
  return pactApolloClient
    .query({
      query: gql(queryString),
      variables,
    })
    .then(result => result.data);
};

/**
 * Generates GraphQL Query Interaction to be added to the provider
 *
 * @param {string} description
 * @param {string} state - provider state for specific interaction
 * @param {string} query - string representation of GraphQL query
 * @param {string} operation
 * @param {Object} variables
 * @param {Object} response
 * @return {GraphQLInteraction} pact interaction
 */
exports.generateGraphqlQueryInteraction = ({
  description,
  state,
  query,
  operation,
  variables,
  response,
}) =>
  new GraphQLInteraction()
    .uponReceiving(description)
    .given(state)
    .withQuery(query)
    .withOperation(operation)
    .withRequest({
      path: '/graphql',
      method: 'POST',
    })
    .withVariables(variables)
    .willRespondWith(response);
