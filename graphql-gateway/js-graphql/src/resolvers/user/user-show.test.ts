import driver from '../../util/neo4j-driver';

const resolver = require('./user-show');

describe('resolver', () => {
  it('hello', () => {
    const res = resolver({}, {}, { driver });
    expect(res).toEqual([]);
  });
});
