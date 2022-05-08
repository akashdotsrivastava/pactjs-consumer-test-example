const { like } = require('@pact-foundation/pact/src/dsl/matchers');

const graphqlResponseHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
};

exports.defaultQueryRequest = `
  query RecordsQuery
  {
    pagedRecords {
      records {
        id
        dob
        fullName
        __typename
      }
      metadata {
        totalCount
        pageCount
        first
        last
        __typename
      }
      __typename
    }
  }
`;

exports.defaultResponseForNoRecords = {
  status: 200,
  headers: graphqlResponseHeaders,
  body: {
    data: {
      pagedRecords: {
        records: [],
        metadata: {
          totalCount: 0,
          pageCount: 1,
          first: 0,
          last: 0,
          __typename: 'PaginationMetadata',
        },
        __typename: 'PagedRecordsCollection',
      },
    },
  },
};

exports.defaultResponseForOneRecord = {
  status: 200,
  headers: graphqlResponseHeaders,
  body: {
    data: {
      pagedRecords: {
        records: [
          {
            id: like(6),
            dob: like('2022-04-29'),
            fullName: like('Charles Augustus Magnussen'),
            __typename: 'Record',
          },
        ],
        metadata: {
          totalCount: 1,
          pageCount: 1,
          first: 1,
          last: 1,
          __typename: 'PaginationMetadata',
        },
        __typename: 'PagedRecordsCollection',
      },
    },
  },
};
