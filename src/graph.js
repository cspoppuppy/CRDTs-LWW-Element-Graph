const Lww = require('./lww');

class Graph {
	constructor() {
		this.lww = new Lww();
	}

	addVertex(vertex) {
		this.lww.addVertex(vertex);
	}

	removeVertex(vertex) {
		this.lww.removeVertex(vertex);
	}

	addEdge(vertex1, vertex2) {
		this.lww.addEdge(vertex1, vertex2);
	}

	removeEdge(edge) {
		this.lww.removeEdge(edge);
	}

	vertexInGraph(vertex) {
		return this.lww.lookupVertex(vertex);
	}

	connectedVertice(vertex) {
		return this.lww.connectedVertice(vertex);
	}

	merge(otherGraph) {
		this.lww.merge(otherGraph.lww);
	}

	getGraph() {
		const graph = {};
		for (let vertex in this.lww.getVertexAdded()) {
			if (this.vertexInGraph(vertex)) {
				graph[vertex] = this.connectedVertice(vertex);
			}
		}
		return Object.assign({}, graph);
	}

	getPath(vertex1, vertex2) {
		return this.lww.findOnePath(vertex1, vertex2);
	}
}

module.exports = Graph;
