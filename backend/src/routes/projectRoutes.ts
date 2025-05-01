import { Router } from "express";
import { projectController } from "../controllers/project/projectController";

const projectRouter = Router();

projectRouter.get("/", projectController.getProjects);
projectRouter.delete("/:id", projectController.deleteProject);

export default projectRouter;
