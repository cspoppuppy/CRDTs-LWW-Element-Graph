# Conflict-Free Replicated Data Types (CRDTs)

Conflict-Free Replicated Data Types (CRDTs) are data structures that power real-time collaborative applications in distributed systems. CRDTs can be replicated across systems, they can be updated independently and concurrently without coordination between the replicas, and it is always mathematically possible to resolve inconsistencies that might result.

#### A state-based LWW-Element-Graph

-   [x] add a vertex/edge: lww.js - addVertex, addEdge
-   [x] remove a vertex/edge: lww.js - removeVertex, removeEdge
-   [x] check if a vertex is in the graph: lww.js - lookupVertex
-   [x] query for all vertices connected to a vertex: lww.js - connectedVertice
-   [] find any path between two vertices
-   [x] merge graph/replica: lww.js - merge

#### How to use / test

Prerequisite: Node.js

-   Code in lww.js
-   Test: command line `npm run test`

#### Concerns

-   Timestamp precision: milliseconds
