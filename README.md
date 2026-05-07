# Metro Route Planner

A metro navigation and route planning system that computes optimal routes between metro stations using graph-based pathfinding algorithms and GTFS transit data.

The project focuses on efficient route computation, interchange-aware navigation, travel time estimation, shortest-path optimization, and scalable backend architecture for real-world metro systems.

---

# Features

* Find optimal routes between metro stations
* Compute:
  * Minimum travel time routes
  * Minimum station-count routes (planned)
* Interchange-aware routing with penalties
* Estimated travel time calculation
* Distance-aware weighted graph traversal
* GTFS-based metro network integration
* Fast backend route computation
* REST API support for frontend integration
* Multiple pathfinding strategies
* Database-backed metro data storage
* Prisma ORM integration
* Redis-ready architecture for caching support (planned)

---

# Tech Stack

## Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Redis (planned caching layer)

## Frontend (to be implemented)

* React.js
* Tailwind CSS

## Data Source

* GTFS (General Transit Feed Specification)

---

# Algorithms Used

## Dijkstra’s Algorithm

Used for:

* Minimum travel time routing
* Weighted shortest-path computation
* Interchange-aware navigation

Since metro systems have varying travel times and interchange costs, Dijkstra’s algorithm helps compute the most optimal route using weighted edges.

---

## BFS (Breadth First Search)

Used for:

* Minimum station traversal
* Unweighted shortest path queries

Useful when users prefer fewer stations instead of minimum travel time.

---

## A* Search (Future Enhancement)

Can be integrated for:

* Faster route computation
* Heuristic-based pathfinding
* Better scalability on larger transit systems

A* becomes especially useful when the metro graph grows significantly in size.

---

# Database Integration

The metro network is now integrated into a PostgreSQL database using Prisma ORM.

GTFS datasets are parsed and stored into relational tables including:

* Stations / Stops
* Routes
* Trips
* Stop Times
* Transfers

This improves:

* Query efficiency
* Scalability
* Maintainability
* Future real-time feature support

---

# Project Structure

```bash
metro-routing/
│
├── backend/
│   ├── algorithms/
│   │   ├── dijkstra.js
│   │   ├── bfs.js (in progress)
│   │   └── astar.js (in progress)
│   │
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed/
│   │
│   ├── scripts/
│   │   └── gtfs-import.js
│   │
│   └── server.js
│
├── frontend/ (in progress)
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── assets/
|   
│
├── data/
|   └── gtfs/
│       ├── stops.txt
│       ├── routes.txt
│       ├── trips.txt
│       └── stop_times.txt
│
├── README.md
├── package.json
└── docker-compose.yml
```

---

# How It Works

1. GTFS metro data is parsed and imported into PostgreSQL.
2. Stations are modeled as graph nodes.
3. Connections between stations are represented as weighted edges.
4. Edge weights store:
   * Travel time
   * Distance
   * Interchange penalties (added when changing lines)
5. The routing engine builds the graph dynamically.
6. Pathfinding algorithms compute the optimal route based on user preference.

---

# Route Optimization Logic

The system currently supports only finding shortest time based paths but may be extended to include other optimization modes:

| Mode | Optimization Target |
|------|----------------------|
| Shortest Time | Minimum travel duration |
| Least Stations | Minimum number of stations |
| Reduced Interchanges | Lower interchange count |

Interchange penalties are applied during weighted path computation to produce more practical routes.

---

# API Endpoints

## Get Optimal Route

```http
GET /routes?startPoint=StationA&endPoint=StationB
```

### Sample Response

```json
{
  "statusCode": 200,
  "message": "Route found successfully",
  "data": {
    "startPoint": "StationA",
    "endPoint": "StationB",
    "segments": [
      {
        "line": "LINE1",
        "stations": [
          "StationA",
          "StationA1",
           ...
          "StationB1"
        ]
      },
      {
        "line": "LINE2",
        "stations": [
          "StationB1",
          "StationB2",
           ...
          "StationB"
        ]
      }
    ],
    "travelTime": timeTaken,
    "bestRoute": 0,
    "interchanges": 0
  },
  "success": true
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/techisat415/metro-routing/
cd metro_backend
```

---

## Install dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/metrodb"
```

---

## Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

---

## Import GTFS Data

```bash
node metro_backend/scripts/importGtfs.js
```

---

## Run the Backend Server

```bash
npm run dev
```

---

# Future Improvements

* Real-time metro delay updates
* Live metro train tracking
* Fare calculation system
* Multi-city metro support
* Route caching using Redis
* AI-based crowd prediction
* Interactive metro map visualization
* WebSocket-based live updates
* ETA prediction using machine learning
* Offline route computation support

---

# Challenges Faced

* Modeling metro systems efficiently as graphs
* Handling interchange penalties realistically
* Parsing and importing large GTFS datasets
* Balancing shortest-time vs shortest-distance routing
* Maintaining scalable backend performance

---

# Learning Outcomes

This project helped in understanding:

* Graph theory in real-world systems
* Pathfinding algorithms
* Backend system architecture
* PostgreSQL database design
* Prisma ORM workflows
* GTFS transit data standards
* Route optimization techniques
* Scalability considerations in transport systems
* API design and integration

---

# Future Scope

This system can evolve into a production-scale transit engine with:

* Multi-modal transport integration
* Bus + Metro route planning
* Real-time congestion analysis
* Smart route recommendations
* Mobile application support

---

# Contributor

* Saksham Panghal

---
