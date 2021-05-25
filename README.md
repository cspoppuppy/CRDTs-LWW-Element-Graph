# Conflict-Free Replicated Data Types (CRDTs)

Conflict-Free Replicated Data Types (CRDTs) are data structures that power real-time collaborative applications in distributed systems. CRDTs can be replicated across systems, they can be updated independently and concurrently without coordination between the replicas, and it is always mathematically possible to resolve inconsistencies that might result.

#### A state-based LWW-Element-Graph

-   add a vertex/edge
-   remove a vertex/edge
-   check if a vertex is in the graph
-   query for all vertices connected to a vertex
-   find any path between two vertices
-   merge graph/replica

Timestamp precision: milliseconds
