# MyLoot App

MyLoot is a team and rewards system where users belong to teams and accumulate coins through registered actions. The project includes a RESTful API built with Next.js (API Routes) and Prisma ORM, as well as a web interface for viewing statistics and leaderboards.

## Features
- Team and user registration
- Recording of coin earnings per user
- Team leaderboard view with date filtering

## Technologies Used
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/) (local database)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Database Structure
- **teams**: teams
- **users**: users (belong to a team)
- **coin_earnings**: coin earnings per user

See the [`structure.sql`](./structure.sql) file for schema details.

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd myloot-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up the database:**
   - The project comes with a SQLite schema and migrations.
   - To populate with sample data, run the SQL commands from `structure.sql` and insert data as needed.
4. **Start the project:**
   ```bash
   npm run dev
   ```
5. **Access:**
   - Web interface: [http://localhost:3000](http://localhost:3000)
   - API endpoints: see full list below.

## API Endpoints

- **GET /api/teams** — List all teams
- **POST /api/teams** — Create a new team (body: name)
- **GET /api/users** — List all users
- **POST /api/users** — Create a new user (body: name, teamId)
- **GET /api/teams/[id]/stats** — Get stats for a team (total coins, members, etc)
- **GET /api/teams/[id]/leaderboard?from=YYYY-MM-DD&to=YYYY-MM-DD** — Get leaderboard for a team filtered by date range
- **GET /api/coin_earnings** — List all coin earnings
- **POST /api/coin_earnings** — Add a new coin earning (body: userId, amount)

> Replace `[id]` with the team ID you want to query.

## Populating the Database via API

You can also populate the database by sending POST requests to the API endpoints. For example, to add coin earnings:

### Add Coin Earnings via API

#### Endpoint
- **POST** `/api/coin_earnings`

#### Body Parameters
- `userId` (number): The ID of the user who earned the coins (must exist in the database)
- `amount` (number): The amount of coins earned

#### Example Request (using curl)
```bash
curl -X POST http://localhost:3000/api/coin_earnings \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "amount": 100}'
```

#### Example Response
```json
{
  "id": 1,
  "userId": 1,
  "amount": 100,
  "earnedAt": "2025-07-24T15:21:13.000Z"
}
```

You can repeat this request with different `userId` and `amount` values to add more earnings.

## API Usage Examples

- **Team leaderboard for a period:**
  ```
  GET /api/teams/1/leaderboard?from=2025-07-01&to=2025-07-31
  ```
- **General team statistics:**
  ```
  GET /api/teams/1/stats
  ```

## Folder Structure
- `app/` — Next.js application code (pages, API routes)
- `components/` — Reusable React components
- `prisma/` — Database schema and migrations

## Development
- Modify the schema in `prisma/schema.prisma` and run `npx prisma migrate dev` to update the database.
- Use the `structure.sql` file to reset or manually populate the database.

## Branches & Database Setup
To simplify development and deployment, I separated the database usage by branch:

- main: uses SQLite with a local dev.db file, ideal for testing and local development without external dependencies.

- deploy (or your chosen production branch): uses PostgreSQL, with the database hosted on Railway.

This setup allows for quick local testing with SQLite, while maintaining a production-ready configuration with PostgreSQL

## License
MIT
