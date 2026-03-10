import express from 'express';
import { authUser } from './middlewares/authorizeUsers.js';
import { get_users } from './controllers/UsersController.js';
import { validate_login } from './controllers/AuthController.js';
import cors from 'cors';

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:5177', 'http://localhost:5176', 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));


app.get('/users', authUser('read'), get_users);
app.post('/auth/login', validate_login);

app.listen(3001, ()=> {
  console.log('Server is running on port 3001');
}) 
