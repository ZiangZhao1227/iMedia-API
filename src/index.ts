import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";

import loggerHandler from "./middlewares/logger";
import errorHandler from "./middlewares/error";

dotenv.config();

const app = express();

mongoose
  .connect(`${process.env.MONGODB_URI_LOCAL}`, {
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

app.use(express.json());
app.use(helmet());
app.use(loggerHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler.unknownEndpoint);
app.use(errorHandler.generalError);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Backend server is running on port ${process.env.PORT}!`);
});
