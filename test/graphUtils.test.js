const { findPathInGraph, mergeSets, displayGraph } = require('../src/graphUtils');
const Lww = require('../src/lww');
jest.mock('../src/lww');

let mockLwwInstance;
beforeEach(() => {
	Lww.mockClear();
	new Lww();
	mockLwwInstance = Lww.mock.instances[0];
});

it('return path from 1 to 3 (1 connects to 2 and 4, 4 connects to 3)', () => {
	mockLwwInstance.connectedVertice
		.mockReturnValueOnce(['2', '4'])
		.mockReturnValueOnce(['1'])
		.mockReturnValue(['1', '3']);
	expect(findPathInGraph(mockLwwInstance, '1', '3')).toEqual(['1', '4', '3']);
});

it('return path from 1 to 3 (not connected, 1 connects to 2 and 4)', () => {
	mockLwwInstance.connectedVertice.mockReturnValueOnce(['2', '4']).mockReturnValueOnce(['1']).mockReturnValue(['1']);
	expect(findPathInGraph(mockLwwInstance, '1', '3')).toEqual([]);
});

it('merge other set into main set', () => {
	const main = {
		1: '2021-05-26T20:37:56.374Z',
		2: '2021-05-26T20:37:56.374Z',
		3: '2021-05-26T20:37:56.374Z',
		4: '2021-05-26T20:37:56.376Z',
	};

	const other = {
		3: '2021-05-26T20:37:56.375Z',
		4: '2021-05-26T20:37:56.375Z',
		5: '2021-05-26T20:37:56.375Z',
	};

	mergeSets(main, other);

	expect(main).toEqual({
		1: '2021-05-26T20:37:56.374Z',
		2: '2021-05-26T20:37:56.374Z',
		3: '2021-05-26T20:37:56.375Z',
		4: '2021-05-26T20:37:56.376Z',
		5: '2021-05-26T20:37:56.375Z',
	});
});

it('display graph in key (vertex) value (connected vertices) pairs from lww', () => {
	mockLwwInstance.getVertexAdded.mockReturnValue({
		1: '2021-05-26T20:37:56.374Z',
		2: '2021-05-26T20:37:56.374Z',
		3: '2021-05-26T20:37:56.374Z',
		4: '2021-05-26T20:37:56.374Z',
	});
	mockLwwInstance.lookupVertex
		.mockReturnValueOnce(true)
		.mockReturnValueOnce(true)
		.mockReturnValueOnce(true)
		.mockReturnValueOnce(false);
	mockLwwInstance.connectedVertice.mockReturnValueOnce(['2']).mockReturnValueOnce(['1', '3']).mockReturnValue(['2']);
	expect(displayGraph(mockLwwInstance)).toEqual({ 1: ['2'], 2: ['1', '3'], 3: ['2'] });
});
