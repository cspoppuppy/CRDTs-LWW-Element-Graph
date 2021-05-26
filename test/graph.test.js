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

it('instantize Graph called instantize Lww', () => {
	expect(Lww).toHaveBeenCalledTimes(1);
});

it('display graph in key (vertex) value (connected vertices) pairs from lww', () => {
	const mockDate = mockDateTime(1622061476374);
	mockLwwInstance.getVertexAdded.mockReturnValue({
		1: mockDate,
		2: mockDate,
		3: mockDate,
		4: mockDate,
	});
	mockLwwInstance.lookupVertex
		.mockReturnValueOnce(true)
		.mockReturnValueOnce(true)
		.mockReturnValueOnce(true)
		.mockReturnValueOnce(false);
	mockLwwInstance.connectedVertice.mockReturnValueOnce(['2']).mockReturnValueOnce(['1', '3']).mockReturnValue(['2']);
	expect(graph.display()).toEqual({ 1: ['2'], 2: ['1', '3'], 3: ['2'] });
});

const mockDateTime = (mockDT) => {
	jest.useFakeTimers('modern');
	jest.setSystemTime(new Date(mockDT).getTime());
	return new Date();
};

afterAll(() => {
	jest.useRealTimers();
});
