import express, { Request, Response } from "express";

// Express Async Errors
require("express-async-errors");

import * as dotenv from "dotenv";

// Routers and Middleware
import morgan from "morgan";
import errorHandlerMiddleware from "./middleware/errorHandler";
import notFoundMiddleware from "./middleware/notFound";

import carsRouter from "./routers/cars";
import ownersRouter from "./routers/owners";
import authRouter from "./routers/auth";

// Dotenv configuration
dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || 4000;

// EXPRESS MIDDLEWARE
app.use(express.raw());
app.use(express.json());
app.use(morgan("dev"));

// Test home route
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Hello Prisma" });
});

app.use("/", [carsRouter, ownersRouter, authRouter]);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// Start server fucnction
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`App is listening on port:${PORT}...`);
    });
  } catch (error) {
    console.log("oopsie");
    console.log(error);
  }
};

startServer();
