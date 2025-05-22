# ProfilePro

A backend API for managing user profiles built with Express.js, Node.js, TypeScript, and PostgreSQL.

## Features

- User authentication with JWT
- User profile management
- Role-based access control
- PostgreSQL database with Drizzle ORM

## Tech Stack

- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JWT
- **Language**: TypeScript

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gnanamr18/profilePro.git
   cd profilePro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/profilepro
   JWT_SECRET=your_jwt_secret
   ```

## Database Setup

1. Create a PostgreSQL database for the project
2. The schema is defined in `db/schema.ts`
3. Run migrations:
   ```bash
   npx drizzle-kit push:pg
   ```

## Running the Application

Development mode:
```bash
npm start
```

Build for production:
```bash
npm run build
```

Run production build:
```bash
node dist/server.js
```

## API Endpoints

### Authentication
- `POST /api/v1/login` - User login

### Profile Management
- `GET /api/v1/profile` - Get all profiles (requires authentication)
- `GET /api/v1/profile/:id` - Get a specific profile
- `POST /api/v1/profile` - Create a new profile
- `PUT /api/v1/profile/:id` - Update a profile
- `DELETE /api/v1/profile/:id` - Delete a profile

## Project Structure

```
profilePro/
├── Controller/
│   ├── loginController.ts
│   └── profileController.ts
├── db/
│   ├── index.ts
│   ├── schema.ts
│   └── migrations/
├── middleware/
│   └── authMiddleware.ts
├── routes/
│   ├── loginRoute.ts
│   └── profileRoute.ts
├── service/
│   ├── userService.ts
│   └── util.ts
├── server.ts
├── types.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
