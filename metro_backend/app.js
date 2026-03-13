import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
})); //used for middleware and handling CORS errors

app.use(express.json({limit: "16kb"})); //used for parsing application/json
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //used for parsing application/x-www-form-urlencoded
app.use(express.static('public')); //used for serving static files
app.use(cookieParser()); //used for parsing cookies

// routes
import userRouter from "./routes/user.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/subtasks", subTaskRouter);

// http://localhost:4000/api/v1/users/register

export default app;