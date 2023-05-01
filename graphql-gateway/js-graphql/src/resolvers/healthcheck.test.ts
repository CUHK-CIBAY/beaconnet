const { Query } = require('./healthcheck');

describe('resolver', () => {
	it('healthcheck', () => {
		const res = Query.healthcheck();
		expect(res).toEqual("OK");
	});
});
