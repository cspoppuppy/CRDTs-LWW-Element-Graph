const Lww = require('./lww');

// display graph in key value pair: vertex as key, connected vertices in an array as value
class Graph {
	constructor(lww = new Lww()) {
		this.lww = lww;
	}

	display() {
		const graph = {};
		for (let vertex in this.lww.getVertexAdded()) {
			if (this.lww.lookupVertex(vertex)) {
				graph[vertex] = this.lww.connectedVertice(vertex);
			}
		}
		return Object.assign({}, graph);
	}
}

module.exports = Graph;
