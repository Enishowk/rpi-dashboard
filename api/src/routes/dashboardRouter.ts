import express from "express";

import * as dashboardController from "../controllers/dashboardController";
import { checkJWT } from "../utils/jwtUtils";

const dashboardRouter = express.Router();

// Route '/dashboard'
dashboardRouter.get(
  "/temperatures",
  checkJWT,
  dashboardController.getTemperatures
);

export default dashboardRouter;
