import { createProject } from "./createProject";
import { deleteProject } from "./deleteProject";
import { getProjects } from "./getProjects";
import { updateProject } from "./updateProject";

export const projectController = {
  getProjects,
  deleteProject,
  createProject,
  updateProject
}