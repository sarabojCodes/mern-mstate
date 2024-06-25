import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL, {
    dbName: "mern-app-collection",
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("Server is runnig on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
