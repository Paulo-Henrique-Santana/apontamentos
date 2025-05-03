import { createProject } from "./createProject";
import { deleteProject } from "./deleteProject";
import { getProjects } from "./getProjects";

export const projectController = {
  getProjects,
  deleteProject,
  createProject
}