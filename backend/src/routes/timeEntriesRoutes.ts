import { Router } from "express";
import { timeEntrieController } from "../controllers/timeEntries/timeEntrieController";

const timeEntrieRouter = Router();

timeEntrieRouter.get("/", timeEntrieController.getTimeEntries);

export default timeEntrieRouter;
