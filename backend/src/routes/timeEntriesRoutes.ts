import { Router } from "express";
import { timeEntryController } from "../controllers/timeEntries/timeEntryController";

const timeEntryRouter = Router();

timeEntryRouter.get("/", timeEntryController.getTimeEntries);
timeEntryRouter.post("/", timeEntryController.createTimeEntry);
timeEntryRouter.put("/:id", timeEntryController.updateTimeEntry);
timeEntryRouter.delete("/:id", timeEntryController.deleteTimeEntry);

export default timeEntryRouter;
