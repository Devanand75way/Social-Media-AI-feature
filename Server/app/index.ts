import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
const app = express();
import morgan from "morgan"
// import { PORT } from "./helper/config";
const PORT = 5000;

import ApiRoutes from "./users/user.routes";

export const prismaClient = new PrismaClient({
  log: ["query"],
});
app.use(morgan("dev"));
app.use(express.json());  
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api", ApiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});