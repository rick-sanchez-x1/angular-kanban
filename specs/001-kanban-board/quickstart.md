# Quickstart

## Prerequisites
- Node.js v18+
- npm v10+

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Mock Backend**
   (Note: `json-server` must be installed)
   ```bash
   npm run mock-api
   ```
   *Expected*: API running at http://localhost:3000

3. **Start Application**
   ```bash
   npm start
   ```
   *Expected*: App running at http://localhost:4200

## Verification

1. Open http://localhost:4200
2. Verify you see the Kanban board with 3 columns.
3. Drag a card from "To Do" to "In Progress".
4. Check the "In Progress" count increases.
