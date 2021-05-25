const { expect } = require('@jest/globals');
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

const mockDateTime = (mockDT) => {
	jest.useFakeTimers('modern');
	jest.setSystemTime(new Date(mockDT).getTime());
	return new Date();
};

afterAll(() => {
	jest.useRealTimers();
});
