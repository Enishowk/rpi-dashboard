import express from "express";

import * as defaultController from "../controllers/defaultController";

const defaultRouter = express.Router();

// Route '/'
defaultRouter.get("/", defaultController.index);

defaultRouter.post("/login", defaultController.login);

export default defaultRouter;
