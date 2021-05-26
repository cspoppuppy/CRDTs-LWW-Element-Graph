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

	findOnePath(source, target) {
		const path = [];

		if (source === target) {
			path.push(source);
			return path;
		}

		const visited = new Set();

		const connectedVertice = [];
		this._moveForward(source, path, connectedVertice, visited);

		while (path.length > 0) {
			const connected = connectedVertice.pop();

			if (connected && connected.length) {
				const nextVertex = connected.shift();
				connectedVertice.push(connected);

				if (this.lookupVertex(nextVertex)) {
					this._moveForward(nextVertex, path, connectedVertice, visited);
				}
			} else {
				connectedVertice.push(connected);
				this._moveBack(path, connectedVertice, visited);
				continue;
			}

			if (path[path.length - 1] === target) {
				return path;
			}
		}
		return path;
	}

	_moveForward(vertex, path, connectedVertice, visited) {
		if (vertex) {
			path.push(vertex);
			visited.add(vertex);

			const connected = this.connectedVertice(vertex).filter((v) => !visited.has(v));
			connectedVertice.push(connected);
		}
	}

	_moveBack(path, connectedVertice, visited) {
		const removedVertex = path.pop();

		if (removedVertex) {
			visited.delete(removedVertex);
		}
		connectedVertice.pop();
	}

	merge(other) {
		this.mergeSets(this._vertexAdded, other.getVertexAdded());
		this.mergeSets(this._vertexRemoved, other.getVertexRemoved());
		this.mergeSets(this._edgeAdded, other.getEdgeAdded());
		this.mergeSets(this._edgeRemoved, other.getEdgeRemoved());
	}

	// merge set2 to set1
	mergeSets(set1, set2) {
		for (let element in set2) {
			set1[element] = set1[element] && set1[element] >= set2[element] ? set1[element] : set2[element];
		}
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
}

module.exports = Lww;
