# FuelEU Compliance Dashboard

## Overview

The **FuelEU Compliance Dashboard** is a full-stack application designed to analyze maritime fuel emissions and evaluate compliance with the **FuelEU Maritime regulation**.

The dashboard allows users to:

* View vessel routes and their GHG intensity
* Compare routes against a selected baseline
* Evaluate compliance status
* Perform banking and pooling compliance operations

The system uses a **Node.js + TypeScript backend** and a **web-based frontend dashboard** that interacts with REST APIs.

---

# Architecture Summary (Hexagonal Architecture)

The backend follows **Hexagonal Architecture (Ports and Adapters)** to keep business logic independent from external frameworks.

### Domain Layer

Contains core entities and models such as:

* `Route`
* Compliance data structures

### Application Layer

Implements business logic such as:

* GHG comparison calculations
* Compliance status evaluation

Example service:

```
computeComparison
```

### Adapters Layer

Handles communication with external systems.

**Inbound Adapters**

* Express HTTP controllers
* Example:

```
routesController.ts
```

**Outbound Adapters**

* External APIs or database integrations (future expansion)

### Architecture Flow

User Request
→ HTTP Route (Controller)
→ Application Service
→ Domain Logic
→ Response Returned

This structure improves **testability, modularity, and maintainability**.

---

# Setup & Run Instructions

## 1 Clone Repository

```bash
git clone <repository-url>
cd fueleu-compliance-dashboard
```

## 2 Install Dependencies

Backend:

```bash
cd backend
npm install
```

Frontend (if applicable):

```bash
cd frontend
npm install
```

---

## 3 Run Backend Server

```bash
npm run dev
```

Server will run at:

```
http://localhost:3000
```

---

# Running Tests

Execute tests using:

```bash
npm test
```

---

# Example API Request

### Request

```
GET /routes
```

### Response

```json
[
  {
    "routeId": "R001",
    "vesselType": "Container",
    "fuelType": "HFO",
    "year": 2024,
    "ghgIntensity": 91
  }
]
```

---

# Application Screenshots

## Routes Page

Shows available vessel routes and their GHG intensity with an option to set a baseline.

![Routes](screenshots/routes.png)

---

## Route Comparison

Displays the percentage difference compared to the baseline and compliance status.

![Compare](screenshots/compare.png)

---

## Banking Compliance

Allows users to input compliance balance and calculate bank surplus.

![Banking](screenshots/banking.png)

---

## Pooling Compliance

Allows creation of compliance pools and displays pooled member information.

![Pooling](screenshots/pooling.png)

---

# Technologies Used

* Node.js
* Express.js
* TypeScript
* REST APIs
* Hexagonal Architecture
* Web Dashboard UI

---

# Author

Suhel Baig
