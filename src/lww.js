class Lww {
	constructor() {
		this.vertexAdded = {};
		this.vertexRemoved = {};
		this.edgeAdded = {};
		this.edgeRemoved = {};
	}

	// add vertex (key) with timestamp (value)
	addVertex = (vertex) => {
		this.vertexAdded[vertex] = new Date();
	};

	// vertex in graph
	// if in vertexAdded and not in vertexRemoved or in vertexRemoved with an earlier timestamp
	lookupVertex = (vertex) => {
		if (
			this.vertexAdded[vertex] &&
			(!this.vertexRemoved[vertex] || this.vertexAdded[vertex] > this.vertexRemoved[vertex])
		) {
			return true;
		} else {
			return false;
		}
	};

	// if vertex in graph and not used in edge, add in vertexRemoved with timestamp
	removeVertex = (vertex) => {
		if (this.lookupVertex(vertex) && !this.vertexInEdge(vertex)) {
			this.vertexRemoved[vertex] = new Date();
		} else {
			console.error('Cannot remove vertex ', vertex);
		}
	};

	// vertex in edge
	// if edge in graph and vertex in edge
	vertexInEdge = (vertex) => {
		for (let edge in this.edgeAdded) {
			const vertice = edge.split(',');
			if (this.lookupEdge(vertice) && (vertice[0] === vertex.toString() || vertice[1] === vertex.toString())) {
				return true;
			}
		}
		return false;
	};

	// if both vertices in graph, add edge with timestamp
	addEdge = (vertex1, vertex2) => {
		if (this.lookupVertex(vertex1) && this.lookupVertex(vertex2)) {
			this.edgeAdded[[vertex1, vertex2]] = new Date();
		} else {
			console.error('Cannot add edge ', [vertex1, vertex2]);
		}
	};

	// edge in graph
	// if both vertices in graph
	// and edge in edgeAdded
	// and not in edgeRemoved or in edgeRemoved with an earlier timestamp than edgeAdded
	lookupEdge = (edge) => {
		if (
			this.lookupVertex(edge[0]) &&
			this.lookupVertex(edge[1]) &&
			this.edgeAdded[edge] &&
			(!this.edgeRemoved[edge] || this.edgeAdded[edge] > this.edgeRemoved[edge])
		) {
			return true;
		} else {
			return false;
		}
	};

	// if edge in graph, add in edgeRemoved with timestamp
	removeEdge = (edge) => {
		if (this.lookupEdge(edge)) {
			this.edgeRemoved[edge] = new Date();
		} else {
			console.error('Cannot remove edge ', edge);
		}
	};

	// get all vertices (in array) connect to vertex
	connectedVertice = (vertex) => {
		let connected = [];
		for (let edge in this.edgeAdded) {
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
	};

	merge = (replica) => {};
}

module.exports = Lww;
