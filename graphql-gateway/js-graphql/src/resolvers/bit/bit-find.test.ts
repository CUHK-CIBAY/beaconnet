const resolver = require('./bit-find');
import driver from '../../util/neo4j-driver';

describe('resolver', () => {
	it('No input', async () => {
		const res = await resolver({}, { }, { driver });
		expect(res).toEqual(null);
	});
	it('Wrong Bit ID', async () => {
		const res = await resolver({}, { id: "123" }, { driver });
		expect(res).toEqual(null);
	});
	it('Find Bit', async () => {
		const res = await resolver({}, { id: "0d1f3b6a-245c-4cb6-90c2-6b0c6eb5e191" }, { driver });
		expect(res.content).toEqual("hello world");
		expect(res.id).toEqual("0d1f3b6a-245c-4cb6-90c2-6b0c6eb5e191");
	});
});

