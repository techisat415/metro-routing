# Metro Route Planner

A metro navigation and route planning system that helps users find optimal paths (taking least time) between stations using graph-based pathfinding algorithms.

The project focuses on efficient route computation, interchange handling, travel time estimation, and shortest-path optimization for metro networks.

---

# Features

* Find shortest route between two metro stations
* Compute minimum travel time paths
* Interchange-aware routing
* Display number of stations and estimated time
* Graph-based metro network representation
* Support for weighted edges between stations
* Fast route computation using pathfinding algorithms
* Backend APIs for route queries

---

# Algorithms Used

## Dijkstra's Algorithm

Used for:

* Minimum travel time
* Weighted shortest path computation

Since metro networks can have different travel times between stations, Dijkstra’s algorithm helps compute the most optimal route based on edge weights.

## BFS (Breadth First Search)

Used for:

* Minimum stations traversal
* Unweighted shortest path queries

## A* Search (Future Enhancement)

Can be integrated for:

* Faster route computation
* Heuristic-based pathfinding
* Better scalability for large metro systems

---

# Project Structure

```bash
metro-route-planner/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── algorithms/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── data/
│   └── metro-network.json
│
├── README.md
└── package.json
```

---

# How It Works

1. The metro network is modeled as a graph.
2. Stations are represented as nodes.
3. Connections between stations are represented as edges.
4. Edge weights store:

   * Travel time
   * Distance
   * Interchange penalties
5. The routing engine computes the optimal path based on user preference.

---

# API Endpoints

## Get Shortest Route

```http
GET /route?source=StationA&destination=StationB
```

### Response

```json
{
  "path": ["StationA", "StationB", "StationC"],
  "totalStations": 3,
  "estimatedTime": "18 mins",
  "interchanges": 1
}
```

---

# Installation

## Clone the repository

```bash
git clone <your-repository-url>
cd metro-route-planner
```

## Install dependencies

```bash
npm install
```

## Run the server

```bash
npm start
```

---

# Future Improvements

* Real-time metro delay updates
* Live metro train tracking
* Fare calculation system
* Multi-city metro support
* AI-based crowd prediction
* Route caching using Redis
* A* optimization for large-scale networks
* Interactive metro map visualization

---

# Learning Outcomes

This project helped in understanding:

* Graph theory applications
* Pathfinding algorithms
* Backend API development
* Route optimization
* Data structures for real-world systems
* Scalability considerations in transport systems

---
