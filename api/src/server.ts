require("dotenv").config({ path: `${__dirname}/../.env` });
import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { Server } from "http";

// declare all routers
import dashboardRouter from "./routes/dashboardRouter";
import defaultRouter from "./routes/defaultRouter";

const DEFAULT_PORT = 3000;

const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// init your routes
app.use("/", defaultRouter);
app.use("/dashboard", dashboardRouter);

// NOT FOUND
app.use((_req: Request, res: Response) => {
  return res.status(404).json({ error: "Not Found" });
});

// SERVER ERROR
app.use((err: Error, _req: Request, res: Response) => {
  console.error(`${new Date()} Error handler :`, err);
  return res.status(500).json({ error: "Internal Server Error" });
});

const server = app.listen(DEFAULT_PORT, () => {
  console.log(`Listening on port ${DEFAULT_PORT}`);
});

process.on("SIGINT", () => shutdownGracefully(server));
process.on("SIGTERM", () => shutdownGracefully(server));

const shutdownGracefully = (server: Server) => {
  console.info("\nClosing server gracefully...");
  server.close(async () => {
    console.info("Server closed.");
    process.exit();
  });
};
