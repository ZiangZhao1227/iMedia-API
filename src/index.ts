import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import path from "path";

import loggerHandler from "./middlewares/logger";
import errorHandler from "./middlewares/error";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import postRouter from "./routes/posts";
import uploadRouter from "./routes/upload";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const parentDir = path.normalize(__dirname+"/..");

mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err: Error) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit(1);
  });


app.use("/images", express.static(path.join(parentDir, "./public/images")));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(loggerHandler);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/upload", uploadRouter);

app.use(errorHandler.unknownEndpoint);
app.use(errorHandler.generalError);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}!`);
});
