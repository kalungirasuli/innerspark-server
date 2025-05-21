# InnerSpark Therapy App Server

This is the backend server for the InnerSpark therapy application, providing a MongoDB-based API for the therapy dashboard.

## Features

- User authentication and authorization (therapists, patients, admins)
- Appointment scheduling and management
- Group therapy sessions
- Messaging between therapists and patients
- Support ticket system
- Admin dashboard for system management

## Technology Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication mechanism
- **bcrypt** - Password hashing

## Project Structure

```
├── controllers/       # Route controllers
├── middleware/        # Express middleware
├── models/            # Mongoose models
├── routes/            # API routes
│   └── api/           # API endpoints
├── .env               # Environment variables
├── .env.example       # Example environment variables
├── server.js          # Entry point
└── README.md          # This file
```

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd innerspark-server
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy the example environment file and update the values:

```bash
cp .env.example .env
```

Update the `.env` file with your MongoDB connection string and JWT secret.

4. **Start the server**

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token
- `GET /api/auth` - Get authenticated user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with code

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a user (admin only)
- `PUT /api/users/:id` - Update a user

### Therapists
- `GET /api/therapists` - Get all therapists (admin only)
- `GET /api/therapists/:id` - Get therapist by ID
- `GET /api/therapists/:id/patients` - Get all patients for a therapist
- `POST /api/therapists` - Create a therapist (admin only)
- `PUT /api/therapists/:id` - Update a therapist
- `GET /api/therapists/:id/stats` - Get therapist dashboard stats

### Groups
- `GET /api/groups` - Get all groups
- `GET /api/groups/therapist/:therapistId` - Get all groups for a therapist
- `GET /api/groups/member/:userId` - Get all groups for a member
- `GET /api/groups/:id` - Get group by ID
- `POST /api/groups` - Create a group (therapist only)
- `PUT /api/groups/:id` - Update a group
- `POST /api/groups/:id/members` - Add member to group
- `DELETE /api/groups/:id/members/:userId` - Remove member from group
- `POST /api/groups/:id/messages` - Add message to group

### Support Tickets
- `GET /api/support-tickets` - Get all support tickets (admin only)
- `GET /api/support-tickets/user/:userId` - Get all tickets for a user
- `GET /api/support-tickets/:id` - Get ticket by ID
- `POST /api/support-tickets` - Create a new support ticket
- `PUT /api/support-tickets/:id/status` - Update ticket status (admin only)
- `POST /api/support-tickets/:id/responses` - Add response to ticket

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the token in the request header:

```
x-auth-token: <your-token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in JSON format:

```json
{
  "msg": "Error message"
}
```

## License

MIT