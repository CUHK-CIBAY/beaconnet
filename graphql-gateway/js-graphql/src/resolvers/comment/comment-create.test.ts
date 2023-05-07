const resolver = require('./comment-create');
import driver from '../../util/neo4j-driver';

describe('resolver', () => {
  const me = { id: "6410bf80-da16-4e8e-bd3f-952s7e168e235"}
	const id = "0d1f3b6a-245c-4cb6-90c2-6b0c6eb5e191";
	const content = "Testing..." 
	
  it('Post Bit No Login', async () => {
		const res = await resolver({}, {}, { driver });
		expect(res).toEqual(null);
	});
	it('No Bit id', async () => {
		const res = await resolver({}, { content }, { me, driver });
		expect(res).toEqual(null);
	});
	it('Comment', async () => {
		const res = await resolver({}, { id, content }, { me, driver });
		expect(res.content).toEqual(content);
	});
});
