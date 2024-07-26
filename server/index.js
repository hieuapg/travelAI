import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import "./db.js";
import UserRouter from './routes/users.js';
import cookieParser from 'cookie-parser';
import ApiRouter from './routes/api.js';

const app = express();
app.use(express.json());

dotenv.config();

app.use(cors({
    origin: ["http://localhost:5173"],
    method: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());

app.use(UserRouter);
app.use(ApiRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
