const resolver = require('./user-show');
import driver from '../../util/neo4j-driver';

describe('resolver', () => {
	it('hello', async () => {
		const res = await resolver({}, {}, { driver });
		expect(res).toEqual([]);
	});
});
