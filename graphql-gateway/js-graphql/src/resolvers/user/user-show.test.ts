const resolver = require('./user-show');
import driver from '../../util/neo4j-driver';

describe('resolver', () => {
	it('hello', () => {
		const res = resolver({}, {}, { driver });
		expect(res).toEqual([]);
	});
});
