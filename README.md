# Conflict-Free Replicated Data Types (CRDTs)

#### A state-based LWW-Element-Graph

-   [x] add a vertex/edge: _lww.js - addVertex, addEdge_
-   [x] remove a vertex/edge: _lww.js - removeVertex, removeEdge_
-   [x] check if a vertex is in the graph: _lww.js - lookupVertex_
-   [x] query for all vertices connected to a vertex: _lww.js - connectedVertice_
-   [x] find any path between two vertices: _lww.js - findOnePath_
-   [x] merge graph/replica: _lww.js - merge_

#### Overview

-   Reference: [A comprehensive study of Convergent and Commutative
    Replicated Data Types](https://hal.inria.fr/inria-00555588/PDF/techreport.pdf)
-   Use Jest for testing, and Eslint for code check

##### Directory src

-   lww.js: new data type with all functions
-   graph.js: display graph in key (vertex) value (connected vertices in array) pairs

##### Directory test

-   lww.test.js: tests for lww.js, mocked timestamp
-   graph.test.js: tests for graph.js, mocked lww.js and timestamp

##### How to test

-   Command line: `npm install` then `npm run test`

##### Further work

-   Timestamp precision: currently milliseconds, can be more precise
-   Branch test coverage not 100%
