import { postBitResolver, reBitResolver} from './bit-create'
import driver from '../../util/neo4j-driver';
const me = { id: "6410bf80-da16-4e8e-bd3f-9527e168e235"}

describe('resolver', () => {
	it('Post Bit No Login', async () => {
		const content = "Testing..." 
		const res = await postBitResolver({}, { content }, { driver });
		expect(res).toEqual(null);
	});
	it('Post Bit', async () => {
		const content = "Testing..." 
		const res = await postBitResolver({}, { content }, { me, driver });
		expect(res.content).toEqual(content);
	});
	it('Rebit Bit No Login', async () => {
		const content = "Rebit Testing...";
		const res = await postBitResolver({}, { content }, { driver });
		expect(res).toEqual(null);
	});
	it('Rebit Bit', async () => {
		const content = "Rebit Testing...";
		const id = "0d1f3b6a-245c-4cb6-90c2-6b0c6eb5e191";
		const res = await reBitResolver({}, { content, id }, { me, driver });
		expect(res.content).toEqual(content);
	});
});
