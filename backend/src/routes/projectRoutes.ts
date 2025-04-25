import { Router } from "express";
import { projectController } from "../controllers/project/projectController";

const projectRouter = Router();

projectRouter.get("/", projectController.getProjects);

export default projectRouter;
