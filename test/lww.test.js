const Lww = require('../src/lww');

let lww;
beforeEach(() => {
	lww = new Lww();
});

it('adds vertex to vertexAdded with current timestamp', () => {
	const mockDate = mockDateTime(1622061476374);
	lww.addVertex('1');
	expect(lww.getVertexAdded()['1']).toEqual(mockDate);
});

it('lookup vertex is false when vertex not exists', () => {
	expect(lww.lookupVertex('1')).toBe(false);
});

it('lookup vertex is true after vertex added', () => {
	lww.addVertex('1');
	expect(lww.lookupVertex('1')).toBe(true);
});

it('cannot remove vertex when vertex not exists', () => {
	lww.removeVertex('1');
	expect(lww.getVertexRemoved()['1']).toBe(undefined);
});

it('removing existing vertex adds it to vertexRemoved with current timestamp', () => {
	mockDateTime(1622061476374);
	lww.addVertex('1');
	const mockDate = mockDateTime(1622061476375);
	lww.removeVertex('1');
	expect(lww.getVertexRemoved()['1']).toEqual(mockDate);
});

it('lookup vertex is false after vertex removed', () => {
	mockDateTime(1622061476374);
	lww.addVertex(1);
	mockDateTime(1622061476375);
	lww.removeVertex('1');
	expect(lww.lookupVertex('1')).toBe(false);
});

it('cannot add edge if vertices not exists', () => {
	lww.addEdge('1', '2');
	expect(lww.getEdgeAdded()[['1', '2']]).toBe(undefined);
});

it('adds edge to edgeAdded with current timestamp', () => {
	const mockDate = mockDateTime(1622061476374);
	lww.addVertex('1');
	lww.addVertex('2');
	lww.addEdge('1', '2');
	expect(lww.getEdgeAdded()[['1', '2']]).toEqual(mockDate);
});

it('lookup edge is false when edge not exists', () => {
	expect(lww.lookupEdge(['1', '2'])).toBe(false);
});

it('lookup edge is true after edge added', () => {
	lww.addVertex('1');
	lww.addVertex('2');
	lww.addEdge('1', '2');
	expect(lww.lookupEdge(['1', '2'])).toBe(true);
});

it('cannot remove edge when edge not exists', () => {
	lww.removeEdge(['1', '2']);
	expect(lww.getEdgeRemoved()[['1', '2']]).toBe(undefined);
});

it('removing existing edge adds it to edgeRemoved with a timestamp', () => {
	mockDateTime(1622061476374);
	lww.addVertex('1');
	lww.addVertex('2');
	lww.addEdge('1', '2');
	const mockDate = mockDateTime(1622061476375);
	lww.removeEdge(['1', '2']);
	expect(lww.getEdgeRemoved()[['1', '2']]).toEqual(mockDate);
});

it('lookup edge is false after edge removed', () => {
	mockDateTime(1622061476374);
	lww.addVertex('1');
	lww.addVertex('2');
	lww.addEdge('1', '2');
	mockDateTime(1622061476375);
	lww.removeEdge(['1', '2']);
	expect(lww.lookupEdge(['1', '2'])).toBe(false);
});

it('cannot remove vertex if it is used in edge', () => {
	lww.addVertex('1');
	lww.addVertex('2');
	lww.addEdge('1', '2');
	lww.removeVertex('1');
	expect(lww.getVertexRemoved()['1']).toBe(undefined);
});

it('get connected vertices for a vertice', () => {
	lww.addVertex('1');
	lww.addVertex('2');
	lww.addVertex('3');
	lww.addEdge('1', '2');
	lww.addEdge('2', '3');
	expect(lww.connectedVertice('1')).toEqual(['2']);
	expect(lww.connectedVertice('2')).toEqual(['1', '3']);
});

it('vertex not in edge', () => {
	lww.addVertex('1');
	expect(lww.vertexInEdge('1')).toEqual(false);
});

it('vertex in edge', () => {
	lww.addVertex('1');
	lww.addVertex('2');
	lww.addEdge('1', '2');
	expect(lww.vertexInEdge('1')).toEqual(true);
	expect(lww.vertexInEdge('2')).toEqual(true);
});

it('empty path if vertices not connected', () => {
	expect(lww.findOnePath('1', '2')).toEqual([]);
});

it('find path for vertice connect to itself', () => {
	lww.addVertex(1);
	expect(lww.findOnePath('1', '1')).toEqual(['1']);
});

it('return first path between two vertices', () => {
	lww.addVertex('1');
	lww.addVertex('2');
	lww.addVertex('3');
	lww.addVertex('4');
	lww.addEdge('1', '2');
	lww.addEdge('1', '4');
	lww.addEdge('4', '3');
	console.log(lww.findOnePath('1', '3'));
	expect(lww.findOnePath('1', '3')).toEqual(['1', '4', '3']);
});

it('merge sets (either vertexAdded, vertexRemoved, edgeAdded, edgeRemoved)', () => {
	const set1 = { 1: '2021-05-26T20:40:18.534Z', 2: '2021-05-26T20:40:18.534Z' };
	const set2 = { 2: '2021-05-26T20:40:18.536Z', 3: '2021-05-26T20:40:18.536Z' };
	const mergedSet = {
		1: '2021-05-26T20:40:18.534Z',
		2: '2021-05-26T20:40:18.536Z',
		3: '2021-05-26T20:40:18.536Z',
	};
	lww.mergeSets(set1, set2);
	expect(set1).toEqual(mergedSet);
});

it('merge lww with other graph/replica', () => {
	// lww
	const mockDate1 = mockDateTime(1622061476374);
	lww.addVertex('1');
	lww.addVertex('2');
	lww.addVertex('3');
	lww.addEdge('1', '2');
	lww.addEdge('2', '3');
	const mockDate2 = mockDateTime(1622061476375);
	lww.removeEdge(['2', '3']);
	const mockDate3 = mockDateTime(1622061476376);
	lww.removeVertex('3');
	// other
	const other = new Lww();
	const mockDate4 = mockDateTime(1622061476374);
	other.addVertex('4');
	other.addVertex('5');
	other.addEdge('4', '5');
	// merge
	lww.merge(other);
	// vertexAdded after merged
	expect(lww.getVertexAdded()).toEqual({
		1: mockDate1,
		2: mockDate1,
		3: mockDate1,
		4: mockDate4,
		5: mockDate4,
	});
	// vertexRemoved after merged
	expect(lww.getVertexRemoved()).toEqual({ 3: mockDate3 });
	// edgeAdded after merged
	expect(lww.getEdgeAdded()).toEqual({
		'1,2': mockDate1,
		'2,3': mockDate1,
		'4,5': mockDate4,
	});
	// edgeRemoved after merged
	expect(lww.getEdgeRemoved()).toEqual({ '2,3': mockDate2 });
});

const mockDateTime = (mockDT) => {
	jest.useFakeTimers('modern');
	jest.setSystemTime(new Date(mockDT).getTime());
	return new Date();
};

afterAll(() => {
	jest.useRealTimers();
});
