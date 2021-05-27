const { findPathInGraph, mergeSets, displayGraph } = require('./graphUtils');

class Lww {
	constructor() {
		this._vertexAdded = {};
		this._vertexRemoved = {};
		this._edgeAdded = {};
		this._edgeRemoved = {};
	}

	// add vertex (key) with timestamp (value)
	addVertex(vertex) {
		this._vertexAdded[vertex] = new Date();
	}

	// vertex in graph
	// if in vertexAdded and not in vertexRemoved or in vertexRemoved with an earlier timestamp
	lookupVertex(vertex) {
		return this._vertexAdded[vertex] &&
			(!this._vertexRemoved[vertex] || this._vertexAdded[vertex] >= this._vertexRemoved[vertex])
			? true
			: false;
	}

	// if vertex in graph and not used in edge, add in vertexRemoved with timestamp
	removeVertex(vertex) {
		if (this.lookupVertex(vertex) && !this.vertexInEdge(vertex)) {
			this._vertexRemoved[vertex] = new Date();
		} else {
			console.log('Cannot remove vertex ', vertex);
		}
	}

	// vertex in edge
	// if edge in graph and vertex in edge
	vertexInEdge(vertex) {
		for (let edge in this._edgeAdded) {
			const vertice = edge.split(',');
			if (this.lookupEdge(vertice) && (vertice[0] === vertex.toString() || vertice[1] === vertex.toString())) {
				return true;
			}
		}
		return false;
	}

	// if both vertices in graph, add edge with timestamp
	addEdge(vertex1, vertex2) {
		if (this.lookupVertex(vertex1) && this.lookupVertex(vertex2)) {
			this._edgeAdded[[vertex1, vertex2]] = new Date();
		} else {
			console.log('Cannot add edge ', [vertex1, vertex2]);
		}
	}

	// edge in graph
	// if both vertices in graph
	// and edge in edgeAdded
	// and not in edgeRemoved or in edgeRemoved with an earlier timestamp than edgeAdded
	lookupEdge(edge) {
		return this.lookupVertex(edge[0]) &&
			this.lookupVertex(edge[1]) &&
			this._edgeAdded[edge] &&
			(!this._edgeRemoved[edge] || this._edgeAdded[edge] >= this._edgeRemoved[edge])
			? true
			: false;
	}

	// if edge in graph, add in edgeRemoved with timestamp
	removeEdge(edge) {
		if (this.lookupEdge(edge)) {
			this._edgeRemoved[edge] = new Date();
		} else {
			console.log('Cannot remove edge ', edge);
		}
	}

	// get all vertices (in array) connect to vertex
	connectedVertice(vertex) {
		let connected = [];
		for (let edge in this._edgeAdded) {
			const vertice = edge.split(',');
			if (this.lookupEdge(vertice)) {
				if (vertice[0] === vertex.toString()) {
					connected.push(vertice[1]);
				} else if (vertice[1] === vertex.toString()) {
					connected.push(vertice[0]);
				}
			}
		}
		return connected;
	}

	findOnePath(vertex1, vertex2) {
		return findPathInGraph(this, vertex1, vertex2);
	}

	merge(other) {
		mergeSets(this._vertexAdded, other.getVertexAdded());
		mergeSets(this._vertexRemoved, other.getVertexRemoved());
		mergeSets(this._edgeAdded, other.getEdgeAdded());
		mergeSets(this._edgeRemoved, other.getEdgeRemoved());
	}

	getVertexAdded() {
		return Object.assign({}, this._vertexAdded);
	}

	getVertexRemoved() {
		return Object.assign({}, this._vertexRemoved);
	}

	getEdgeAdded() {
		return Object.assign({}, this._edgeAdded);
	}

	getEdgeRemoved() {
		return Object.assign({}, this._edgeRemoved);
	}

	display() {
		return displayGraph(this);
	}
}

module.exports = Lww;
