import { likeBit, isLikedBit } from './bit-like';
import driver from '../../util/neo4j-driver';
const me = { id: "6410bf80-da16-4e8e-bd3f-9527e168e235"}

describe('likeBit', () => {
	it('No bit', async () => {
		const res = await likeBit({}, {}, { me, driver });
		expect(res).toEqual(null);
	});
	it('No Login', async () => {
		const res = await likeBit({}, { id: "0d1f3b6a-245c-4cb6-90c2-6b0c6eb5e191" }, { driver });
		expect(res).toEqual(null);
	});
	it('Wrong Bit id', async () => {
		const res = await likeBit({}, { id: "123" }, { driver });
		expect(res).toEqual(null);
	});
	it('Like', async () => {
		const res = await likeBit({}, { id: "0d1f3b6a-245c-4cb6-90c2-6b0c6eb5e191" }, { me, driver });
		const Liked = await isLikedBit({}, { id: "0d1f3b6a-245c-4cb6-90c2-6b0c6eb5e191" }, { me, driver })
		expect(Liked).toEqual(true);
	});
	it('Unlike', async () => {
		const res = await likeBit({}, { id: "0d1f3b6a-245c-4cb6-90c2-6b0c6eb5e191" }, { me, driver });
		const Liked = await isLikedBit({}, { id: "0d1f3b6a-245c-4cb6-90c2-6b0c6eb5e191" }, { me, driver })
		expect(Liked).toEqual(false);
	});
});

describe('isLikedBit', () => {
	it('No bit', async () => {
		const res = await isLikedBit({}, {}, { me, driver });
		expect(res).toEqual(null);
	});
	it('No Login', async () => {
		const res = await isLikedBit({}, { id: "0d1f3b6a-245c-4cb6-90c2-6b0c6eb5e191" }, { driver });
		expect(res).toEqual(null);
	});
});