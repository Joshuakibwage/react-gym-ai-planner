import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//API routes
app.use("/api/profile", profileRouter);
app.use("/api/plan", planRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});