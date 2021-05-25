const Lww = require('../src/lww');

let lww;
beforeEach(() => {
	lww = new Lww();
});

it('adds vertex to vertexAdded with current timestamp', () => {
	const mockDate = mockDateTime(1621930691554);
	lww.addVertex(1);
	expect(lww.vertexAdded[1]).toEqual(mockDate);
});

it('lookup vertex is false when vertex not exists', () => {
	expect(lww.lookupVertex(1)).toBe(false);
});

it('lookup vertex is true after vertex added', () => {
	lww.addVertex(1);
	expect(lww.lookupVertex(1)).toBe(true);
});

it('cannot remove vertex when vertex not exists', () => {
	lww.removeVertex(1);
	expect(lww.vertexRemoved[1]).toBe(undefined);
});

it('removing existing vertex adds it to vertexRemoved with current timestamp', () => {
	mockDateTime(1621930691554);
	lww.addVertex(1);
	const mockDate = mockDateTime(1621930691555);
	lww.removeVertex(1);
	expect(lww.vertexRemoved[1]).toEqual(mockDate);
});

it('lookup vertex is false after vertex removed', () => {
	mockDateTime(1621930691554);
	lww.addVertex(1);
	const mockDate = mockDateTime(1621930691555);
	lww.removeVertex(1);
	expect(lww.lookupVertex(1)).toBe(false);
});

it('cannot add edge if vertices not exists', () => {
	lww.addEdge(1, 2);
	expect(lww.edgeAdded[[1, 2]]).toBe(undefined);
});

it('adds edge to edgeAdded with current timestamp', () => {
	const mockDate = mockDateTime(1621930691554);
	lww.addVertex(1);
	lww.addVertex(2);
	lww.addEdge(1, 2);
	expect(lww.edgeAdded[[1, 2]]).toEqual(mockDate);
});

it('lookup edge is false when edge not exists', () => {
	expect(lww.lookupEdge([1, 2])).toBe(false);
});

it('lookup edge is true after edge added', () => {
	lww.addVertex(1);
	lww.addVertex(2);
	lww.addEdge(1, 2);
	expect(lww.lookupEdge([1, 2])).toBe(true);
});

it('cannot remove edge when edge not exists', () => {
	lww.removeEdge([1, 2]);
	expect(lww.edgeRemoved[[1, 2]]).toBe(undefined);
});

it('removing existing edge adds it to edgeRemoved with a timestamp', () => {
	mockDateTime(1621930691554);
	lww.addVertex(1);
	lww.addVertex(2);
	lww.addEdge(1, 2);
	const mockDate = mockDateTime(1621930691555);
	lww.removeEdge([1, 2]);
	expect(lww.edgeRemoved[[1, 2]]).toEqual(mockDate);
});

it('lookup edge is false after edge removed', () => {
	mockDateTime(1621930691554);
	lww.addVertex(1);
	lww.addVertex(2);
	lww.addEdge(1, 2);
	const mockDate = mockDateTime(1621930691555);
	lww.removeEdge([1, 2]);
	expect(lww.lookupEdge([1, 2])).toBe(false);
});

it('cannot remove vertex if it is used in edge', () => {
	lww.addVertex(1);
	lww.addVertex(2);
	lww.addEdge(1, 2);
	lww.removeVertex(1);
	expect(lww.vertexRemoved[1]).toBe(undefined);
});

it('get connected vertices for a vertice', () => {
	lww.addVertex(1);
	lww.addVertex(2);
	lww.addVertex(3);
	lww.addEdge(1, 2);
	lww.addEdge(2, 3);
	expect(lww.connectedVertice(1)).toEqual(['2']);
	expect(lww.connectedVertice(2)).toEqual(['1', '3']);
});

it('vertex not in edge', () => {
	lww.addVertex(1);
	expect(lww.vertexInEdge(1)).toEqual(false);
});

it('vertex in edge', () => {
	lww.addVertex(1);
	lww.addVertex(2);
	lww.addEdge(1, 2);
	expect(lww.vertexInEdge(1)).toEqual(true);
	expect(lww.vertexInEdge(2)).toEqual(true);
});

it('merge payload', () => {
	set1 = { 1: '2021-05-25T08:18:11.554Z', 2: '2021-05-25T08:18:11.554Z' };
	set2 = { 2: '2021-05-25T08:18:11.556Z', 3: '2021-05-25T08:18:11.556Z' };
	mergedSet = {
		1: '2021-05-25T08:18:11.554Z',
		2: '2021-05-25T08:18:11.556Z',
		3: '2021-05-25T08:18:11.556Z',
	};
	lww.mergePayload(set1, set2);
	expect(set1).toEqual(mergedSet);
});

it('merge lww with other', () => {
	// lww
	const mockDate1 = mockDateTime(1621930691554);
	lww.addVertex(1);
	lww.addVertex(2);
	lww.addVertex(3);
	lww.addEdge(1, 2);
	lww.addEdge(2, 3);
	const mockDate2 = mockDateTime(1621930691555);
	lww.removeEdge([2, 3]);
	const mockDate3 = mockDateTime(1621930691556);
	lww.removeVertex(3);
	// other
	const other = new Lww();
	const mockDate4 = mockDateTime(1621930691554);
	other.addVertex(4);
	other.addVertex(5);
	other.addEdge(4, 5);
	// merge
	lww.merge(other);
	// vertexAdded after merged
	expect(lww.vertexAdded).toEqual({
		1: mockDate1,
		2: mockDate1,
		3: mockDate1,
		4: mockDate4,
		5: mockDate4,
	});
	// vertexRemoved after merged
	expect(lww.vertexRemoved).toEqual({ 3: mockDate3 });
	// edgeAdded after merged
	expect(lww.edgeAdded).toEqual({
		'1,2': mockDate1,
		'2,3': mockDate1,
		'4,5': mockDate4,
	});
	// edgeRemoved after merged
	expect(lww.edgeRemoved).toEqual({ '2,3': mockDate2 });
});

const mockDateTime = (mockDT) => {
	jest.useFakeTimers('modern');
	jest.setSystemTime(new Date(mockDT).getTime());
	return new Date();
};

afterAll(() => {
	jest.useRealTimers();
});
