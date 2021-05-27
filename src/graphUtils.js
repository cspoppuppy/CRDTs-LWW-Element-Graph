// first path between two vertices
// empty array if none
const findPathInGraph = (graph, source, target) => {
	const moveForward = (vertex, path, connectedVertice, visited) => {
		if (vertex) {
			path.push(vertex);
			visited.add(vertex);

			const connected = graph.connectedVertice(vertex).filter((v) => !visited.has(v));
			connectedVertice.push(connected);
		}
	};

	const discardMove = (path, connectedVertice, visited) => {
		const discardedVertex = path.pop();

		if (discardedVertex) {
			visited.delete(discardedVertex);
		}
		connectedVertice.pop();
	};

	const path = [];

	if (source === target) {
		path.push(source);
		return path;
	}

	const visited = new Set();

	const connectedVertice = [];
	moveForward(source, path, connectedVertice, visited);

	while (path.length > 0) {
		const connected = connectedVertice.pop();

		if (connected && connected.length) {
			const nextVertex = connected.shift();
			connectedVertice.push(connected);

			if (nextVertex) {
				moveForward(nextVertex, path, connectedVertice, visited);
			}
		} else {
			connectedVertice.push(connected);
			discardMove(path, connectedVertice, visited);
			continue;
		}

		if (path[path.length - 1] === target) {
			return path;
		}
	}
	return path;
};

const mergeSets = (main, other) => {
	for (let element in other) {
		main[element] = main[element] && main[element] >= other[element] ? main[element] : other[element];
	}
};

const displayGraph = (graph) => {
	const display = {};
	for (let vertex in graph.getVertexAdded()) {
		if (graph.lookupVertex(vertex)) {
			display[vertex] = graph.connectedVertice(vertex);
		}
	}
	return Object.assign({}, display);
};

module.exports = { findPathInGraph, mergeSets, displayGraph };
