import { Router } from "express";
import { timeEntryController } from "../controllers/timeEntries/timeEntryController";

const timeEntryRouter = Router();

timeEntryRouter.get("/", timeEntryController.getTimeEntries);
timeEntryRouter.post("/", timeEntryController.createTimeEntry);

export default timeEntryRouter;
