import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

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
app.listen(300, () => {
  console.log("Server is runnig on port 3000");
});
