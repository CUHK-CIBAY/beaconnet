const resolver = require('./user-search');
import driver from '../../util/neo4j-driver';

describe('resolver', () => {
	const target = {
		email: "123@test.com",
		id: "6410bf80-da16-4e8e-bd3f-9527e168e235",
		password: '$2a$10$XS1Vtd9kG4lEX3yo0S/xR.KmU6WPp.rSJQKcYpN1H41ugVYEr03xS',
		username: "123",
		role: "NORMAL",
	}
	it('No input', async () => {
		const res = await resolver({}, {}, { driver });
		expect(res).toEqual(null);
	});
	it('User name', async () => {
		const input = { username: "123" };
		const res = await resolver({}, { input }, { driver });
		expect(res).toEqual(target);
	});
	it('User Email', async () => {
		const input = { email: "123@test.com" };
		const res = await resolver({}, { input }, { driver });
		expect(res).toEqual(target);
	});
	it('User id', async () => {
		const input = { id: "6410bf80-da16-4e8e-bd3f-9527e168e235" };
		const res = await resolver({}, { input }, { driver });
		expect(res).toEqual(target);
	});
});
