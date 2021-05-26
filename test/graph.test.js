const Graph = require('../src/graph');
const Lww = require('../src/lww');
jest.mock('../src/lww');

let graph;
let mockLwwInstance;
beforeEach(() => {
	Lww.mockClear();
	graph = new Graph();
	mockLwwInstance = Lww.mock.instances[0];
});

it('initialise graph calls initialise lww', () => {
	expect(Lww).toHaveBeenCalledTimes(1);
});

it('add vertex', () => {
	graph.addVertex(1);
	expect(mockLwwInstance.addVertex.mock.calls[0][0]).toEqual(1);
});

it('remove vertex', () => {
	graph.removeVertex(1);
	expect(mockLwwInstance.removeVertex.mock.calls[0][0]).toEqual(1);
});

it('add edge', () => {
	graph.addEdge(1, 2);
	expect(mockLwwInstance.addEdge.mock.calls[0]).toEqual([1, 2]);
});

it('remove edge', () => {
	graph.removeEdge([1, 2]);
	expect(mockLwwInstance.removeEdge.mock.calls[0][0]).toEqual([1, 2]);
});

it('vertexInGraph', () => {
	graph.vertexInGraph(1);
	expect(mockLwwInstance.lookupVertex.mock.calls[0][0]).toEqual(1);
});

it('connectedVertice', () => {
	graph.connectedVertice(1);
	expect(mockLwwInstance.connectedVertice.mock.calls[0][0]).toEqual(1);
});

it('merge with other graph', () => {
	const graph2 = new Graph();
	const mockLwwInstance2 = Lww.mock.instances[1];
	graph.merge(graph2);
	expect(mockLwwInstance.merge.mock.calls[0][0]).toEqual(mockLwwInstance2);
});

it('generate graph', () => {
	const mockDate = mockDateTime(1621930691554);
	mockLwwInstance.getVertexAdded.mockReturnValue({
		1: mockDate,
		2: mockDate,
		3: mockDate,
	});
	mockLwwInstance.lookupVertex.mockReturnValue(true);
	mockLwwInstance.connectedVertice.mockReturnValueOnce(['2']).mockReturnValueOnce(['1', '3']).mockReturnValue(['2']);
	expect(graph.getGraph()).toEqual({ 1: ['2'], 2: ['1', '3'], 3: ['2'] });
});

it('find path', () => {
	graph.getPath('1', '2');
	expect(mockLwwInstance.findOnePath.mock.calls[0]).toEqual(['1', '2']);
});

const mockDateTime = (mockDT) => {
	jest.useFakeTimers('modern');
	jest.setSystemTime(new Date(mockDT).getTime());
	return new Date();
};

afterAll(() => {
	jest.useRealTimers();
});
