const { pactWith } = require("jest-pact");
const { generateGraphqlQueryInteraction, pactConfiguration, queryGraphQL } = require('./pact_helper');
const {
    defaultQueryRequest,
    defaultResponseForNoRecords,
    defaultResponseForOneRecord
} = require('./fixtures/records.fixtures');

pactWith(pactConfiguration({ consumer: 'APP UI', provider: 'App API' }), provider => {
  describe('RecordsQuery', () => {
    const operation = 'RecordsQuery';

    describe('when called with default arguments', () => {
      describe('when there are no records', () => {
        beforeEach(() => {
          const graphqlQuery = generateGraphqlQueryInteraction({
            description: expect.getState().currentTestName,
            state: 'there are no records',
            query: defaultQueryRequest,
            operation,
            variables: {},
            response: defaultResponseForNoRecords,
          });

          return provider.addInteraction(graphqlQuery);
        });

        it('returns the correct response', async () => {
          const response = await queryGraphQL({
            queryString: defaultQueryRequest,
            variables: {},
          });

          expect(response).toEqual({
            pagedRecords: {
              records: [],
              metadata: {
                first: 0,
                last: 0,
                pageCount: 1,
                totalCount: 0,
                __typename: 'PaginationMetadata',
              },
              __typename: 'PagedRecordsCollection',
            },
          });
        });
      });

      describe('when there is one record', () => {
        beforeEach(() => {
          const graphqlQuery = generateGraphqlQueryInteraction({
            description: expect.getState().currentTestName,
            state: 'there is one record',
            query: defaultQueryRequest,
            operation,
            variables: {},
            response: defaultResponseForOneRecord,
          });

          return provider.addInteraction(graphqlQuery);
        });

        it('returns the correct response', async () => {
          const response = await queryGraphQL({
            queryString: defaultQueryRequest,
            variables: {},
          });

          expect(response).toEqual({
            pagedRecords: {
              records: [
                {
                  id: 6,
                  dob: '2022-04-29',
                  fullName: 'Charles Augustus Magnussen',
                  __typename: 'Record',
                },
              ],
              metadata: {
                first: 1,
                last: 1,
                pageCount: 1,
                totalCount: 1,
                __typename: 'PaginationMetadata',
              },
              __typename: 'PagedRecordsCollection',
            },
          });
        });
      });
    });
  });
});
