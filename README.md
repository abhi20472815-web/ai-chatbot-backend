# AI Chatbot Backend

Backend API for the MERN Stack AI Chatbot application.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Google Gemini AI** - AI responses

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai-chatbot
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGIN=http://localhost:3000
```

### 3. Get Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy and paste into `.env`

### 4. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service
- Use URI: `mongodb://localhost:27017/ai-chatbot`

**Option B: MongoDB Atlas (Recommended)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 5. Start Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: ...
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Chat
- `POST /api/chat/message` - Send message and get AI response (protected)
- `GET /api/chat/history` - Get all chat sessions (protected)
- `GET /api/chat/session/:sessionId` - Get specific session (protected)
- `DELETE /api/chat/session/:sessionId` - Delete session (protected)
- `POST /api/chat/new` - Create new session (protected)

### Health Check
- `GET /api/health` - Server health status

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── chatController.js     # Chat & AI logic
├── middleware/
│   └── auth.js               # JWT authentication
├── models/
│   ├── User.js               # User schema
│   └── Chat.js               # Chat schema
├── routes/
│   ├── auth.js               # Auth routes
│   └── chat.js               # Chat routes
├── .env                      # Environment variables (create this)
├── .env.example              # Environment template
├── package.json              # Dependencies
├── server.js                 # Main server file
└── README.md                 # This file
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |
| MONGODB_URI | Database connection | mongodb://localhost:27017/ai-chatbot |
| JWT_SECRET | JWT secret key | random_32_character_string |
| GEMINI_API_KEY | Google Gemini API key | AIzaSyXXXXXXXXXXXXXX |
| CORS_ORIGIN | Frontend URL | http://localhost:3000 |

## Testing API with cURL

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Send Message (replace YOUR_TOKEN)
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message":"Hello, AI!"}'
```

## Deployment

### Railway
1. Push to GitHub
2. Connect Railway to your repo
3. Add environment variables
4. Deploy

### Render
1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running or use MongoDB Atlas

### CORS Error
**Solution:** Check `CORS_ORIGIN` matches frontend URL exactly

### JWT Token Invalid
**Solution:** Verify `JWT_SECRET` is set and consistent

### Gemini API Error
**Solution:** Check API key is valid and has no rate limit issues

## Dependencies

```json
{
  "@google/generative-ai": "^0.21.0",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.9.3",
  "validator": "^13.12.0"
}
```

## Development

### Adding New Routes
1. Create controller in `controllers/`
2. Create route file in `routes/`
3. Import route in `server.js`

### Adding Middleware
1. Create middleware in `middleware/`
2. Apply in routes or globally in `server.js`

## Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens for authentication
- Input validation with validator
- CORS protection
- Environment variables for secrets

## License

MIT

## Support

For issues, check the main project documentation or create an issue on GitHub.
