import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./src/config/cors.js";
import { errorMiddleware } from "./src/middlewares/errorMiddlewares.js";
import appRoutes from "./src/routes/routes.js";

export const app = express();

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/v1", appRoutes);

app.use(errorMiddleware);
